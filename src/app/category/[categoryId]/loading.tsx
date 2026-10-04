const Loading = () => (
  <div className="animate-pulse" aria-busy="true">
    <div className="mb-5 h-8 w-48 rounded bg-neutral-200" />
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-56 rounded-lg bg-neutral-200" />
      ))}
    </div>
  </div>
);

export default Loading;
