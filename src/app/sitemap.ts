import { MetadataRoute } from "next";
import { services, frameworks } from "@/lib/content";

const BASE_URL = "https://intermixai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/industries",
    "/about",
    "/why-intermix-ai",
    "/resources",
    "/resources/frameworks",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  const frameworkRoutes = frameworks.map((f) => ({
    url: `${BASE_URL}/resources/frameworks/${f.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...frameworkRoutes];
}
