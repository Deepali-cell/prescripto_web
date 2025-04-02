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
        <div className="w-full overflow-hidden">
          <div className="flex gap-10 mx-10">
            <div className="card border rounded-full text-neutral-content mx-2 w-96 py-4 hover:bg-zinc-100">
              <div className="card-body items-center text-center flex gap-2 item-center justify-center">
                <img src={assets.doctor_icon} alt="" />
                <p>
                  {dashdata.doctors} <br /> Doctors
                </p>
              </div>
            </div>
            <div className="card border text-neutral-content mx-2  py-4 rounded-full w-96 hover:bg-zinc-100">
              <div className="card-body items-center text-center flex gap-2 item-center justify-center">
                <img src={assets.patients_icon} alt="" />
                <p>
                  {dashdata.users} <br /> Patient
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
              {dashdata.latestappointment.map((appointment, index) => {
                return (
                  <>
                    <div
                      className="flex gap-4 my-2 border py-4 px-4 inline-block"
                      key={index}
                    >
                      <div>
                        <img
                          src={appointment.doctorData.image}
                          alt=""
                          className="h-[4em] rounded-md"
                        />
                      </div>
                      <div className="flex items-center gap-[33em]">
                        <div>
                          <p className="font-medium text-xl">
                            {appointment.doctorData.name}
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
                            <p className="text-green-500 font-medium text-xl">
                              completed
                            </p>
                          ) : (
                            <img
                              src={assets.cancel_icon}
                              onClick={() =>
                                cancelAppointment(
                                  appointment._id,
                                  appointment.slotTime
                                )
                              }
                            ></img>
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
