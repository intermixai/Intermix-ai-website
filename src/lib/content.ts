import servicesData from "../../content/services.json";
import industriesData from "../../content/industries.json";
import faqData from "../../content/faq.json";
import frameworksData from "../../content/frameworks.json";

export type Service = {
  slug: string;
  phase: "READ" | "RANK" | "RUN" | "RISE";
  phaseNumber: string;
  title: string;
  titleTag: string;
  metaDescription: string;
  cardOutcome: string;
  headline: string;
  body: string;
  deliverables: string[];
  outcomes: string[];
  engagement: { duration: string; format: string; team: string };
};

export type Industry = { name: string; useCases: string };

export type FAQItem = { category: string; question: string; answer: string };

export type Framework = {
  slug: string;
  title: string;
  format: string;
  description: string;
};

export const services: Service[] = servicesData as Service[];

export const industries = industriesData as {
  priority: Industry[];
  secondary: string[];
};

export const faqs: FAQItem[] = faqData as FAQItem[];

export const frameworks: Framework[] = frameworksData as Framework[];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAdjacentServices(slug: string): {
  prior: Service | null;
  next: Service | null;
} {
  const idx = services.findIndex((s) => s.slug === slug);
  return {
    prior: idx > 0 ? services[idx - 1] : null,
    next: idx < services.length - 1 ? services[idx + 1] : null,
  };
}
