import type { Navbar, News } from "@/lib/types";

const API_URL = "https://news-api-v2.vercel.app/api";

export type CategoryNews = { title: string; news: News[] };

/**
 * All categories.
 * Returns [] on any failure so callers (like the header)
 * never crash a page.
 */
export const getCategories = async (): Promise<Navbar[]> => {
  try {
    const res = await fetch(`${API_URL}/categories`, {
      next: { revalidate: 300 }, // categories rarely change; refresh every 5 min
    });

    // const res = await fetch(`${API_URL}/categories`);

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

/**
 * The API returns slugs like "politics".
 * Links need the leading "/category/".
 * Create category URL.
 */
export const categoryHref = (slug: string): string =>
  slug.startsWith("/category/") ? slug : `/category/${slug}`;

// export const categoryHref = (slug: string): string => slug.startsWith("/") ? slug : `/${slug}`;

/**
 * News for one category.
 * Returns null when the category doesn't exist or has no articles (the page shows a 404).
 * Throws on a network or server failure, so an API outage shows the error page
 * instead of a misleading 404 that search engines could index.
 */
export const getCategoryNews = async (
  categoryId: string,
): Promise<CategoryNews | null> => {
  const res = await fetch(
    `${API_URL}/category/${encodeURIComponent(categoryId)}`,
    { next: { revalidate: 60 } }, // news changes faster than categories
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Category API failed with ${res.status}`);

  const data = await res.json();
  if (!data.data?.length) return null;

  return { title: data.title, news: data.data };
};

/**
 * Get news by category.
 */
export const getCategoryNews1 = async (categoryId: string) => {
  const res = await fetch(`${API_URL}/category/${categoryId}`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data;
};
