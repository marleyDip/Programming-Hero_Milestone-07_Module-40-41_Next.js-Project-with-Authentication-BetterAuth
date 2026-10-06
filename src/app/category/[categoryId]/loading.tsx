import NewsCardSkeleton from "@/components/Common/NewsCardSkeleton";

const CategoryLoading = () => {
  return (
    <main className="mt-8">
      {/* Section Header */}
      <header className="relative mb-6">
        <div className="flex items-center gap-3">
          <div className="h-7 w-1 animate-pulse rounded-full bg-neutral-200" />

          <div className="h-9 w-40 animate-pulse rounded-md bg-neutral-200 sm:h-10 sm:w-52" />
        </div>

        <div className="mt-4 flex items-center justify-between border-y border-neutral-200 py-2.5">
          <div className="h-3 w-20 animate-pulse rounded bg-neutral-200" />

          <div className="h-3 w-16 animate-pulse rounded bg-neutral-200" />
        </div>

        <div className="absolute -bottom-px left-0 h-0.5 w-16 rounded-full bg-neutral-200" />
      </header>

      {/* News Grid */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <NewsCardSkeleton key={index} />
        ))}
      </section>
    </main>
  );
};

export default CategoryLoading;

/* const Loading = () => (
  <div className="animate-pulse" aria-busy="true">
    <div className="mb-5 h-8 w-48 rounded bg-neutral-200" />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-56 rounded-lg bg-neutral-200" />
      ))}
    </div>
  </div>
);

export default Loading; */
