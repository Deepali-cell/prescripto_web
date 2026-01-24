import { useContext, useEffect, useState } from "react";
import { myContext } from "../context/StateProvider";
import { useNavigate, useParams } from "react-router-dom";
import doctorIcon from "../assets/frontend_assets/doctor_icon.png";

export const AllDoctors = () => {
  const { speciality } = useParams();
  const [filterdoctor, setfilterdoctor] = useState([]);
  const { doctors, loadingDoctors } = useContext(myContext);

  const navigate = useNavigate();

  const handlefilterdoctor = () => {
    if (speciality) {
      const doctor = doctors.filter(
        (doctor) => doctor.speciality === speciality,
      );
      setfilterdoctor(doctor);
    } else {
      setfilterdoctor(doctors);
    }
  };

  useEffect(() => {
    handlefilterdoctor();
  }, [doctors, speciality]);

  const specialties = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];
  if (loadingDoctors) {
    return (
      <div className="px-4 md:px-20 mt-24">
        <p className="text-center text-gray-500">Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-20 mt-10">
      {/* ---- FILTER SECTION ---- */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* LEFT SIDE FILTER */}
        <div className="md:w-1/4">
          <h1 className="font-semibold text-lg mb-4">
            Browse Doctors by Speciality
          </h1>

          <ul className="flex md:flex-col flex-wrap gap-3 md:gap-0">
            {specialties.map((item) => (
              <li
                key={item}
                className={`border py-1 px-3 rounded-lg cursor-pointer text-sm md:text-base ${
                  speciality === item ? "bg-indigo-100" : ""
                }`}
                onClick={() =>
                  speciality === item
                    ? navigate("/doctors")
                    : navigate(`/doctors/${item}`)
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- DOCTORS LIST SECTION ---- */}
        <div className="md:w-3/4 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filterdoctor.map((doctor) => (
              <div
                key={doctor._id}
                onClick={() => navigate(`/appointment/${doctor._id}`)}
                className="cursor-pointer bg-white rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <img
                  src={doctor.image || doctorIcon}
                  alt={doctor.name}
                  className="h-60 w-full object-cover bg-blue-50 rounded-t-xl"
                />

                <div className="px-4 py-4">
                  {doctor.available ? (
                    <p className="text-green-500 font-semibold">Available</p>
                  ) : (
                    <p className="text-red-500 font-semibold">Not Available</p>
                  )}

                  <h1 className="font-semibold text-lg">{doctor.name}</h1>
                  <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
