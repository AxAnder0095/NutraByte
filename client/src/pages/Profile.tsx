import { useProfileData } from "../hooks/useProfileData";

export const Profile = () => {
    const { profileData, loading, error } = useProfileData();

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="Profile">
            <h1>Profile</h1>
            <p>This is the profile page.</p>
            <h2>User Information</h2>
            <p><strong>Username:</strong> {profileData?.username}</p>
            <p><strong>Email:</strong> {profileData?.email}</p>
            <p><strong>Followers:</strong> {profileData?.followers.length}</p>
            <p><strong>Following:</strong> {profileData?.following.length}</p>
        </div>
    );
};