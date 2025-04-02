import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

export const DoctorsList = () => {
  const { doctors, atoken, getalldoctors, changeAvailability } =
    useContext(AdminContext);
  useEffect(() => {
    if (atoken) {
      getalldoctors();
    }
  }, [atoken]);
  console.log(doctors);
  return (
    <>
      <div className="mb-4">
        <h2 className="font-medium text-2xl my-4">All doctors</h2>
        <div className="grid gap-8 grid-cols-4 ">
          {doctors.map((doctor) => (
            <>
              <div
                key={doctor.id}
                className="card bg-base-100 display-block shadow-xl rounded-md hover:scale-105 duration-2000 transition"
              >
                <div>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="h-[13em] w-full bg-blue-100 rounded-md"
                  />
                </div>
                <div className="px-4 py-4">
                  <h1 className="font-medium text-xl">{doctor.name}</h1>
                  <p className="text-[1em]">{doctor.speciality}</p>
                  <div className="flex gap-2 mt-2">
                    {" "}
                    <input
                      onChange={() => changeAvailability(doctor._id)}
                      type="checkbox"
                      checked={doctor.available}
                    />{" "}
                    <p>Available</p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
