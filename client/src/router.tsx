import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { TestPage } from "./pages/TestPage.tsx";

export const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/test", element: <TestPage /> }
]);