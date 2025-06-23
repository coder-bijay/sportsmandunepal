import { getProducts } from "@/src/libs/products";
import React from "react";
import { ProductCard } from "./components/ProductCard";
import { IProduct } from "./interface";

const ProductGrid = async () => {
  const products = await getProducts({ tag: "all" });

  return (
    <div className="container mx-auto p-2 lg:p-4">
      <div className="flex flex-wrap">
        {products?.data?.map((product: IProduct, index: number) => (
          <ProductCard
            slug={product.slug}
            key={index}
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
