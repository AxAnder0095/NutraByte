import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/AuthPage.scss'
import { useProfileData } from "../hooks/useProfileData";
import { Logout } from "./Logout";


export const AuthPage = () => {
    const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

     const handleAuth = async (screenHint?: 'signup') => {
        try{
            await loginWithRedirect(
                screenHint
                    ? { authorizationParams: { screen_hint: screenHint } }
                    : undefined
            );
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="AuthPage">
            {error && <div className="error">Error: {error.message}</div>}
            {isLoading && <div className="loading">Loading...</div>}
            {isAuthenticated ? 
                <Navigate to="/profile" /> :
                <div className="auth-card">
                    <button onClick={() => handleAuth()}>Log In</button>
                    <button onClick={() => handleAuth('signup')}>Sign Up</button>
                </div>}
        </div>
    );
};