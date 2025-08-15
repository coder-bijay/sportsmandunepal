import { AuthForm } from "@/src/common/components/AuthForm";
import { Button } from "@/src/common/components/Button";
import Link from "next/link";
import React from "react";
import { isAuthenticated } from "@/src/utils/isAuthenticated";

const CartPage = () => {
  const { authenticated } = isAuthenticated();

  return (
    <div className="flex flex-col justify-center items-center py-4 w-full h-full">
      {authenticated ? (
        <div className="flex flex-col gap-4">
          <span className="text-gray-400">There are no items in this cart</span>
          <Link href={`/`}>
            <Button
              className="w-[300px] h-[36px] bg-gradient-to-r from-red-50 to-green-50 cursor-pointer !bg-transparent text-[14px] !text-brand border border-gray-300"
              label="CONTINUE SHOPPING"
            />
          </Link>
        </div>
      ) : (
        <div className="w-1/2">
          <AuthForm forCart />
        </div>
      )}
    </div>
  );
};

export default CartPage;
