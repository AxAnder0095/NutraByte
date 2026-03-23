import { Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

type IProtectedRouteProps = {
    children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) return <div>Loading...</div>;
    
    if (!isAuthenticated) return <Navigate to="/" />;
    
    return children;
}