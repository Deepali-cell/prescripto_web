import { assets } from "../assets/frontend_assets/assets";

export const Banner = () => {
  return (
    <div className="px-4 md:px-20 my-14">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-blue-500 border px-6 md:px-12 py-10 rounded-2xl">
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center text-center md:text-left max-w-lg">
          <h1 className="text-white text-[1.6em] md:text-[3em] font-bold leading-tight py-6">
            Book Appointment With 100+ Trusted Doctors
          </h1>

          <button className="bg-white text-blue-600 font-semibold rounded-full px-5 py-2 mt-4 md:mt-8 hover:scale-105 transition-all duration-300 mx-auto md:mx-0">
            <a href="#speciality">Create Account</a>
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex justify-center mb-8 md:mb-0">
          <img
            className="w-full max-w-[350px] md:max-w-[450px] object-contain"
            src={assets.appointment_img}
            alt="Appointment"
          />
        </div>
      </div>
    </div>
  );
};
