import Image from "next/image";
import Link from "next/link";
import HeaderNav from "../Header/HeaderNav";

const Header = () => {
  // Fixed to Dhaka time so the server and the reader always see the same day
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return (
    <>
      <header className="border-t-4 border-danger bg-white">
        {/* Utility bar: date on the left, account actions on the right */}
        <div className="border-b border-neutral-200">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2">
            <time className="text-xs/[1.33] text-[#737373]">{date}</time>

            <div className="flex items-center gap-3 text-sm/[1.43]">
              <Link
                href="/signin"
                className="rounded-sm px-1 text-panel transition-colors hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-sm bg-danger px-3 py-1.5 font-semibold text-white transition-colors duration-300 hover:bg-danger-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
              >
                সাইন আপ
              </Link>
            </div>
          </div>
        </div>

        {/* Masthead */}
        <div className="mx-auto max-w-7xl px-4 py-5">
          <Link
            href="/"
            aria-label="Bangla News 24 - হোমপেজ"
            className="mx-auto flex w-fit items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-danger"
          >
            <Image
              src="/logo.webp"
              alt=""
              width={56}
              height={56}
              priority
              className="h-12 w-12 sm:h-14 sm:w-14"
            />

            <div className="flex flex-col">
              <span className="text-3xl/[1.2] font-bold tracking-normal text-danger sm:text-4xl/[1.2]">
                Bangla News 24
              </span>
              <span className="text-xs/[1.33] text-[#737373] sm:text-sm/[1.43]">
                বাংলা সংবাদ, এক জায়গায়
              </span>
            </div>
          </Link>
        </div>
      </header>

      {/* Outside <header> so it can stay pinned while the page scrolls */}
      <HeaderNav />
    </>
  );
};

export default Header;
