import { formatBanglaDateTime, toIsoDate } from "@/lib/date";
import { cacheLife } from "next/cache";

const isValid = (value?: string) =>
  value != null && !Number.isNaN(new Date(value).getTime());

/**
 * Published / updated lines for an article.
 * If the article has no usable publish date, it shows today's date instead.
 * This is a cached component, which is the only place the current time may be read
 * under Cache Components.
 */
const ArticleDates = async ({
  firstPublished,
  lastPublished,
}: {
  firstPublished?: string;
  lastPublished?: string;
}) => {
  "use cache";
  cacheLife("minutes");

  const hasPublished = isValid(firstPublished);

  const published = formatBanglaDateTime(firstPublished, {
    fallbackToToday: true,
  });

  // Only show "updated" when both dates are real and meaningfully apart
  const wasUpdated =
    hasPublished &&
    isValid(lastPublished) &&
    Date.parse(lastPublished!) - Date.parse(firstPublished!) > 5 * 60_000;

  return (
    <div className="flex flex-col text-xs/[1.6] text-neutral-500 sm:ml-auto sm:text-right">
      <time dateTime={hasPublished ? firstPublished : toIsoDate()}>
        {hasPublished ? "প্রকাশিত" : "আজকের তারিখ"}: {published}
      </time>

      {wasUpdated && (
        <time dateTime={lastPublished}>
          হালনাগাদ: {formatBanglaDateTime(lastPublished)}
        </time>
      )}
    </div>
  );
};

export default ArticleDates;
