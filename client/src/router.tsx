import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { TestPage } from "./pages/TestPage.tsx";
import { Profile } from "./pages/Profile.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/test", element: <TestPage /> },
    { path: "/profile", element: <Profile /> }
]);