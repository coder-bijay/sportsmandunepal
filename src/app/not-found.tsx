"use client";

import { useRouter } from "next/navigation";
import React from "react";

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404!</h1>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Oops! Missed the shot?
      </h2>
      <p className="text-gray-600 mb-6">
        We missed the mark this time, but your perfect sports gear is still
        within reach!
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.back()}
          className="px-6 py-2 cursor-pointer border border-blue-600 text-blue-600 font-medium rounded hover:bg-blue-100 transition"
        >
          Back to previous page
        </button>
        <button
          onClick={() => router.push("/products")}
          className="px-6 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Browse products
        </button>
      </div>
    </div>
  );
};

export default NotFound;
