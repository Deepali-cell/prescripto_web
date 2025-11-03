import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

export const Login = () => {
  const [state, setstate] = useState("admin");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const { setatoken, backend_url } = useContext(AdminContext);
  const { setdoctortoken } = useContext(DoctorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "admin") {
        const { data } = await axios.post(`${backend_url}/api/admin/login`, {
          email,
          password,
        });
        if (data.success) {
          toast.success("Admin login successful");
          localStorage.setItem("atoken", data.message);
          setatoken(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backend_url}/api/doctor/login`, {
          email,
          password,
        });
        if (data.success) {
          toast.success("Doctor login successful");
          localStorage.setItem("doctortoken", data.doctortoken);
          setdoctortoken(data.doctortoken);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center px-4 md:px-10 mt-20 mb-10">
        <form
          onSubmit={handleSubmit}
          className="
            w-full 
            max-w-md 
            bg-white 
            border border-gray-300 
            rounded-lg 
            px-6 
            py-8 
            shadow-sm
          "
        >
          <h1 className="text-gray-700 font-semibold text-2xl mb-6 text-center">
            {state === "doctor" ? "Doctor Login" : "Admin Login"}
          </h1>

          {/* Email Input */}
          <label className="input input-bordered flex items-center gap-2 my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="grow px-2 py-2"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </label>

          {/* Password Input */}
          <label className="input input-bordered flex items-center gap-2 my-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow px-2 py-2"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </label>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full py-2 mt-6 text-white font-medium rounded-md transition"
          >
            Login Account
          </button>

          {/* Switch Login */}
          <p
            className="text-center mt-4 cursor-pointer text-sm"
            onClick={() => setstate(state === "doctor" ? "admin" : "doctor")}
          >
            {state === "doctor" ? (
              <>
                Admin Login?
                <span className="text-blue-500 underline ml-1">Click here</span>
              </>
            ) : (
              <>
                Doctor Login?
                <span className="text-blue-500 underline ml-1">Click here</span>
              </>
            )}
          </p>
        </form>
      </div>
    </>
  );
};
