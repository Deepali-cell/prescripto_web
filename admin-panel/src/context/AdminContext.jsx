import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [atoken, setatoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );
  const [bookedSlots, setBookedSlots] = useState(new Set());
  const [doctors, setDoctors] = useState([]);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [allappointments, setallappointments] = useState([]);
  const [dashdata, setdashdata] = useState(false);

  const getalldoctors = async () => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/admin/alldoctors`,
        {},
        { headers: { atoken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/admin/changeAvailability`,
        { docId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getalldoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getallappointments = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/admin/allappointments`,
        {
          headers: {
            atoken,
          },
        }
      );

      if (data.success) {
        setallappointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const cancelAppointment = async (appointmentId, slotTime) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/user/cancelappointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${atoken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setBookedSlots(
          (prev) => new Set([...prev].filter((slot) => slot !== slotTime))
        );
        getallappointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getdashdata = async () => {
    try {
      const { data } = await axios.get(`${backend_url}/api/admin/dashboard`, {
        headers: {
          atoken,
        },
      });
      if (data.success) {
        setdashdata(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  const value = {
    atoken,
    setatoken,
    backend_url,
    getalldoctors,
    doctors,
    changeAvailability,
    getallappointments,
    allappointments,
    setallappointments,
    dashdata,
    getdashdata,
    cancelAppointment,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
