import { cache } from "react";

export const getProducts = cache(async ({ query }: { query?: string }) => {
  const url = `https://ecommerce-backend-k792.onrender.com/api/v1/product${
    query ? `?${query}` : ""
  }`;

  const res = await fetch(url, {
    method: "GET",
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Failed to fetch products: ${res.status} ${errorDetails}`);
  }

  return res.json();
});
