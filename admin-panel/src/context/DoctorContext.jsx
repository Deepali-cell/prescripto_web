import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const [doctortoken, setdoctortoken] = useState(
    localStorage.getItem("doctortoken")
      ? localStorage.getItem("doctortoken")
      : ""
  );
  const [appointments, setappointments] = useState([]);
  const [dashdata, setdashdata] = useState(false);
  const [profile, setprofile] = useState(false);

  const getprofile = async () => {
    if (!doctortoken) return;

    try {
      const { data } = await axios.get(`${backend_url}/api/doctor/getprofile`, {
        headers: {
          Authorization: `Bearer ${doctortoken}`,
        },
      });

      if (data.success) {
        setprofile(data.doctorData);
        console.log(data.doctorData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching user data. Please try again later.");
    }
  };

  const doctorappointments = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/doctor/doctorappointments`,
        {
          headers: {
            Authorization: `Bearer ${doctortoken}`,
          },
        }
      );
      if (data.success) {
        setappointments(data.appointments);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/doctor/completedappointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${doctortoken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        doctorappointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/doctor/cancelappointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${doctortoken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        doctorappointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getdashdata = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/doctor/doctordashboard`,
        {
          headers: {
            Authorization: `Bearer ${doctortoken}`,
          },
        }
      );
      if (data.success) {
        console.log(data.dashData);
        setdashdata(data.dashData);
      } else {
        console.log(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const value = {
    backend_url,
    doctortoken,
    setdoctortoken,
    doctorappointments,
    appointments,
    setappointments,
    completeAppointment,
    cancelAppointment,
    getdashdata,
    dashdata,
    setdashdata,
    profile,
    setprofile,
    getprofile,
  };
  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
