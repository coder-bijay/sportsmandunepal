import { cache } from "react";

export const getProducts = cache(async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
});
