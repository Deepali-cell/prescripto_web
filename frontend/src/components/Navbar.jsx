import { useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets";
import { useContext, useState } from "react";
import { myContext } from "../context/StateProvider";

export const Navbar = () => {
  const navigate = useNavigate();
  const { token, settoken, userData } = useContext(myContext);
  const [openMenu, setOpenMenu] = useState(false);

  const logout = () => {
    settoken(false);
    localStorage.removeItem("usertoken");
  };

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "text-gray-700";

  return (
    <nav className="bg-base-100 shadow-md border-b px-4 md:px-10 py-3 mb-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/">
          <img src={assets.logo} alt="Logo" className="h-10" />
        </NavLink>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpenMenu(!openMenu)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-base font-medium">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/doctors" className={navLinkClass}>
            All Doctors
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

          <button
            className="bg-gray-800 text-white px-3 py-1 rounded"
            onClick={() =>
              (window.location.href =
                "https://prescripto-web-admin-panel.onrender.com")
            }
          >
            Go to Admin Panel
          </button>

          {token && userData ? (
            <>
              <NavLink to="/profile" className={navLinkClass}>
                My Profile
              </NavLink>
              <NavLink to="/myappointment" className={navLinkClass}>
                My Appointment
              </NavLink>
              <span onClick={logout} className="cursor-pointer text-red-500">
                Logout
              </span>
            </>
          ) : (
            <button
              className="bg-blue-600 px-3 py-1 rounded text-white"
              onClick={() => navigate("/register")}
            >
              Book An Appointment
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-lg font-medium bg-white p-4 rounded shadow">
          <NavLink
            to="/"
            onClick={() => setOpenMenu(false)}
            className={navLinkClass}
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            onClick={() => setOpenMenu(false)}
            className={navLinkClass}
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setOpenMenu(false)}
            className={navLinkClass}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setOpenMenu(false)}
            className={navLinkClass}
          >
            Contact
          </NavLink>

          <button
            className="bg-gray-800 text-white px-3 py-1 rounded"
            onClick={() => {
              window.location.href =
                "https://prescripto-web-admin-panel.onrender.com";
            }}
          >
            Go to Admin Panel
          </button>

          {token && userData ? (
            <>
              <NavLink
                to="/profile"
                onClick={() => setOpenMenu(false)}
                className={navLinkClass}
              >
                My Profile
              </NavLink>
              <NavLink
                to="/myappointment"
                onClick={() => setOpenMenu(false)}
                className={navLinkClass}
              >
                My Appointment
              </NavLink>
              <span
                onClick={() => {
                  logout();
                  setOpenMenu(false);
                }}
                className="cursor-pointer text-red-500"
              >
                Logout
              </span>
            </>
          ) : (
            <button
              className="bg-blue-600 px-3 py-1 rounded text-white"
              onClick={() => {
                navigate("/register");
                setOpenMenu(false);
              }}
            >
              Book An Appointment
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
