import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/admin_assets/assets";

export const DoctorDashboard = () => {
  const {
    getdashdata,
    dashdata,
    doctortoken,
    setdashdata,
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
        <div className="w-full overflow-hidden">
          <div className="flex gap-10 mx-10">
            <div className="card border rounded-full text-neutral-content mx-2 w-96 py-4 hover:bg-zinc-100">
              <div className="card-body items-center text-center flex gap-2 item-center justify-center">
                <img src={assets.earning_icon} alt="" />
                <p>
                  {dashdata.earning} <br /> earning
                </p>
              </div>
            </div>
            <div className="card border text-neutral-content mx-2  py-4 rounded-full w-96 hover:bg-zinc-100">
              <div className="card-body items-center text-center flex gap-2 item-center justify-center">
                <img src={assets.patients_icon} alt="" />
                <p>
                  {dashdata.patients} <br /> Patient
                </p>
              </div>
            </div>
            <div className="card border text-neutral-content mr-4 rounded-full py-4  w-96 hover:bg-zinc-100">
              <div className="card-body items-center text-center flex gap-2 item-center justify-center">
                <img src={assets.appointments_icon} alt="" />
                <p>
                  {dashdata.appointments} <br /> Appointments
                </p>
              </div>
            </div>
          </div>
          <div className="border mt-4 px-10 py-6 mx-20">
            <h1 className="text-2xl font-medium py-2">Latest Appointments</h1>
            <hr />
            <div className="flex flex-col my-2">
              {dashdata.latestappointments.map((appointment, index) => {
                return (
                  <>
                    <div
                      className="flex gap-4 my-2 border py-4 px-4 inline-block"
                      key={index}
                    >
                      <div>
                        <img
                          src={appointment.userData.image}
                          alt=""
                          className="h-[4em] rounded-md"
                        />
                      </div>
                      <div className="flex items-center gap-[33em]">
                        <div>
                          <p className="font-medium text-xl">
                            {appointment.userData.name}
                          </p>
                          <p>
                            Booking on <span>{appointment.slotDate}</span>{" "}
                          </p>
                        </div>
                        <div>
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
                                onClick={() =>
                                  cancelAppointment(appointment._id)
                                }
                                alt="Cancel"
                                className="cursor-pointer"
                              />
                              <img
                                src={assets.tick_icon}
                                onClick={() =>
                                  completeAppointment(appointment._id)
                                }
                                alt="Complete"
                                className="cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </>
    )
  );
};
