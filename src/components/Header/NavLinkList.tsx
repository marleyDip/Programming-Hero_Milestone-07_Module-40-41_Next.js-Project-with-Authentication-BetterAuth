"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export type NavItem = { href: string; label: string };

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
      className="mt-5 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [linear-gradient(to_right,transparent,black_10px,black_calc(100%-10px),transparent)]"
    >
      {/* w-max + mx-auto: centered when it fits, left-aligned and scrollable when it doesn't */}
      <ul className="mx-auto flex w-max items-center gap-1 md:gap-1.5">
        {items.map(({ href, label }) => {
          const active = isActive(href);

          return (
            <li key={href}>
              <Link
                ref={active ? activeRef : undefined}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group relative block rounded-t-md px-2 py-1 text-sm font-medium whitespace-nowrap transition-colors duration-300 hover:bg-danger/5 active:bg-danger/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-danger motion-reduce:transition-none ${
                  active
                    ? "bg-danger/5 text-danger"
                    : "text-neutral-700 hover:text-danger"
                }`}
              >
                {label}

                {/* Underline grows from the center: full for the active page, a lighter preview on hover */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-1.5 bottom-0 h-0.5 origin-center rounded-full transition-transform duration-300 ease-out motion-reduce:transition-none ${
                    active
                      ? "scale-x-100 bg-danger"
                      : "scale-x-0 bg-danger/40 group-hover:scale-x-100"
                  }`}
                />
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
