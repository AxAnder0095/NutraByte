import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Profile } from "./pages/Profile.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Setup } from "./pages/Setup.tsx";

export const router = createBrowserRouter([
    // { 
    //     path: "/", 
    //     element: (
    //         <ProtectedRoute>
    //             <App />
    //         </ProtectedRoute>
    //     ),
    //     children: [
    //         {index: true, element: <Profile />},
    //         {path: "setup", element: <Setup />}
    //     ] 
    // },
    { path: "/", element: <App /> },
    { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
    { path: "/setup", element: <ProtectedRoute><Setup /></ProtectedRoute> },
]);