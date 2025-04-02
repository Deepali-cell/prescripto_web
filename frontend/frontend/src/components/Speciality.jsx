import { Link } from "react-router-dom";
import { assets, specialityData } from "../assets/frontend_assets/assets";

export const Speciality = () => {
  return (
    <>
      <div id="speciality" className="md:px-20  mx-4">
        <div className="flex flex-col my-10 justify-center items-center">
          <div>
            <h1 className="font-medium text-3xl my-2">Find By Speciality</h1>
          </div>
          <div>
            <p className="text-center">
              Simply browse through our extensive list of trusted doctors,{" "}
              <br /> schedule your appointment hassle-free.
            </p>
          </div>
          <div className="flex gap-4 mt-4">
            {specialityData.map((item) => {
              return (
                <>
                  <div className="flex flex-col justify-center items-center hover:translate-y-[-10px] transition-all duration-3000">
                    <Link
                      onClick={() => scrollTo(0, 0)}
                      to={`/doctors/${item.speciality}`}
                    >
                      <img className="h-20" src={item.image} alt="" />
                      <p className="text-[0.9em]">{item.speciality}</p>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
