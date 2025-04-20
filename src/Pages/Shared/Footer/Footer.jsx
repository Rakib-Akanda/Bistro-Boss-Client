import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="">
      {/* main footer */}
      <div className="md:flex">
        <div className="w-full md:w-1/2 bg-[#1F2937] p-8 md:p-12">
          <div className=" text-white flex flex-col items-center text-center">
            <p className="mb-3 md:mb-6 font-medium text-3xl md:text-4xl">
              CONTACT US
            </p>
            <ul className="space-y-2 ">
              <li>123 ABS Street, Uni 21, Bangladesh</li>
              <li>+88 123456789</li>
              <li>Mon - Fri: 08:00 - 22:00 </li>
              <li>Sat - Sun: 10:00 - 23:00</li>
            </ul>
          </div>
        </div>
        {/* Social Media */}
        <div className="w-full md:w-1/2 bg-[#111827] p-8 md:p-12">
          <div className=" text-white flex flex-col items-center text-center">
            <p className="mb-3 md:mb-6 font-medium text-3xl md:text-4xl">
              Follow US
            </p>
            <p className="mb-3 md:mb-6">Join us on social media</p>
            <div className=" flex space-x-5 ">
              <a>
                <FaFacebookF className="text-3xl" />
              </a>
              <a>
                <FaInstagram className="text-3xl" />
              </a>
              <a>
                <FaTwitter className="text-3xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="footer-center bg-black text-white p-3 md:p-4">
        <div>
          <p className="font-inter font-medium text-sm md:text-xl ">
            Copyright © {new Date().getFullYear()} - All right reserved by
            Bistro Boss
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
