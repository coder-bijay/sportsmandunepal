"use client";

import Link from "next/link";
import { CategoryDropdown } from "./CategoryDropdown";
import { Dispatch, SetStateAction } from "react";

export const NavItems = ({
  categories,
  setMenuOpen,
}: {
  setMenuOpen?: Dispatch<SetStateAction<boolean>>;
  categories: {
    name: string;
    _id: string;
  }[];
}) => {
  return (
    <>
      <Link
        onClick={() => setMenuOpen?.(false)}
        href="/"
        className="cursor-pointer"
      >
        Home
      </Link>
      <Link
        onClick={() => setMenuOpen?.(false)}
        href="/products"
        className="cursor-pointer"
      >
        All Products
      </Link>
      <Link
        onClick={() => setMenuOpen?.(false)}
        href="/products/new-arrivals"
        className="cursor-pointer"
      >
        New Arrivals
      </Link>
      <Link
        onClick={() => setMenuOpen?.(false)}
        href="/products/featured-products"
        className="cursor-pointer"
      >
        Featured Products
      </Link>
      <div className="cursor-pointer flex items-center gap-2">
        <CategoryDropdown
          setMenuOpen={setMenuOpen}
          categories={categories || []}
        />
      </div>
    </>
  );
};
