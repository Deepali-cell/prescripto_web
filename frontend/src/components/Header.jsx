import { assets } from "../assets/frontend_assets/assets";

export const Header = () => {
  return (
    <div className="px-4 md:px-20 mt-6">
      <div className="flex flex-col md:flex-row items-center justify-between bg-blue-500 border px-6 md:px-12 py-8 rounded-2xl">
        {/* LEFT SECTION */}
        <div className="flex flex-col justify-center text-center md:text-left max-w-lg">
          <h1 className="text-white text-[1.8em] md:text-[3em] font-bold leading-tight">
            Book Appointment With Trusted Doctors
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
            <img
              className="h-24 w-24 md:h-16 md:w-16 object-cover"
              src={assets.group_profiles}
              alt="Profiles"
            />
            <p className="text-white text-sm md:text-base">
              Simply browse through our extensive list of trusted doctors and
              schedule your appointment hassle-free.
            </p>
          </div>

          <button className="bg-white text-blue-600 font-medium rounded-full px-5 py-2 mt-6 md:mt-10 hover:scale-[1.05] transition-all duration-300 mx-auto md:mx-0">
            <a href="#speciality">Book Appointment</a>
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="mt-8 md:mt-0 flex justify-center">
          <img
            className="w-full max-w-[400px] md:max-w-[500px] object-contain"
            src={assets.header_img}
            alt="Doctor Header"
          />
        </div>
      </div>
    </div>
  );
};
