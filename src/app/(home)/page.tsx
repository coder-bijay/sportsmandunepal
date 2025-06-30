import { getProducts } from "@/src/libs/products";
import { notFound } from "next/navigation";
import React from "react";
import { ProductCard } from "../(routes)/products/components/ProductCard";
import { IProduct } from "../(routes)/products/interface";

interface Props {
  searchParams: {
    search?: string;
  };
}

const Page = async ({ searchParams }: Props) => {
  const { search } = searchParams;

  const query = {
    query: "search",
    value: search || "",
  };

  const products = await getProducts({
    query: query.query,
    value: query.value,
  });

  if (!products || !products.data) {
    notFound();
  }

  const productList = products.data;

  console.log("Product List HOME:", productList);

  return (
    <div className="flex items-center justify-center flex-col mx-auto p-2 lg:p-4">
      {search ? (
        <div className="container flex flex-col w-full lg:max-w-[800px] px-10 items-start justify-center gap-2">
          <h2 className="text-[22px] font-semibold mb-4">
            Search results for : <span className="text-blue-500">{search}</span>
          </h2>
          {productList.length === 0 ? (
            <div className="text-center text-gray-500">
              No products found for your search.
            </div>
          ) : (
            <div className="flex flex-wrap justify-center w-full">
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
      ) : (
        <div className="flex flex-col gap-2 w-full">
          {productList.length === 0 ? (
            <div className="text-center text-gray-500">
              No products found for your search.
            </div>
          ) : (
            <div className="flex flex-wrap justify-center w-full">
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
      )}
    </div>
  );
};

export default Page;
