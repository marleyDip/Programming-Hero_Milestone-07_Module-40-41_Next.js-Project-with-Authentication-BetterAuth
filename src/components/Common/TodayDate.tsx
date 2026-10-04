import { formatBanglaDate, toIsoDate } from "@/lib/date";
import { cacheLife } from "next/cache";

const TodayDate = async ({ className }: { className?: string }) => {
  "use cache";
  cacheLife("minutes");

  return (
    <time dateTime={toIsoDate()} className={className}>
      {formatBanglaDate()}
    </time>
  );
};

export default TodayDate;
