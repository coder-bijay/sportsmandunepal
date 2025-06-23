import { getProducts } from "@/src/libs/products";
import React from "react";
import { ProductCard } from "../components/ProductCard";
import { IProduct } from "../interface";

const ProductGrid = async () => {
  const products = await getProducts({ tag: "new_arrivals" });

  return (
    <div className="container mx-auto p-2 flex flex-col gap-4 lg:p-4">
      <h1 className="text-2xl font-bold">New Arrivals</h1>
      <div className="flex flex-wrap">
        {products?.data?.map((product: IProduct, index: number) => (
          <ProductCard
            key={index}
            slug={product?.slug}
            image={product.image}
            price={product.price}
            name={product.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
