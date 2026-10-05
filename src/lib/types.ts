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
