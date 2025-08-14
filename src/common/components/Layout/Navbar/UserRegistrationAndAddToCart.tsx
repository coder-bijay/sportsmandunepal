"use client";
import React from "react";
import { FaRegUser, FaUserTie } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CustomModal } from "../../Modal";
import { AuthForm } from "../../AuthForm";
import { isAuthenticated } from "@/src/utils/isAuthenticated";
import Link from "next/link";

export const UserRegistrationAndAddToCart = () => {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const { authenticated, user } = isAuthenticated();
  const hasCartData = false;
  return (
    <>
      <div className="flex items-center gap-6 text-xl">
        <Link href={`/cart`} className="relative pt-1">
          <FiShoppingCart className="cursor-pointer" />
          {hasCartData && (
            <span className="rounded-full absolute bg-brand flex justify-center items-center text-white w-4 h-4 text-[12px] -top-2.5 -right-2">
              3
            </span>
          )}
        </Link>

        {authenticated ? (
          <div className="flex items-center gap-2">
            <FaUserTie className={`text-brand`} />
            <div className="text-brand pt-2 font-bold text-[14px]">
              {user ?? "-"}
            </div>
          </div>
        ) : (
          <FaRegUser
            onClick={() => setOpenLoginModal(true)}
            className={`cursor-pointer`}
          />
        )}
      </div>

      <CustomModal
        closeModal={() => setOpenLoginModal(false)}
        isOpen={openLoginModal}
        title=""
      >
        <AuthForm closeModal={() => setOpenLoginModal(false)} />
      </CustomModal>
    </>
  );
};
