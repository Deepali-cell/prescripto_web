import { assets } from "../assets/frontend_assets/assets";

export const Header = () => {
  return (
    <>
      <div className="md:px-20  mx-4">
        <div className="flex gap-4 items-center justify-center border bg-blue-500 px-10 rounded-md md:mx-20 md:pt-10">
          <div className="left flex flex-col justify-center">
            <div className="div1">
              <h1 className="text-white text-[1.3em] py-4 md:text-[3em] font-bold ">
                Book Appointment With Trusted Doctors
              </h1>
            </div>
            <div className="flex gap-4 md:flex-row flex-col">
              <img
                className="h-[10em] w-[10em] md:h-10 w-40"
                src={assets.group_profiles}
                alt=""
              />
              <p className="text-white md:text[0.2em] text-[0.8em]">
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
              </p>
            </div>
            <div>
              <button className="bg-white md:py-2 rounded-full md:px-4 md:my-10 my-6 px-3 py-1 hover:scale-105 duration-2000 transition-all">
                <a href="#speciality"> Book Appointment</a>
              </button>
            </div>
          </div>
          <div className="right">
            <img
              className="h-[20em] w-[50em] md:normal"
              src={assets.header_img}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
