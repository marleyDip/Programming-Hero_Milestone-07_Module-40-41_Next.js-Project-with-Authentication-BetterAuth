import { ArrowRightIcon } from "./Icons";
import PublishedAt from "./PublishedAt";

/**
 * Bottom row of a news card: publish time on the left, an arrow that slides in on hover.
 * The arrow reacts to hover on the parent, so the card must have the "group" class.
 */
const CardFooter = ({ publishedAt }: { publishedAt?: string }) => (
  <div className="mt-auto pt-4">
    <div className="flex items-center justify-between gap-3 border-t border-neutral-100 pt-3">
      <PublishedAt value={publishedAt} />

      {/* ml-auto keeps the arrow on the right even when there is no date */}
      <ArrowRightIcon
        size={18}
        className="ml-auto shrink-0 -translate-x-2 text-danger opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
      />
    </div>
  </div>
);

export default CardFooter;
