import type { Navbar, News } from "@/lib/types";
import { cacheLife, cacheTag } from "next/cache";

const API_URL = "https://news-api-v2.vercel.app/api";

const fetchCategories = async (): Promise<Navbar[]> => {
  "use cache";

  cacheLife("hours"); // categories rarely change
  cacheTag("categories");

  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error(`Categories API failed: ${res.status}`);

  const data = await res.json();
  return data.data ?? [];
};

/** Never throws, so the header can't break a page. Failures are not cached. */
export const getCategories = async (): Promise<Navbar[]> => {
  try {
    return await fetchCategories();
  } catch {
    return [];
  }
};

export const getScrapableCategories = async (): Promise<Navbar[]> =>
  (await getCategories()).filter((category) => category.scrapable);

export const categoryHref = (slug: string): string =>
  slug.startsWith("/category/") ? slug : `/category/${slug}`;

export type CategoryNews = { title: string; news: News[] };

/** null = unknown or empty category (the page shows a 404). Throws on API failure. */
export const getCategoryNews = async (
  categoryId: string,
): Promise<CategoryNews | null> => {
  "use cache";

  cacheLife("minutes"); // stale after 5 min, refreshed in the background after 1 min
  cacheTag("news", `category-${categoryId}`);

  const res = await fetch(
    `${API_URL}/category/${encodeURIComponent(categoryId)}`,
  );

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Category API failed: ${res.status}`);

  const data = await res.json();
  if (!data.data?.length) return null;

  // console.log(data);

  return {
    title: data.title,
    news: data.data,
  };
};
