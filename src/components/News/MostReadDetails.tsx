import { getSections } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

// const MostReadDetails = async ({ excludeId }: { excludeId?: string }) => {}

const MostReadDetails = async ({ excludeId }: { excludeId?: string }) => {
  const news = await getSections();

  const filterNews =
    news[0]?.articles.filter((item) => item.id !== excludeId) ?? [];

  // console.log(news);

  // if (news.length === 0) return null;

  return (
    <section
      aria-labelledby="most-read-title"
      // className="rounded-2xl border border-neutral-200 bg-white p-5"
    >
      <h2
        id="most-read-title"
        className="mb-2 flex items-center gap-3 text-xl/[1.3] font-bold text-neutral-900"
      >
        <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-danger" />
        প্রধান খবর
      </h2>

      <ul className="grid gap-3">
        {filterNews.slice(0, 11).map((item, index) => (
          <li
            key={item.id}
            className={index >= 5 ? "hidden lg:block" : undefined}
          >
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
    </section>
  );
};

export default MostReadDetails;
