"use client";

import { useRouter } from "next/navigation";

export const ClientNavButtons = () => {
  const router = useRouter();

  return (
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
  );
};
