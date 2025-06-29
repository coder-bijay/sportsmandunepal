import { cache } from "react";

export const getAllCategory = cache(async () => {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/category`;

  const res = await fetch(url, {
    method: "GET",
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    const errorDetails = await res.text();
    throw new Error(`Failed to fetch categoryz: ${res.status} ${errorDetails}`);
  }

  return res.json();
});
