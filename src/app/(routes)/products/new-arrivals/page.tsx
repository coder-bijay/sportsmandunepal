import { getProducts } from "@/src/libs/products";
import React from "react";
import { ProductCard } from "../components/ProductCard";

const ProductGrid = async () => {
  const products = await getProducts({ query: "new-arrivals" });

  return (
    <div className="container mx-auto p-2 flex flex-col gap-4 lg:p-4">
      <h1 className="text-2xl font-bold">New Arrivals</h1>
      <div className="flex flex-wrap">
        {products?.data?.map(
          (
            product: {
              image: string;
              per_box_price: string;
              name: string;
            },
            index: number
          ) => (
            <ProductCard
              key={index}
              image={product.image}
              price={product.per_box_price}
              name={product.name}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
