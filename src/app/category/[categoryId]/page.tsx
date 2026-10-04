import { getCategoryNews } from "@/lib/api";
import { Metadata } from "next";

import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//   const categories = await getScrapableCategories();
//   return categories.map((category) => ({ categoryId: category.slug }));
// }

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

  // const { title, news } = category;

  return (
    <div>
      <h1 className="mb-5 border-b-2 border-danger text-2xl font-bold">
        {category?.title}
      </h1>

      {/* Render categoryNews here */}
    </div>
  );
};

export default CategoryNews;

// import { notFound } from "next/navigation";

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
//     </div>
//   );
// };

// export default CategoryNews;
