import { cache } from "react";

export const getProducts = cache(async () => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product`, {
  const res = await fetch(`http://localhost:5000/api/v1/product`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
});
