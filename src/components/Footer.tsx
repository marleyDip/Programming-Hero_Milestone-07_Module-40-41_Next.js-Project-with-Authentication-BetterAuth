import { ArrowRightIcon } from "@/components/Common/Icons";
import { categoryHref, getScrapableCategories } from "@/lib/api";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";
import Link from "next/link";
import CurrentYear from "./CurrentYear";

// Replace these with your real details
const CONTACT = {
  email: "info@banglanews24.com",
  address: "ঢাকা, বাংলাদেশ",
};

const DEVELOPER = {
  name: "Md Sofian Hasan",
  href: "https://marleydip.netlify.app/",
};

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "YouTube", href: "https://www.youtube.com/" },
  { label: "X", href: "https://x.com/" },
];

// These pages need to exist: /about, /contact, /advertise, /privacy, /terms
const SITE_LINKS = [
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "যোগাযোগ", href: "/contact" },
  { label: "বিজ্ঞাপন দিন", href: "/advertise" },
  { label: "গোপনীয়তা নীতি", href: "/privacy" },
  { label: "ব্যবহারের শর্তাবলী", href: "/terms" },
];

const linkClass =
  "focus-ring inline-block rounded-sm text-sm/[1.43] transition-all duration-300 hover:translate-x-0.5 hover:text-white motion-reduce:transition-none";

const Heading = ({ id, children }: { id: string; children: string }) => (
  <h2
    id={id}
    className="flex items-center gap-2 text-sm/[1.43] font-bold text-white"
  >
    <span aria-hidden="true" className="h-3.5 w-1 rounded-full bg-danger" />
    {children}
  </h2>
);

const Footer = async () => {
  const categories = await getScrapableCategories();

  return (
    <footer className="mt-16 border-t-4 border-danger bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4">
        {/* Masthead band */}
        <div className="flex flex-col gap-6 border-b border-white/10 py-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-3xl/[1.2] font-bold tracking-tight text-white sm:text-4xl/[1.2]">
              {SITE_NAME}
            </p>
            <p className="mt-2 text-sm/[1.43]">{SITE_TAGLINE}</p>
          </div>

          <ul className="flex flex-wrap gap-2" aria-label="সামাজিক মাধ্যম">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm/[1.43] font-medium text-neutral-200 transition-all duration-300 hover:border-danger hover:bg-danger hover:text-white motion-reduce:transition-none"
                >
                  {label}
                  <ArrowRightIcon size={14} className="-rotate-45" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-sm text-sm/[1.8]">
              বাংলাদেশ ও বিশ্বের সর্বশেষ খবর, বিশ্লেষণ ও ভিডিও — নির্ভরযোগ্য
              সংবাদ, এক জায়গায়।
            </p>
            <p className="mt-3 max-w-sm text-xs/[1.7] text-neutral-500">
              প্রতিটি প্রতিবেদনের সূত্র সংশ্লিষ্ট পাতায় উল্লেখ করা আছে।
            </p>
          </div>

          {categories.length > 0 && (
            <nav aria-labelledby="footer-categories" className="lg:col-span-4">
              <Heading id="footer-categories">বিভাগসমূহ</Heading>
              <ul className="mt-4 columns-2 gap-6">
                {categories.map((category) => (
                  <li key={category.slug} className="mb-2.5 break-inside-avoid">
                    <Link
                      href={categoryHref(category.slug)}
                      className={linkClass}
                    >
                      {category.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <nav aria-labelledby="footer-site" className="lg:col-span-2">
            <Heading id="footer-site">সাইট</Heading>
            <ul className="mt-4 space-y-2.5">
              {SITE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <Heading id="footer-contact">যোগাযোগ</Heading>
            <address className="mt-4 space-y-2.5 text-sm/[1.43] not-italic">
              <p>{CONTACT.address}</p>
              <p>
                <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                  {CONTACT.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="grid items-center gap-4 border-t border-white/10 py-6 text-center text-xs/normal sm:grid-cols-3 sm:text-left">
          <p>
            © <CurrentYear /> {SITE_NAME}। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <p className="sm:text-center">
            {/* Designed &amp; developed by ডিজাইন ও ডেভেলপমেন্ট: */}
            Built with care by{" "}
            <a
              href={DEVELOPER.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group focus-ring relative inline-flex items-center gap-1 rounded-sm font-semibold text-white transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-danger after:transition-transform after:duration-300 hover:after:scale-x-100 motion-reduce:transition-none motion-reduce:after:transition-none"
            >
              {DEVELOPER.name}
              <ArrowRightIcon
                size={12}
                className="-rotate-45 group-hover:rotate-0 transition-all duration-300 group-hover:-translate-x-0.5"
              />
            </a>
          </p>

          <a
            href="#"
            className="focus-ring group inline-flex items-center gap-2 justify-self-center rounded-full border border-white/15 px-4 py-1.5 font-medium text-neutral-300 transition-colors duration-300 hover:border-white/40 hover:text-white sm:justify-self-end"
          >
            উপরে যান
            <ArrowRightIcon
              size={14}
              className="-rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* 
<div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs/normal sm:flex-row">
          <p>
            © <CurrentYear /> {SITE_NAME}। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <a
            href="#"
            className="focus-ring group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-medium text-neutral-300 transition-colors duration-300 hover:border-white/40 hover:text-white"
          >
            উপরে যান
            <ArrowRightIcon
              size={14}
              className="-rotate-90 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </a>
        </div>
*/
