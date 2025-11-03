import { useContext, useEffect } from "react";
import { assets } from "../../assets/admin_assets/assets";
import { AdminContext } from "../../context/AdminContext";

export const Dashboard = () => {
  const { dashdata, getdashdata, atoken, cancelAppointment } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getdashdata();
    }
  }, [atoken]);

  return (
    dashdata && (
      <>
        <div className="w-full overflow-hidden mt-10">
          {/* Top Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-6">
            {/* Doctors */}
            <div className="border rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-gray-100 transition">
              <img src={assets.doctor_icon} alt="" className="w-10" />
              <p className="text-center text-lg font-medium">
                {dashdata.doctors} <br /> Doctors
              </p>
            </div>

            {/* Patients */}
            <div className="border rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-gray-100 transition">
              <img src={assets.patients_icon} alt="" className="w-10" />
              <p className="text-center text-lg font-medium">
                {dashdata.users} <br /> Patients
              </p>
            </div>

            {/* Appointments */}
            <div className="border rounded-2xl py-4 flex items-center justify-center gap-3 hover:bg-gray-100 transition">
              <img src={assets.appointments_icon} alt="" className="w-10" />
              <p className="text-center text-lg font-medium">
                {dashdata.appointments} <br /> Appointments
              </p>
            </div>
          </div>

          {/* Latest Appointments */}
          <div className="border mt-6 px-6 py-6 mx-4 sm:mx-10">
            <h1 className="text-2xl font-medium py-2">Latest Appointments</h1>
            <hr />

            <div className="flex flex-col my-3 gap-4">
              {dashdata.latestappointment.map((appointment, index) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border p-4 rounded-lg"
                  >
                    {/* Left: Doctor image + name */}
                    <div className="flex gap-4">
                      <img
                        src={appointment.doctorData.image}
                        alt=""
                        className="h-16 w-16 rounded-md object-cover"
                      />

                      <div>
                        <p className="font-medium text-xl">
                          {appointment.doctorData.name}
                        </p>
                        <p className="text-gray-600">
                          Booking on{" "}
                          <span className="font-medium">
                            {appointment.slotDate}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Status Button */}
                    <div className="mt-4 sm:mt-0">
                      {appointment.cancelled ? (
                        <p className="text-blue-500 font-medium">Cancelled</p>
                      ) : appointment.isCompleted ? (
                        <p className="text-green-500 font-medium text-lg">
                          Completed
                        </p>
                      ) : (
                        <img
                          src={assets.cancel_icon}
                          className="w-7 cursor-pointer hover:opacity-70"
                          onClick={() =>
                            cancelAppointment(
                              appointment._id,
                              appointment.slotTime
                            )
                          }
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    )
  );
};
