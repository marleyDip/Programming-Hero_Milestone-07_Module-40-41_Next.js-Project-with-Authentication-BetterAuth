import type { News } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "../Common/Icons";
import LeadDate from "../Common/LeadDate";

const MainNews2 = ({ news }: { news: News[] }) => {
  const [lead, ...others] = news;
  if (!lead) return null;

  // console.log(lead);

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      {/* Lead story: full-bleed photo with the headline over it */}
      <Link
        href={`/news/${lead.id}`}
        className="group focus-ring relative block overflow-hidden rounded-2xl lg:col-span-8"
      >
        <div className="relative aspect-4/3 bg-neutral-200 sm:aspect-16/10">
          <Image
            fill
            priority
            src={lead.imageUrl}
            alt={lead.imageAlt || lead.title}
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <span className="rounded-full bg-danger px-3 py-1 text-xs/normal font-semibold text-white">
              {lead.category}
            </span>

            <h2 className="mt-3 line-clamp-3 text-2xl/[1.4] font-bold text-white sm:text-4xl/[1.35]">
              <span className="">{lead.title}</span>
            </h2>
            <p className="mt-3 hidden max-w-2xl line-clamp-2 text-base/[1.7] text-white/80 sm:block">
              {lead.description}
            </p>
          </div>
        </div>
      </Link>

      {/* Lead story: photo under headline*/}
      <Link
        href={`/news/${lead.id}`}
        className="group focus-ring flex flex-col rounded-3xl bg-white p-3 ring-1 ring-neutral-200 transition-all duration-500 hover:shadow-[0_28px_56px_-20px_rgba(0,0,0,0.2)] hover:ring-danger/30 motion-reduce:transition-none lg:col-span-8"
      >
        {/* Photo sits inside a mat; radius is concentric with the card (24px - 12px padding) */}
        <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-neutral-200">
          <Image
            fill
            priority
            src={lead.imageUrl}
            alt={lead.imageAlt || lead.title}
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-black/30 to-transparent"
          />

          <span className="absolute top-4 left-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-white/30 bg-black/25 px-3.5 py-1.5 text-xs/normal font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 group-hover:bg-danger/70">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-danger transition-colors duration-300 group-hover:bg-white"
            />
            {lead.category}
          </span>
        </div>

        <div className="group flex flex-1 flex-col px-3 pt-6 pb-3 sm:px-5">
          {/* Small red accent that stretches on hover */}
          <span
            aria-hidden="true"
            className="block h-1 w-10 rounded-full bg-danger transition-[width] duration-500 group-hover:w-20 motion-reduce:transition-none"
          />

          <h2 className="mt-1 md:mt-2 line-clamp-2 text-xl/[1.3] font-bold tracking-normal text-panel-foreground sm:text-2xl/[1.4] group-hover:text-danger-secondary">
            <span className="title-link">{lead.title}</span>
          </h2>

          <p className="mt-2 md:mt-3 line-clamp-2 text-sm/[1.43] text-panel-secondary sm:line-clamp-3">
            {lead.description}
          </p>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-dashed border-neutral-200 pt-5">
            <LeadDate value={lead.lastPublished} />

            <span className="inline-flex items-center gap-3 text-sm/[1.43] font-semibold text-neutral-800 transition-colors duration-300 group-hover:text-danger">
              <span className="hidden sm:inline">বিস্তারিত পড়ুন</span>

              <span className="grid h-10 w-10 place-items-center rounded-full border border-neutral-300 transition-all duration-300 group-hover:border-danger group-hover:bg-danger group-hover:text-white">
                <ArrowRightIcon
                  size={18}
                  className="-rotate-45 transition-transform duration-300 group-hover:rotate-0 motion-reduce:transition-none"
                />
              </span>
            </span>
          </div>
        </div>
      </Link>

      {/* More top stories - Separate Card Type */}
      <div className="lg:col-span-4">
        <p className="mb-3 text-sm/[1.43] font-bold text-danger">আরও খবর</p>

        <ul className="grid gap-3">
          {others.slice(0, 4).map((item) => (
            <li key={item.id}>
              <Link
                href={`/news/${item.id}`}
                className="group focus-ring flex gap-3 rounded-xl border border-neutral-200 bg-white p-3 transition-all duration-300 hover:border-danger/40 hover:shadow-md motion-reduce:transition-none"
              >
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  <Image
                    fill
                    src={item.imageUrl}
                    alt={item.imageAlt || item.title}
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-xs/normal font-semibold text-danger">
                    {item.category}
                  </p>

                  <h3 className="line-clamp-3 text-sm/[1.6] font-semibold text-neutral-900 transition-colors group-hover:text-danger">
                    {item.title}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainNews2;

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

const MainNews = ({ news }: { news: News[] }) => {
  const [firstNews, ...otherNews] = news;

  //   const otherNews = news.slice(1)
  // console.log(otherNews)

  return (
    <div className="flex gap-2">
      <Link href={`/news/${firstNews.id}`}>
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <Image
              height={600}
              width={600}
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt}
            />
          </figure>
          <div className="card-body">
            <p className="text-red-600 font-semibold">{firstNews.category}</p>
            <h2 className="card-title">{firstNews.title}</h2>
            <p>{firstNews.description}</p>
          </div>
        </div>
      </Link>

      <div className="grid gap-2">
        {otherNews.slice(0, 4).map((on) => (
          <div
            className="card bg-base-100 border border-gray-300 p-5"
            key={on.id}
          >
            <p className="text-red-600 font-semibold">{firstNews.category}</p>
            <div>{on.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainNews; */

/* More top stories

<div className="rounded-2xl bg-neutral-50 p-5 ring-1 ring-neutral-200 lg:col-span-4">
  <p className="mb-4 flex items-center gap-2 text-sm/[1.43] font-bold text-neutral-900">
    <span className="relative flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full rounded-full bg-danger opacity-75 motion-safe:animate-ping" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
    </span>
    আরও খবর
  </p>

  // The left border is the timeline; each story gets a dot on it
  <ol className="border-l border-neutral-300 pl-5">
    {others.slice(0, 4).map((item) => (
      <li key={item.id} className="group relative">
        <span
          aria-hidden="true"
          className="absolute top-6 -left-[26px] h-2.5 w-2.5 rounded-full border-2 border-neutral-300 bg-neutral-50 transition-all duration-300 group-hover:scale-125 group-hover:border-danger group-hover:bg-danger"
        />

        <Link
          href={`/news/${item.id}`}
          className="focus-ring flex items-start gap-3 rounded-lg py-3 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          <div className="min-w-0 flex-1">
            <p className="text-xs/[1.5] font-semibold text-danger">
              {item.category}
            </p>
            <h3 className="mt-0.5 line-clamp-3 text-sm/[1.6] font-semibold text-neutral-800 transition-colors duration-300 group-hover:text-danger">
              {item.title}
            </h3>
            <PublishedAt value={item.lastPublished} className="mt-1.5" />
          </div>

          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-200">
            <Image
              fill
              src={item.imageUrl}
              alt={item.imageAlt || item.title}
              sizes="80px"
              className="object-cover transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none"
            />
          </div>
        </Link>
      </li>
    ))}
  </ol>
</div>
*/
