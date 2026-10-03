import type { Navbar } from "@/lib/types";

const API_URL = "https://news-api-v2.vercel.app/api";

/** All categories. Returns [] on any failure so callers (like the header) never crash a page. */
export const getCategories = async (): Promise<Navbar[]> => {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 300 }, // categories rarely change; refresh every 5 min
    });
    if (!res.ok) return [];

    const data = await res.json();
    return data.data ?? [];
  } catch {
    // The header is in the root layout, so a failed fetch must not break every page
    return [];
  }
};

/** Only the categories that actually have articles. */
export const getScrapableCategories = async (): Promise<Navbar[]> => {
  const categories = await getCategories();
  return categories.filter((category) => category.scrapable);
};

/** The API returns slugs like "politics"; links need the leading slash ("/politics"). */
export const categoryHref = (slug: string): string =>
  slug.startsWith("/") ? slug : `/${slug}`;
