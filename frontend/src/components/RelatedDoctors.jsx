import { useContext, useEffect, useState } from "react";
import { myContext } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";

export const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(myContext);
  const navigate = useNavigate();

  const [realtedDoc, setrelatedDoc] = useState([]);

  const handlerealtedoc = () => {
    const realtedDoc = doctors.filter((doc) => doc.speciality === speciality);
    setrelatedDoc(realtedDoc);
  };
  useEffect(() => {
    handlerealtedoc();
  }, [doctors, docId, speciality]);

  return (
    <>
      {" "}
      <div className="grid gap-8 grid-cols-4 ">
        {realtedDoc.map((doctor) => {
          return (
            <>
              <div
                key={doctor.name}
                className="card bg-base-100 display-block shadow-xl rounded-md hover:scale-105 duration-2000 transition"
                onClick={() => {
                  navigate(`/appointment/${doctor._id}`);
                  scrollTo(0, 0);
                }}
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
    </>
  );
};
