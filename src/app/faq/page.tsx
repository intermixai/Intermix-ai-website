import type { Metadata } from "next";
import FAQAccordion from "@/components/sections/FAQAccordion";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Intermix AI",
  description:
    "Answers to common questions about the Intermix Operating System and engaging Intermix AI for enterprise AI adoption.",
};

export default function FAQPage() {
  return (
    <>
      <section className="section-y bg-cream">
        <div className="container-content">
          <h1 className="mb-16 text-center text-3xl md:text-5xl">
            Frequently Asked Questions
          </h1>
          <FAQAccordion />
        </div>
      </section>
      <CTABanner />
    </>
  );
}
