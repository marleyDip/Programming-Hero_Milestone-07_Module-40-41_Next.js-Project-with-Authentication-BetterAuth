import { formatBanglaDateTime } from "@/lib/date";
import { ClockIcon } from "./Icons";

/** "🕒 ৪ অক্টোবর, ২০২৬ এ ১:২১ PM". Renders nothing for a missing or invalid timestamp. */
const PublishedAt = ({
  value,
  className = "",
}: {
  value?: string;
  className?: string;
}) => {
  const text = formatBanglaDateTime(value);
  if (!text) return null;

  return (
    <time
      dateTime={value}
      className={`flex min-w-0 items-center gap-1.5 text-xs/normal text-neutral-500 ${className}`}
    >
      <ClockIcon className="shrink-0" />
      {text}
    </time>
  );
};

export default PublishedAt;
