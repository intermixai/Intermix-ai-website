import type { MetadataRoute } from "next";
import { indexable, siteOrigin } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return indexable
    ? ["", "/services", "/about", "/faq", "/contact", "/privacy"].map(
        (path) => ({ url: siteOrigin() + path }),
      )
    : [];
}
