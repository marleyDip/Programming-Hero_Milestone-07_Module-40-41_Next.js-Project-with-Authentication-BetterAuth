import type { ArticleImageBlock } from "@/lib/types";
import Image from "next/image";

/** A photo with its caption and photographer credit. Uses the real width/height, so nothing jumps. */
const ArticleImage = ({
  block,
  hero = false,
}: {
  block: ArticleImageBlock;
  hero?: boolean;
}) => (
  <figure>
    <div
      className={`relative overflow-hidden bg-neutral-200 ring-1 ring-neutral-200 ${
        hero ? "rounded-3xl" : "rounded-2xl"
      }`}
      style={{ aspectRatio: `${block.width} / ${block.height}` }}
    >
      <Image
        fill
        priority={hero}
        src={block.url}
        alt={block.altText?.trim() || block.caption || ""}
        sizes={
          hero
            ? "(min-width: 1024px) 64rem, 100vw"
            : "(min-width: 768px) 48rem, 100vw"
        }
        className="object-cover"
      />
    </div>

    {(block.caption || block.copyrightHolder) && (
      <figcaption className="mx-auto mt-3 flex max-w-3xl flex-wrap items-baseline gap-x-2 gap-y-1 px-1 text-sm/[1.6] text-neutral-500">
        {block.caption}
        {block.copyrightHolder && (
          <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs/normal text-neutral-500">
            ছবি: {block.copyrightHolder}
          </span>
        )}
      </figcaption>
    )}
  </figure>
);

export default ArticleImage;
