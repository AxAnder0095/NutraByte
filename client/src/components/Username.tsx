import { useAuth0 } from "@auth0/auth0-react";

export const Username = () => {
    const { user } = useAuth0();

    return (
        <div className="Username">
            <h1>Username Component</h1>
            {user?.email}
            <p>This is a placeholder for the Username component.</p>
        </div>
    )
};