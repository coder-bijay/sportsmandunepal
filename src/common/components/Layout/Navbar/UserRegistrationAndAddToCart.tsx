"use client";
import React from "react";
import { FaRegUser, FaUserTie } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { CustomModal } from "../../Modal";
import { AuthForm } from "../../AuthForm";
import { isAuthenticated } from "@/src/utils/isAuthenticated";
import Link from "next/link";
import { IProduct } from "@/src/app/(routes)/products/interface";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "@/src/utils/axiosInstance";

const fetchCartProducts = async () => {
  const { data } = await Axios.get(`cart-product/client`);
  return data;
};

export const UserRegistrationAndAddToCart = () => {
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const { authenticated, user } = isAuthenticated();

  const { data } = useQuery<{
    success: boolean;
    message: string;
    data: {
      quantity: number;
      client: string;
      product: IProduct;
    }[];
    totalCounts: number;
  }>({
    refetchOnWindowFocus: false,
    queryKey: ["cartProducts"],
    queryFn: async () => fetchCartProducts(),
    enabled: authenticated,
  });

  // total sum of all quantities
  const totalQuantity = data?.data?.length
    ? data?.data?.reduce((sum, item) => sum + Number(item.quantity), 0) ?? 0
    : null;

  return (
    <>
      <div className="flex items-center gap-6 text-xl">
        <Link href={`/cart`} className="relative pt-1">
          <FiShoppingCart className="cursor-pointer" />
          {data?.data?.length ? (
            <span className="rounded-full absolute bg-brand flex justify-center items-center text-white w-4 h-4 text-[12px] -top-2.5 -right-2">
              {totalQuantity}
            </span>
          ) : null}
        </Link>

        {authenticated ? (
          <div className="flex items-center gap-2">
            <FaUserTie className={`text-brand`} />
            <div className="text-brand pt-2 font-bold text-[14px]">
              {user ?? "-"}
            </div>

            {/* <div className="text-red-500 font-bold shadow-2xl text-sm absolute top-10 p-2 cursor-pointer bg-gray-200 rounded-md w-[120px]">
              Logout
            </div> */}
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
