import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";


export interface IUser {
    _id: string; // Optional _id field for MongoDB documents
    username: string;
    email: string;
    password: string;
    following: string[];
    followers: string[];
    likedPosts: string[];
    savedPosts: string[];
}

export const useProfileData = () => {
    const { getAccessTokenSilently, isAuthenticated, isLoading: isAuthLoading } = useAuth0();

    const fetchProfileData = async (): Promise<IUser> => {
        const authToken = await getAccessTokenSilently();
        const response = await api.get<IUser>("/user", {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        return response.data;
    };

    return useQuery<IUser, Error>({
        queryKey: ["profileData"],
        enabled: isAuthenticated && !isAuthLoading,
        queryFn: fetchProfileData
    });
};