import type { News } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "../Common/Icons";
import LeadDate from "../Common/LeadDate";

const MainNews = ({ news }: { news: News[] }) => {
  const [lead, ...others] = news;
  if (!lead) return null;

  // console.log(lead);

  return (
    <div className="grid gap-5 md:grid-cols-12">
      <Link
        href={`/news/${lead.id}`}
        className="group focus-ring flex flex-col rounded-3xl bg-white p-3 ring-1 ring-neutral-200 transition-all duration-500 hover:shadow-[0_28px_56px_-20px_rgba(0,0,0,0.2)] hover:ring-danger/30 motion-reduce:transition-none md:col-span-8"
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
          <h2 className="mt-1 md:mt-2 line-clamp-2 text-xl/[1.3] font-bold tracking-normal text-panel-foreground sm:text-2xl/[1.4] group-hover:text-danger-secondary">
            {lead.title}
          </h2>

          <p className="mt-2 md:mt-3 line-clamp-2 text-sm/[1.43] text-panel-secondary sm:line-clamp-3">
            {lead.description}
          </p>

          <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-neutral-50 p-2 pl-3 ring-1 ring-neutral-200 transition-colors duration-300 group-hover:bg-danger/5 group-hover:ring-danger/20">
            <LeadDate value={lead.lastPublished} />

            <span className="inline-flex shrink-0 items-center gap-3 rounded-full bg-neutral-900 py-1.5 pr-1.5 pl-1.5 text-sm/[1.43] font-semibold text-white transition-colors duration-300 group-hover:bg-danger sm:pl-4">
              <span className="hidden sm:inline">সম্পূর্ণ পড়ুন</span>

              <span className="grid h-8 w-8 place-items-center rounded-full bg-danger text-white transition-colors duration-300 group-hover:bg-white group-hover:text-danger">
                <ArrowRightIcon
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </span>
            </span>
          </div>
        </div>
      </Link>

      {/* More top stories */}
      <div className="rounded-2xl border border-neutral-300 bg-white p-4 md:col-span-4">
        <p className="mb-2 text-sm/[1.43] font-bold text-danger">আরও খবর</p>

        <ul className="divide-y divide-neutral-200">
          {others.slice(0, 5).map((item) => (
            <li key={item.id}>
              <Link
                href={`/news/${item.id}`}
                className="group focus-ring flex gap-3 rounded-lg py-3"
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

export default MainNews;
