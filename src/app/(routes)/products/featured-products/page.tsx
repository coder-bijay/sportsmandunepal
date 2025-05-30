import { ProductCard } from "@/src/common/components/ProductCard";
import React from "react";

const ProductGrid = () => {
  const products = [
    { image: "/images/trousers.jpg", title: "3 STRIPES TROUSERS", price: 1800 },
    {
      image: "/images/ac-away.jpg",
      title: "AC MILAN AWAY KIT 2024-25",
      price: 2000,
    },
    {
      image: "/images/ac-home.jpg",
      title: "AC MILAN HOME KIT 2024-25",
      price: 2000,
    },
    {
      image: "/images/boot-bag.jpg",
      title: "adidas Black Boot Bags f",
      price: 1000,
    },
    {
      image: "/images/black-predator.jpg",
      title: "Adidas Black Football Shoes Predator",
      price: 200,
    },
    {
      image: "/images/green-football.jpg",
      title: "Adidas Green Football Shoes Predator",
      price: 3200,
    },
    {
      image: "/images/green-futsal.jpg",
      title: "Adidas Green Futsal Shoes Predator",
      price: 3000,
    },
    {
      image: "/images/neon-messi.jpg",
      title: "Adidas Neon Silver Messi Futsal/Indoor Shoes",
      price: 3000,
    },
  ];

  return (
    <div className="container mx-auto p-2 flex flex-col gap-4 lg:p-4">
      <h1 className="text-2xl font-bold">Featured Products</h1>
      <div className="flex flex-wrap">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
