import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/admin_assets/assets.js";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";

export const Navbar = () => {
  const { atoken, setatoken } = useContext(AdminContext);
  const { doctortoken, setdoctortoken } = useContext(DoctorContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logout = () => {
    if (atoken) {
      setatoken("");
      localStorage.removeItem("atoken");
      navigate("/admin/login");
    }
    if (doctortoken) {
      setdoctortoken("");
      localStorage.removeItem("doctortoken");
      navigate("/admin/login");
    }
  };

  const goToFrontend = () => {
    window.location.href = "https://prescripto-web-frontend.onrender.com";
  };

  return (
    <nav className="bg-white shadow px-5 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo + Role */}
        <div className="flex gap-2 text-sm items-center">
          <img src={assets.admin_logo} alt="logo" className="w-10" />
          <p className="border text-center px-2.5 py-0.5 rounded-full cursor-pointer">
            {atoken ? "Admin" : "Doctor"}
          </p>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <button
            className="border bg-blue-600 px-4 py-2 rounded-lg text-white"
            onClick={goToFrontend}
          >
            Go to Frontend
          </button>

          <button
            className="border bg-red-600 px-4 py-2 rounded-lg text-white"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-3 bg-gray-100 p-4 rounded-lg">
          <button
            className="border bg-blue-600 px-4 py-2 rounded-lg text-white"
            onClick={goToFrontend}
          >
            Go to Frontend
          </button>

          <button
            className="border bg-red-600 px-4 py-2 rounded-lg text-white"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
