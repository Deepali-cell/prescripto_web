import { assets } from "../assets/frontend_assets/assets";

export const Footer = () => {
  return (
    <>
      <div className="mt-40">
        <footer className="footer text-base-content p-10 px-40">
          <div className="flex justify-center items-center flex-col">
            <div className="flex  gap-40">
              <p className="text-left">
                <img src={assets.logo} alt="" /> Lorem Ipsum is simply dummy
                text of the printing and typesetting
                <br />
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever
                <br />
                since the 1500s, when an unknown printer took a galley of type
                and
                <br />
                scrambled it to make a type specimen book.
              </p>
              <nav className="flex flex-col">
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">Home</a>
                <a className="link link-hover">About-us</a>
                <a className="link link-hover">Delivery</a>
                <a className="link link-hover">Privacy policy</a>
              </nav>
              <nav className="flex flex-col">
                <h6 className="footer-title">Get in Touch</h6>
                <a className="link link-hover">+0-000-000-000</a>
                <a className="link link-hover">greatstackdev@gmail.com</a>
              </nav>
            </div>
            <div className="mt-20 text-center border-t-[0.01em] w-full border-black">
              <p className="pt-4">
                Copyright © {new Date().getFullYear()} - @ Greatstack.dev - All
                Right Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
