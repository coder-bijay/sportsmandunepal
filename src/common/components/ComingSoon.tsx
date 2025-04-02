"use client";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { WiStars } from "react-icons/wi";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";

export default function ComingSoon() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2">
      <div className="relative flex flex-col gap-2 items-center justify-center min-h-screen w-full px-4 bg-black overflow-hidden">
        {/* Floating Stars in Background */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 0.5, y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="absolute flex gap-4 text-blue-700 text-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <FaStar className="text-yellow-400 z-50" />
          </motion.div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-sm md:text-base lg:text-lg text-white"
        >
          All sports solutions in one place
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sm lg:text-base text-white"
        >
          Top-quality sports gear at wholesale & retail rates.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full rounded-lg px-10 py-8 flex flex-col gap-4 justify-center items-center shadow-lg relative z-10"
        >
          <div className="flex flex-col gap-6 justify-center items-center rounded-full shadow-2xl">
            {/* <Image
              src={`/logo.jpg`}
              height={60}
              width={200}
              className="h-full w-[200px]"
              alt="logo"
            /> */}

            <span className="text-xl lg:text-2xl xl:text-3xl font-bold text-white">
              Sports Mandu Nepal
            </span>

            <motion.p
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-base italic md:text-lg animate-bounce lg:text-xl font-semibold uppercase 
               bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              STAY TUNED!
            </motion.p>
          </div>

          {/* Social Media Links */}
          <div className="mt-6 flex justify-center space-x-6">
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
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  target="_blank"
                  href={href}
                  className="text-white text-xl"
                >
                  {icon}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center text-white text-sm md:text-base relative z-10"
        >
          @ sportsmandunepal
        </motion.div>
      </div>

      <div className="relative">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 0.5, y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="absolute flex gap-4 text-blue-700 text-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            <WiStars className="text-green-800 z-50" />
          </motion.div>
        ))}
        <Image
          src={`/coming-soon.jpg`}
          height={500}
          width={500}
          className="h-[100vh] w-full"
          alt="coming-soon"
        />
      </div>
    </div>
  );
}
