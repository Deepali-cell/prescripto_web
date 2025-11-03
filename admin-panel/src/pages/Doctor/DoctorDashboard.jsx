import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/admin_assets/assets";

export const DoctorDashboard = () => {
  const {
    getdashdata,
    dashdata,
    doctortoken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (doctortoken) {
      getdashdata();
    }
  }, [doctortoken]);

  return (
    dashdata && (
      <>
        <div className="w-full overflow-hidden mt-10">
          {/* ✅ Top Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
            {/* Earning */}
            <div className="border rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-gray-100 transition">
              <img src={assets.earning_icon} alt="" className="w-10" />
              <p className="text-lg font-medium text-center">
                ₹{dashdata.earning} <br /> Earning
              </p>
            </div>

            {/* Patients */}
            <div className="border rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-gray-100 transition">
              <img src={assets.patients_icon} alt="" className="w-10" />
              <p className="text-lg font-medium text-center">
                {dashdata.patients} <br /> Patients
              </p>
            </div>

            {/* Appointments */}
            <div className="border rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-gray-100 transition">
              <img src={assets.appointments_icon} alt="" className="w-10" />
              <p className="text-lg font-medium text-center">
                {dashdata.appointments} <br /> Appointments
              </p>
            </div>
          </div>

          {/* ✅ Latest Appointments */}
          <div className="border mt-6 px-6 py-6 mx-4 sm:mx-10">
            <h1 className="text-2xl font-medium py-2">Latest Appointments</h1>
            <hr />

            <div className="flex flex-col gap-4 mt-4">
              {dashdata.latestappointments.map((appointment, index) => (
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between border p-4 rounded-lg"
                  key={index}
                >
                  {/* Left Side: User Info */}
                  <div className="flex gap-4">
                    <img
                      src={appointment.userData.image}
                      alt=""
                      className="h-16 w-16 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-xl">
                        {appointment.userData.name}
                      </p>
                      <p className="text-gray-600">
                        Booking on{" "}
                        <span className="font-medium">
                          {appointment.slotDate}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Actions */}
                  <div className="mt-4 sm:mt-0 flex items-center gap-4">
                    {appointment.cancelled ? (
                      <p className="text-blue-500 font-medium">Cancelled</p>
                    ) : appointment.isCompleted ? (
                      <p className="text-green-600 font-medium">Completed</p>
                    ) : (
                      <div className="flex gap-4">
                        <img
                          src={assets.cancel_icon}
                          alt="Cancel"
                          className="w-7 cursor-pointer hover:opacity-70"
                          onClick={() => cancelAppointment(appointment._id)}
                        />
                        <img
                          src={assets.tick_icon}
                          alt="Complete"
                          className="w-7 cursor-pointer hover:opacity-70"
                          onClick={() => completeAppointment(appointment._id)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  );
};
