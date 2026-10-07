import { ClockIcon } from "@/components/Common/Icons";
import ArticleBody from "@/components/News/ArticleBody";
import ArticleDates from "@/components/News/ArticleDates";
import ArticleImage from "@/components/News/ArticleImage";
import MostReadDetails from "@/components/News/MostReadDetails";
import ShareLinks from "@/components/News/ShareLinks";
import JsonLd from "@/components/SEO/JsonLd";

import {
  categoryHref,
  getNewsDetails,
  getScrapableCategories,
  getSections,
} from "@/lib/api";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { ArticleImageBlock, NewsDetails } from "@/lib/types";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

/** First paragraph, trimmed for the meta description. */
const summarize = (article: NewsDetails) => {
  const block = article.body.find((b) => b.type === "text");

  const text = block?.type === "text" ? block.text.split(/\n+/)[0].trim() : "";

  return text.length > 160 ? `${text.slice(0, 157)}…` : text;
};

/** First visible character of a name; Bangla letters can be several code points. */
const firstGrapheme = (text: string) => {
  const [first] = new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(
    text,
  );

  return first?.segment ?? "";
};

// Pre-render the articles currently on the homepage; any other article renders on demand
export async function generateStaticParams() {
  const sections = await getSections();

  const ids = new Set(
    sections.flatMap((s) =>
      s.articles.filter((a) => a.type === "article").map((a) => a.id),
    ),
  );

  return [...ids].slice(0, 20).map((newsId) => ({ newsId }));
}

export async function generateMetadata(
  props: PageProps<"/news/[newsId]">,
): Promise<Metadata> {
  const { newsId } = await props.params;
  const article = await getNewsDetails(newsId);
  if (!article) return {};

  const description = summarize(article);
  const url = `/news/${newsId}`;

  return {
    title: article.title,
    description,
    alternates: { canonical: url },

    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      locale: "bn_BD",
      title: article.title,
      description,
      publishedTime: article.firstPublished,
      modifiedTime: article.lastPublished,
      authors: article.byline.map((b) => b.name),
      tags: article.tags,
      images: [
        {
          url: article.imageUrl,
          alt: article.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [article.imageUrl],
    },
  };
}

const NewsDetailsPage = async (props: PageProps<"/news/[newsId]">) => {
  const { newsId } = await props.params;

  const [article, categories] = await Promise.all([
    getNewsDetails(newsId),
    getScrapableCategories(),
  ]);
  if (!article) notFound();

  // The first photo in the body becomes the hero, so it isn't shown twice
  const [firstBlock, ...restBlocks] = article.body;

  const heroBlock: ArticleImageBlock =
    firstBlock?.type === "image"
      ? firstBlock
      : {
          type: "image",
          url: article.imageUrl,
          width: 1024,
          height: 576,
        };

  const blocks = firstBlock?.type === "image" ? restBlocks : article.body;

  // Topics link to a category page when one matches
  const topics = article.topics.map((topic) => {
    const category = categories.find((c) => c.topicId === topic.id);
    return {
      ...topic,
      href: category ? categoryHref(category.slug) : undefined,
    };
  });

  const authors = article.byline.map((b) => b.name).join("، ");

  const role = article.byline.length === 1 ? article.byline[0].role : null;

  const minutes = Math.max(1, Math.ceil(article.wordCount / 200));

  const articleUrl = `${SITE_URL}/news/${newsId}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: summarize(article),
    image: [article.imageUrl],
    datePublished: article.firstPublished,
    dateModified: article.lastPublished,
    inLanguage: "bn-BD",
    keywords: article.tags.join(", "),

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },

    author: article.byline.length
      ? article.byline.map((b) => ({ "@type": "Person", name: b.name }))
      : {
          "@type": "Organization",
          name: article.source || SITE_NAME,
        },

    publisher: {
      "@type": "NewsMediaOrganization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article>
          <JsonLd data={jsonLd} />

          {/* Reading progress: pure CSS, hidden where the browser can't do it */}
          <div
            aria-hidden="true"
            className="read-progress fixed inset-x-0 top-0 z-60 h-0.5 bg-danger"
          />

          <header>
            {topics.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <li key={topic.id}>
                    {topic.href ? (
                      <Link
                        href={topic.href}
                        className="focus-ring inline-block rounded-full bg-danger/10 px-3 py-1 text-xs/normal font-semibold text-danger transition-colors duration-300 hover:bg-danger hover:text-white"
                      >
                        {topic.name}
                      </Link>
                    ) : (
                      <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs/normal font-semibold text-neutral-600">
                        {topic.name}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <h1 className="mt-4 text-3xl/[1.35] font-black tracking-tight text-neutral-900 sm:text-5xl/[1.3]">
              {article.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-neutral-200 py-4">
              {authors && (
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-danger/10 text-base/none font-bold text-danger"
                  >
                    {firstGrapheme(authors)}
                  </span>

                  <div>
                    <p className="text-sm/[1.4] font-semibold text-neutral-900">
                      {authors}
                    </p>

                    {role && (
                      <p className="text-xs/normal text-neutral-500">{role}</p>
                    )}
                  </div>
                </div>
              )}

              <ArticleDates
                firstPublished={article.firstPublished}
                lastPublished={article.lastPublished}
              />

              <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs/normal font-medium text-neutral-600">
                <ClockIcon size={14} />
                পড়তে {minutes.toLocaleString("bn-BD")} মিনিট
              </span>
            </div>
          </header>

          <div className="mt-8">
            <ArticleImage block={heroBlock} hero />
          </div>

          <div className="mt-10">
            <ArticleBody blocks={blocks} />

            <footer className="mt-12 space-y-8 border-t border-neutral-200 pt-8">
              {article.tags.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        href="/"
                        // href={`/search?q=${encodeURIComponent(tag)}`}
                        className="focus-ring inline-block rounded-full border border-neutral-300 px-3 py-1 text-sm/[1.43] text-neutral-700 transition-colors duration-300 hover:border-danger hover:text-danger"
                      >
                        {tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              <ShareLinks url={articleUrl} title={article.title} />

              {/* <div className="rounded-2xl bg-neutral-50 p-5 text-sm/[1.7] text-neutral-600 ring-1 ring-neutral-200">
                সূত্র:{" "}
                <span className="font-semibold text-neutral-900">
                  {article.source}
                </span>
                {article.sourceUrl && (
                  <>
                    {" · "}
                    <a
                      href={article.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring font-semibold text-danger underline-offset-4 hover:underline"
                    >
                      মূল প্রতিবেদন পড়ুন
                    </a>
                  </>
                )}
              </div> */}
            </footer>
          </div>
        </article>

        {/* Most read stays in view beside the article on large screens */}
        <aside>
          <div className="lg:sticky lg:top-10">
            <MostReadDetails excludeId={newsId} />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsDetailsPage;

// import { ClockIcon } from "@/components/Common/Icons";
// import ArticleBody from "@/components/News/ArticleBody";
// import ArticleImage from "@/components/News/ArticleImage";
// import MostReadDetails from "@/components/News/MostReadDetails";
// import ShareLinks from "@/components/News/ShareLinks";
// import JsonLd from "@/components/SEO/JsonLd";

// import {
//   categoryHref,
//   getNewsDetails,
//   getScrapableCategories,
//   getSections,
// } from "@/lib/api";
// import { formatBanglaDateTime } from "@/lib/date";
// import { SITE_NAME, SITE_URL } from "@/lib/site";
// import type { ArticleImageBlock, NewsDetails } from "@/lib/types";

// import type { Metadata } from "next";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// /** First paragraph, trimmed for the meta description. */
// const summarize = (article: NewsDetails) => {
//   const block = article.body.find((b) => b.type === "text");

//   const text = block?.type === "text" ? block.text.split(/\n+/)[0].trim() : "";

//   return text.length > 160 ? `${text.slice(0, 157)}…` : text;
// };

// /** First visible character of a name; Bangla letters can be several code points. */
// const firstGrapheme = (text: string) => {
//   const [first] = new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(
//     text,
//   );

//   return first?.segment ?? "";
// };

// // Pre-render the articles currently on the homepage; any other article renders on demand
// export async function generateStaticParams() {
//   const sections = await getSections();

//   const ids = new Set(sections.flatMap((s) => s.articles.map((a) => a.id)));

//   return [...ids].slice(0, 20).map((newsId) => ({ newsId }));
// }

// export async function generateMetadata(
//   props: PageProps<"/news/[newsId]">,
// ): Promise<Metadata> {
//   const { newsId } = await props.params;
//   const article = await getNewsDetails(newsId);
//   if (!article) return {};

//   const description = summarize(article);
//   const url = `/news/${newsId}`;

//   return {
//     title: article.title,
//     description,
//     alternates: { canonical: url },

//     openGraph: {
//       type: "article",
//       url,
//       siteName: SITE_NAME,
//       locale: "bn_BD",
//       title: article.title,
//       description,
//       publishedTime: article.firstPublished,
//       modifiedTime: article.lastPublished,
//       authors: article.byline.map((b) => b.name),
//       tags: article.tags,
//       images: [
//         {
//           url: article.imageUrl,
//           alt: article.title,
//         },
//       ],
//     },

//     twitter: {
//       card: "summary_large_image",
//       title: article.title,
//       description,
//       images: [article.imageUrl],
//     },
//   };
// }

// const NewsDetailsPage = async (props: PageProps<"/news/[newsId]">) => {
//   // Temporary delay for testing loading.tsx
//   // await new Promise((resolve) => setTimeout(resolve, 5000));

//   const { newsId } = await props.params;

//   const [article, categories] = await Promise.all([
//     getNewsDetails(newsId),
//     getScrapableCategories(),
//   ]);

//   if (!article) notFound();

//   // The first photo in the body becomes the hero, so it isn't shown twice
//   const [firstBlock, ...restBlocks] = article.body;

//   const heroBlock: ArticleImageBlock =
//     firstBlock?.type === "image"
//       ? firstBlock
//       : {
//           type: "image",
//           url: article.imageUrl,
//           width: 1024,
//           height: 576,
//         };

//   const blocks = firstBlock?.type === "image" ? restBlocks : article.body;

//   // Topics link to a category page when one matches
//   const topics = article.topics.map((topic) => {
//     const category = categories.find((c) => c.topicId === topic.id);
//     return {
//       ...topic,
//       href: category ? categoryHref(category.slug) : undefined,
//     };
//   });

//   const authors = article.byline.map((b) => b.name).join("، ");

//   const role = article.byline.length === 1 ? article.byline[0].role : null;

//   /* const published = formatBanglaDateTime(article.firstPublished);

//   const wasUpdated =
//     Date.parse(article.lastPublished) - Date.parse(article.firstPublished) >
//     5 * 60_000;

//   const updated = wasUpdated ? formatBanglaDateTime(article.lastPublished) : ""; */

//   const publishedAt = article.firstPublished || article.lastPublished || null;

//   const published = publishedAt ? formatBanglaDateTime(publishedAt) : "";

//   const wasUpdated =
//     Boolean(article.firstPublished && article.lastPublished) &&
//     Date.parse(article.lastPublished) - Date.parse(article.firstPublished) >
//       5 * 60_000;

//   const updated =
//     wasUpdated && article.lastPublished
//       ? formatBanglaDateTime(article.lastPublished)
//       : "";

//   const minutes = Math.max(1, Math.ceil(article.wordCount / 200));

//   const articleUrl = `${SITE_URL}/news/${newsId}`;

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "NewsArticle",
//     headline: article.title,
//     description: summarize(article),
//     image: [article.imageUrl],
//     datePublished: article.firstPublished,
//     dateModified: article.lastPublished,
//     inLanguage: "bn-BD",
//     keywords: article.tags.join(", "),

//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": articleUrl,
//     },

//     author: article.byline.length
//       ? article.byline.map((b) => ({
//           "@type": "Person",
//           name: b.name,
//         }))
//       : {
//           "@type": "Organization",
//           name: article.source || SITE_NAME,
//         },

//     publisher: {
//       "@type": "NewsMediaOrganization",
//       name: SITE_NAME,
//       logo: {
//         "@type": "ImageObject",
//         url: `${SITE_URL}/logo.webp`,
//       },
//     },
//   };

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
//       <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
//         <article>
//           <JsonLd data={jsonLd} />

//           {/* Reading progress: pure CSS, hidden where the browser can't do it */}
//           <div
//             aria-hidden="true"
//             className="read-progress fixed inset-x-0 top-0 z-60 h-0.5 bg-danger"
//           />

//           <header>
//             {topics.length > 0 && (
//               <ul className="flex flex-wrap gap-2">
//                 {topics.map((topic) => (
//                   <li key={topic.id}>
//                     {topic.href ? (
//                       <Link
//                         href={topic.href}
//                         className="focus-ring inline-block rounded-full bg-danger/10 px-3 py-1 text-xs/normal font-semibold text-danger transition-colors duration-300 hover:bg-danger hover:text-white"
//                       >
//                         {topic.name}
//                       </Link>
//                     ) : (
//                       <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs/normal font-semibold text-neutral-600">
//                         {topic.name}
//                       </span>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             <h1 className="mt-4 text-3xl/[1.35] font-black tracking-tight text-neutral-900 sm:text-5xl/[1.3]">
//               {article.title}
//             </h1>

//             <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-neutral-200 py-4">
//               {authors && (
//                 <div className="flex items-center gap-3">
//                   <span
//                     aria-hidden="true"
//                     className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-danger/10 text-base/none font-bold text-danger"
//                   >
//                     {firstGrapheme(authors)}
//                   </span>

//                   <div>
//                     <p className="text-sm/[1.4] font-semibold text-neutral-900">
//                       {authors}
//                     </p>

//                     {role && (
//                       <p className="text-xs/normal text-neutral-500">{role}</p>
//                     )}
//                   </div>
//                 </div>
//               )}

//               <div className="flex flex-col text-xs/[1.6] text-neutral-500 sm:ml-auto sm:text-right">
//                 {/* <time dateTime={article.firstPublished}>
//                   প্রকাশিত: {published}
//                 </time> */}

//                 {published && (
//                   <time dateTime={publishedAt ?? undefined}>
//                     প্রকাশিত: {published}
//                   </time>
//                 )}

//                 {updated && (
//                   <time dateTime={article.lastPublished}>
//                     হালনাগাদ: {updated}
//                   </time>
//                 )}
//               </div>

//               <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs/normal font-medium text-neutral-600">
//                 <ClockIcon size={14} />
//                 পড়তে {minutes.toLocaleString("bn-BD")} মিনিট
//               </span>
//             </div>
//           </header>

//           <div className="mt-8">
//             <ArticleImage block={heroBlock} hero />
//           </div>

//           <div className="mt-10">
//             <ArticleBody blocks={blocks} />

//             <footer className="mt-12 space-y-8 border-t border-neutral-200 pt-8">
//               {article.tags.length > 0 && (
//                 <ul className="flex flex-wrap gap-2">
//                   {article.tags.map((tag) => (
//                     <li key={tag}>
//                       <Link
//                         href="/"
//                         // href={`/search?q=${encodeURIComponent(tag)}`}
//                         className="focus-ring inline-block rounded-full border border-neutral-300 px-3 py-1 text-sm/[1.43] text-neutral-700 transition-colors duration-300 hover:border-danger hover:text-danger"
//                       >
//                         {tag}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               <ShareLinks url={articleUrl} title={article.title} />

//               {/* <div className="rounded-2xl bg-neutral-50 p-5 text-sm/[1.7] text-neutral-600 ring-1 ring-neutral-200">
//                 সূত্র:{" "}
//                 <span className="font-semibold text-neutral-900">
//                   {article.source}
//                 </span>
//                 {article.sourceUrl && (
//                   <>
//                     {" · "}
//                     <a
//                       href={article.sourceUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="focus-ring font-semibold text-danger underline-offset-4 hover:underline"
//                     >
//                       মূল প্রতিবেদন পড়ুন
//                     </a>
//                   </>
//                 )}
//               </div> */}
//             </footer>
//           </div>
//         </article>

//         {/* Most read stays in view beside the article on large screens */}
//         <aside>
//           <div className="lg:sticky lg:top-14">
//             <MostReadDetails excludeId={newsId} />
//           </div>
//         </aside>
//       </div>
//     </div>
//   );
// };

// export default NewsDetailsPage;

// import { ClockIcon } from "@/components/Common/Icons";
// import ArticleBody from "@/components/News/ArticleBody";
// import ArticleImage from "@/components/News/ArticleImage";
// import ShareLinks from "@/components/News/ShareLinks";
// import JsonLd from "@/components/SEO/JsonLd";

// import
//     {
//         categoryHref,
//         getMostRead,
//         getNewsDetails,
//         getScrapableCategories,
//         getSections,
//     } from "@/lib/api";
// import { formatBanglaDateTime } from "@/lib/date";
// import { SITE_NAME, SITE_URL } from "@/lib/site";
// import type { ArticleImageBlock, NewsDetails } from "@/lib/types";

// import type { Metadata } from "next";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// /** First paragraph, trimmed for the meta description. */
// const summarize = (article: NewsDetails) => {
//   const block = article.body.find((b) => b.type === "text");
//   const text = block?.type === "text" ? block.text.split(/\n+/)[0].trim() : "";

//   return text.length > 160 ? `${text.slice(0, 157)}…` : text;
// };

// /** First visible character of a name; Bangla letters can be several code points. */
// const firstGrapheme = (text: string) => {
//   const [first] = new Intl.Segmenter("bn", { granularity: "grapheme" }).segment(
//     text,
//   );

//   return first?.segment ?? "";
// };

// // Pre-render the articles currently on the homepage; any other article renders on demand
// export async function generateStaticParams() {
//   const sections = await getSections();

//   const ids = new Set(sections.flatMap((s) => s.articles.map((a) => a.id)));

//   return [...ids].slice(0, 20).map((newsId) => ({ newsId }));
// }

// export async function generateMetadata(
//   props: PageProps<"/news/[newsId]">,
// ): Promise<Metadata> {
//   const { newsId } = await props.params;
//   const article = await getNewsDetails(newsId);

//   if (!article) return {};

//   const description = summarize(article);
//   const url = `/news/${newsId}`;

//   return {
//     title: article.title,
//     description,
//     alternates: { canonical: url },

//     openGraph: {
//       type: "article",
//       url,
//       siteName: SITE_NAME,
//       locale: "bn_BD",
//       title: article.title,
//       description,
//       publishedTime: article.firstPublished,
//       modifiedTime: article.lastPublished,
//       authors: article.byline.map((b) => b.name),
//       tags: article.tags,
//       images: [
//         {
//           url: article.imageUrl,
//           alt: article.title,
//         },
//       ],
//     },

//     twitter: {
//       card: "summary_large_image",
//       title: article.title,
//       description,
//       images: [article.imageUrl],
//     },
//   };
// }

// const NewsDetailsPage = async (props: PageProps<"/news/[newsId]">) => {
//   const { newsId } = await props.params;

//   const [article, categories] = await Promise.all([
//     getNewsDetails(newsId),
//     getScrapableCategories(),
//   ]);

//   if (!article) notFound();

//   const news = await getMostRead();
//   if (news.length === 0) return null;

//   // The first photo in the body becomes the hero, so it isn't shown twice
//   const [firstBlock, ...restBlocks] = article.body;

//   const heroBlock: ArticleImageBlock =
//     firstBlock?.type === "image"
//       ? firstBlock
//       : {
//           type: "image",
//           url: article.imageUrl,
//           width: 1024,
//           height: 576,
//         };

//   const blocks = firstBlock?.type === "image" ? restBlocks : article.body;

//   // Topics link to a category page when one matches
//   const topics = article.topics.map((topic) => {
//     const category = categories.find((c) => c.topicId === topic.id);

//     return {
//       ...topic,
//       href: category ? categoryHref(category.slug) : undefined,
//     };
//   });

//   const authors = article.byline.map((b) => b.name).join("، ");

//   const role = article.byline.length === 1 ? article.byline[0].role : null;

//   const published = formatBanglaDateTime(article.firstPublished);

//   const wasUpdated =
//     Date.parse(article.lastPublished) - Date.parse(article.firstPublished) >
//     5 * 60_000;

//   const updated = wasUpdated ? formatBanglaDateTime(article.lastPublished) : "";

//   const minutes = Math.max(1, Math.ceil(article.wordCount / 200));

//   const articleUrl = `${SITE_URL}/news/${newsId}`;

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "NewsArticle",
//     headline: article.title,
//     description: summarize(article),
//     image: [article.imageUrl],
//     datePublished: article.firstPublished,
//     dateModified: article.lastPublished,
//     inLanguage: "bn-BD",
//     keywords: article.tags.join(", "),
//     mainEntityOfPage: {
//       "@type": "WebPage",
//       "@id": articleUrl,
//     },

//     author: article.byline.length
//       ? article.byline.map((b) => ({
//           "@type": "Person",
//           name: b.name,
//         }))
//       : {
//           "@type": "Organization",
//           name: article.source || SITE_NAME,
//         },

//     publisher: {
//       "@type": "NewsMediaOrganization",
//       name: SITE_NAME,
//       logo: {
//         "@type": "ImageObject",
//         url: `${SITE_URL}/logo.webp`,
//       },
//     },
//   };

//   return (
//     <article className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
//       <JsonLd data={jsonLd} />

//       {/* Reading progress: pure CSS, hidden where the browser can't do it */}
//       <div
//         aria-hidden="true"
//         className="read-progress fixed inset-x-0 top-0 z-60 h-0.5 bg-danger"
//       />

//       <header className="mx-auto max-w-3xl">
//         {topics.length > 0 && (
//           <ul className="flex flex-wrap gap-2">
//             {topics.map((topic) => (
//               <li key={topic.id}>
//                 {topic.href ? (
//                   <Link
//                     href={topic.href}
//                     className="focus-ring inline-block rounded-full bg-danger/10 px-3 py-1 text-xs/normal font-semibold text-danger transition-colors duration-300 hover:bg-danger hover:text-white"
//                   >
//                     {topic.name}
//                   </Link>
//                 ) : (
//                   <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs/normal font-semibold text-neutral-600">
//                     {topic.name}
//                   </span>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}

//         <h1 className="mt-4 text-3xl/[1.35] font-black tracking-tight text-neutral-900 sm:text-5xl/[1.3]">
//           {article.title}
//         </h1>

//         <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-neutral-200 py-4">
//           {authors && (
//             <div className="flex items-center gap-3">
//               <span
//                 aria-hidden="true"
//                 className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-danger/10 text-base/none font-bold text-danger"
//               >
//                 {firstGrapheme(authors)}
//               </span>

//               <div>
//                 <p className="text-sm/[1.4] font-semibold text-neutral-900">
//                   {authors}
//                 </p>

//                 {role && (
//                   <p className="text-xs/normal text-neutral-500">{role}</p>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className="flex flex-col text-xs/[1.6] text-neutral-500 sm:ml-auto sm:text-right">
//             <time dateTime={article.firstPublished}>প্রকাশিত: {published}</time>

//             {updated && (
//               <time dateTime={article.lastPublished}>হালনাগাদ: {updated}</time>
//             )}
//           </div>

//           <span className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-xs/normal font-medium text-neutral-600">
//             <ClockIcon size={14} />
//             পড়তে {minutes.toLocaleString("bn-BD")} মিনিট
//           </span>
//         </div>
//       </header>

//       <div className="mt-8 mx-auto max-w-3xl">
//         <ArticleImage block={heroBlock} hero />
//       </div>

//       <div className="mx-auto mt-10 max-w-3xl">
//         <ArticleBody blocks={blocks} />

//         <footer className="mt-12 space-y-8 border-t border-neutral-200 pt-8">
//           {article.tags.length > 0 && (
//             <ul className="flex flex-wrap gap-2">
//               {article.tags.map((tag) => (
//                 <li key={tag}>
//                   <Link
//                     href={`/search?q=${encodeURIComponent(tag)}`}
//                     className="focus-ring inline-block rounded-full border border-neutral-300 px-3 py-1 text-sm/[1.43] text-neutral-700 transition-colors duration-300 hover:border-danger hover:text-danger"
//                   >
//                     #{tag}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}

//           <ShareLinks url={articleUrl} title={article.title} />

//           {/* <div className="rounded-2xl bg-neutral-50 p-5 text-sm/[1.7] text-neutral-600 ring-1 ring-neutral-200">
//             সূত্র:{" "}
//             <span className="font-semibold text-neutral-900">
//               {article.source}
//             </span>
//             {article.sourceUrl && (
//               <>
//                 {" · "}
//                 <a
//                   href={article.sourceUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="focus-ring font-semibold text-danger underline-offset-4 hover:underline"
//                 >
//                   মূল প্রতিবেদন পড়ুন
//                 </a>
//               </>
//             )}
//           </div> */}
//         </footer>
//       </div>
//     </article>
//   );
// };

// export default NewsDetailsPage;
