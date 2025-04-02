import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/admin_assets/assets";

export const AllAppointment = () => {
  const { atoken, getallappointments, allappointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getallappointments();
    }
  }, [atoken, getallappointments]);

  return (
    <div className=" ">
      <h1 className="text-2xl font-medium mb-5 text-center">
        All Appointments
      </h1>
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Patient</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Doctor</th>
              <th className="py-2 px-4 border">Fees</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {allappointments.map((appointment, index) => (
              <tr key={appointment.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">
                  {appointment.userData.name}
                </td>
                <td className="py-2 px-4 border">
                  {calculateAge(appointment.userData.dob)}
                </td>
                <td className="py-2 px-4 border">
                  {appointment.userData.phone}
                </td>
                <td className="py-2 px-4 border">{appointment.slotDate}</td>
                <td className="py-2 px-4 border">{appointment.slotTime}</td>
                <td className="py-2 px-4 border">
                  {appointment.doctorData.name}
                </td>
                <td className="py-2 px-4 border">${appointment.amount}</td>
                <td className="py-2 px-4 border">
                  {appointment.cancelled ? (
                    <button className="text-blue-500 hover:underline">
                      Cancelled
                    </button>
                  ) : appointment.isCompleted ? (
                    <p className="text-green-500 font-medium text-xl">
                      completed
                    </p>
                  ) : (
                    <img
                      src={assets.cancel_icon}
                      onClick={() =>
                        cancelAppointment(appointment._id, appointment.slotTime)
                      }
                    ></img>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
