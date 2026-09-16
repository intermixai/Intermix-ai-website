import type { Metadata } from "next";
import OperatingSystemDiagram from "@/components/shared/OperatingSystemDiagram";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Why Intermix AI | AI Consulting Partner Comparison",
  description:
    "See how Intermix AI and the Operating System compare to Big-4 consultancies, AI labs, systems integrators, and boutique AI startups.",
};

const COMPARISON = [
  {
    type: "Big-4 Consultancies",
    line: "Enterprise rigor without the enterprise price tag or timeline.",
  },
  {
    type: "AI Labs",
    line: "We don't sell you a model. We Read your operation and sell you the outcome it can actually absorb.",
  },
  {
    type: "Systems Integrators",
    line: "We Read before we Run — so you never pay for the wrong pilot.",
  },
  {
    type: "Boutique AI Startups",
    line: "Twenty years of enterprise trust, running one proven method — not a startup's first attempt at process.",
  },
];

export default function WhyIntermixAIPage() {
  return (
    <>
      <section className="section-y bg-cream">
        <div className="container-content">
          <h1 className="max-w-2xl text-3xl md:text-5xl">
            Every other AI partner asks what you want to build. We start by
            reading what you already have.
          </h1>

          <div className="mt-16">
            <OperatingSystemDiagram showDescriptions={false} />
          </div>

          <div className="mt-20 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ink/10">
                  <th className="py-4 pr-6 text-sm uppercase tracking-wider text-grey">
                    Vs.
                  </th>
                  <th className="py-4 text-sm uppercase tracking-wider text-grey">
                    Intermix AI's Position
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((c) => (
                  <tr
                    key={c.type}
                    className="border-b border-ink/10 hover:bg-ink/[0.02]"
                  >
                    <td className="py-5 pr-6 font-display text-lg">
                      {c.type}
                    </td>
                    <td className="py-5 text-charcoal">{c.line}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
