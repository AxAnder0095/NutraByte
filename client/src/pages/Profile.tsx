// import { useProfileData } from "../hooks/useProfileData";
import { Logout } from "../components/Logout";
// import { Setup } from "./Setup";
import { Navigate } from "react-router-dom";

export const Profile = () => {
    // const { profileData, loading, error } = useProfileData();

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    // if (!profileData?.username) {
    //     return <Navigate to="/setup" />; // Redirect to setup if username is not set
    // }
    
    // if (error) {
    //     return <div>{error}</div>;
    // }

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <h2>User Information</h2>
            <p>Testing rename</p>
            {/* <p><strong>Username:</strong> {profileData?.username}</p>
            <p><strong>Email:</strong> {profileData?.email}</p>
            <p><strong>Followers:</strong> {profileData?.followers.length}</p>
            <p><strong>Following:</strong> {profileData?.following.length}</p> */}
            <Logout />
        </div>
    );
};