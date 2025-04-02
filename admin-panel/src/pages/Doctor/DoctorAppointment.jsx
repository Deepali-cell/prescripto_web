import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/admin_assets/assets";

export const DoctorAppointment = () => {
  const {
    doctorappointments,
    appointments,
    setappointments,
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
    <>
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
                <th className="py-2 px-4 border">Fees</th>
                <th className="py-2 px-4 border">Payment</th>
                <th className="py-2 px-4 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 flex flex-col items-center gap-2 ">
                    <img
                      src={appointment.userData.image}
                      alt=""
                      className="h-[3em] rounded-full "
                    />
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
                  <td className="py-2 px-4 border">${appointment.amount}</td>
                  {appointment.payment ? (
                    <td className="py-2 px-4 border">
                      <div className="border text-center rounded-full">
                        Online
                      </div>
                    </td>
                  ) : (
                    <td className="py-2 px-4 border">
                      <div className="border text-center rounded-full">
                        Cash
                      </div>
                    </td>
                  )}
                  <td className="py-2 px-4 border">
                    {appointment.cancelled ? (
                      <button className="text-blue-500 hover:underline">
                        Cancelled
                      </button>
                    ) : appointment.isCompleted ? (
                      <button className="text-green-500 hover:underline">
                        Completed
                      </button>
                    ) : (
                      <div className="flex">
                        <img
                          src={assets.cancel_icon}
                          onClick={() => cancelAppointment(appointment._id)}
                          alt="Cancel"
                          className="cursor-pointer"
                        />
                        <img
                          src={assets.tick_icon}
                          onClick={() => completeAppointment(appointment._id)}
                          alt="Complete"
                          className="cursor-pointer"
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
    </>
  );
};
