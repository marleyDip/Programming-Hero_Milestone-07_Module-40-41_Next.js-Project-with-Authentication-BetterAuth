"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { NAV_CLASS } from "./nav-styles";

export type NavItem = { href: string; label: string };

// Link styling lives in app/globals.css (.nav-link / .nav-list).
// It keys off aria-current="page", so no state classes are needed here.
const NavLinkList = ({ items }: { items: NavItem[] }) => {
  const pathname = usePathname();
  const activeRef = useRef<HTMLAnchorElement>(null);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  // On small screens the list scrolls sideways; keep the current section in view
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    activeRef.current?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [pathname]);

  return (
    <nav
      aria-label="প্রধান মেনু"
      // className="mt-5 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden max-md:mask-[linear-gradient(to_right,transparent,black_10px,black_calc(100%-10px),transparent)]"
      className={NAV_CLASS}
    >
      {/* No gap: spacing is padding on each link, so the pointer never rests in a dead zone that would make the current page flicker back on between two links */}
      <ul className="nav-list mx-auto flex w-max items-center gap-0.5">
        {items.map(({ href, label }) => {
          const active = isActive(href);

          return (
            <li key={href}>
              <Link
                ref={active ? activeRef : undefined}
                href={href}
                aria-current={active ? "page" : undefined}
                className="nav-link"
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavLinkList;

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useRef } from "react";

// export type NavItem = { href: string; label: string };

// // The underline is the link's ::after, so hover/active variants can drive it directly.
// const linkBase =
//   "relative block rounded-t-md px-2.5 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-300 " +
//   "after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:origin-center after:rounded-full after:bg-danger after:transition-transform after:duration-300 after:ease-out " +
//   // Hovered / keyboard-focused link takes on the full "active" look
//   "hover:bg-danger/5 hover:text-danger hover:after:scale-x-100 active:bg-danger/10 " +
//   "focus-visible:bg-danger/5 focus-visible:text-danger focus-visible:after:scale-x-100 " +
//   "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-danger " +
//   "motion-reduce:transition-none motion-reduce:after:transition-none";

// const linkIdle = "text-neutral-700 after:scale-x-0";

// // While the pointer is over the list, the current page steps back
// // unless it is the link being hovered. It returns when the pointer leaves.
// const linkCurrent =
//   "bg-danger/5 text-danger after:scale-x-100 " +
//   "group-hover/nav:not-hover:bg-transparent group-hover/nav:not-hover:text-neutral-700 group-hover/nav:not-hover:after:scale-x-0";

// const NavLinkList = ({ items }: { items: NavItem[] }) => {
//   const pathname = usePathname();
//   const activeRef = useRef<HTMLAnchorElement>(null);

//   const isActive = (href: string) =>
//     href === "/"
//       ? pathname === "/"
//       : pathname === href || pathname.startsWith(`${href}/`);

//   // On small screens the list scrolls sideways; keep the current section in view
//   useEffect(() => {
//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;

//     activeRef.current?.scrollIntoView({
//       inline: "center",
//       block: "nearest",
//       behavior: reduceMotion ? "auto" : "smooth",
//     });
//   }, [pathname]);

//   return (
//     <nav
//       aria-label="প্রধান মেনু"
//       className="mt-5 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden max-md:mask-[linear-gradient(to_right,transparent,black_10px,black_calc(100%-10px),transparent)]"
//     >
//       {/* No gap between items (spacing is padding), so the pointer never sits in a dead zone that would make the current page flicker back on between two links */}
//       <ul className="group/nav mx-auto flex w-max items-center gap-0.5 md:gap-1">
//         {items.map(({ href, label }) => {
//           const active = isActive(href);

//           return (
//             <li key={href}>
//               <Link
//                 ref={active ? activeRef : undefined}
//                 href={href}
//                 aria-current={active ? "page" : undefined}
//                 className={`${linkBase} ${active ? linkCurrent : linkIdle}`}
//               >
//                 {label}
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// };

// export default NavLinkList;

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useEffect, useRef } from "react";

// export type NavItem = { href: string; label: string };

// const NavLinkList = ({ items }: { items: NavItem[] }) => {
//   const pathname = usePathname();
//   const activeRef = useRef<HTMLAnchorElement>(null);

//   const isActive = (href: string) =>
//     href === "/"
//       ? pathname === "/"
//       : pathname === href || pathname.startsWith(`${href}/`);

//   // On small screens the list scrolls sideways; keep the current section in view
//   useEffect(() => {
//     const reduceMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)",
//     ).matches;

//     activeRef.current?.scrollIntoView({
//       inline: "center",
//       block: "nearest",
//       behavior: reduceMotion ? "auto" : "smooth",
//     });
//   }, [pathname]);

//   return (
//     <nav
//       aria-label="প্রধান মেনু"
//       className="mt-5 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [linear-gradient(to_right,transparent,black_10px,black_calc(100%-10px),transparent)]"
//     >
//       {/* w-max + mx-auto: centered when it fits, left-aligned and scrollable when it doesn't */}
//       <ul className="mx-auto flex w-max items-center gap-1 md:gap-1.5">
//         {items.map(({ href, label }) => {
//           const active = isActive(href);

//           return (
//             <li key={href}>
//               <Link
//                 ref={active ? activeRef : undefined}
//                 href={href}
//                 aria-current={active ? "page" : undefined}
//                 className={`group relative block rounded-t-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-300 hover:bg-danger/5 active:bg-danger/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-danger motion-reduce:transition-none ${
//                   active
//                     ? "bg-danger/5 text-danger"
//                     : "text-neutral-700 hover:text-danger"
//                 }`}
//               >
//                 {label}

//                 {/* Underline grows from the center: full for the active page, a lighter preview on hover */}
//                 <span
//                   aria-hidden="true"
//                   className={`absolute inset-x-1.5 bottom-0 h-0.5 origin-center rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none ${
//                     active
//                       ? "scale-x-100 bg-danger"
//                       : "scale-x-0 bg-danger/40 group-hover:scale-x-100"
//                   }`}
//                 />
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// };

// export default NavLinkList;

/* ==== Without Mobile Behavior ==== */

// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export type NavItem = { href: string; label: string };

// const NavLinkList = ({ items }: { items: NavItem[] }) => {
//   const pathname = usePathname();

//   const isActive = (href: string) =>
//     href === "/"
//       ? pathname === "/"
//       : pathname === href || pathname.startsWith(`${href}/`);

//   return (
//     <nav className="mt-5" aria-label="প্রধান মেনু">
//       {/* Wraps onto extra rows on small screens so every category is visible */}
//       <ul className="flex flex-wrap items-center justify-center gap-x-1">
//         {items.map(({ href, label }) => {
//           const active = isActive(href);

//           return (
//             <li key={href}>
//               <Link
//                 href={href}
//                 aria-current={active ? "page" : undefined}
//                 className={`group relative block rounded-t-md px-3 py-3 text-sm/[1.43] font-medium whitespace-nowrap transition-colors duration-300 hover:bg-danger/5 active:bg-danger/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-danger motion-reduce:transition-none ${
//                   active
//                     ? "bg-danger/5 text-danger"
//                     : "text-neutral-700 hover:text-danger"
//                 }`}
//               >
//                 {label}

//                 {/* Underline grows from the center: full for the active page, a lighter preview on hover */}
//                 <span
//                   aria-hidden="true"
//                   className={`absolute inset-x-3 bottom-0 h-0.5 origin-center rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none ${
//                     active
//                       ? "scale-x-100 bg-danger"
//                       : "scale-x-0 bg-danger/40 group-hover:scale-x-100"
//                   }`}
//                 />
//               </Link>
//             </li>
//           );
//         })}
//       </ul>
//     </nav>
//   );
// };

// export default NavLinkList;
