"use client";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Image from "next/image";
import { SearchInput } from "./SearchInput";
import { NavItems } from "./NavItems";
import Link from "next/link";

export const MobileMenu = ({
  categories,
}: {
  categories: {
    name: string;
    _id: string;
  }[];
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <button className="lg:hidden text-2xl" onClick={() => setMenuOpen(true)}>
        <HiMenuAlt3 />
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-red-500z">
          <div className="bg-white shadow-2xl h-full w-[100%] sm:w-[70%] max-w-[400px] p-4 relative">
            <div className="flex justify-between  relative items-center mb-4">
              <Link onClick={() => setMenuOpen?.(false)} href="/">
                <Image
                  src="/sportsmandu.png"
                  alt="logo"
                  width={60}
                  height={60}
                />
              </Link>
              <button
                onClick={() => setMenuOpen?.(false)}
                className="text-2xl absolute right-0 cursor-pointer -top-1 text-red-600"
              >
                <HiX />
              </button>
            </div>

            <div className="mb-4 mt-6">
              <SearchInput />
            </div>

            <nav className="flex flex-col gap-4 font-medium text-gray-800 text-lg">
              <NavItems categories={categories} setMenuOpen={setMenuOpen} />
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
