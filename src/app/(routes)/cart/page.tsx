"use client";
import { AuthForm } from "@/src/common/components/AuthForm";
import { Button } from "@/src/common/components/Button";
import Link from "next/link";
import React, { useState } from "react";
import { isAuthenticated } from "@/src/utils/isAuthenticated";
import { Axios } from "@/src/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { IProduct } from "../products/interface";
import { ProductCardForCart } from "../products/components/ProductCard";
import Alert from "@/src/common/components/Alert";
import { useDeleteRequest } from "@/src/utils/deleteRequest";

const fetchCartProducts = async () => {
  const { data } = await Axios.get(`cart-product/client`);
  return data;
};

const CartPage = () => {
  const { authenticated, token } = isAuthenticated();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState("");

  const {
    data,
    refetch,
    error: cartError,
  } = useQuery<{
    success: boolean;
    message: string;
    data: {
      _id: string;
      quantity: number;
      client: string;
      product: IProduct[];
    }[];
    totalCounts: number;
  }>({
    refetchOnWindowFocus: false,
    queryKey: ["cartProducts"],
    queryFn: async () => fetchCartProducts(),
    enabled: authenticated,
  });

  const { deleteData, loading: deleteLoading } = useDeleteRequest({
    url: "/cart-product",
    afterSuccess: () => {
      setShowDeleteModal(false);
      setSelectedCartId("");

      refetch();
    },
  });

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
        throw new Error(result.message || "Something went wrong");
      }
      console.log("Success:", result);
      refetch();
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

  if (cartError) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-[30vh]">
        <span className="text-red-400">{cartError?.message}</span>
        <Link href={`/`}>
          <Button
            className="w-[300px] h-[36px] bg-gradient-to-r from-red-50 to-green-50 cursor-pointer !bg-transparent text-[14px] !text-brand border border-gray-300"
            label="Go to home"
          />
        </Link>
      </div>
    );
  }
  if (!authenticated) {
    return (
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="w-1/2">
          <AuthForm forCart />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center py-4 w-full h-full">
        {data?.data?.length ? (
          <>
            {error && <span className="text-sm text-red-500">{error}</span>}
            <div className="flex flex-col justify-center items-center gap-4 w-full">
              {data?.data?.map((item) => (
                <ProductCardForCart
                  loading={loading}
                  key={item?.product[0]?._id}
                  productData={item?.product[0]}
                  quantity={Number(item?.quantity)}
                  onDeleteClick={() => {
                    setShowDeleteModal(true);
                    setSelectedCartId(item?._id);
                  }}
                  onQuantityChange={({ productId, quantity }) =>
                    sendRequestForAddToCart({
                      productId: productId ?? "",
                      quantity: quantity ?? 0,
                      token: token ?? "",
                    })
                  }
                />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center h-[30vh]">
            <span className="text-gray-400">
              There are no items in this cart
            </span>
            <Link href={`/`}>
              <Button
                className="w-[300px] h-[36px] bg-gradient-to-r from-red-50 to-green-50 cursor-pointer !bg-transparent text-[14px] !text-brand border border-gray-300"
                label="CONTINUE SHOPPING"
              />
            </Link>
          </div>
        )}
      </div>
      <Alert
        label="Yes"
        title="Are you sure you want to Delete ?"
        dialogMessage="Deleting this will permanently removed the selected data !"
        actionHandler={() => {
          deleteData({
            id: selectedCartId ?? "",
          });
        }}
        loading={deleteLoading}
        buttonType="Danger"
        isOpen={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default CartPage;
