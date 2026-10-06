const LoadingPage = () => {
  return (
    <main className="px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main content */}
        <div className="space-y-12">
          {/* Lead News Skeleton */}
          <section className="grid gap-5 md:grid-cols-12">
            {/* Main story */}
            <article className="overflow-hidden rounded-3xl bg-white p-3 ring-1 ring-neutral-200 md:col-span-8">
              {/* Image */}
              <div className="aspect-16/10 animate-pulse rounded-xl bg-neutral-200" />

              {/* Content */}
              <div className="px-3 pt-6 pb-3 sm:px-5">
                {/* Category */}
                <div className="mb-3 h-3 w-20 animate-pulse rounded bg-neutral-200" />

                {/* Title */}
                <div className="space-y-2">
                  <div className="h-6 w-full animate-pulse rounded bg-neutral-200 sm:h-7" />

                  <div className="h-6 w-[82%] animate-pulse rounded bg-neutral-200 sm:h-7" />
                </div>

                {/* Description */}
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />

                  <div className="h-3 w-[88%] animate-pulse rounded bg-neutral-100" />

                  <div className="h-3 w-[65%] animate-pulse rounded bg-neutral-100" />
                </div>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between gap-3 rounded-2xl bg-neutral-50 p-2 pl-3 ring-1 ring-neutral-200">
                  <div className="h-4 w-28 animate-pulse rounded bg-neutral-200" />

                  <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 sm:w-28" />
                </div>
              </div>
            </article>

            {/* More stories */}
            <aside className="rounded-2xl border border-neutral-300 bg-white p-4 md:col-span-4">
              <div className="mb-3 h-4 w-20 animate-pulse rounded bg-neutral-200" />

              <div className="divide-y divide-neutral-200">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex gap-3 py-3">
                    {/* Thumbnail */}
                    <div className="h-20 w-24 shrink-0 animate-pulse rounded-lg bg-neutral-200" />

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 h-3 w-16 animate-pulse rounded bg-neutral-200" />

                      <div className="space-y-2">
                        <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />

                        <div className="h-3 w-[85%] animate-pulse rounded bg-neutral-200" />

                        <div className="h-3 w-[60%] animate-pulse rounded bg-neutral-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          {/* News Sections */}
          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <section key={sectionIndex}>
              {/* Section heading */}
              <div className="relative flex items-end justify-between gap-4 border-b border-neutral-200 pb-3">
                <div className="h-7 w-32 animate-pulse rounded bg-neutral-200 sm:w-40" />

                <div className="h-7 w-20 animate-pulse rounded-full bg-neutral-100" />

                <div className="absolute -bottom-px left-0 h-0.5 w-14 rounded-full bg-neutral-200" />
              </div>

              {/* Cards */}
              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, cardIndex) => (
                  <article
                    key={cardIndex}
                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white p-2 shadow-sm"
                  >
                    {/* Image */}
                    <div className="aspect-3/2 animate-pulse rounded-xl bg-neutral-200" />

                    {/* Content */}
                    <div className="flex flex-1 flex-col px-3.5 pt-4 pb-3">
                      {/* Category */}
                      <div className="mb-2 h-3 w-20 animate-pulse rounded bg-neutral-200" />

                      {/* Title */}
                      <div className="space-y-2">
                        <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />

                        <div className="h-4 w-[90%] animate-pulse rounded bg-neutral-200" />

                        <div className="h-4 w-[65%] animate-pulse rounded bg-neutral-200" />
                      </div>

                      {/* Description */}
                      <div className="mt-3 space-y-2">
                        <div className="h-3 w-full animate-pulse rounded bg-neutral-100" />

                        <div className="h-3 w-[75%] animate-pulse rounded bg-neutral-100" />
                      </div>

                      {/* Footer */}
                      <div className="mt-auto pt-4">
                        <div className="h-3 w-24 animate-pulse rounded bg-neutral-100" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Most Read */}
        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-24">
            <section className="rounded-2xl border border-neutral-200 bg-white p-5">
              {/* Heading */}
              <div className="mb-2 flex items-center gap-3">
                <div className="h-6 w-1.5 animate-pulse rounded-full bg-neutral-200" />

                <div className="h-6 w-28 animate-pulse rounded bg-neutral-200" />
              </div>

              {/* List */}
              <div className="divide-y divide-neutral-200">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-4 py-3">
                    {/* Number */}
                    <div className="h-8 w-9 shrink-0 animate-pulse rounded bg-neutral-100" />

                    {/* Title */}
                    <div className="flex-1 space-y-2 pt-1">
                      <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />

                      <div className="h-3 w-[80%] animate-pulse rounded bg-neutral-200" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default LoadingPage;

// const LoadingPage = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-rose-100 to-red-200 px-4">
//       <div className="text-center max-w-lg">
//         {/* Animated spinner */}
//         <div className="relative w-24 h-24 mx-auto mb-8">
//           {/* Outer ring */}
//           <div className="absolute inset-0 rounded-full border-4 border-red-200" />

//           {/* Spinning ring */}
//           <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-red-500 border-r-rose-600 animate-spin" />

//           {/* Inner pulsing dot */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
//           </div>
//         </div>

//         {/* Divider line */}
//         <div className="flex items-center justify-center gap-3 my-4">
//           <span className="h-px w-16 bg-red-400" />

//           <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />

//           <span className="h-px w-16 bg-red-400" />
//         </div>

//         {/* Message */}
//         <h2 className="text-2xl sm:text-3xl font-bold text-red-900 mb-3">
//           Loading
//         </h2>

//         <p className="text-red-700/80 leading-relaxed">
//           Just a moment, were getting things ready for you...
//         </p>

//         {/* Animated dots */}
//         <div className="flex items-center justify-center gap-2 mt-6">
//           <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-0.3s]" />

//           <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:-0.15s]" />

//           <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingPage;

// const Loading = () => {
//   return (
//     <main className="px-4 py-8">
//       <div className="mx-auto max-w-7xl space-y-8">
//         <div className="h-8 w-48 animate-pulse rounded-md bg-neutral-200" />

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div
//               key={index}
//               className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2"
//             >
//               <div className="aspect-3/2 animate-pulse rounded-xl bg-neutral-200" />

//               <div className="space-y-3 px-3.5 py-4">
//                 <div className="h-3 w-20 animate-pulse rounded bg-neutral-200" />

//                 <div className="space-y-2">
//                   <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
//                   <div className="h-4 w-[80%] animate-pulse rounded bg-neutral-200" />
//                 </div>

//                 <div className="h-3 w-[65%] animate-pulse rounded bg-neutral-100" />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Loading;
