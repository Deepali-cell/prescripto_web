import { assets } from "../assets/frontend_assets/assets";

export const Contactus = () => {
  return (
    <>
      <div className="px-4 md:px-10 mt-10 mb-10">
        <h1 className="text-center font-medium text-2xl text-gray-600">
          Contact Us
        </h1>

        <div
          className="
          flex flex-col md:flex-row 
          gap-10 justify-center items-center 
          mt-10
        "
        >
          {/* Left Image */}
          <div className="left">
            <img
              src={assets.contact_image}
              alt="contact"
              className="h-60 md:h-80 object-cover"
            />
          </div>

          {/* Right Content */}
          <div className="right text-center md:text-left max-w-md">
            <h1 className="text-gray-600 text-xl font-medium">OUR OFFICE</h1>

            <p className="my-4">
              00000 Willms Station <br /> Suite 000, Washington, USA
            </p>

            <p className="my-4">
              Tel: (000) 000-0000 <br />
              Email: greatstackdev@gmail.com
            </p>

            <h1 className="text-gray-600 text-xl font-medium mt-6">
              CAREERS AT PRESCRIPTO
            </h1>

            <p className="my-2">Learn more about our teams and job openings.</p>

            <button
              className="
              border border-black 
              mt-4 px-6 py-2 
              hover:bg-gray-600 hover:text-white
              transition
            "
            >
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
