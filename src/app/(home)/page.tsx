import { getProducts } from "@/src/libs/products";
import React from "react";
import { ProductCard } from "../(routes)/products/components/ProductCard";
import { IProduct } from "../(routes)/products/interface";

interface ProductGridProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

const ProductGrid = async ({ searchParams }: ProductGridProps) => {
  const { search } = await searchParams;

  const query = {
    query: search ? "search" : "",
    value: search || "",
  };

  const products = await getProducts({
    query: query.query,
    value: query.value,
  });

  const productList = (products && products?.data) || [];

  return (
    <div className="container flex items-center justify-center flex-col mx-auto p-2 lg:p-4">
      {search ? (
        <div className=" flex flex-col px-10 gap-2 w-full">
          <h2 className="text-[22px] font-semibold mb-4">
            Search results for : <span className="text-blue-500">{search}</span>
          </h2>
          {productList.length === 0 ? (
            <div className="text-center text-gray-500">
              No products found for your search.
            </div>
          ) : (
            <div className="flex flex-wrap">
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
      ) : (
        <div className="flex flex-col gap-2 w-full">
          {productList.length === 0 ? (
            <div className="text-center text-gray-500">No products found.</div>
          ) : (
            <div className="flex flex-wrap">
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
      )}
      testtstdtstdtst
    </div>
  );
};

export default ProductGrid;
