import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/admin_assets/assets";

export const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { doctortoken } = useContext(DoctorContext);

  const [open, setOpen] = useState(false);

  const menuClasses = `
    flex flex-col gap-4 items-start justify-start 
    p-4
  `;

  const linkClasses = ({ isActive }) =>
    `flex gap-3 px-3 py-2 rounded-md w-full transition-all
    ${isActive ? "bg-blue-500 text-white" : "hover:bg-blue-100"}
  `;

  return (
    <>
      {/* ✅ Mobile Navbar (Only visible on small screens) */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b shadow-sm ">
        {/* ✅ SVG Menu Icon */}
        <button
          className="p-2 border rounded-md"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* ✅ MAIN SIDEBAR */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full 
          bg-white border-r shadow-md 
          transition-all duration-300 z-50
          ${open ? "w-64" : "w-0"} md:w-64
          overflow-hidden
        `}
      >
        <div className="mt-6">
          {/* ✅ ADMIN MENU */}
          {atoken && (
            <ul className={menuClasses}>
              <NavLink to={"/admin/admindashboard"} className={linkClasses}>
                <img src={assets.home_icon} alt="" className="h-6" />
                Dashboard
              </NavLink>

              <NavLink
                to={"/admin/adminallappointments"}
                className={linkClasses}
              >
                <img src={assets.appointment_icon} alt="" className="h-6" />
                Appointments
              </NavLink>

              <NavLink to={"/admin/adminadddoctors"} className={linkClasses}>
                <img src={assets.add_icon} alt="" className="h-6" />
                Add Doctors
              </NavLink>

              <NavLink to={"/admin/admindoctorslist"} className={linkClasses}>
                <img src={assets.people_icon} alt="" className="h-6" />
                Doctors List
              </NavLink>
            </ul>
          )}

          {/* ✅ DOCTOR MENU */}
          {doctortoken && (
            <ul className={menuClasses}>
              <NavLink to={"/admin/doctordashboard"} className={linkClasses}>
                <img src={assets.home_icon} alt="" className="h-6" />
                Dashboard
              </NavLink>

              <NavLink to={"/admin/doctorappointments"} className={linkClasses}>
                <img src={assets.appointment_icon} alt="" className="h-6" />
                Appointments
              </NavLink>

              <NavLink to={"/admin/doctorprofile"} className={linkClasses}>
                <img src={assets.people_icon} alt="" className="h-6" />
                Profile
              </NavLink>
            </ul>
          )}
        </div>
      </div>

      {/* ✅ Backdrop for mobile when sidebar is open */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 md:hidden"
        ></div>
      )}
    </>
  );
};
