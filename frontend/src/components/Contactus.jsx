import { assets } from "../assets/frontend_assets/assets";

export const Contactus = () => {
  return (
    <>
      <div className="md:px-10 mb-5 mx-20 ">
        <div>
          <h1 className="text-center font-medium text-2xl text-gray-600">
            Contact us
          </h1>
          <div className="flex gap-10 justify-center mt-10">
            <div className="left">
              <img src={assets.contact_image} alt="" className="h-[20em]" />
            </div>
            <div className="right">
              <h1 className="text-gray-600 text-xl font-medium">OUR OFFICE</h1>
              <p className="my-4">
                00000 Willms Station <br /> Suite 000, Washington, USA{" "}
              </p>
              <br />
              <p className="my-4">
                Tel: (000) 000-0000 <br />
                Email: greatstackdev@gmail.com
              </p>
              <h1 className="text-gray-600 text-xl font-medium">
                CAREERS AT PRESCRIPTO
              </h1>
              <p className="my-2">
                Learn more about our teams and job openings.
              </p>
              <button className="border border-black mt-4 px-4 py-2 hover:bg-gray-500 hover:text-white">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
