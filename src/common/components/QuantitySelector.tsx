"use client";
import { IProduct } from "@/src/app/(routes)/products/interface";
import { isAuthenticated } from "@/src/utils/isAuthenticated";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { CustomModal } from "./Modal";
import { AuthForm } from "./AuthForm";
// import { useCartProducts } from "@/src/libs/useCartProducts";

interface QuantitySelectorProps {
  productData?: IProduct;
}

export const QuantitySelectorAndCart: React.FC<QuantitySelectorProps> = ({
  productData,
}) => {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const { authenticated, token } = isAuthenticated();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // const { refetch } = useCartProducts();

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

  const sendRequestForAddToCart = async ({
    productId,
    token,
    quantity,
  }: {
    productId: string;
    token: string;
    quantity: number;
  }) => {
    try {
      setError("");
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/cart-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quantity,
            product: productId,
          }),
        }
      );
      const result = await res.json();

      if (!res.ok) {
        // refetch();
        throw new Error(result.message || "Something went wrong");
      }
      console.log("Success:", result);

      return result;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <span className="text-sm text-red-500">{error}</span>}
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
              : sendRequestForAddToCart({
                  productId: productData?._id ?? "",
                  quantity: quantity ?? 1,
                  token: token ?? "",
                })
          }
          className="bg-brand w-[140px] cursor-pointer text-white px-4 py-1 rounded disabled:opacity-50"
          disabled={!productData?.stock || loading}
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
