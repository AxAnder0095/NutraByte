import { useProfileData } from "../hooks/useProfileData";
import { Logout } from "../components/Logout";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

export const Setup = () => {
    const [username, setUsername] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const queryClient = useQueryClient();
    const { getAccessTokenSilently } = useAuth0();
    const { data: profileData, isLoading, error } = useProfileData();

    const saveUsernameMutation = useMutation({
        mutationFn: async (nextUsername: string) => {
            const authToken = await getAccessTokenSilently({
                authorizationParams: {
                    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                },
            });

            await api.patch(
                "/user/username",
                { username: nextUsername },
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            );
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["profileData"] });
        },
        onError: (mutationError: unknown) => {
            const message =
                (mutationError as { response?: { data?: { message?: string } } })?.response?.data
                    ?.message ?? "Could not save username";
            setFormError(message);
        },
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        const trimmedUsername = username.trim();
        if (!trimmedUsername) {
            setFormError("Username cannot be empty");
            return;
        }

        await saveUsernameMutation.mutateAsync(trimmedUsername);
    };

    if (profileData?.username?.trim()) {
        return <Navigate to="/profile" />; // Redirect to profile if username is already set
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <div className="Setup">
            <h1>Setup Page</h1>
            <p>Choose a username to finish setting up your account.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter username"
                    autoComplete="username"
                />
                <button type="submit" disabled={saveUsernameMutation.isPending}>
                    {saveUsernameMutation.isPending ? "Saving..." : "Save Username"}
                </button>
            </form>
            {formError && <div>{formError}</div>}
            <Logout />
        </div>
    )
};