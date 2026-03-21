import { useProfileData } from "../hooks/useProfileData";
import { Logout } from "../components/Logout";
import { Navigate } from "react-router-dom";

export const Setup = () => {
    const { data: profileData, isLoading, error } = useProfileData();

    if (profileData?.username) {
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
            <p>This is the setup page. You can add any setup instructions or configurations here.</p>
            <Logout />
        </div>
    )
};