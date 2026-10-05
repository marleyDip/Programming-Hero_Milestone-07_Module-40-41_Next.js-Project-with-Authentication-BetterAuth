import type { News } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const MainNews = ({ news }: { news: News[] }) => {
  const [lead, ...others] = news;
  if (!lead) return null;

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
            <span className="rounded-full bg-danger px-3 py-1 text-xs/[1.5] font-semibold text-white">
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

      {/* More top stories */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-4 lg:col-span-4">
        <p className="mb-2 text-sm/[1.43] font-bold text-danger">আরও খবর</p>

        <ul className="divide-y divide-neutral-200">
          {others.slice(0, 4).map((item) => (
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
                  <p className="text-xs/[1.5] font-semibold text-danger">
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
