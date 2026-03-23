import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Profile } from "./pages/Profile.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
]);