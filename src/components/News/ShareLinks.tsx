/** Plain share links: no JavaScript and no third-party scripts. */
const ShareLinks = ({ url, title }: { url: string; title: string }) => {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm/[1.43] font-semibold text-neutral-900">
        শেয়ার করুন
      </span>

      {links.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring rounded-full border border-neutral-300 px-4 py-1.5 text-sm/[1.43] font-medium text-neutral-700 transition-all duration-300 hover:border-danger hover:bg-danger hover:text-white"
        >
          {label}
        </a>
      ))}
    </div>
  );
};

export default ShareLinks;
