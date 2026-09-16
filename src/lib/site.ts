import content from "../../content/site.json";
import type { Metadata } from "next";
export const site = content;
export function siteOrigin() {
  const candidate =
    process.env.SITE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
  const url = new URL(candidate);
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("Invalid SITE_URL");
  return url.origin;
}
export const indexable =
  process.env.ALLOW_INDEXING === "true" &&
  process.env.VERCEL_ENV !== "preview" &&
  !!process.env.SITE_URL;
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Intermix AI`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: site.tagline,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Intermix AI`,
      description,
      images: ["/opengraph-image"],
    },
  };
}
export function bookingUrl(): string | null {
  try {
    const url = new URL(process.env.BOOKING_URL || "");
    if (
      url.protocol !== "https:" ||
      url.hostname !== "calendly.com" ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname.split("/").filter(Boolean).length !== 2
    )
      return null;
    return url.href;
  } catch {
    return null;
  }
}
