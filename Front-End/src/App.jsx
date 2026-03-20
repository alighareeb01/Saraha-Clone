import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtecteRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";

// import { Home } from "./Home/Home";
function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "login",
          element: (
            <GuestRoute>
              <Login />
            </GuestRoute>
          ),
        },
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "register",
          element: (
            <GuestRoute>
              <Register />
            </GuestRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <Navbar />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
