import React from "react";
import { Navigate } from "react-router-dom";

export default function ResetPasswordGuard({ children }) {
  const canReset = localStorage.getItem("canResetPassword");

  if (canReset !== "true") {
    return <Navigate to="/forgetpassword" replace />;
  }

  return children;
}
