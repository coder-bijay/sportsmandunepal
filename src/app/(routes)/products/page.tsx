import { ProductCard } from "@/src/common/components/ProductCard";
import { getProducts } from "@/src/libs/products";
import React from "react";

const ProductGrid = async () => {
  const products = await getProducts({ query: "all" });
  return (
    <div className="container mx-auto p-2 lg:p-4">
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
              title={product.name}
            />
          )
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
