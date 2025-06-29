import React from "react";
import { getProducts } from "@/src/libs/products";
import { ProductCard } from "./components/ProductCard";
import { IProduct } from "./interface";

interface ProductGridProps {
  searchParams: {
    category?: string;
  };
}

const ProductGrid = async ({ searchParams }: ProductGridProps) => {
  const category = searchParams.category;

  const query = {
    query: category ? "category" : "tag",
    value: category || "all",
  };

  const products = await getProducts({
    query: query.query,
    value: query.value,
  });

  const productList = products?.data || [];

  return (
    <div className="container mx-auto p-2 lg:p-4">
      {productList.length === 0 ? (
        <div className="text-center text-gray-500">
          No products found for this category.
        </div>
      ) : (
        <div className="flex flex-wrap">
          {productList.map((product: IProduct, index: number) => (
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
