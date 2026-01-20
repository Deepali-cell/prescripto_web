import { useContext, useEffect, useState } from "react";
import { myContext } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";

export const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(myContext);
  const navigate = useNavigate();

  const [relatedDoc, setRelatedDoc] = useState([]);

  const filterRelatedDoctors = () => {
    const docs = doctors.filter(
      (doc) => doc.speciality === speciality && doc._id !== docId
    );
    setRelatedDoc(docs);
  };

  
  useEffect(() => {
    filterRelatedDoctors();
  }, [doctors, docId, speciality]);

  return (
    <>
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-8
        "
      >
        {relatedDoc.map((doctor) => (
          <div
            key={doctor._id}
            className="
              bg-white shadow-lg rounded-lg overflow-hidden 
              hover:shadow-xl hover:scale-105 
              transition-all duration-300 cursor-pointer
            "
            onClick={() => {
              navigate(`/appointment/${doctor._id}`);
              scrollTo(0, 0);
            }}
          >
            {/* Doctor Image */}
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-56 w-full object-cover bg-blue-100"
            />

            {/* Content */}
            <div className="px-4 py-4">
              {doctor.available ? (
                <p className="text-green-600 font-semibold">Available</p>
              ) : (
                <p className="text-red-500 font-semibold">Not Available</p>
              )}

              <h2 className="text-xl font-medium mt-1">{doctor.name}</h2>
              <p className="text-gray-600 text-sm">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
