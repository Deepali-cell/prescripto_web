import { useContext, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { myContext } from "../context/StateProvider";
import axios from "axios";
import { toast } from "react-toastify";

export const MyAppointment = () => {
  const { backend_url, token, setBookedSlots } = useContext(myContext);
  const [appointments, setAppointments] = useState([]);

  const getappointmentsList = async () => {
    try {
      const { data } = await axios.get(
        `${backend_url}/api/user/appointmentslist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments");
    }
  };

  const cancelAppointment = async (appointmentId, slotTime) => {
    try {
      const { data } = await axios.post(
        `${backend_url}/api/user/cancelappointment`,
        { appointmentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setBookedSlots(
          (prev) => new Set([...prev].filter((slot) => slot !== slotTime))
        );
        getappointmentsList();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toast.error("Failed to cancel appointment");
    }
  };

  useEffect(() => {
    if (token) {
      getappointmentsList();
    }
  }, [token]);

  return (
    <Layout>
      <h1 className="px-4 md:px-10 lg:px-20 mb-5 font-medium text-2xl">
        My Appointment
      </h1>

      <div className="px-4 md:px-10 lg:px-20 mb-5">
        {appointments.length === 0 && (
          <p className="text-center text-gray-500">No appointments found.</p>
        )}

        <div className="flex flex-col gap-6">
          {appointments.map((doc) => (
            <div
              key={doc._id}
              className="
                flex flex-col md:flex-row 
                justify-between 
                border rounded-lg 
                p-4 
                shadow-sm
              "
            >
              {/* Doctor Info Section */}
              <div className="flex gap-4 md:gap-6 items-center">
                <img
                  src={doc.doctorData?.image || "/default-doctor.png"}
                  alt={doc.doctorData?.name || "Doctor"}
                  className="h-28 w-28 md:h-36 md:w-36 bg-blue-100 object-cover rounded"
                />

                <div>
                  <h1 className="font-semibold text-lg">
                    {doc.doctorData?.name || "No Name"}
                  </h1>

                  <p className="text-gray-500">
                    Date & Time:{" "}
                    <span className="text-black font-medium">
                      {doc.slotDate || "N/A"} | {doc.slotTime || "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Button Section */}
              <div className="flex md:flex-col gap-2 mt-4 md:mt-0">
                {!doc.cancelled && !doc.isCompleted && (
                  <button
                    className="
                      border border-black 
                      hover:bg-red-500 hover:text-white 
                      transition-all duration-300 
                      px-4 py-2 rounded w-full
                    "
                    onClick={() => cancelAppointment(doc._id, doc.slotTime)}
                  >
                    Cancel Appointment
                  </button>
                )}

                {doc.cancelled && !doc.isCompleted && (
                  <button
                    className="border border-black bg-red-500 text-white px-4 py-2 rounded w-full"
                    disabled
                  >
                    Appointment Cancelled
                  </button>
                )}

                {doc.isCompleted && (
                  <button
                    className="border border-black bg-green-500 text-white px-4 py-2 rounded w-full"
                    disabled
                  >
                    Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
