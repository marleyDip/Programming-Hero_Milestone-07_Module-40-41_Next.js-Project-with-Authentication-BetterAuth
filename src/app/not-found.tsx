import TodayDate from "@/components/Common/TodayDate";
import { categoryHref, getScrapableCategories } from "@/lib/api";
import type { Metadata } from "next";
import Link from "next/link";

// Title becomes "পাতাটি খুঁজে পাওয়া যায়নি | <site name>" via the layout template.
// Next.js already sends a 404 status and noindex for this file.
export const metadata: Metadata = {
  title: "পাতাটি খুঁজে পাওয়া যায়নি",
  description: "আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি।",
};

// The middle "0" of ৪0৪, drawn as a magnifying glass.
// .nf-search and .nf-rise are defined in app/globals.css
const Lens = () => (
  <svg
    viewBox="0 0 100 100"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    className="nf-search h-[0.74em] w-[0.74em] shrink-0 text-danger"
  >
    <circle cx="42" cy="42" r="30" strokeWidth="11" />
    <path d="M65 65 L90 90" strokeWidth="14" />
    <path d="M27 36 A18 18 0 0 1 39 25" strokeWidth="4" opacity=".45" />
  </svg>
);

const NotFound = async () => {
  const categories = await getScrapableCategories();
  // const date = formatBanglaDate();

  return (
    <section
      aria-labelledby="nf-title"
      className="mx-auto max-w-5xl px-4 py-10 sm:py-16"
    >
      <div className="border-y-4 border-double border-neutral-900 py-8 sm:py-12">
        {/* Kicker */}
        <div className="nf-rise flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-neutral-300" />
          <p className="text-sm font-semibold text-danger">
            বিশেষ বুলেটিন · ত্রুটি ৪০৪
          </p>
          <span aria-hidden="true" className="h-px flex-1 bg-neutral-300" />
        </div>

        {/* Giant 404 with a magnifying-glass zero */}
        <div
          role="img"
          aria-label="ত্রুটি ৪০৪"
          className="nf-rise flex items-center justify-center py-6 text-[8rem] leading-[0.9] font-black tracking-tighter text-neutral-900 select-none sm:text-[12rem] lg:text-[16rem]"
          style={{ animationDelay: "120ms" }}
        >
          <span aria-hidden="true">৪</span>
          <Lens />
          <span aria-hidden="true">৪</span>
        </div>

        {/* Headline, deck, dateline */}
        <div
          className="nf-rise mx-auto max-w-2xl text-center"
          style={{ animationDelay: "240ms" }}
        >
          <h1
            id="nf-title"
            className="text-3xl font-bold text-neutral-900 sm:text-4xl"
          >
            দুঃখিত, এই পাতাটি খুঁজে পাওয়া যাচ্ছে না
          </h1>
          <p className="mt-4 text-base/[1.7] text-neutral-600">
            আপনি যে লিঙ্কটি খুঁজছেন তা হয়তো সরানো হয়েছে, নাম পাল্টেছে, অথবা
            কখনোই ছিল না। চলুন, আপনাকে সঠিক খবরে ফিরিয়ে নিই।
          </p>

          <p className="mt-3 text-xs text-neutral-500">
            ঢাকা, <TodayDate />
          </p>
        </div>

        {/* Actions: search & back home */}
        <div
          className="nf-rise mx-auto mt-8 flex max-w-xl flex-col gap-3 text-sm/[1.43] sm:flex-row"
          style={{ animationDelay: "360ms" }}
        >
          <form action="/search" role="search" className="flex flex-1">
            <input
              type="search"
              name="q"
              required
              placeholder="খবর খুঁজুন…"
              aria-label="খবর খুঁজুন"
              className="min-w-0 flex-1 rounded-l-lg border border-neutral-300 px-4 py-2.5 text-sm/[1.43] text-neutral-800 placeholder:text-neutral-500 focus:border-danger focus:outline-none"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-r-lg border border-neutral-900 bg-neutral-900 px-4 py-2.5 font-semibold text-white transition-colors duration-300 hover:border-danger hover:bg-danger focus-ring"
            >
              খুঁজুন
            </button>
          </form>

          <Link href="/" className="btn-premium px-5 py-2.5">
            হোমপেজে ফিরুন
          </Link>
        </div>

        {/* Category shortcuts: hidden if the API is unreachable */}
        {categories.length > 0 && (
          <div
            className="nf-rise mx-auto mt-10 max-w-3xl text-center"
            style={{ animationDelay: "480ms" }}
          >
            <p className="mb-3 text-sm/[1.43] font-semibold text-neutral-900">
              অথবা বিভাগ ধরে পড়ুন
            </p>

            <ul className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={categoryHref(category.slug)}
                    className="block rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm/[1.43] text-neutral-700 transition-all duration-300 hover:-translate-y-px hover:border-danger hover:bg-danger/5 hover:text-danger focus-ring motion-reduce:transition-none"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default NotFound;

// import type { Navbar } from "@/lib/types";
// import type { Metadata } from "next";
// import Link from "next/link";

// // Title becomes "পাতাটি খুঁজে পাওয়া যায়নি | <site name>" via the layout template.
// // Next.js already sends a 404 status and noindex for this file.
// export const metadata: Metadata = {
//   title: "পাতাটি খুঁজে পাওয়া যায়নি",
//   description: "আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি।",
// };

// const getCategories = async (): Promise<Navbar[]> => {
//   try {
//     const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
//       next: { revalidate: 300 },
//     });
//     if (!res.ok) return [];
//     const data = await res.json();
//     return data.data ?? [];
//   } catch {
//     return [];
//   }
// };

// // The middle "০" of ৪০৪, drawn as a magnifying glass
// const Lens = () => (
//   <svg
//     viewBox="0 0 100 100"
//     aria-hidden="true"
//     fill="none"
//     stroke="currentColor"
//     strokeLinecap="round"
//     className="nf-search h-[0.74em] w-[0.74em] shrink-0 text-danger"
//   >
//     <circle cx="42" cy="42" r="30" strokeWidth="11" />
//     <path d="M65 65 L90 90" strokeWidth="14" />
//     <path d="M27 36 A18 18 0 0 1 39 25" strokeWidth="4" opacity=".45" />
//   </svg>
// );

// const NotFound = async () => {
//   const categories = (await getCategories()).filter((c) => c.scrapable);

//   const date = new Date().toLocaleDateString("bn-BD", {
//     dateStyle: "full",
//     timeZone: "Asia/Dhaka",
//   });

//   return (
//     <section
//       aria-labelledby="nf-title"
//       className="mx-auto max-w-5xl px-4 py-10 sm:py-16"
//     >
//       {/* Motion is opt-in: nothing animates for users who prefer reduced motion */}
//       <style>{`
//         @keyframes nf-rise { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
//         @keyframes nf-search { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(6px,-8px) rotate(8deg); } }
//         @media (prefers-reduced-motion: no-preference) {
//           .nf-rise { animation: nf-rise .7s cubic-bezier(.2,.7,.2,1) both; }
//           .nf-search { animation: nf-search 3.6s ease-in-out infinite; }
//         }
//       `}</style>

//       <div className="border-y-4 border-double border-neutral-900 py-8 sm:py-12">
//         {/* Kicker */}
//         <div className="nf-rise flex items-center gap-4">
//           <span aria-hidden="true" className="h-px flex-1 bg-neutral-300" />
//           <p className="text-sm/[1.43] font-semibold text-danger">
//             বিশেষ বুলেটিন · ত্রুটি ৪০৪
//           </p>
//           <span aria-hidden="true" className="h-px flex-1 bg-neutral-300" />
//         </div>

//         {/* Giant 404 with a magnifying-glass zero */}
//         <div
//           role="img"
//           aria-label="ত্রুটি ৪০৪"
//           className="nf-rise flex items-center justify-center py-6 text-[8rem] leading-[0.9] font-black tracking-tighter text-neutral-900 select-none sm:text-[12rem] lg:text-[16rem]"
//           style={{ animationDelay: "120ms" }}
//         >
//           <span aria-hidden="true">৪</span>
//           <Lens />
//           <span aria-hidden="true">৪</span>
//         </div>

//         {/* Headline, deck, dateline */}
//         <div
//           className="nf-rise mx-auto max-w-2xl text-center"
//           style={{ animationDelay: "240ms" }}
//         >
//           <h1
//             id="nf-title"
//             className="text-3xl/[1.3] font-bold text-neutral-900 sm:text-4xl/[1.3]"
//           >
//             দুঃখিত, এই পাতাটি খুঁজে পাওয়া যাচ্ছে না
//           </h1>
//           <p className="mt-4 text-base/[1.7] text-neutral-600">
//             আপনি যে লিঙ্কটি খুঁজছেন তা হয়তো সরানো হয়েছে, নাম পাল্টেছে, অথবা
//             কখনোই ছিল না। চলুন, আপনাকে সঠিক খবরে ফিরিয়ে নিই।
//           </p>
//           <p className="mt-3 text-xs/[1.33] text-neutral-500">ঢাকা, {date}</p>
//         </div>

//         {/* Actions: search + back home */}
//         <div
//           className="nf-rise mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
//           style={{ animationDelay: "360ms" }}
//         >
//           <form action="/search" role="search" className="flex flex-1">
//             <input
//               type="search"
//               name="q"
//               required
//               placeholder="খবর খুঁজুন…"
//               aria-label="খবর খুঁজুন"
//               className="min-w-0 flex-1 rounded-l-lg border border-neutral-300 px-4 py-2.5 text-sm/[1.43] text-neutral-800 placeholder:text-neutral-500 focus:border-danger focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="cursor-pointer rounded-r-lg border border-neutral-900 bg-neutral-900 px-4 py-2.5 text-sm/[1.43] font-semibold text-white transition-colors duration-300 hover:border-danger hover:bg-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
//             >
//               খুঁজুন
//             </button>
//           </form>

//           <Link
//             href="/"
//             className="relative cursor-pointer overflow-hidden rounded-lg bg-linear-to-b from-danger to-danger-foreground px-5 py-2.5 text-center text-sm/[1.43] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.2),0_4px_12px_rgba(196,0,4,0.3),inset_0_1px_0_rgba(255,255,255,0.25)] transition-all duration-300 after:pointer-events-none after:absolute after:inset-0 after:-translate-x-full after:bg-linear-to-r after:from-transparent after:via-white/25 after:to-transparent after:transition-transform after:duration-700 hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(0,0,0,0.2),0_8px_20px_rgba(196,0,4,0.4),inset_0_1px_0_rgba(255,255,255,0.3)] hover:after:translate-x-full active:translate-y-0 active:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger motion-reduce:transition-none motion-reduce:after:hidden"
//           >
//             হোমপেজে ফিরুন
//           </Link>
//         </div>

//         {/* Category shortcuts: hidden if the API is unreachable */}
//         {categories.length > 0 && (
//           <div
//             className="nf-rise mx-auto mt-10 max-w-3xl text-center"
//             style={{ animationDelay: "480ms" }}
//           >
//             <p className="mb-3 text-sm/[1.43] font-semibold text-neutral-900">
//               অথবা বিভাগ ধরে পড়ুন
//             </p>
//             <ul className="flex flex-wrap justify-center gap-2">
//               {categories.map((category) => (
//                 <li key={category.slug}>
//                   <Link
//                     href={
//                       category.slug.startsWith("/")
//                         ? category.slug
//                         : `/${category.slug}`
//                     }
//                     className="block rounded-full border border-neutral-300 px-3.5 py-1.5 text-sm/[1.43] text-neutral-700 transition-all duration-300 hover:-translate-y-px hover:border-danger hover:bg-danger/5 hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger motion-reduce:transition-none"
//                   >
//                     {category.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default NotFound;
