import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/admin_assets/assets";

export const DoctorAppointment = () => {
  const {
    doctorappointments,
    appointments,
    cancelAppointment,
    completeAppointment,
    doctortoken,
  } = useContext(DoctorContext);

  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (doctortoken) {
      doctorappointments();
    }
  }, [doctortoken]);

  return (
    <div>
      <h1 className="text-2xl font-medium mb-5 text-center">
        All Appointments
      </h1>

      {/* ✅ Responsive Table Container */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-300 text-sm sm:text-base">
          {/* ✅ Table Header */}
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-center">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Patient</th>
              <th className="py-2 px-4 border">Age</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Time</th>
              <th className="py-2 px-4 border">Fees</th>
              <th className="py-2 px-4 border">Payment</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>

          {/* ✅ Table Body */}
          <tbody>
            {appointments.map((appointment, index) => (
              <tr
                key={appointment._id}
                className="hover:bg-gray-100 text-center"
              >
                <td className="py-2 px-4 border">{index + 1}</td>

                {/* ✅ Patient Section */}
                <td className="py-2 px-4 border">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <img
                      src={appointment.userData.image}
                      alt="Patient"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <span className="font-medium">
                      {appointment.userData.name}
                    </span>
                  </div>
                </td>

                <td className="py-2 px-4 border">
                  {calculateAge(appointment.userData.dob)}
                </td>

                <td className="py-2 px-4 border">
                  {appointment.userData.phone}
                </td>

                <td className="py-2 px-4 border">{appointment.slotDate}</td>

                <td className="py-2 px-4 border">{appointment.slotTime}</td>

                <td className="py-2 px-4 border font-medium">
                  ₹{appointment.amount}
                </td>

                {/* ✅ Payment Type */}
                <td className="py-2 px-4 border">
                  <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm border ${
                      appointment.payment
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {appointment.payment ? "Online" : "Cash"}
                  </span>
                </td>

                {/* ✅ Action Buttons */}
                <td className="py-2 px-4 border">
                  {appointment.cancelled ? (
                    <span className="text-blue-500 font-medium">Cancelled</span>
                  ) : appointment.isCompleted ? (
                    <span className="text-green-500 font-medium">
                      Completed
                    </span>
                  ) : (
                    <div className="flex justify-center gap-3">
                      <img
                        src={assets.cancel_icon}
                        onClick={() => cancelAppointment(appointment._id)}
                        alt="Cancel"
                        className="cursor-pointer w-6 hover:opacity-70"
                      />

                      <img
                        src={assets.tick_icon}
                        onClick={() => completeAppointment(appointment._id)}
                        alt="Complete"
                        className="cursor-pointer w-6 hover:opacity-70"
                      />
                    </div>
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
