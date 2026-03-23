import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
// import PublicProfile from "./components/PublicProfileold/PublicProfileold";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import PublicProfile from "./components/PublicProfile/PublicProfile";
import Inbox from "./components/Inbox/Inbox";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ResetPasswordGuard from "./components/ResetPasswordGuard/ResetPasswordGuard";

// import { Home } from "./Home/Home";
function App() {
  // let routes = createBrowserRouter([
  //   {
  //     path: "",
  //     element: <Layout />,
  //     children: [
  //       { path: "", element: <Home /> },
  //       { path: "login", element: <Login /> },
  //       { path: "register", element: <Register /> },
  //       { path: "dashboard", element: <Dashboard /> },
  //     ],
  //   },
  // ]);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "login",
          element: (
            <GuestRoute>
              <Login />
            </GuestRoute>
          ),
        },
        {
          path: "forgetpassword",
          element: (
            <GuestRoute>
              <ForgetPassword />
            </GuestRoute>
          ),
        },
        {
          path: "resetpassword",
          element: (
            <GuestRoute>
              <ResetPasswordGuard>
                <ResetPassword />
              </ResetPasswordGuard>
            </GuestRoute>
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
        {
          path: "dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "inbox",
          element: (
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          ),
        },

        {
          path: "user/:userName",
          element: <PublicProfile />,
        },
      ],
    },
  ]);
  return (
    <>
      {/* <Navbar /> */}
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
