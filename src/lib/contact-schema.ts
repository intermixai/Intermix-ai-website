import { z } from "zod";
export const companySizes = [
  "Under $50M revenue",
  "$50M–$100M revenue",
  "$100M–$500M revenue",
  "$500M–$1B revenue",
  "$1B+ revenue",
  "Prefer to discuss",
] as const;
export const interests = [
  "AI Adoption Review",
  "Focused implementation — Run",
  "Scaling adoption — Rise",
  "Not sure yet",
] as const;
export const contactSchema = z
  .object({
    name: z.string().trim().min(1, "Enter your name.").max(120),
    email: z.string().trim().email("Enter a valid work email.").max(254),
    company: z.string().trim().min(1, "Enter your company.").max(160),
    title: z.string().trim().min(1, "Enter your title or role.").max(160),
    companySize: z.enum(companySizes, {
      errorMap: () => ({ message: "Choose a company size." }),
    }),
    primaryInterest: z.enum(interests, {
      errorMap: () => ({ message: "Choose a primary interest." }),
    }),
    message: z
      .string()
      .trim()
      .max(3000, "Use 3,000 characters or fewer.")
      .default(""),
    website: z.string().max(0).default(""),
    requestId: z.string().uuid(),
    source: z.literal("/contact"),
    utm: z
      .record(
        z.enum([
          "utm_source",
          "utm_medium",
          "utm_campaign",
          "utm_content",
          "utm_term",
        ]),
        z.string().max(200),
      )
      .default({}),
  })
  .strict();
