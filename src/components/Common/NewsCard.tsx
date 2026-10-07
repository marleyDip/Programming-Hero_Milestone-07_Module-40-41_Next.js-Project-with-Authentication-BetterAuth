import type { News } from "@/lib/types";

import Image from "next/image";
import Link from "next/link";

import CardFooter from "./Cardfooter";

const NewsCard = ({ news }: { news: News }) => {
  // console.log(news);

  return (
    <Link
      href={`/news/${news.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-2 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-danger/20 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.2)] focus-visible:ring-2 focus-visible:ring-danger/40 focus-visible:outline-none motion-reduce:transition-none"
    >
      {/* Image */}
      <div className="relative aspect-3/2 overflow-hidden rounded-xl bg-neutral-100">
        <Image
          fill
          src={news.imageUrl}
          alt={news.imageAlt || news.title}
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
        />

        {/* Subtle image overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-3.5 pt-4 pb-3">
        {/* Category label */}
        <span className="mb-2 w-fit text-[11px] font-bold tracking-[0.12em] text-danger uppercase">
          {news.category}
        </span>

        {/* Title */}
        <h3 className="line-clamp-3 text-[17px] leading-6 font-bold tracking-[-0.01em] text-panel-foreground transition-colors duration-300 group-hover:text-danger">
          {news.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 line-clamp-2 text-sm leading-5.5 text-panel-secondary">
          {news.description}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-2">
          <CardFooter publishedAt={news.lastPublished} />
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;

/* <article className="group">
  <Link href={`/news/${news.id}`} className="block">
    <div className="relative aspect-16/10 overflow-hidden bg-neutral-100">
      <Image
        fill
        src={news.imageUrl}
        alt={news.imageAlt || news.title}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
      />
    </div>

    <div className="pt-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-[11px] font-bold tracking-[0.12em] text-danger uppercase">
          {news.category}
        </span>

        <span className="h-px w-6 bg-neutral-300" />
      </div>

      <h2 className="line-clamp-3 text-[19px] leading-[1.4] font-bold tracking-tight text-panel-foreground transition-colors duration-300 group-hover:text-danger">
        {news.title}
      </h2>
   
      <p className="mt-2 line-clamp-2 text-sm leading-5.5 text-panel-secondary">
        {news.description}
      </p>

      <div className="mt-4 border-t border-neutral-200 pt-3">
        <CardFooter publishedAt={news.lastPublished} />
      </div>
    </div>
  </Link>
</article> */

// import type { News } from "@/lib/types";
// import Image from "next/image";
// import Link from "next/link";
// import CardFooter from "./Cardfooter";

// const NewsCard = ({ news }: { news: News }) => {
//   return (
//     <Link
//       href={`/news/${news.id}`}
//       className="group focus-ring flex h-full flex-col rounded-2xl bg-white p-2 ring-1 ring-neutral-200 transition-all duration-500 hover:-translate-y-1 hover:ring-danger/30 hover:shadow-[0_24px_48px_-16px_rgba(0,0,0,0.18)] motion-reduce:transition-none"
//     >
//       {/* Photo sits inside a mat; radius is concentric with the card (16px - 8px padding) */}
//       <div className="relative aspect-3/2 overflow-hidden rounded-lg bg-neutral-100">
//         <Image
//           fill
//           src={news.imageUrl}
//           alt={news.imageAlt || news.title}
//           sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
//           className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
//         />
//       </div>

//       <div className="flex flex-1 flex-col px-3 pt-4 pb-3">
//         <span className="grid place-items-center w-fit rounded-full bg-danger/10 px-2.5 py-0.5 text-xs/normal font-semibold text-danger">
//           {news.category}
//         </span>

//         <h3 className="mt-3 line-clamp-3 text-base leading-6 font-semibold text-panel-foreground transition-colors duration-300 group-hover:text-danger">
//           {news.title}
//         </h3>

//         <p className="mt-2 line-clamp-2 text-sm leading-5 text-panel-secondary">
//           {news.description}
//         </p>

//         {/* Footer is pinned to the bottom so cards in a row line up */}
//         <CardFooter publishedAt={news.lastPublished} />
//       </div>
//     </Link>
//   );
// };

// export default NewsCard;

/*  Image overlay
  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

  // Category
  <div className="absolute top-3 left-3">
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/45 px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow-lg backdrop-blur-md">
      <span className="size-1.5 rounded-full bg-danger" />
      {news.category}
    </span>
  </div>
*/
