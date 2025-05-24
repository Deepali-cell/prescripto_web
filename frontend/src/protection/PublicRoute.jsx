// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const user = localStorage.getItem("usertoken");

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};
