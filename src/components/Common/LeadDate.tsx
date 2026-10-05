import { getBanglaDateParts } from "@/lib/date";
import { cacheLife } from "next/cache";
import { ClockIcon } from "./Icons";

/**
 * Dateline for the lead story: icon, label, full date, and a time chip.
 * Uses the article's own date and time; if it has none, it shows today's date.
 * Cached, so reading the current time is allowed.
 */
const LeadDate = async ({ value }: { value?: string }) => {
  "use cache";
  cacheLife("minutes");

  const own = getBanglaDateParts(value);

  const parts = own ?? getBanglaDateParts(new Date());

  if (!parts) return null;

  return (
    <time dateTime={parts.iso} className="flex min-w-0 items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-danger ring-1 ring-neutral-200">
        <ClockIcon size={18} />
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="text-[11px]/none text-neutral-500">
          {own ? "প্রকাশিত" : "আজকের তারিখ"}
        </span>

        <span className="mt-1 text-sm/[1.4] font-semibold text-neutral-800">
          {parts.weekday}, {parts.day} {parts.monthLong} {parts.year}
        </span>
      </span>

      {own && (
        <span className="hidden shrink-0 rounded-full bg-white px-2.5 py-1 text-xs/normal font-medium text-neutral-600 ring-1 ring-neutral-200 sm:inline-flex">
          {parts.time}
        </span>
      )}
    </time>
  );
};

export default LeadDate;

// import { getBanglaDateParts } from "@/lib/date";
// import { cacheLife } from "next/cache";

// /**
//  * Calendar-tile date for the lead story.
//  * Shows the article's own date and time; if it has none (live blogs, for example),
//  * it shows today's date instead. Cached, so reading the current time is allowed.
//  */
// const LeadDate = async ({ value }: { value?: string }) => {
//   "use cache";
//   cacheLife("minutes");

//   const own = getBanglaDateParts(value);

//   const parts = own ?? getBanglaDateParts(new Date());

//   if (!parts) return null;

//   return (
//     <time dateTime={parts.iso} className="flex items-center gap-3">
//       {/* Calendar tile: turns red when the card is hovered */}
//       <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-neutral-900 text-white shadow-sm transition-colors duration-300 group-hover:bg-danger">
//         <span className="text-xl/none font-black">{parts.day}</span>

//         <span className="mt-1 text-[11px]/none text-white/70">
//           {parts.month}
//         </span>
//       </span>

//       <span className="flex min-w-0 flex-col">
//         <span className="text-sm/[1.4] font-semibold text-neutral-800">
//           {parts.weekday}
//         </span>

//         <span className="text-xs/normal text-neutral-500">
//           {parts.year}
//           {own && ` · ${parts.time}`}
//         </span>
//       </span>
//     </time>
//   );
// };

// export default LeadDate;
