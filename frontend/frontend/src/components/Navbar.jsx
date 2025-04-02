import { useNavigate } from "react-router-dom";
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

  return (
    <>
      <div className="md:px-10 border-b-4  mb-5 mx-20 ">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow "
              >
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/doctors">All Doctors</a>
                </li>
                <li>
                  <a href="/about">About</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </div>
            <img src={assets.logo} alt="" onClick={() => navigate("/")} />
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/home">Home</a>
              </li>
              <li>
                <a href="/doctors">All Doctors</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            {token && userData ? (
              <div className="flex items-center gap-2 group relative">
                <img
                  className="h-[3em] rounded-full"
                  src={userData.image}
                  alt=""
                />
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div tabIndex={0} role="button">
                    {" "}
                    <img className="w-2.5" src={assets.dropdown_icon} alt="" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu bg-base-100 mt-10 rounded-box z-[1] w-52 p-2 shadow"
                  >
                    <li>
                      <a href="/profile">My Profile</a>
                    </li>
                    <li>
                      <a href="/myappointment">My Appointment</a>
                    </li>
                    <li onClick={logout}>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <button
                className="bg-blue-600 px-4 py-2 rounded-md text-white"
                onClick={() => navigate("/register")}
              >
                Create User
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
