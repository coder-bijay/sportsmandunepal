"use client";

import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import { SelectDropdown } from "./SelectDropdown";
import Link from "next/link";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  return (
    <div className="fixed w-screen top-0 z-50">
      <div className="w-full h-[60px] bg-white flex items-center justify-between px-4 lg:px-10 shadow-lg">
        <div className="hidden lg:flex items-center border border-white hover:border-gray-300 min-w-[300px] rounded-md">
          <input
            type="text"
            placeholder="Search for products..."
            className="flex-1 px-3 py-2 outline-none"
          />
          <button className="px-3 text-blue-400">
            <FiSearch />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={30} height={30} />
        </div>

        <div className="flex items-center gap-6 min-w-[120px]">
          <div className="flex items-center gap-6 text-xl">
            <FiShoppingCart className="cursor-pointer" />
            <FaRegUser className="cursor-pointer" />
          </div>

          <button
            className="lg:hidden text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex bg-blue-600 w-full justify-center h-[48px]">
        <div className="w-full max-w-[1920px] h-full">
          <div className="container mx-auto flex gap-8 xl:gap-10 h-full text-md items-center justify-center font-semibold text-white">
            <Link href="/" className="cursor-pointer">
              Home
            </Link>
            <Link href="/products" className="cursor-pointer">
              All Products
            </Link>
            <Link href="/products/new-arrivals" className="cursor-pointer">
              New Arrivals
            </Link>
            <Link href="/products/featured-products" className="cursor-pointer">
              Featured Products
            </Link>
            <div className="cursor-pointer flex items-center gap-1">
              <SelectDropdown
                label="Shop By Category"
                options={[
                  "Shin Pads",
                  "Mug",
                  "Skipping Rope",
                  "Compression Inner",
                  "Nepal Football Jersey's",
                  "Net",
                  "Muscles Support",
                ]}
                className="font-medium lg:font-semibold"
                selected={selectedItem}
                onSelect={(val) => setSelectedItem(val)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="bg-white shadow-2xl h-full w-[99%] sm:w-[70%] max-w-[400px] p-4 relative">
            {/* Top Bar Inside Menu */}

            <div className="flex justify-between items-center mb-4">
              <Image src="/logo.png" alt="logo" width={30} height={30} />
              <button
                onClick={() => setMenuOpen(false)}
                className="text-2xl text-black"
              >
                <HiX />
              </button>
            </div>

            {/* Search */}
            <div className="flex items-center border border-gray-300 rounded-md mb-4 mt-6">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 px-3 py-2 outline-none"
              />
              <button className="px-3 text-blue-400">
                <FiSearch />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex flex-col gap-4 font-medium text-gray-800 text-lg">
              <Link href="/" className="cursor-pointer">
                Home
              </Link>
              <Link href="/products" className="cursor-pointer">
                All Products
              </Link>
              <Link href="/products/new-arrivals" className="cursor-pointer">
                New Arrivals
              </Link>
              <Link
                href="/products/featured-products"
                className="cursor-pointer"
              >
                Featured Products
              </Link>
              <div className="cursor-pointer flex items-center gap-2">
                <SelectDropdown
                  label="Shop By Category"
                  options={[
                    "Shin Pads",
                    "Mug",
                    "Skipping Rope",
                    "Compression Inner",
                    "Nepal Football Jersey's",
                    "Net",
                    "Muscles Support",
                  ]}
                  selected={selectedItem}
                  className="font-medium lg:text-white lg:font-semibold"
                  onSelect={(val) => setSelectedItem(val)}
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
