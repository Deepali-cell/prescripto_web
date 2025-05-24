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
        // Reverse the appointments and update state
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
      <h1 className="md:px-10 mb-5 mx-40 font-medium text-2xl">
        My Appointment
      </h1>
      <div className="md:px-10 mb-5">
        <div>
          {appointments.length === 0 && (
            <p className="mx-40 text-center text-gray-500">
              No appointments found.
            </p>
          )}
          {appointments.map((doc) => (
            <div
              className="flex justify-between border mx-40 my-2 h-[12em]"
              key={doc._id}
            >
              <div className="flex items-center justify-center">
                <div>
                  {/* Safe check for doctorData and provide fallback image */}
                  <img
                    src={doc.doctorData?.image || "/default-doctor.png"}
                    alt={doc.doctorData?.name || "Doctor"}
                    className="bg-blue-100 h-[12em]"
                  />
                </div>
                <div>
                  <div className="px-4">
                    <h1 className="font-medium text-xl">
                      {doc.doctorData?.name || "No Name"}
                    </h1>
                    <p className="text-sm">
                      {doc.doctorData?.speciality || "No Speciality"}
                    </p>
                  </div>
                  <div className="px-4 py-4">
                    <h1 className="text-gray-500">
                      Address : <br />
                      <span className="text-sm text-black">
                        {doc.doctorData?.address?.line1 ||
                          "Address Line 1 not available"}
                      </span>
                      <br />
                      <span className="text-sm text-black">
                        {doc.doctorData?.address?.line2 ||
                          "Address Line 2 not available"}
                      </span>
                    </h1>
                  </div>
                  <div className="px-4">
                    <h1 className="text-gray-500">
                      Date & Time :{" "}
                      <span className="text-sm text-black">
                        {doc.slotDate || "N/A"} | {doc.slotTime || "N/A"}
                      </span>
                    </h1>
                  </div>
                </div>
              </div>
              <div className="mt-10 mr-10">
                {!doc.cancelled && doc.payment && !doc.isCompleted && (
                  <button className="border border-black bg-blue-500 text-white px-4 w-full py-2 my-2">
                    Paid
                  </button>
                )}
                {!doc.cancelled && !doc.payment && !doc.isCompleted && (
                  <button className="border border-black hover:bg-blue-500 hover:text-white hover:scale-105 transition-all duration-300 px-4 w-full py-2 my-2">
                    Pay Online
                  </button>
                )}
                {!doc.cancelled && !doc.isCompleted && (
                  <button
                    className="border border-black hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-300 px-4 w-full py-2 my-2"
                    onClick={() => cancelAppointment(doc._id, doc.slotTime)}
                  >
                    Cancel Appointment
                  </button>
                )}
                {doc.cancelled && !doc.isCompleted && (
                  <button
                    className="border border-black bg-red-500 text-white w-full px-4 py-2 my-2"
                    disabled
                  >
                    Appointment cancelled successfully
                  </button>
                )}
                {doc.isCompleted && (
                  <button
                    className="border border-black bg-green-500 text-white w-full px-4 py-2 my-2"
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
