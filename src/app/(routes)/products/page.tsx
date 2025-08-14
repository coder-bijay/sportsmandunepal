import React from "react";
import { getProducts } from "@/src/libs/products";
import { ProductCard } from "./components/ProductCard";
import { IProduct } from "./interface";

interface ProductGridProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

const ProductsGrid = async ({ searchParams }: ProductGridProps) => {
  const { category } = await searchParams;

  const query = {
    query: category ? "category" : "tag",
    value: category || "all",
  };

  const products = await getProducts({
    query: query.query,
    value: query.value,
  });

  const productList = (products && products?.data) || [];

  return (
    <div className="container mx-auto p-2 lg:p-4">
      {productList.length === 0 ? (
        <div className="flex justify-center items-center min-h-[140px] text-gray-500">
          No products found for this category.
        </div>
      ) : (
        <div className={`flex flex-wrap`}>
          {productList.map((product: IProduct, index: number) => (
            <ProductCard
              key={index}
              slug={product.slug}
              coverImage={product.coverImage}
              price={product.price}
              name={product.name}
              discount={product.discount}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;
