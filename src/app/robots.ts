import { SITE_URL } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/search"],

      // disallow: ["/admin/", "/api/"],
    },

    sitemap: `${SITE_URL}/sitemap.xml`,
    // sitemap: "https://bangla-brief.vercel.app/sitemap.xml",
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
