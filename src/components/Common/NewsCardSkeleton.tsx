const NewsCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-2 shadow-sm">
      {/* Image */}
      <div className="relative aspect-3/2 overflow-hidden rounded-xl bg-neutral-200">
        <div className="absolute inset-0 animate-pulse bg-neutral-200" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-3.5 pt-4 pb-3">
        {/* Category */}
        <div className="mb-2 h-3 w-20 animate-pulse rounded-full bg-neutral-200" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-[92%] animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-[68%] animate-pulse rounded bg-neutral-200" />
        </div>

        {/* Description */}
        <div className="mt-3 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />
          <div className="h-3 w-[78%] animate-pulse rounded bg-neutral-100" />
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="h-3 w-24 animate-pulse rounded bg-neutral-100" />
          <div className="h-3 w-16 animate-pulse rounded bg-neutral-100" />
        </div>
      </div>
    </div>
  );
};

export default NewsCardSkeleton;
