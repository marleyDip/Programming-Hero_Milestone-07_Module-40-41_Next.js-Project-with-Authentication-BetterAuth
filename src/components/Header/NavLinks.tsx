import { categoryHref, getScrapableCategories } from "@/lib/api";
import NavLinkList, { type NavItem } from "./NavLinkList";

const NavLinks = async () => {
  const categories = await getScrapableCategories();

  const items: NavItem[] = [
    { href: "/", label: "হোম" },
    ...categories.map((category) => ({
      href: categoryHref(category.slug),
      label: category.title,
    })),
  ];

  return <NavLinkList items={items} />;
};

export default NavLinks;

/* import type { Navbar } from "@/lib/types";
import NavLinkList, { type NavItem } from "./NavLinkList";

const getCategories = async (): Promise<Navbar[]> => {
  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
      next: { revalidate: 300 }, // categories rarely change; refresh every 5 min
    });
    if (!res.ok) return [];

    const data = await res.json();
    return data.data ?? [];
  } catch {
    // The header is in the root layout, so a failed fetch must not break every page
    return [];
  }
};

const NavLinks = async () => {
  const categories = await getCategories();

  const items: NavItem[] = [
    { href: "/", label: "হোম" },
    ...categories
      .filter((category) => category.scrapable)
      .map((category) => ({
        // The API returns slugs like "politics" with no leading slash.
        // A relative href breaks on nested pages (/news/x -> /news/politics).
        href: category.slug.startsWith("/")
          ? category.slug
          : `/${category.slug}`,
        label: category.title,
      })),
  ];

  return <NavLinkList items={items} />;
};

export default NavLinks; */

/* import { Navbar } from "@/lib/types";
import Link from "next/link";

const NavLinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");
  const data = await res.json();
  // console.log(data);

  const navbar: Navbar[] = data.data;
  // console.log(navbar);

  const filteredNavbar = navbar.filter((navbar) => navbar.scrapable);

  return (
    <div className="mt-5 flex items-center justify-center gap-5">
      <Link href={"/"}>হোম</Link>

      {filteredNavbar.map((nav, index) => (
        <Link
          key={index}
          href={nav.slug}
          className="text-panel hover:text-danger text-sm"
        >
          {nav.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
 */
