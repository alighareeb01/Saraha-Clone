import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("loginToken");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
