import { formatBanglaDateTime, toIsoDate } from "@/lib/date";
import { cacheLife } from "next/cache";
import { ClockIcon } from "./Icons";

/** "🕒 ৪ অক্টোবর, ২০২৬ এ ১:২১ PM". Renders nothing for a missing or invalid timestamp. */
const PublishedAt = async ({
  value,
  className = "",
}: {
  value?: string;
  className?: string;
}) => {
  "use cache";
  cacheLife("minutes");

  const text = formatBanglaDateTime(value, { fallbackToToday: true });
  const hasOwnDate = value != null && !Number.isNaN(new Date(value).getTime());

  // if (!text) return null;

  return (
    <time
      // dateTime={value}
      dateTime={hasOwnDate ? value : toIsoDate()}
      className={`flex min-w-0 items-center gap-1.5 text-xs/normal text-neutral-500 ${className}`}
    >
      <ClockIcon className="shrink-0" />
      {text}
    </time>
  );
};

export default PublishedAt;
