import NewsCard from "@/components/Common/NewsCard";
import { getCategoryNews } from "@/lib/api";
import { Metadata } from "next";

import { notFound } from "next/navigation";

// What you had: a hand-written type
interface CategoryProps {
  params: Promise<{ categoryId: string }>;
}

/**
 * Generate dynamic SEO metadata for each category.
 */
export async function generateMetadata({
  params,
}: CategoryProps): Promise<Metadata> {
  const { categoryId } = await params;

  const category = await getCategoryNews(categoryId);

  if (!category) {
    return {
      title: "ক্যাটাগরি পাওয়া যায়নি",
      description: "অনুরোধ করা সংবাদ ক্যাটাগরিটি পাওয়া যায়নি।",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { title, news } = category;
  const latestNews = news[0];

  const pageTitle = `${title} - সর্বশেষ খবর ও সংবাদ`;

  const description = `${title} বিভাগের সর্বশেষ খবর, সংবাদ, আপডেট ও গুরুত্বপূর্ণ ঘটনাগুলো পড়ুন।`;

  return {
    title: pageTitle,
    description,

    keywords: [
      title,
      `${title} খবর`,
      `${title} সংবাদ`,
      `${title} সর্বশেষ খবর`,
      "সর্বশেষ খবর",
      "বাংলাদেশের খবর",
    ],

    alternates: {
      canonical: `/category/${categoryId}`,
    },

    openGraph: {
      title: pageTitle,
      description,
      url: `/category/${categoryId}`,
      type: "website",
      siteName: "News",
      locale: "bn_BD",

      ...(latestNews?.imageUrl && {
        images: [
          {
            url: latestNews.imageUrl,
            alt: latestNews.imageAlt || latestNews.title,
          },
        ],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,

      ...(latestNews?.imageUrl && {
        images: [latestNews.imageUrl],
      }),
    },
  };
}

/**
 *
 * Why PageProps<"/category/[categoryId]"> is modern
 *
 * Next.js 16 provides globally available route-aware TypeScript helpers such as:
 *
 *  1. PageProps
 *  2. LayoutProps
 *  3. RouteContext
 *
 * So instead of manually defining:
 * interface Props {
 *   params: Promise<{
 *     categoryId: string;
 *   }>;
 * }
 *
 * you can use: PageProps<"/category/[categoryId]">
 *
 * This has an advantage: the route itself becomes the source of truth for your params type.
 *
 *
 *
 * over manually creating a Props interface for this route. It is cleaner, route-aware, and gives TypeScript more information about the actual App Router route.
 *
 *
 */

const CategoryNews = async (props: PageProps<"/category/[categoryId]">) => {
  const { categoryId } = await props.params;
  const category = await getCategoryNews(categoryId);

  // console.log(category);

  if (!category) notFound();

  const { title, news } = category;

  return (
    <main className="mt-8">
      {/* Section Header */}
      <header className="mb-6 relative">
        <div className="flex items-center gap-3">
          <span className="h-7 w-1 rounded-full bg-danger" />

          <h1 className="text-3xl font-black tracking-tight text-panel-foreground sm:text-4xl">
            {title}
          </h1>
        </div>

        <div className="mt-4 flex items-center justify-between border-y border-neutral-200 py-2.5">
          <span className="text-xs font-semibold tracking-wide text-panel-secondary uppercase">
            সর্বশেষ খবর
          </span>

          <span className="text-xs text-panel-secondary">
            {news.length}টি সংবাদ
          </span>
        </div>

        <div className="absolute -bottom-px left-0 h-0.5 w-16 rounded-full bg-danger" />
      </header>

      {/* Newspaper Grid */}
      <section
        aria-label={`${title} বিভাগের সংবাদ`}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {news.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </section>
    </main>
  );
};

export default CategoryNews;
