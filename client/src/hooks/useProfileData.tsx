import { useState, useEffect } from "react";
import api from "../api/api";

interface IUser {
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
    const [profileData, setProfileData] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProfileData = async () => {
        setLoading(true);
        try {
            const response = await api.get<IUser>("/user/");
            console.log("Profile data fetched:", response.data);
            setProfileData(response.data);
        } catch (error) {
            setError("Failed to fetch profile data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    return {
        profileData,
        loading,
        error
    };
}