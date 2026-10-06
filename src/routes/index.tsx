import { createBrowserRouter } from "react-router-dom"

import AppLayout from "../components/layout/app-layout"
import Home from "../pages/home"
import Dashboard from "../pages/dashboard"
import Login from "../pages/login"
import NotFound from "../pages/not-found"
import Queue from "../pages/queue"
import QueueLayout from "../components/layout/queueLayout"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
        {
            index: true,
            element: <Home />,
        },
        {
            path: "dashboard",
            element: <Dashboard />,
        },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/queue",
        element: <QueueLayout />,
        children: [
            {
                index: true,
                element: <Queue />,
            }
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
])