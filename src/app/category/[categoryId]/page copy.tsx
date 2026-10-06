import NewsCard from "@/components/Common/NewsCard";
import { getCategoryNews, getScrapableCategories } from "@/lib/api";
import { Metadata } from "next";

import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const categories = await getScrapableCategories();
  return categories.map((category) => ({ categoryId: category.slug }));
}

// What you had: a hand-written type
interface CategoryProps {
  params: Promise<{ categoryId: string }>;
}

/* export async function generateMetadata({
  params,
}: PageProps<"/category/[categoryId]">): Promise<Metadata> {
  const { categoryId } = await params;
  const category = await getCategoryNews(categoryId);

  if (!category) return {};

  return {
    title: category.title,
    description: `${category.title} বিভাগের সর্বশেষ খবর।`,
    alternates: { canonical: `/category/${categoryId}` },
  };
} */

/* const CategoryNews = async ({ params }: CategoryProps) => {
  const { categoryId } = await params;
  const data = await getCategoryNews(categoryId);

  // API request failed or category doesn't exist
  if (!data) {
    notFound();
  }

  const categoryNews: News[] = data.data ?? [];

  // Category exists but has no news
  if (!categoryNews.length) {
    notFound();
  }
}; */

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

/* <div className="mt-8 space-y-7">
      <header className="relative">
        <div className="flex items-end justify-between gap-4 border-b border-neutral-200 pb-4">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-danger" />

              <span className="text-xs font-bold tracking-[0.16em] text-danger uppercase">
                সর্বশেষ সংবাদ
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-panel-foreground sm:text-4xl">
              {categoryNews.title}
            </h1>
          </div>

          <span className="hidden shrink-0 text-sm font-medium text-panel-secondary sm:block">
            {categoryNews.news.length}টি সংবাদ
          </span>
        </div>

        <div className="absolute bottom-[-1px] left-0 h-0.5 w-20 rounded-full bg-danger" />
      </header>

      <section
        aria-label={`${title} বিভাগের সংবাদ`}
        className="grid grid-cols-1 gap-x-6 gap-y-0 sm:grid-cols-2 lg:grid-cols-3"
      >
        {news.map((news, index) => (
          <div
            key={news.id}
            className={`
              border-neutral-200
              py-5
              ${index % 3 !== 2 ? "lg:border-r lg:pr-6" : ""}
              ${index % 2 !== 1 ? "sm:border-r sm:pr-6" : ""}
            `}
          >
            <NewsCard news={news} />
          </div>
        ))}
      </section>
    </div>
*/

// const CategoryNews = async (props: PageProps<"/category/[categoryId]">) => {
//   const { categoryId } = await props.params;
//   const categoryNews = await getCategoryNews(categoryId);

//   // console.log(categoryNews);

//   if (!categoryNews) notFound();

//   // const { title, news } = categoryNews;

//   return (
//     <div className="space-y-4 mt-6">
//       <h1 className="pb-2.5 border-b-2 border-danger text-2xl font-bold">
//         {categoryNews?.title}
//       </h1>

//       {/* Render categoryNews here */}
//       <div className="grid grid-cols-3 gap-10">
//         {categoryNews.news.map((news) => (
//           <NewsCard key={news.id} news={news} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryNews;

// interface News {
//   id: string;
//   title: string;
//   description: string;
//   category: string;
//   imageUrl: string;
//   imageAlt: string;
// }

// interface Props {
//   params: Promise<{
//     categoryId: string;
//   }>;
// }

// const CategoryNews = async ({ params }: Props) => {
//   const { categoryId } = await params;
//   // console.log(categoryId);

//   const res = await fetch(
//     `https://news-api-v2.vercel.app/api/category/${categoryId}`,
//   );

//   // console.log(res);

//   if (!res.ok) {
//     notFound();
//   }

//   const data = await res.json();

//   const categoryNews: News[] = data.data;

//   if (!categoryNews?.length) {
//     notFound();
//   }

//   return (
//     <div>
//       <h1 className="mb-5 border-b-2 border-red-700 text-2xl font-bold">
//         {data.title}
//       </h1>

//       {/* Render categoryNews here */}
//       <div className="grid grid-cols-3 gap-10">
//         {categoryNews.map((news) => (
//           <NewsCard key={news.id} news={news} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryNews;
