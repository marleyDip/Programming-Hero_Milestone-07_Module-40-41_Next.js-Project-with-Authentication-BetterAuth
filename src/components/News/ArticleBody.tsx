import type { ArticleBlock } from "@/lib/types";
import ArticleImage from "./ArticleImage";

// Promotional lines the source puts inside the article text
const PROMO = /হোয়াটসঅ্যাপ চ্যানেল ফলো/;

/** A text block holds several paragraphs separated by line breaks. */
const paragraphsOf = (text: string) =>
  text
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph && !PROMO.test(paragraph));

/** A paragraph that is entirely a quotation becomes a pull quote. */
const isQuote = (paragraph: string) => /^["“].+["”]$/.test(paragraph);

const ArticleBody = ({ blocks }: { blocks: ArticleBlock[] }) => {
  const leadKey = blocks
    .flatMap((block, i) =>
      block.type === "text"
        ? paragraphsOf(block.text).map((paragraph, j) => ({
            paragraph,
            key: `${i}-${j}`,
          }))
        : [],
    )
    .find(({ paragraph }) => !isQuote(paragraph))?.key;

  return (
    <div className="space-y-6 text-lg/loose text-neutral-800">
      {blocks.map((block, i) => {
        if (block.type === "image")
          return <ArticleImage key={i} block={block} />;

        if (block.type !== "text") return null; // unknown block types are skipped

        return paragraphsOf(block.text).map((paragraph, j) => {
          const key = `${i}-${j}`;

          if (isQuote(paragraph)) {
            return (
              <blockquote
                key={key}
                className="rounded-r-2xl border-l-4 border-danger bg-danger/5 py-4 pr-5 pl-6 text-xl/[1.8] font-semibold text-neutral-900"
              >
                {paragraph}
              </blockquote>
            );
          }

          // The first paragraph is the standfirst, set larger
          const isLead = key === leadKey;

          return (
            <p
              key={key}
              className={
                isLead
                  ? "text-xl/[1.9] font-medium text-neutral-900 sm:text-2xl/[1.8]"
                  : undefined
              }
            >
              {paragraph}
            </p>
          );
        });
      })}
    </div>
  );
};

export default ArticleBody;
