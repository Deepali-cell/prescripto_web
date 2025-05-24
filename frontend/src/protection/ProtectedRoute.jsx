// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("usertoken");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};
