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

  return (
    <>
      <div className="mb-4">
        <h2 className="font-medium text-2xl my-4">All Doctors</h2>

        {/* Responsive Grid */}
        <div
          className="grid gap-8 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4"
        >
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="shadow-lg border rounded-lg overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              {/* Doctor Image */}
              <img
                src={doctor.image}
                alt={doctor.name}
                className="h-48 w-full object-cover bg-blue-100"
              />

              {/* Card Content */}
              <div className="px-4 py-4">
                <h1 className="font-semibold text-xl">{doctor.name}</h1>
                <p className="text-gray-600">{doctor.speciality}</p>

                {/* Availability Toggle */}
                <div className="flex items-center gap-2 mt-3">
                  <input
                    type="checkbox"
                    onChange={() => changeAvailability(doctor._id)}
                    checked={doctor.available}
                    className="w-4 h-4"
                  />
                  <p className="text-sm">Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
