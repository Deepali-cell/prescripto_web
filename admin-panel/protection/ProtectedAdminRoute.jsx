import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../src/context/AdminContext";

export const ProtectedAdminRoute = ({ children }) => {
  const { atoken } = useContext(AdminContext);
  if (!atoken) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};
