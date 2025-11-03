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
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-6 text-center">
        All Appointments
      </h1>

      {/* ✅ Responsive Table Wrapper */}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-300">
        <table className="min-w-full bg-white text-sm md:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-3 border">#</th>
              <th className="py-2 px-3 border">Patient</th>
              <th className="py-2 px-3 border">Age</th>
              <th className="py-2 px-3 border">Phone</th>
              <th className="py-2 px-3 border">Date</th>
              <th className="py-2 px-3 border">Time</th>
              <th className="py-2 px-3 border">Doctor</th>
              <th className="py-2 px-3 border">Fees</th>
              <th className="py-2 px-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {allappointments.map((appointment, index) => (
              <tr
                key={appointment._id}
                className="hover:bg-gray-100 transition-all"
              >
                <td className="py-2 px-3 border text-center">{index + 1}</td>

                <td className="py-2 px-3 border">
                  {appointment.userData.name}
                </td>

                <td className="py-2 px-3 border text-center">
                  {calculateAge(appointment.userData.dob)}
                </td>

                <td className="py-2 px-3 border">
                  {appointment.userData.phone}
                </td>

                <td className="py-2 px-3 border">{appointment.slotDate}</td>

                <td className="py-2 px-3 border">{appointment.slotTime}</td>

                <td className="py-2 px-3 border">
                  {appointment.doctorData.name}
                </td>

                <td className="py-2 px-3 border text-center">
                  ${appointment.amount}
                </td>

                {/* ✅ ACTION BUTTONS */}
                <td className="py-2 px-3 border text-center">
                  {appointment.cancelled ? (
                    <span className="text-blue-500 font-medium">Cancelled</span>
                  ) : appointment.isCompleted ? (
                    <span className="text-green-600 font-semibold">
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        cancelAppointment(appointment._id, appointment.slotTime)
                      }
                      className="hover:scale-110 transition"
                    >
                      <img
                        src={assets.cancel_icon}
                        alt="cancel"
                        className="h-6 w-6 mx-auto"
                      />
                    </button>
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
