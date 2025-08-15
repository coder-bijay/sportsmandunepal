"use client";
import { IProduct } from "@/src/app/(routes)/products/interface";
import { isAuthenticated } from "@/src/utils/isAuthenticated";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CustomModal } from "./Modal";
import { AuthForm } from "./AuthForm";

interface QuantitySelectorProps {
  productData: IProduct;
}

export const QuantitySelectorAndCart: React.FC<QuantitySelectorProps> = ({
  productData,
}) => {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const { authenticated } = isAuthenticated();

  const [quantity, setQuantity] = useState(1);
  const min = 1;
  const max = 10;

  const handleDecrease = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          {/* Decrease Button */}
          <button
            onClick={handleDecrease}
            disabled={quantity === min}
            className={`p-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <BiMinus className="w-4 h-4" />
          </button>

          {/* Quantity Display */}
          <span className="p-2 border border-gray-300 rounded-md min-w-[40px] text-center">
            {quantity}
          </span>

          {/* Increase Button */}
          <button
            onClick={handleIncrease}
            disabled={quantity === max}
            className={`p-2 rounded-md cursor-pointer border border-gray-300 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <BiPlus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() =>
            !authenticated
              ? setOpenLoginModal(true)
              : alert("add to cart flow is pending...")
          }
          className="bg-brand w-[140px] cursor-pointer text-white px-4 py-1 rounded disabled:opacity-50"
          disabled={!productData.stock}
        >
          Add to cart
        </button>
      </div>
      <CustomModal
        closeModal={() => setOpenLoginModal(false)}
        isOpen={openLoginModal}
        title=""
      >
        <AuthForm
          productId={productData?._id}
          quantity={quantity}
          addToCart={true}
          closeModal={() => setOpenLoginModal(false)}
        />
      </CustomModal>
    </>
  );
};
