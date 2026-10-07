import type {
  CategoryNews,
  Headline,
  Navbar,
  NewsDetails,
  Section,
} from "@/lib/types";
import { cacheLife, cacheTag } from "next/cache";

const API_URL = "https://news-api-v2.vercel.app/api";

/* ===== Category - Straight from the site nav. "/api/categories" ===== */

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

/* Accepts "politics", "/politics", "category/politics" or "/category/politics". */
// export const categoryHref = (slug: string): string => `/category/${slug.replace(/^\/+/, "").replace(/^category\//, "")}`;

/** ".../topics/c907347rezkt" -> "c907347rezkt" */
const topicIdFromLink = (link: string | null | undefined) =>
  link?.match(/\/topics\/([^/?#]+)/)?.[1];

/** The /category/... page for a section, or undefined when no category matches. */
export const getSectionHref = (
  section: Section,
  categories: Navbar[],
): string | undefined => {
  const topicId = topicIdFromLink(section.link);
  if (!topicId) return undefined;

  const category = categories.find((c) => c.topicId === topicId);
  return category ? categoryHref(category.slug) : undefined;
};

/* ===== Latest headlines -  Supports limit, offset, category, q. "/api/news?limit=10" ===== */

/* Fetch news limit 10 */
const fetchHeadlines = async (limit: number): Promise<Headline[]> => {
  "use cache";
  cacheLife("minutes");
  cacheTag("news", "headlines");

  const res = await fetch(`${API_URL}/news?limit=${limit}`);
  if (!res.ok) throw new Error(`Headlines API failed: ${res.status}`);

  const data = await res.json();
  return data.data ?? [];
};

/* Never throws: if the API is down the ticker simply doesn't render. */
export const getHeadlines = async (limit = 10): Promise<Headline[]> => {
  try {
    return await fetchHeadlines(limit);
  } catch {
    return [];
  }
};

/* ===== Homepage sections - Home Page Main News "/api/news/sections" ===== */

export const getSections = async (): Promise<Section[]> => {
  "use cache";
  cacheLife("minutes");
  cacheTag("news", "sections");

  const res = await fetch(`${API_URL}/news/sections`);
  if (!res.ok) throw new Error(`Sections API failed: ${res.status}`);

  const data = await res.json();
  const sections: Section[] = data.data ?? [];

  // Drop the "follow us on WhatsApp / Instagram" blocks: their items are
  // external links, not articles, and would link to a broken /news/<url>
  return sections
    .map((s) => ({
      ...s,
      articles: s.articles.filter((a) => a.type !== "link"),
    }))
    .filter((s) => s.articles.length > 0);
};

/* ===== Most read - Ranked "/api/news/most-read" ===== */

const fetchMostRead = async (): Promise<Headline[]> => {
  "use cache";
  cacheLife("minutes");
  cacheTag("news", "most-read");

  const res = await fetch(`${API_URL}/news/most-read`);
  if (!res.ok) throw new Error(`Most-read API failed: ${res.status}`);

  const data = await res.json();
  return data.data ?? [];
};

export const getMostRead = async (): Promise<Headline[]> => {
  try {
    return await fetchMostRead();
  } catch {
    return [];
  }
};

/* ===== One category - slug "/api/category/technology" ===== */

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

/* ===== Full article - Structured body blocks, byline, topics, tags, word count. "/api/article/{id}" ===== */

// Statuses that mean "this id isn't an article we can show" (missing, video, live page...)
const NOT_AVAILABLE = [400, 404, 410, 415, 422];

export const getNewsDetails = async (
  newsId: string,
): Promise<NewsDetails | null> => {
  "use cache";
  // cacheLife("minutes");
  cacheLife("hours");
  cacheTag("news", `article-${newsId}`);

  const res = await fetch(`${API_URL}/article/${encodeURIComponent(newsId)}`);

  // if (res.status === 404) return null;
  // if (res.status === 415) {
  //   return null;
  // }

  if (NOT_AVAILABLE.includes(res.status)) return null;
  if (!res.ok) {
    throw new Error(`Article API failed: ${res.status}`);
  }

  const data = await res.json();
  // return data.data ?? null;

  const article = data.data;
  if (!article) return null;

  return {
    ...article,
    byline: article.byline ?? [],
    topics: article.topics ?? [],
    tags: article.tags ?? [],
    body: article.body ?? [],
    wordCount: article.wordCount ?? 0,
  };
};

/* export const getNewsDetails = async (
  newsId: string,
): Promise<NewsDetails | null> => {
  "use cache";

  cacheLife("hours");
  cacheTag("news", `article-${newsId}`);

  const res = await fetch(`${API_URL}/article/${encodeURIComponent(newsId)}`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    const errorBody = await res.text();

    console.error("Article API failed:", {
      status: res.status,
      statusText: res.statusText,
      body: errorBody,
    });

    throw new Error(`Article API failed: ${res.status}`);
  }

  const data = await res.json();

  return data.data ?? null;
}; */
