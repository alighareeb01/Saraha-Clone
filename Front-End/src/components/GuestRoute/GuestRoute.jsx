import React from "react";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const token = localStorage.getItem("loginToken");

  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
