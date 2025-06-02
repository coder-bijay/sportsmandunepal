"use client";

import React, { useState } from "react";

const ProductDetails = () => {
  const product = {
    title: "Adidas Green Futsal Shoes Predator",
    description: "Comfprtability\nEasy To Wear",
    sizes: [38, 39, 40, 41, 42],
    stock: true,
    images: ["/images/shoe1.png", "/images/shoe2.png", "/images/shoe3.png"],
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 p-6">
      <div className="flex flex-col items-start">
        {/* Thumbnail Images */}
        <div className="flex gap-2  mb-4">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumbnail-${idx}`}
              className={`w-12 h-12 border rounded cursor-pointer ${
                selectedImage === img ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="w-80 h-80 border rounded overflow-hidden">
          <img
            src={selectedImage}
            alt="Selected Product"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col max-w-md ">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600 whitespace-pre-line mb-4">
          {product.description}
        </p>

        {/* Sizes */}
        <div className="flex gap-2 mb-4">
          {product.sizes.map((size) => (
            <button
              key={size}
              className="w-10 h-10 border rounded disabled:opacity-50"
              disabled
            >
              {size}
            </button>
          ))}
        </div>

        {/* Stock Info */}
        <p className="text-sm text-gray-500 mb-2">
          {product.stock ? "In stock" : "Out of stock"}
        </p>

        {/* Add to Cart Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!product.stock}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
