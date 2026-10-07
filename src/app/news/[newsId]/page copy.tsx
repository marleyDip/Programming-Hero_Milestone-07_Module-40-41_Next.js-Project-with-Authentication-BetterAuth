import { getNewsDetails } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const NewsDetailsPage = async (props: PageProps<"/news/[newsId]">) => {
  const { newsId } = await props.params;

  const news = await getNewsDetails(newsId);

  if (!news) {
    notFound();
  }

  const publishedDate = new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(news.firstPublished));

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <article className="mx-auto max-w-4xl">
        {/* Source / Category */}
        <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
          <span className="font-bold text-danger">{news.source}</span>

          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-neutral-300"
          />

          <time dateTime={news.firstPublished} className="text-neutral-500">
            {publishedDate}
          </time>
        </div>

        {/* Title */}
        <h1 className="text-3xl/tight font-black tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
          {news.title}
        </h1>

        {/* Description */}
        {/*  {news.description && (
          <p className="mt-5 text-lg/8 text-neutral-600 sm:text-xl/9">
            {news.description}
          </p>
        )} */}

        {/* Author */}
        {news.byline.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-y border-neutral-200 py-4 text-sm">
            <span className="font-semibold text-neutral-700">লিখেছেন</span>

            {news.byline.map((author) => (
              <span key={author.name} className="text-neutral-500">
                {author.name}
              </span>
            ))}
          </div>
        )}

        {/* Hero Image */}
        {news.imageUrl && (
          <figure className="mt-8 overflow-hidden rounded-2xl bg-neutral-100">
            <div className="relative aspect-video">
              <Image
                fill
                priority
                src={news.imageUrl}
                alt={news.title}
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover"
              />
            </div>
          </figure>
        )}

        {/* Article Body */}
        <div className="mt-8">
          {news.body.map((block, index) => {
            if (block.type === "text") {
              return (
                <p
                  key={index}
                  className="mb-6 text-[17px]/8 text-neutral-800 sm:text-lg/9"
                >
                  {block.text}
                </p>
              );
            }

            if (block.type === "image") {
              return (
                <figure key={index} className="my-8">
                  <div className="overflow-hidden rounded-2xl bg-neutral-100">
                    <Image
                      src={block.url}
                      alt={block.altText || block.caption || news.title}
                      width={block.width}
                      height={block.height}
                      sizes="(min-width: 1024px) 896px, 100vw"
                      className="h-auto w-full object-cover"
                    />
                  </div>

                  {(block.caption || block.copyrightHolder) && (
                    <figcaption className="mt-2 text-xs leading-5 text-neutral-500">
                      {block.caption}

                      {block.copyrightHolder && (
                        <span className="ml-2">© {block.copyrightHolder}</span>
                      )}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return null;
          })}
        </div>

        {/* Tags */}
        {news.tags.length > 0 && (
          <div className="mt-10 border-t border-neutral-200 pt-6">
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Original Source */}
        <footer className="mt-8 border-t border-neutral-200 pt-5">
          <p className="text-sm text-neutral-500">
            সূত্র:{" "}
            <Link
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-danger hover:underline"
            >
              {news.source}
            </Link>
          </p>
        </footer>
      </article>
    </main>
  );
};

export default NewsDetailsPage;

/* import { notFound } from "next/navigation";

const newsDetailsPage = async ({ params }: { params: { newsId: string } }) => {
  const { newsId } = await params;
  // console.log(newsId);

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
  );

  const data = await res.json();

  const news = data.data;

  if (!news) {
    notFound();
  }

  return (
    <div>
      <h1>{news.title}</h1>

      <p>{news.text}</p>
    </div>
  );
};

export default newsDetailsPage; */
