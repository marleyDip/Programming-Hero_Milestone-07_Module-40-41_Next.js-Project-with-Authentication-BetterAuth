export interface Navbar {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

export interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  imageAlt: string;
  lastPublished?: string; // ISO timestamp, e.g. "2026-10-04T14:30:14.678Z"
  type?: string; // "article" | "commentary" | "video" | "link"
}

export type CategoryNews = { title: string; news: News[] };

export interface Headline {
  id: string;
  title: string;
}

export interface Section {
  curationId: string;
  title: string;
  link: string | null; // BBC topic page, e.g. ".../topics/c907347rezkt"
  articles: News[];
}

// export interface NewsBodyImage {}
export interface ArticleImageBlock {
  type: "image";
  url: string;
  width: number;
  height: number;
  caption?: string;
  altText?: string;
  copyrightHolder?: string;
}

// export interface NewsBodyText {}
export interface ArticleTextBlock {
  type: "text";
  text: string; // several paragraphs separated by line breaks
}

// export type NewsBodyBlock = NewsBodyImage | NewsBodyText;
export type ArticleBlock = ArticleImageBlock | ArticleTextBlock;

// export interface Article {}
export interface NewsDetails {
  id: string;
  title: string;
  description: string;
  link: string;
  firstPublished?: string;
  lastPublished?: string;

  byline: {
    name: string;
    role: string | null;
  }[];

  topics: {
    id: string;
    name: string;
  }[];

  tags: string[];
  imageUrl: string;
  body: ArticleBlock[];
  text: string;

  wordCount: number;
  source: string;
  sourceUrl: string;
}
