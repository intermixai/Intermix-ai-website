import type { Metadata } from "next";
import { industries } from "@/lib/content";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "AI Adoption by Industry | Intermix AI",
  description:
    "AI adoption expertise for Insurance, Logistics, Manufacturing, Distribution, and Healthcare Networks.",
};

export default function IndustriesPage() {
  return (
    <>
      <section className="section-y bg-cream">
        <div className="container-content">
          <h1 className="max-w-2xl text-3xl md:text-5xl">
            Built for operations-heavy enterprises.
          </h1>
          <p className="mt-6 max-w-xl text-charcoal">
            Intermix AI focuses on organizations where operations, not
            software, is the core of the business — where AI adoption
            succeeds or fails based on how well it fits real workflows, not
            how impressive the technology is.
          </p>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {industries.priority.map((ind) => (
              <div
                key={ind.name}
                className="rounded border border-ink/10 p-6"
              >
                <h2 className="text-xl">{ind.name}</h2>
                <p className="mt-3 text-sm text-grey">{ind.useCases}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded border border-ink/10 p-6">
            <h3 className="text-sm uppercase tracking-wider text-grey">
              Also Supported
            </h3>
            <p className="mt-3 text-sm text-charcoal">
              {industries.secondary.join(" · ")}
            </p>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
