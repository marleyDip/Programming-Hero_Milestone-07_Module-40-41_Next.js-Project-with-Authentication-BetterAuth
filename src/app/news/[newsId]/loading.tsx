const ArticleImageSkeleton = ({ hero = false }: { hero?: boolean }) => (
  <div
    className={`relative overflow-hidden bg-neutral-200 ${
      hero ? "aspect-video rounded-3xl" : "aspect-3/2 rounded-2xl"
    }`}
  >
    <div className="absolute inset-0 animate-pulse bg-neutral-300 motion-reduce:animate-none" />
  </div>
);

const ArticleBodySkeleton = () => (
  <div className="space-y-6">
    {/* Lead paragraph */}
    <div className="space-y-3">
      <div className="h-6 w-full animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none sm:h-7" />
      <div className="h-6 w-[92%] animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none sm:h-7" />
      <div className="h-6 w-[68%] animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none sm:h-7" />
    </div>

    {/* Normal paragraph */}
    <div className="space-y-3">
      <div className="h-5 w-full animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none" />
      <div className="h-5 w-[96%] animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none" />
      <div className="h-5 w-[88%] animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none" />
      <div className="h-5 w-[72%] animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none" />
    </div>

    {/* Quote */}
    <div className="rounded-r-2xl border-l-4 border-neutral-300 bg-neutral-100 px-6 py-5">
      <div className="space-y-3">
        <div className="h-5 w-[94%] animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
        <div className="h-5 w-[78%] animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
      </div>
    </div>

    {/* More paragraphs */}
    <div className="space-y-3">
      <div className="h-5 w-full animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none" />
      <div className="h-5 w-[91%] animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none" />
      <div className="h-5 w-[84%] animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none" />
      <div className="h-5 w-[62%] animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none" />
    </div>
  </div>
);

const MostReadSkeleton = () => (
  <section aria-hidden="true">
    <div className="mb-4 flex items-center gap-3">
      <div className="h-6 w-1.5 animate-pulse rounded-full bg-neutral-300 motion-reduce:animate-none" />
      <div className="h-6 w-28 animate-pulse rounded-md bg-neutral-200 motion-reduce:animate-none" />
    </div>

    <div className="grid gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-3 rounded-xl border border-neutral-200 bg-white p-3"
        >
          <div className="h-20 w-24 shrink-0 animate-pulse rounded-lg bg-neutral-200 motion-reduce:animate-none" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-3 w-16 animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
            <div className="h-4 w-full animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
            <div className="h-4 w-[88%] animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
            <div className="h-4 w-[64%] animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

const NewsDetailsLoading = () => {
  return (
    <div
      aria-label="সংবাদ লোড হচ্ছে"
      aria-busy="true"
      className="mx-auto max-w-6xl px-4 py-8 sm:py-12"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Article */}
        <article>
          {/* Topics */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-6 w-16 animate-pulse rounded-full bg-neutral-200 motion-reduce:animate-none"
              />
            ))}
          </div>

          {/* Title */}
          <div className="mt-5 space-y-3">
            <div className="h-9 w-full animate-pulse rounded-lg bg-neutral-200 motion-reduce:animate-none sm:h-12" />
            <div className="h-9 w-[86%] animate-pulse rounded-lg bg-neutral-200 motion-reduce:animate-none sm:h-12" />
          </div>

          {/* Author + date + reading time */}
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-y border-neutral-200 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-neutral-200 motion-reduce:animate-none" />

              <div className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
                <div className="h-3 w-20 animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
              </div>
            </div>

            <div className="space-y-2 sm:ml-auto">
              <div className="h-3 w-32 animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
              <div className="h-3 w-28 animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />
            </div>

            <div className="h-6 w-28 animate-pulse rounded-full bg-neutral-200 motion-reduce:animate-none" />
          </div>

          {/* Hero image */}
          <div className="mt-8">
            <ArticleImageSkeleton hero />
          </div>

          {/* Article body */}
          <div className="mt-10">
            <ArticleBodySkeleton />

            {/* Footer */}
            <footer className="mt-12 space-y-8 border-t border-neutral-200 pt-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-7 w-20 animate-pulse rounded-full border border-neutral-200 bg-neutral-100 motion-reduce:animate-none"
                  />
                ))}
              </div>

              {/* Share */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="mr-1 h-5 w-16 animate-pulse rounded bg-neutral-200 motion-reduce:animate-none" />

                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-8 w-20 animate-pulse rounded-full border border-neutral-200 bg-neutral-100 motion-reduce:animate-none"
                  />
                ))}
              </div>
            </footer>
          </div>
        </article>

        {/* Most read */}
        <aside>
          <div className="lg:sticky lg:top-14">
            <MostReadSkeleton />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NewsDetailsLoading;
