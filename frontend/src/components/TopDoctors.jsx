import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../context/StateProvider";

export const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(myContext);

  return (
    <div className="px-4 md:px-20 mt-24">
      <div className="text-center">
        <h1 className="font-semibold text-2xl md:text-3xl mb-2">Top Doctors</h1>
        <p className="text-gray-600 text-sm md:text-base">
          Browse through our list of highly trusted and experienced doctors.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {doctors.slice(0, 10).map((doctor) => (
          <div
            key={doctor._id}
            onClick={() => navigate(`/appointment/${doctor._id}`)}
            className="cursor-pointer bg-white rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-60 w-full object-cover rounded-t-xl bg-blue-50"
            />

            <div className="px-4 py-4">
              {doctor.available ? (
                <p className="text-green-500 font-semibold">Available</p>
              ) : (
                <p className="text-red-500 font-semibold">Not Available</p>
              )}

              <h2 className="text-lg font-semibold mt-1">{doctor.name}</h2>
              <p className="text-sm text-gray-600">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <div className="flex justify-center items-center my-16">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-gray-400 text-white text-lg px-10 py-2 rounded-full hover:opacity-90 transition-all"
        >
          More
        </button>
      </div>
    </div>
  );
};
