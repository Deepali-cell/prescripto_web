import { assets } from "../assets/frontend_assets/assets";
import { Aboutus2 } from "./Aboutus2";

export const Aboutus = () => {
  return (
    <>
      <div className="md:px-10  mb-5 mx-20 ">
        <h1 className="text-2xl font-medium text-gray-600 text-center">
          About us{" "}
        </h1>
        <div className="flex mt-10">
          <div>
            <img
              src={assets.about_image}
              alt=""
              className="h-[20em] w-[90em]"
            />
          </div>
          <div className="ml-20">
            <p>
              Welcome to Prescripto, your trusted partner in managing your
              healthcare needs conveniently and efficiently.At Prescripto, we
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
