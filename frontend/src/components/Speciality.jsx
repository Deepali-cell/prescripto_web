import { Link } from "react-router-dom";
import { assets, specialityData } from "../assets/frontend_assets/assets";

export const Speciality = () => {
  return (
    <div id="speciality" className="px-4 md:px-20 my-12">
      <div className="flex flex-col justify-center items-center text-center">
        {/* Heading */}
        <h1 className="font-semibold text-2xl md:text-3xl mb-2">
          Find By Speciality
        </h1>

        {/* Sub Text */}
        <p className="text-gray-600 text-sm md:text-base max-w-xl">
          Explore our wide list of medical specialists and easily book
          appointments with trusted doctors near you.
        </p>

        {/* Grid Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
          {specialityData.map((item, index) => (
            <Link
              key={index}
              onClick={() => scrollTo(0, 0)}
              to={`/doctors/${item.speciality}`}
              className="flex flex-col justify-center items-center p-3 rounded-xl hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <img
                className="h-20 w-20 object-contain"
                src={item.image}
                alt={item.speciality}
              />
              <p className="text-sm mt-2 font-medium">{item.speciality}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
