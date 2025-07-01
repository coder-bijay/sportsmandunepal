export const dynamic = "force-dynamic";

import { getProducts } from "@/src/libs/products";
import React from "react";
import { ProductCard } from "../components/ProductCard";
import { IProduct } from "../interface";
import { notFound } from "next/navigation";

const NewArrivalsProductGrid = async () => {
  const products = await getProducts({
    query: "tag",
    value: "new_arrivals",
  });

  if (!products || !products.data) {
    notFound();
  }

  const productList = products?.data;

  return (
    <div className="container mx-auto p-2 flex flex-col gap-4 lg:p-4">
      <h1 className="text-2xl font-bold">New Arrivals</h1>

      {productList?.length === 0 ? (
        <div className="flex justify-center items-center min-h-[140px] text-gray-500">
          No new arrivals found.
        </div>
      ) : (
        <div className="flex flex-wrap">
          {productList?.map((product: IProduct, index: number) => (
            <ProductCard
              key={index}
              slug={product?.slug}
              image={product.image}
              price={product.price}
              name={product.name}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewArrivalsProductGrid;
