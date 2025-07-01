import { cache } from "react";

export const getProducts = cache(
  async ({ query, value }: { query: string; value: string }) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/product${
      query ? `?${query}=${encodeURIComponent(value)}` : ""
    }`;

    try {
      const res = await fetch(url, {
        method: "GET",
        next: { revalidate: 10 },
      });

      if (!res.ok) {
        console.warn(`Failed to fetch products. Status: ${res.status}`);
        return { data: [] };
      }

      return res.json();
    } catch (error) {
      console.error("Fetch error in getProducts:", error);
      return { data: [] };
    }
  }
);

export const getProductsBySlug = cache(async ({ slug }: { slug?: string }) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/product/slug${
    slug ? `?slug=${encodeURIComponent(slug)}` : ""
  }`;

  const res = await fetch(url, {
    method: "GET",
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Failed to fetch products: ${res.status} ${errorDetails}`);
  }

  return res.json();
});

export const getProductsByCategory = cache(
  async ({ category }: { category?: string }) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/product${
      category ? `?category=${category}` : ""
    }`;

    const res = await fetch(url, {
      method: "GET",
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      const errorDetails = await res.text();
      throw new Error(
        `Failed to fetch products by category: ${res.status} ${errorDetails}`
      );
    }

    return res.json();
  }
);
