"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CATEGORIES = [
  { label: "হোম", href: "/" },
  { label: "বাংলাদেশ", href: "/category/bangladesh" },
  { label: "রাজনীতি", href: "/category/politics" },
  { label: "অর্থনীতি", href: "/category/economy" },
  { label: "আন্তর্জাতিক", href: "/category/world" },
  { label: "খেলা", href: "/category/sports" },
  { label: "বিনোদন", href: "/category/entertainment" },
  { label: "প্রযুক্তি", href: "/category/technology" },
  { label: "মতামত", href: "/category/opinion" },
];

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger";

const HeaderNav = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close any open panel with Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      aria-label="প্রধান মেনু"
      className="sticky top-0 z-50 border-y border-neutral-200 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4">
        {/* Mobile: menu toggle */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => {
            setMenuOpen((v) => !v);
            setSearchOpen(false);
          }}
          className={`-ml-2 flex cursor-pointer items-center gap-2 rounded-sm px-2 py-3 text-sm/[1.43] font-semibold text-panel hover:text-danger md:hidden ${focusRing}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
          মেনু
        </button>

        {/* Desktop: category links */}
        <ul className="hidden flex-1 items-center overflow-x-auto md:flex">
          {CATEGORIES.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={href} className="shrink-0">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`block border-b-2 px-3 py-3 text-sm/[1.43] whitespace-nowrap transition-colors ${focusRing} ${
                    active
                      ? "border-danger font-semibold text-danger"
                      : "border-transparent text-panel hover:text-danger"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Search toggle */}
        <button
          type="button"
          aria-label={searchOpen ? "সার্চ বন্ধ করুন" : "সার্চ করুন"}
          aria-expanded={searchOpen}
          aria-controls="site-search"
          onClick={() => {
            setSearchOpen((v) => !v);
            setMenuOpen(false);
          }}
          className={`-mr-2 cursor-pointer rounded-sm p-3 text-panel hover:text-danger ${focusRing}`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {searchOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <>
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Search panel: a plain GET form, so it works even before JS loads */}
      {searchOpen && (
        <div id="site-search" className="border-t border-neutral-200">
          <form
            action="/search"
            role="search"
            onSubmit={() => setSearchOpen(false)}
            className="mx-auto flex max-w-7xl gap-2 px-4 py-3"
          >
            <input
              type="search"
              name="q"
              required
              autoFocus
              placeholder="খবর খুঁজুন…"
              aria-label="খবর খুঁজুন"
              className="min-w-0 flex-1 border border-neutral-300 px-3 py-2 text-sm/[1.43] text-panel placeholder:text-[#737373] focus:border-danger focus:outline-none"
            />
            <button
              type="submit"
              className={`cursor-pointer bg-danger px-4 py-2 text-sm/[1.43] font-semibold text-white transition-colors hover:bg-danger-foreground ${focusRing}`}
            >
              খুঁজুন
            </button>
          </form>
        </div>
      )}

      {/* Mobile: category list */}
      {menuOpen && (
        <ul id="mobile-menu" className="border-t border-neutral-200 md:hidden">
          {CATEGORIES.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li
                key={href}
                className="border-b border-neutral-100 last:border-b-0"
              >
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={`block border-l-4 px-4 py-3 text-base/normal ${focusRing} ${
                    active
                      ? "border-danger bg-red-50 font-semibold text-danger"
                      : "border-transparent text-panel"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
};

export default HeaderNav;
