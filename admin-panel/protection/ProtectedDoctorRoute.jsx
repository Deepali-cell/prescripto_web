import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DoctorContext } from "../src/context/DoctorContext";

export const ProtectedDoctorRoute = ({ children }) => {
  const { doctortoken } = useContext(DoctorContext);
  if (!doctortoken) {
    return <Navigate to="/admin/login" />;
  }
  return children;
};
