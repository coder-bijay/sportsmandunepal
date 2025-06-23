import { cache } from "react";

export const getProducts = cache(async ({ tag }: { tag?: string }) => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/product${
    tag ? `?tag=${tag}` : ""
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
