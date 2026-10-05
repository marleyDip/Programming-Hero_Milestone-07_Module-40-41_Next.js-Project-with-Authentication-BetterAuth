import NewsCard from "@/components/Common/NewsCard";
import MainNews from "@/components/Home/MainNews";
import MostRead from "@/components/Home/MostRead";
import SectionHeading from "@/components/Home/SectionHeading";
import { getScrapableCategories, getSectionHref, getSections } from "@/lib/api";

export default async function Home() {
  // const [lead, ...sections] = await getSections();

  // Both are cached, so fetching them together costs nothing extra
  const [[lead, ...sections], categories] = await Promise.all([
    getSections(),
    getScrapableCategories(),
  ]);

  // console.log(categories);

  if (!lead) {
    return (
      <p className="py-24 text-center text-neutral-500">
        এই মুহূর্তে কোনো খবর নেই।
      </p>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* News */}
        <div className="space-y-12">
          <MainNews news={lead.articles} />

          {sections.map((section) => (
            <section key={section.curationId}>
              {/* href is undefined when no category matches, so no "see all" link shows */}
              <SectionHeading href={getSectionHref(section, categories)}>
                {section.title}
              </SectionHeading>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {section.articles.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Most read stays in view while scrolling on large screens */}
        <aside>
          <div className="lg:sticky lg:top-24">
            <MostRead />
          </div>
        </aside>
      </div>
    </div>
  );
}

// import MainNews from "@/components/MainNews";

// import MostRead from "@/components/MostRead";
// import NewsCard from "@/components/NewsCard";

// interface IOtherSection {
//   curationId: string;
//   title: string;
//   articles: {
//     id: string;
//     title: string;
//     description: string;
//     category: string;
//     imageUrl: string;
//     imageAlt: string;
//   }[];
// }

// export default async function Home() {
//   const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
//   const data = await res.json();
//   const sections = data.data;
//   const mainNews = sections[0].articles;
//   const otherSections: IOtherSection[] = sections.slice(1);
//   // console.log(otherSections);

//   return (
//     <div>
//       <div className="grid gap-5 grid-cols-3  mt-5">
//         {/* news section */}
//         <div className=" col-span-2 ">
//           <MainNews news={mainNews} />

//           <div className=" grid gap-5 mt-5">
//             {otherSections.map((os) => (
//               <div className="" key={os.curationId}>
//                 <h1 className="font-bold border-b-2 pb-1  border-red-700">
//                   {os.title}
//                 </h1>

//                 <div className="grid mt-3 grid-cols-3 gap-2">
//                   {os.articles.map((news) => (
//                     <NewsCard key={news.id} news={news} />
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* most read section */}
//         <div className=" col-span-1 ">
//           <MostRead />
//         </div>
//       </div>
//     </div>
//   );
// }
