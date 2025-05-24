import { useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useContext } from "react";
import { myContext } from "../context/StateProvider";

export const Navbar = () => {
  const navigate = useNavigate();
  const { token, settoken, userData } = useContext(myContext);

  const logout = () => {
    settoken(false);
    localStorage.removeItem("usertoken");
  };

  // Check for admin or doctor tokens
  const isAdminOrDoctor =
    localStorage.getItem("atoken") || localStorage.getItem("doctortoken");

  return (
    <div className="bg-base-100 shadow-md px-4 md:px-10 py-2 border-b mb-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <NavLink to="/">
          <img src={assets.logo} alt="Logo" className="h-10" />
        </NavLink>

        {/* Menu */}
        <div className="flex flex-wrap items-center gap-6 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : ""
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : ""
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : ""
            }
          >
            Contact
          </NavLink>

          {/* Show only if user is not admin or doctor */}
          {!isAdminOrDoctor && (
            <button
              className="bg-gray-800 text-white px-3 py-1 rounded"
              onClick={() => (window.location.href = "/admin/login")}
            >
              Go to Admin Panel
            </button>
          )}

          {token && userData ? (
            <>
              <NavLink to="/profile">My Profile</NavLink>
              <NavLink to="/myappointment">My Appointment</NavLink>
              <span onClick={logout} className="cursor-pointer text-red-500">
                Logout
              </span>
            </>
          ) : (
            <button
              className="bg-blue-600 px-3 py-1 rounded text-white"
              onClick={() => navigate("/register")}
            >
              Create User
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
