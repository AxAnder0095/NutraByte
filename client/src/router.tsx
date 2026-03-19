import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { TestPage } from "./pages/TestPage.tsx";
import { Profile } from "./pages/Profile.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Setup } from "./pages/Setup.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/test", element: <TestPage /> },
    { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
    { path: "/setup", element: <ProtectedRoute><Setup /></ProtectedRoute> },
]);