import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: ["/admin/", "/api/"],
    },

    sitemap: "https://bangla-brief.vercel.app/sitemap.xml",
  };
}

/* 
                    SEO
                     │
          ┌──────────┴──────────┐
          │                     │
      Metadata             Crawling
          │                     │
   ┌──────┴──────┐        ┌─────┴─────┐
   │             │        │           │
 title       description  robots    sitemap
   │
   ├── canonical
   ├── Open Graph
   ├── Twitter/X
   └── JSON-LD

*/
