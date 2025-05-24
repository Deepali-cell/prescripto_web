import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../src/context/AdminContext";
import { DoctorContext } from "../src/context/DoctorContext";

export const PublicRoute = ({ children }) => {
  const { atoken } = useContext(AdminContext);
  const { doctortoken } = useContext(DoctorContext);

  if (atoken) return <Navigate to="/admin/admindashboard" />;
  if (doctortoken) return <Navigate to="/admin/doctordashboard" />;

  return children;
};
