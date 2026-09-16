import type { MetadataRoute } from "next";
import { indexable, siteOrigin } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return indexable
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: siteOrigin() + "/sitemap.xml",
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
