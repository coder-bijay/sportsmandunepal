import { cache } from "react";

export const getProducts = cache(async () => {
  const res = await fetch(
    `https://ecommerce-backend-k792.onrender.com/api/v1/product`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
});
