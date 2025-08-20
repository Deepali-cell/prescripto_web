import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../context/StateProvider";

export const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(myContext);
  return (
    <>
      <div className="md:px-20  mx-4 mt-40">
        <div>
          <div className="text-center ">
            <h1 className="font-medium text-3xl my-2">Top Doctors</h1>
            <p className="mb-10">
              Simply browse through our extensive list of trusted <br />
              doctors.
            </p>
          </div>
          <div className="grid gap-8 grid-cols-4 ">
            {doctors.slice(0, 10).map((doctor) => {
              return (
                <>
                  <div
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                    className="card bg-base-100 display-block shadow-xl rounded-md hover:scale-105 duration-2000 transition"
                    key={doctor._id}
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
                        <h1 className="text-red-400 font-bold">
                          Not Available
                        </h1>
                      )}
                      <h1 className="font-medium text-xl">{doctor.name}</h1>
                      <p className="text-[1em]">{doctor.speciality}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div className="flex justify-center items-center my-20">
            <button
              onClick={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
              className="bg-gray-400 textl-2xl px-10 py-2 rounded-full "
            >
              More
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
