"use client";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CustomModal } from "../../Modal";
import AuthForm from "../../AuthForm";

export const UserRegistrationAndAddToCart = () => {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  return (
    <>
      <div className="flex items-center gap-6 text-xl">
        <FiShoppingCart className="cursor-pointer" />
        <FaRegUser
          onClick={() => setOpenLoginModal(true)}
          className="cursor-pointer"
        />
      </div>

      <CustomModal
        closeModal={() => setOpenLoginModal(false)}
        isOpen={openLoginModal}
        title=""
      >
        <AuthForm />
      </CustomModal>
    </>
  );
};
