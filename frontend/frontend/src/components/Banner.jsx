import { assets } from "../assets/frontend_assets/assets";

export const Banner = () => {
  return (
    <>
      <div className="md:px-20  mx-4">
        <div className="flex gap-4 items-center justify-center border bg-blue-500 px-10 rounded-md md:mx-20 md:pt-10">
          <div className="left flex flex-col justify-center">
            <div className="div1">
              <h1 className="text-white text-[1.3em]  md:text-[3em] font-bold py-10">
                Book Appointment With 100+ Trusted Doctors
              </h1>
            </div>
            <div>
              <button className="bg-white md:py-2 rounded-full md:px-4 md:my-10 my-6 px-3 py-1 hover:scale-105 duration-2000 transition-all">
                <a href="#speciality">Create Account</a>
              </button>
            </div>
          </div>
          <div className="right">
            <img className="md:normal" src={assets.appointment_img} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
