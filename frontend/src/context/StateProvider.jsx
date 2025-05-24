import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const myContext = createContext();

const StateProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [token, settoken] = useState(localStorage.getItem("usertoken") || null);
  const [userData, setuserData] = useState(null);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching doctors. Please try again later.");
    }
  };

  const getUser = async () => {
    if (!token) return;

    try {
      const { data } = await axios.get(`${backend_url}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setuserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user data. Please try again later.");
    }
  };

  const value = {
    doctors,
    getAllDoctors,
    token,
    settoken,
    backend_url,
    userData,
    setuserData,
    getUser,
    bookedSlots,
    setBookedSlots,
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  useEffect(() => {
    getUser();
  }, [token]);

  return <myContext.Provider value={value}>{children}</myContext.Provider>;
};

export default StateProvider;
