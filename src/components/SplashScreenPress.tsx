// Splash design C: a front page that typesets itself, then wipes away.

import TodayDate from "./Common/TodayDate";

// import { formatBanglaDate } from "@/lib/date";

const Line = ({
  width,
  size,
  tone,
  delay,
}: {
  width: string;
  size: string;
  tone: string;
  delay: number;
}) => (
  <span
    className={`sp3-line block rounded-full ${size} ${tone}`}
    style={{ width, animationDelay: `${delay}ms` }}
  />
);

const HEADLINE = ["100%", "88%", "54%"];
const BODY = ["100%", "96%", "100%", "72%"];
const COLUMNS = [
  ["100%", "92%", "100%", "64%"],
  ["100%", "100%", "85%", "48%"],
  ["96%", "100%", "90%", "70%"],
];

const SplashScreenPress = () => {
  // const date = formatBanglaDate();

  // Every bar "prints" 30ms after the one before it
  let step = 0;
  const at = () => 450 + step++ * 30;

  return (
    <>
      <div
        aria-hidden="true"
        className="sp3 fixed inset-0 z-100 flex items-center justify-center bg-[#faf8f4] px-5"
      >
        <div className="w-full max-w-3xl">
          {/* Masthead */}
          <div className="sp3-fade">
            <div className="flex items-center gap-5">
              <span className="sp3-rule h-px flex-1 bg-neutral-400" />
              <p className="text-4xl/[1.2] font-bold tracking-tight text-neutral-900 sm:text-6xl/[1.2]">
                Bangla News 24
              </p>

              <span className="sp3-rule h-px flex-1 bg-neutral-400" />
            </div>

            <div className="mt-3 flex items-center justify-between border-y border-neutral-900 py-1.5 text-xs/[1.33] text-neutral-600">
              <span className="flex items-center gap-2">
                ঢাকা
                <span className="mx-0 inline-block h-1 w-1 rounded-full bg-neutral-500 align-middle" />
                <TodayDate />
              </span>

              <span className="hidden sm:inline">বাংলা সংবাদ, এক জায়গায়</span>

              <span>প্রথম পাতা</span>
            </div>
          </div>

          {/* Lead story: headline and text on the left, photo on the right */}
          <div className="mt-6 grid gap-5 sm:grid-cols-[1.6fr_1fr]">
            <div>
              <Line width="48px" size="h-1.5" tone="bg-danger" delay={at()} />
              <div className="mt-3 space-y-2.5">
                {HEADLINE.map((w, i) => (
                  <Line
                    key={i}
                    width={w}
                    size="h-3.5"
                    tone="bg-neutral-900"
                    delay={at()}
                  />
                ))}
              </div>

              <div className="mt-4 space-y-2">
                {BODY.map((w, i) => (
                  <Line
                    key={i}
                    width={w}
                    size="h-1.5"
                    tone="bg-neutral-300"
                    delay={at()}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="relative aspect-4/3 overflow-hidden bg-neutral-200">
                <div className="sp3-shimmer absolute inset-0 bg-linear-to-r from-transparent via-white/70 to-transparent" />
              </div>

              <div className="mt-2.5">
                <Line
                  width="70%"
                  size="h-1.5"
                  tone="bg-neutral-300"
                  delay={at()}
                />
              </div>
            </div>
          </div>

          {/* Three text columns (hidden on small screens) */}
          <div className="mt-6 hidden grid-cols-3 gap-5 border-t border-neutral-300 pt-5 sm:grid">
            {COLUMNS.map((column, c) => (
              <div key={c} className="space-y-2">
                {column.map((w, i) => (
                  <Line
                    key={i}
                    width={w}
                    size="h-1.5"
                    tone="bg-neutral-300"
                    delay={at()}
                  />
                ))}
              </div>
            ))}
          </div>

          <p className="mt-7 text-center text-xs/[1.33] text-neutral-500">
            <span className="sp3-pulse inline-block">
              আজকের সংস্করণ ছাপা হচ্ছে…
            </span>
          </p>
        </div>
      </div>

      {/* Red leading edge that rides up with the wipe */}
      <div className="sp3-edge pointer-events-none fixed inset-x-0 bottom-0 z-101 h-0.75 bg-danger" />
    </>
  );
};

export default SplashScreenPress;
