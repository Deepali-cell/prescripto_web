import { useContext, useEffect, useState } from "react";
import { myContext } from "../context/StateProvider";
import { useNavigate, useParams } from "react-router-dom";

export const AllDoctors = () => {
  const { speciality } = useParams();
  const [filterdoctor, setfilterdoctor] = useState([]);
  const { doctors } = useContext(myContext);
  const navigate = useNavigate();

  const handlefilterdoctor = () => {
    if (speciality) {
      const doctor = doctors.filter(
        (doctor) => doctor.speciality === speciality
      );
      setfilterdoctor(doctor);
    } else {
      setfilterdoctor(doctors);
    }
  };

  useEffect(() => {
    handlefilterdoctor();
  }, [doctors, speciality]);

  return (
    <>
      <div className="md:px-20 mx-4 flex">
        <div className="left pr-10">
          <div>
            <h1 className="font-medium mb-4">
              Browse through the doctors specialist.
            </h1>
            <div>
              <ul>
                <li
                  className={`border text-left py-1 cursor-pointer px-3 rounded-lg my-4 ${
                    speciality === "General physician"
                      ? "bg-indigo-100 text-black"
                      : ""
                  } `}
                  onClick={() =>
                    speciality === "General physician"
                      ? navigate("/doctors")
                      : navigate("/doctors/General physician")
                  }
                >
                  General physician
                </li>
                <li
                  className={`border text-left py-1 cursor-pointer px-3 rounded-lg my-4 ${
                    speciality === "Gynecologist"
                      ? "bg-indigo-100 text-black"
                      : ""
                  } `}
                  onClick={() =>
                    speciality === "Gynecologist"
                      ? navigate("/doctors")
                      : navigate("/doctors/Gynecologist")
                  }
                >
                  Gynecologist
                </li>
                <li
                  className={`border text-left py-1 cursor-pointer px-3 rounded-lg my-4 ${
                    speciality === "Dermatologist"
                      ? "bg-indigo-100 text-black"
                      : ""
                  } `}
                  onClick={() =>
                    speciality === "Dermatologist"
                      ? navigate("/doctors")
                      : navigate("/doctors/Dermatologist")
                  }
                >
                  Dermatologist
                </li>
                <li
                  className={`border text-left py-1 cursor-pointer px-3 rounded-lg my-4 ${
                    speciality === "Pediatricians"
                      ? "bg-indigo-100 text-black"
                      : ""
                  } `}
                  onClick={() =>
                    speciality === "Pediatricians"
                      ? navigate("/doctors")
                      : navigate("/doctors/Pediatricians")
                  }
                >
                  Pediatricians
                </li>
                <li
                  className={`border text-left py-1 cursor-pointer px-3 rounded-lg my-4 ${
                    speciality === "Neurologist"
                      ? "bg-indigo-100 text-black"
                      : ""
                  } `}
                  onClick={() =>
                    speciality === "Neurologist"
                      ? navigate("/doctors")
                      : navigate("/doctors/Neurologist")
                  }
                >
                  Neurologist
                </li>
                <li
                  className={`border text-left py-1 cursor-pointer px-3 rounded-lg my-4 ${
                    speciality === "Gastroenterologist"
                      ? "bg-indigo-100 text-black"
                      : ""
                  } `}
                  onClick={() =>
                    speciality === "Gastroenterologist"
                      ? navigate("/doctors")
                      : navigate("/doctors/Gastroenterologist")
                  }
                >
                  Gastroenterologist
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className=" right grid gap-8 grid-cols-4 ">
          {" "}
          {filterdoctor.map((doctor) => {
            return (
              <>
                <div
                  className="card bg-base-100 display-block shadow-xl rounded-md hover:scale-105 duration-2000 transition"
                  onClick={() => navigate(`/appointment/${doctor._id}`)}
                >
                  <div>
                    <img
                      src={doctor.image}
                      alt=""
                      className="h-[15em] w-full bg-blue-100 rounded-md"
                    />
                  </div>
                  <div className="px-4 py-4">
                    {doctor.available ? (
                      <h1 className="text-green-400 font-bold"> Available</h1>
                    ) : (
                      <h1 className="text-red-400 font-bold">Not Available</h1>
                    )}
                    <h1 className="font-medium text-xl">{doctor.name}</h1>
                    <p className="text-[1em]">{doctor.speciality}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
