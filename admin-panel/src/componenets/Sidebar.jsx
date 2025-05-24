import { useContext } from "react";
import { assets } from "../assets/admin_assets/assets";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

export const Sidebar = () => {
  const { atoken } = useContext(AdminContext);
  const { doctortoken } = useContext(DoctorContext);

  return (
    <>
      <div className="mx-10 my-4 border-r min-h-screen pr-10">
        <div>
          {atoken && (
            <ul className="flex flex-col gap-4 items-start justify-start">
              <NavLink
                to={"/admin/admindashboard"}
                className={({ isActive }) =>
                  `flex gap-2 px-2 py-2  ${
                    isActive
                      ? "bg-blue-500 px-2 py-2 w-full rounded-lg text-white"
                      : ""
                  }`
                }
              >
                <img src={assets.home_icon} alt="" className="h-6" /> Dashboard
              </NavLink>
              <NavLink
                to={"/admin/adminallappointments"}
                className={({ isActive }) =>
                  `flex gap-2 px-2 py-2 ${
                    isActive
                      ? "bg-blue-500 px-2 py-2 w-full rounded-lg text-white"
                      : ""
                  }`
                }
              >
                <img src={assets.appointment_icon} alt="" className="h-6" />
                Appointments
              </NavLink>
              <NavLink
                to={"/admin/adminadddoctors"}
                className={({ isActive }) =>
                  `flex gap-2 px-2 py-2  ${
                    isActive
                      ? "bg-blue-500 px-2 py-2 w-full rounded-lg text-white"
                      : ""
                  }`
                }
              >
                <img src={assets.add_icon} alt="" className="h-6" />
                Add Doctors
              </NavLink>
              <NavLink
                to={"/admin/admindoctorslist"}
                className={({ isActive }) =>
                  `flex gap-2 px-2 py-2   ${
                    isActive
                      ? "bg-blue-500 px-2 py-2 w-full rounded-lg text-white"
                      : ""
                  }`
                }
              >
                <img src={assets.people_icon} alt="" className="h-6" />
                Doctors list
              </NavLink>
            </ul>
          )}
          {doctortoken && (
            <ul className="flex flex-col gap-4 items-start justify-start">
              <NavLink
                to={"/admin/doctordashboard"}
                className={({ isActive }) =>
                  `flex gap-2 px-2 py-2  ${
                    isActive
                      ? "bg-blue-500 px-2 py-2 w-full rounded-lg text-white"
                      : ""
                  }`
                }
              >
                <img src={assets.home_icon} alt="" className="h-6" /> Dashboard
              </NavLink>
              <NavLink
                to={"/admin/doctorappointments"}
                className={({ isActive }) =>
                  `flex gap-2 px-2 py-2 ${
                    isActive
                      ? "bg-blue-500 px-2 py-2 w-full rounded-lg text-white"
                      : ""
                  }`
                }
              >
                <img src={assets.appointment_icon} alt="" className="h-6" />
                Appointments
              </NavLink>
              <NavLink
                to={"/admin/doctorprofile"}
                className={({ isActive }) =>
                  `flex gap-2 px-2 py-2 ${
                    isActive
                      ? "bg-blue-500 px-2 py-2 w-full rounded-lg text-white"
                      : ""
                  }`
                }
              >
                <img src={assets.appointment_icon} alt="" className="h-6" />
                Profile
              </NavLink>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
