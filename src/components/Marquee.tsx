import { getHeadlines } from "@/lib/api";
import { Headline } from "@/lib/types";
import type { CSSProperties } from "react";

// type Headline = Awaited<ReturnType<typeof getHeadlines>>[number];

const HeadlineItems = ({ headlines }: { headlines: Headline[] }) => (
  <>
    {headlines.map((headline) => (
      <li
        key={headline.id}
        className="flex items-center text-sm/5 whitespace-nowrap"
      >
        {headline.title}
        <span
          aria-hidden="true"
          className="mx-6 h-1.5 w-1.5 shrink-0 rotate-45 bg-white/50"
        />
      </li>
    ))}
  </>
);

// Pure-CSS ticker (see .ticker / .ticker-track in globals.css): no client JavaScript.
const Marquee = async () => {
  const headlines = await getHeadlines(10);
  if (headlines.length === 0) return null;

  // Keep the speed constant: more text means a longer loop, not a faster one
  const characters = headlines.reduce((total, h) => total + h.title.length, 0);
  const duration = Math.max(30, Math.round(characters * 0.4));

  return (
    <section
      aria-label="সর্বশেষ শিরোনাম"
      className="bg-linear-to-r from-danger-foreground via-danger to-danger-foreground text-white"
    >
      <div className="mx-auto flex max-w-7xl items-stretch">
        {/* Label with a slanted edge and a live dot */}
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-neutral-950 py-2.5 pr-8 pl-4 text-sm/5 font-bold [clip-path:polygon(0_0,100%_0,calc(100%-14px)_100%,0_100%)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-danger opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
          </span>
          সর্বশেষ
        </div>

        {/* Scrolling area: soft fade at both edges, pauses on hover or focus */}
        <div
          className="ticker min-w-0 flex-1 overflow-hidden mask-[linear-gradient(to_right,transparent,black_28px,black_calc(100%-28px),transparent)]"
          style={{ "--ticker-duration": `${duration}s` } as CSSProperties}
        >
          <div className="ticker-track flex w-max py-2.5">
            <ul className="flex shrink-0 items-center">
              <HeadlineItems headlines={headlines} />
            </ul>
            {/* Second copy makes the loop seamless; hidden from screen readers */}
            <ul
              aria-hidden="true"
              className="ticker-dup flex shrink-0 items-center"
            >
              <HeadlineItems headlines={headlines} />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
