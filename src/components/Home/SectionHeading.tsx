import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "../Common/Icons";

/**
 * Editorial section heading: bold title over a hairline, with a short red accent
 * that stretches when the row is hovered. Pass `href` to add a "see all" link.
 */
const SectionHeading = ({
  children,
  href,
  linkLabel = "সব দেখুন",
}: {
  children: ReactNode;
  href?: string;
  linkLabel?: string;
}) => (
  <div className="group relative flex items-end justify-between gap-4 border-b border-neutral-200 pb-3 after:absolute after:-bottom-px after:left-0 after:h-0.5 after:w-14 after:rounded-full after:bg-danger after:transition-[width] after:duration-500 hover:after:w-28 motion-reduce:after:transition-none">
    <h2 className="text-2xl/[1.3] font-black tracking-tight text-neutral-900">
      {children}
    </h2>

    {href && (
      <Link
        href={href}
        className="group focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm/[1.43] font-semibold text-neutral-600 transition-colors duration-300 group-hover:bg-danger/10 group-hover:text-danger"
      >
        {linkLabel}
        <ArrowRightIcon
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
        />
      </Link>
    )}
  </div>
);

export default SectionHeading;

// import type { ReactNode } from "react";

// const SectionHeading = ({ children }: { children: ReactNode }) => (
//   <h2 className="flex items-center gap-3 text-xl/[1.3] font-bold text-neutral-900">
//     <span aria-hidden="true" className="h-6 w-1.5 rounded-full bg-danger" />
//     {children}
//     <span aria-hidden="true" className="h-px flex-1 bg-neutral-200" />
//   </h2>
// );

// export default SectionHeading;
