import { createBrowserRouter } from "react-router-dom"

import AppLayout from "../components/layout/app-layout"
import Home from "../pages/home"
import Dashboard from "../pages/dashboard"
import Login from "../pages/login"
import NotFound from "../pages/not-found"

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
    path: "*",
    element: <NotFound />,
  },
])