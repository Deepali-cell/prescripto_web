import { useContext, useEffect, useState } from "react";
import { myContext } from "../context/StateProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { token, settoken, backend_url } = useContext(myContext);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backend_url}/api/user/login`, {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("usertoken", data.usertoken);
        settoken(data.usertoken);
        toast.success("user login successfully");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);
  return (
    <>
      <div className="md:px-10 mb-5 mx-20 mt-20 ">
        <form
          onSubmit={handlesubmit}
          className="border border-gray-300 rounded-lg px-10 py-2 mx-[22em]"
        >
          <div>
            <h1 className="text-gray-500 font-medium text-2xl py-2">Login</h1>
            <p>Please Login to book appointment</p>
          </div>
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
              type="text"
              className="grow"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
          </label>
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
              className="grow"
              placeholder="password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </label>
          <div className="flex items-center justify-center my-4">
            <button
              type="submit"
              className="bg-blue-500 px-10 rounded-md w-full  py-2 text-white  "
            >
              Login Account
            </button>
          </div>
          <p className="text-left">
            Create an new account?
            <a href="/signup" className="text-blue-500 underline">
              Click here
            </a>
          </p>
        </form>
      </div>
    </>
  );
};
