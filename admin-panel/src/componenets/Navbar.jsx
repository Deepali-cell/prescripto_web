import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/admin_assets/assets.js";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";

export const Navbar = () => {
  const { atoken, setatoken } = useContext(AdminContext);
  const { doctortoken, setdoctortoken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    if (atoken) {
      setatoken("");
      localStorage.removeItem("atoken");
      navigate("/");
    }
    if (doctortoken) {
      setdoctortoken("");
      localStorage.removeItem("doctortoken");
      navigate("/");
    }
  };
  return (
    <>
      <div className="flex justify-between mx-10 my-4">
        <div className="flex gap-2 text-sm items-center">
          <img src={assets.admin_logo} alt="" />
          <p className="border text-center px-2.5 py-0.5  rounded-full cursor-pointer">
            {atoken ? "Admin" : "Doctor"}
          </p>
        </div>
        <div>
          <button
            className="border bg-red-600 px-4 py-2 rounded-lg text-white"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
