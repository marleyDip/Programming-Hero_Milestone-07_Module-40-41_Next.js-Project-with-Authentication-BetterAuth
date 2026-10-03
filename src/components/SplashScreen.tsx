// Opening splash. Pure markup: the animation and the lift-away are CSS (see globals.css),

import Image from "next/image";

export const SplashScreen = () => (
  <div
    aria-hidden="true"
    className="splash fixed inset-0 z-100 flex flex-col items-center justify-center gap-7 bg-white px-6"
  >
    {/* Logo inside a ring that draws itself */}
    <div className="splash-pop relative grid h-24 w-24 place-items-center">
      <svg
        viewBox="0 0 96 96"
        fill="none"
        className="absolute inset-0 -rotate-90 text-danger"
      >
        <circle
          cx="48"
          cy="48"
          r="42"
          stroke="currentColor"
          strokeOpacity=".12"
          strokeWidth="3"
        />

        <circle
          cx="48"
          cy="48"
          r="42"
          pathLength="100"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="splash-ring"
        />
      </svg>

      <Image
        src="/logo.webp"
        alt=""
        width={56}
        height={56}
        priority
        className="h-14 w-14"
      />
    </div>

    {/* Wordmark and tagline */}
    <div
      className="splash-rise text-center"
      style={{ animationDelay: "350ms" }}
    >
      <p className="text-4xl/[1.2] font-bold tracking-tight text-danger sm:text-5xl/[1.2]">
        Bangla News 24
      </p>
      <p className="mt-1 text-sm/[1.43] text-neutral-500">
        বাংলা সংবাদ, এক জায়গায়
      </p>
    </div>

    {/* Double rule, like the masthead: draws outward from the center */}
    <div className="w-48 sm:w-64">
      <div className="splash-rule h-0.5 bg-neutral-900" />
      <div
        className="splash-rule mt-1 h-px bg-neutral-400"
        style={{ animationDelay: "450ms" }}
      />
    </div>

    <p
      className="splash-rise text-xs/[1.33] text-neutral-500"
      style={{ animationDelay: "800ms" }}
    >
      <span className="splash-pulse inline-block">সর্বশেষ খবর আনা হচ্ছে…</span>
    </p>
  </div>
);

/* ===== Splash design B: dark "newsroom" intro. Pure markup; animation is CSS (see globals.css). =====  */

const WORDMARK = "Bangla News 24";
const SECTIONS = [
  "রাজনীতি",
  "অর্থনীতি",
  "আন্তর্জাতিক",
  "খেলা",
  "বিনোদন",
  "প্রযুক্তি",
];

const Ticker = () => (
  <div className="flex shrink-0 items-center gap-8 pr-8">
    {SECTIONS.map((section) => (
      <span key={section} className="flex items-center gap-8">
        {section}
        <span className="text-[0.5rem] text-danger">●</span>
      </span>
    ))}
  </div>
);

export const SplashScreenSplit = () => (
  <div aria-hidden="true" className="sp2 fixed inset-0 z-100">
    {/* Two halves that slide apart at the end, like opening a newspaper */}
    <div className="sp2-top absolute inset-x-0 top-0 h-[50.5%] bg-neutral-950" />
    <div className="sp2-bottom absolute inset-x-0 bottom-0 h-[50.5%] bg-neutral-950" />

    <div className="sp2-content absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
      {/* Live badge */}
      <span
        className="sp2-fade inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs/[1.33] text-neutral-300"
        style={{ animationDelay: "100ms" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-danger" />
        </span>
        সর্বশেষ খবর
      </span>

      {/* Wordmark: each letter rises out of a mask */}
      <p className="flex text-5xl/[1.3] font-bold tracking-tight text-white sm:text-7xl/[1.3]">
        {WORDMARK.split("").map((char, i) => (
          <span key={i} className="inline-block overflow-hidden pb-1">
            <span
              className="sp2-letter inline-block"
              style={{ animationDelay: `${200 + i * 40}ms` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </p>

      <p
        className="sp2-fade text-sm/[1.43] text-neutral-400"
        style={{ animationDelay: "800ms" }}
      >
        বাংলা সংবাদ, এক জায়গায়
      </p>

      {/* Progress line */}
      <div className="h-0.5 w-48 overflow-hidden bg-white/10 sm:w-64">
        <div className="sp2-bar h-full bg-danger" />
      </div>
    </div>

    {/* Section ticker along the bottom */}
    <div className="sp2-content absolute inset-x-0 bottom-8 overflow-hidden text-sm/[1.43] text-neutral-500 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <div className="sp2-marquee flex w-max">
        <Ticker />
        <Ticker />
      </div>
    </div>
  </div>
);

// Splash design D: a bold red "press seal" that closes like a camera iris.
export const SplashScreenSeal = () => (
  <div
    aria-hidden="true"
    className="sp4 fixed inset-0 z-100 overflow-hidden bg-linear-to-b from-danger to-danger-foreground"
  >
    {/* Soft light behind the seal */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.16),transparent_60%)]" />

    <div className="sp4-content absolute inset-0 flex flex-col items-center justify-center gap-8 px-6 text-white">
      {/* Seal: rotating text ring with "24" at its heart */}
      <div className="sp4-pop relative h-48 w-48 sm:h-60 sm:w-60">
        <svg
          viewBox="0 0 200 200"
          className="sp4-spin absolute inset-0 h-full w-full"
        >
          <defs>
            <path
              id="sp4-circle"
              d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
            />
          </defs>

          <text
            fill="currentColor"
            fontSize="14"
            fontWeight="600"
            letterSpacing="2"
          >
            <textPath
              href="#sp4-circle"
              textLength="498"
              lengthAdjust="spacing"
            >
              BANGLA NEWS 24 • ALL THE NEWS, IN ONE PLACE •
            </textPath>
          </text>
        </svg>

        <svg
          viewBox="0 0 200 200"
          fill="none"
          className="absolute inset-0 h-full w-full"
        >
          <circle
            cx="100"
            cy="100"
            r="62"
            stroke="white"
            strokeOpacity=".35"
            strokeWidth="1.5"
          />

          <circle
            cx="100"
            cy="100"
            r="96"
            stroke="white"
            strokeOpacity=".2"
            strokeWidth="1"
          />
        </svg>

        <span className="sp4-num absolute inset-0 grid place-items-center text-6xl font-bold tracking-tight sm:text-7xl">
          24
        </span>
      </div>

      <p className="sp4-fade text-base/normal text-white/90 sm:text-lg/normal">
        বাংলা সংবাদ, এক জায়গায়
      </p>

      {/* Progress line */}
      <div className="h-px w-40 overflow-hidden bg-white/25 sm:w-56">
        <div className="sp4-bar h-full bg-white" />
      </div>
    </div>
  </div>
);
