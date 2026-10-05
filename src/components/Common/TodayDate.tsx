import { formatBanglaDate, toIsoDate } from "@/lib/date";
import { cacheLife } from "next/cache";

const TodayDate = async ({ className }: { className?: string }) => {
  "use cache";
  cacheLife("minutes");

  const now = new Date();

  return (
    <time dateTime={toIsoDate(now)} className={className}>
      {formatBanglaDate(now)}
    </time>
  );
};

export default TodayDate;
