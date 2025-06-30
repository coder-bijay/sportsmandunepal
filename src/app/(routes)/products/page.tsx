import React from "react";
import { getProducts } from "@/src/libs/products";
import { ProductCard } from "./components/ProductCard";
import { IProduct } from "./interface";
import { notFound } from "next/navigation";

interface ProductGridProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const ProductGrid = async ({ searchParams }: ProductGridProps) => {
  const { category } = await searchParams;

  const query = {
    query: category ? "category" : "tag",
    value: category || "all",
  };

  const products = await getProducts({
    query: query.query,
    value: query.value,
  });

  if (!products || !products.data) {
    notFound();
  }

  const productList = products?.data;

  return (
    <div className="container mx-auto p-2 lg:p-4">
      {productList.length === 0 ? (
        <div className="flex justify-center items-center min-h-[140px] text-gray-500">
          No products found for this category.
        </div>
      ) : (
        <div className={`flex flex-wrap ${!category ? "justify-center" : ""}`}>
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
