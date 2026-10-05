import { getMostRead } from "@/lib/api";
import Link from "next/link";

const MostRead = async () => {
  const news = await getMostRead();
  if (news.length === 0) return null;

  return (
    <section
      aria-labelledby="most-read-title"
      // className="rounded-2xl border border-black/5 bg-white/70 p-5 shadow-sm backdrop-blur-xl"
      className="rounded-2xl border border-neutral-200 bg-white p-5"
    >
      <h2
        id="most-read-title"
        className="mb-2 flex items-center gap-3 text-xl/[1.3] font-bold text-neutral-900"
      >
        <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-danger" />
        সর্বাধিক পঠিত
      </h2>

      <ol className="divide-y divide-neutral-200">
        {news.map((item, i) => (
          <li key={item.id}>
            <Link
              href={`/news/${item.id}`}
              className="group focus-ring flex items-start gap-4 rounded-lg py-3"
            >
              <span
                aria-hidden="true"
                className={`w-9 shrink-0 text-center text-3xl/none font-black transition-colors duration-300 group-hover:text-danger ${
                  i < 3 ? "text-danger/70" : "text-neutral-300"
                }`}
              >
                {(i + 1).toLocaleString("bn-BD")}
              </span>
              <span className="text-sm/[1.7] font-medium text-neutral-800 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-danger">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default MostRead;

/* interface MostReadNews {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();

  const news: MostReadNews[] = data.data;

  return (
    <div className="card p-2 bg-base-100 border border-gray-300">
      <h1 className="font-bold text-red-700 mb-3">সর্বাধিক পঠিত</h1>

      <div className="grid gap-3">
        {news.map((n, i) => (
          <div className="flex gap-2 items-center" key={n.id}>
            <p className="text-2xl font-bold text-red-600">{i + 1}</p>{" "}
            <h2>{n.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostRead; */
