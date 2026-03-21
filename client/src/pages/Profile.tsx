import { useProfileData } from "../hooks/useProfileData";
import { Logout } from "../components/Logout";
// import { Setup } from "./Setup";

export const Profile = () => {
    const { data, isLoading, error } = useProfileData();

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
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <h2>User Information</h2>
            {data && (
                <div>
                    <p><strong>Username:</strong> {data.username}</p>
                    <p><strong>Email:</strong> {data.email}</p>
                    <p><strong>Followers:</strong> {data.followers.length}</p>
                    <p><strong>Following:</strong> {data.following.length}</p>
                </div>
            )}
            <Logout />
        </div>
    );
};