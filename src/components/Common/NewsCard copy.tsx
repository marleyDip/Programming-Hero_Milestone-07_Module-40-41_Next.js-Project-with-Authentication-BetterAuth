import type { News } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import CardFooter from "./Cardfooter";

const NewsCard = ({ news }: { news: News }) => {
  // const published = formatBanglaDateTime(news.lastPublished);

  return (
    <Link
      href={`/news/${news.id}`}
      className="group focus-ring flex h-full flex-col rounded-2xl bg-white p-2 ring-1 ring-neutral-200 transition-all duration-500 hover:-translate-y-1 hover:ring-danger/30 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)] motion-reduce:transition-none"
    >
      {/* Photo sits inside a mat; radius is concentric with the card (16px - 8px padding) */}
      <div className="relative aspect-3/2 overflow-hidden rounded-lg bg-neutral-100">
        <Image
          fill
          src={news.imageUrl}
          alt={news.imageAlt || news.title}
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
        />

        {/* <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        /> */}

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-black/30 to-transparent"
        />

        <span className="absolute top-3 left-3 inline-flex items-center justify-center rounded-full border border-black/30 bg-black/25 px-3 py-1 text-xs/normal font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 group-hover:border-white/40 group-hover:bg-danger/70">
          {news.category}
        </span>

        {/*  <span className="absolute top-3 left-3 inline-flex items-center justify-center rounded-full bg-white/90 px-3 py-1 text-xs/normal font-semibold text-danger shadow-sm backdrop-blur-md">
          {news.category}
        </span> */}
      </div>

      <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
        <span className="grid place-items-center w-fit rounded-full bg-danger/10 px-2.5 py-0.5 text-xs/normal font-semibold text-danger">
          {news.category}
        </span>

        <h3 className="mt-3 line-clamp-3 text-base leading-6 font-semibold text-panel-foreground transition-colors duration-300 group-hover:text-danger">
          {news.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-panel-secondary">
          {news.description}
        </p>
        {/* Footer is pinned to the bottom so cards in a row line up */}
        <CardFooter publishedAt={news.lastPublished} />
        {/* <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-3">
            {published ? (
              <time
                dateTime={news.lastPublished}
                className="flex min-w-0 items-center gap-1.5 text-xs/normal text-neutral-500"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {published}
              </time>
            ) : (
              <span />
            )}

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="shrink-0 -translate-x-2 text-danger opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </div>
        </div> */}
      </div>
    </Link>
  );
};

export default NewsCard;

// import type { News } from "@/lib/types";
// import Image from "next/image";
// import Link from "next/link";

// const NewsCard = ({ news }: { news: News }) => (
//   <Link
//     href={`/news/${news.id}`}
//     className="group focus-ring flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-danger/30 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] motion-reduce:transition-none"
//   >
//     <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
//       <Image
//         fill
//         src={news.imageUrl}
//         alt={news.imageAlt || news.title}
//         sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
//         className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
//       />
//     </div>

//     <div className="flex flex-1 flex-col gap-2 p-4">
//       <span className="grid place-items-center w-fit rounded-full bg-danger/10 px-2.5 py-0.5 text-xs/normal font-semibold text-danger">
//         {news.category}
//       </span>

//       <h3 className="line-clamp-3 text-lg/[1.45] font-bold text-neutral-700 transition-colors duration-500">
//         <span className="group-hover:text-danger-foreground">{news.title}</span>
//       </h3>

//       <p className="line-clamp-2 text-sm/[1.7] text-neutral-600">
//         {news.description}
//       </p>
//     </div>
//   </Link>
// );

// export default NewsCard;

/* import Image from "next/image";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
}

const NewsCard = ({ news }: { news: News }) => {
  return (
    <Link href={`/news/${news.id}`}>
      <div className="card bg-base-100  shadow-sm">
        <figure>
          <Image
            height={600}
            width={600}
            src={news.imageUrl}
            alt={news.imageAlt}
          />
        </figure>
        <div className="card-body">
          <p className="text-red-600 font-semibold">{news.category}</p>
          <h2 className="card-title">{news.title}</h2>
          <p>{news.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard; */

/* 
<div
  aria-hidden="true"
  className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-black/30 to-transparent"
/>

<span className="absolute top-3 left-3 inline-flex items-center justify-center gap-1.5 rounded-full border border-white/30 bg-black/25 px-3 py-1 text-xs/normal font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 group-hover:border-white/40 group-hover:bg-danger/70">
  <span
    aria-hidden="true"
    className="h-1.5 w-1.5 rounded-full bg-danger transition-colors duration-300 group-hover:bg-white"
  />
  {news.category}
</span>

*/
