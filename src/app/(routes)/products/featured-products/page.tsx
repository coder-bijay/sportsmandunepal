import { getProducts } from "@/src/libs/products";
import React from "react";
import { ProductCard } from "../components/ProductCard";
import { IProduct } from "../interface";
import { notFound } from "next/navigation";

const ProductGrid = async () => {
  const products = await getProducts({
    query: "tag",
    value: "featured",
  });

  if (!products || !products.data) {
    notFound();
  }

  const productList = products?.data;

  return (
    <div className="container mx-auto p-2 flex flex-col gap-4 lg:p-4">
      <h1 className="text-2xl font-bold">Featured Products</h1>
      {productList?.length === 0 ? (
        <div className="text-center text-gray-500">
          No featured products found.
        </div>
      ) : (
        <div className="flex flex-wrap">
          {productList?.map((product: IProduct, index: number) => (
            <ProductCard
              key={index}
              slug={product.slug}
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

export default ProductGrid;
