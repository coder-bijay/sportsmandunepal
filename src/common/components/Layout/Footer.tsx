import Image from "next/image";
import Link from "next/link";
import { BiHeart, BiMapPin, BiPhone } from "react-icons/bi";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-300 mt-4 md:mt-12">
      <div className="container mx-auto px-4 py-4 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-8">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image src="/sportsmandu.png" alt="logo" width={80} height={60} />
          </div>
          <p className="text-sm text-gray-600 w-full leading-6 lg:max-w-[340px]">
            Top-quality sports gear at wholesale & retail rates. Fast delivery
            across Nepal.
          </p>
          <div className="flex space-x-4 mt-4">
            {[
              {
                href: "https://www.instagram.com/sportsmandunepal?igsh=MW1jOW83ZjBibGEyOQ%3D%3D",
                icon: <FaInstagram />,
              },
              {
                href: "https://www.facebook.com/profile.php?id=100095442424712&rdid=scgcdpsN8QkUsnZg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1A8np1d5mm%2F#",
                icon: <FaFacebook />,
              },
              {
                href: "https://www.tiktok.com/@sportsmandunepal?_t=ZS-8vCVbHUr9Gs&_r=1",
                icon: <FaTiktok />,
              },
              {
                href: "https://www.daraz.com.np/shop/sportsmandu-nepal?dsource=share&laz_share_info=1777200069_100_3000_0_1777202069_null&laz_token=d8fe28cc4200272468a0a15c024f113c",
                icon: <FiShoppingCart />,
              },
            ].map(({ href, icon }, index) => (
              <div key={index}>
                <Link
                  target="_blank"
                  href={href}
                  className="text-gray-600 hover:text-gray-800 text-xl"
                >
                  {icon}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div className="px-0 lg:px-10 xl:px-20">
          <h3 className="text-md font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-sm flex flex-col text-blue-500 md:text-gray-700">
            <Link href="/products/new-arrivals" className="hover:text-blue-500">
              New Arrivals
            </Link>
            <Link
              href="/products/featured-products"
              className="hover:text-blue-500"
            >
              Featured Products
            </Link>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-md font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-center space-x-2">
              <BiMapPin className="w-4 h-4" />
              <span>Bhaktapur, Nepal</span>
            </li>
            <li className="flex items-center space-x-2">
              <BiPhone className="w-4 h-4" />
              <span>+977 9843390410</span>
            </li>
            <li className="flex items-center space-x-2">
              <MdEmail className="w-4 h-4" />
              <span>bimeshrajbanshi@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <BiHeart className="w-4 h-4" />
              <span>Social Media</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom copyright */}
      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-300">
        Copyright © {new Date().getFullYear()} Sports Mandu Nepal
      </div>
    </footer>
  );
};

export default Footer;
