import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-r from-purple-500 to-pink-500 px-4">
      <div className="lg:w-1/2 w-full rounded-lg p-8 text-center">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white drop-shadow-lg">
          Sports Mandu Nepal
        </h1>
        <p className="mt-3 text-sm md:text-base lg:text-lg text-white/80">
          All sports solutions in one place
        </p>
        <p className="mt-3 text-sm lg:text-base text-white/80">
          Top-quality sports gear at wholesale & retail rates.
        </p>
        <p className="mt-5 text-sm md:text-base lg:text-lg text-yellow-400 animate-pulse font-semibold uppercase">
          Coming Soon...
        </p>

        {/* Social Media Links */}
        <div className="mt-6 flex justify-center space-x-4">
          <Link href="#" className="text-white hover:text-gray-300 transition">
            <FaInstagram />
          </Link>
          <Link href="#" className="text-white hover:text-gray-300 transition">
            <FaFacebook />
          </Link>
          <Link href="#" className="text-white hover:text-gray-300 transition">
            <FaWhatsapp />
          </Link>
        </div>
      </div>
    </div>
  );
}
