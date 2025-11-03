import { assets } from "../assets/frontend_assets/assets";
import { Aboutus2 } from "./Aboutus2";

export const Aboutus = () => {
  return (
    <>
      <div className="px-4 md:px-10 lg:px-20 mb-10 mt-10">
        <h1 className="text-2xl font-medium text-gray-600 text-center">
          About Us
        </h1>

        <div className="flex flex-col md:flex-row mt-10 gap-10 items-center">
          {/* Left Image */}
          <div className="w-full md:w-1/2">
            <img
              src={assets.about_image}
              alt=""
              className="w-full h-64 md:h-80 lg:h-96 object-cover rounded"
            />
          </div>

          {/* Right Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-gray-700 leading-relaxed">
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently. At Prescripto, we
              understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
              <br />
              <br />
              Prescripto is committed to excellence in healthcare technology. We
              continuously strive to enhance our platform, integrating the
              latest advancements to improve user experience and deliver
              superior service. Whether you're booking your first appointment or
              managing ongoing care, Prescripto is here to support you every
              step of the way.
              <br />
              <br />
              <span className="font-medium">Our Vision :- </span>
              <br />
              <br />
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>

        <Aboutus2 />
      </div>
    </>
  );
};
