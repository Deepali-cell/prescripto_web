import { assets } from "../assets/frontend_assets/assets";

export const Footer = () => {
  return (
    <>
      <div className="mt-20">
        <footer className="footer text-base-content p-10 md:px-20 lg:px-40">
          <div className="flex flex-col items-center">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 lg:gap-40 w-full">
              {/* Column 1 */}
              <div className="text-left max-w-sm">
                <img src={assets.logo} alt="logo" className="w-24 mb-4" />
                <p className="leading-relaxed text-sm md:text-base">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>
              </div>

              {/* Column 2 */}
              <nav className="flex flex-col">
                <h6 className="footer-title text-lg font-semibold mb-3">
                  Company
                </h6>
                <a className="link link-hover">Home</a>
                <a className="link link-hover">About-us</a>
                <a className="link link-hover">Delivery</a>
                <a className="link link-hover">Privacy policy</a>
              </nav>

              {/* Column 3 */}
              <nav className="flex flex-col">
                <h6 className="footer-title text-lg font-semibold mb-3">
                  Get in Touch
                </h6>
                <a className="link link-hover">+0-000-000-000</a>
                <a className="link link-hover">greatstackdev@gmail.com</a>
              </nav>
            </div>

            {/* Bottom Section */}
            <div className="mt-10 text-center border-t w-full border-black/20">
              <p className="pt-4 text-sm md:text-base">
                Copyright © {new Date().getFullYear()} - @ Greatstack.dev - All
                Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
