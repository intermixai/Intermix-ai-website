import type { Metadata } from "next";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "About Intermix AI | Enterprise AI Adoption Partner",
  description:
    "Two decades of enterprise operating experience, translated into a disciplined AI adoption method.",
};

const PRINCIPLES = [
  "Enterprise First — every recommendation is filtered through operational, compliance, and change-management reality.",
  "Practical AI — no proof-of-concept theater; every engagement targets a measurable business outcome.",
  "Business Value — ROI and operational impact are the scoreboard, not model sophistication.",
  "Security — data governance and access control are designed in from day one, not retrofitted.",
  "Responsible AI — adoption that protects the organization's people, data, and reputation.",
  "Executive Partnership — Intermix AI works at the leadership level, not as an outsourced dev shop.",
  "Long-Term Relationships — the goal is a multi-year trusted advisor relationship, not a single transaction.",
];

// Timeline milestones are structural placeholders per spec Section 20 —
// final wording, dates, and any named prior employers must be confirmed
// by the founder before publication.
const TIMELINE = [
  "Two decades in enterprise sales, account management, and operations, working with Fortune 500-scale organizations",
  "Direct ownership of enterprise renewal books and cross-functional operating relationships across [industries served]",
  "Transition into applied AI adoption, translating operating experience into the Operating System",
  "Founding of Intermix AI",
];

export default function AboutPage() {
  return (
    <>
      <section className="section-y bg-cream">
        <div className="container-content grid gap-12 lg:grid-cols-[60%_40%]">
          <div>
            <h1 className="text-3xl md:text-5xl">
              Twenty years running the operation. Then AI.
            </h1>
            <div className="mt-8 space-y-6 text-charcoal">
              <p>
                Intermix AI was founded on a simple observation: the AI
                initiatives that succeed are the ones led by people who
                understand enterprise operations first and AI second — not
                the reverse. Two decades were spent inside enterprise sales,
                account management, and operations — running renewal books,
                owning revenue targets, and sitting across the table from
                the same operations and technology leaders Intermix AI now
                advises. That vantage point, not a research lab, is where
                the firm&apos;s judgment comes from.
              </p>
              <p>
                The shift into AI adoption came from watching the same
                failure pattern repeat across enterprise accounts: real
                budget, real board pressure, and pilots that stalled because
                no one had translated the technology into the operation&apos;s
                actual language — its workflows, its data reality, its
                change-management limits. Intermix AI exists to do that
                translation deliberately, using the Operating System as the
                structure for doing it the same disciplined way every time.
              </p>
              <p>
                Every engagement is still run the way an account of that
                size would have been run for two decades — with direct
                executive access, a fixed and honest scope, and an
                operator&apos;s instinct for what an organization can actually
                absorb, not just what a technology can theoretically do.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center rounded border border-ink/10 bg-ink/[0.03]">
            <span className="p-12 text-center text-sm text-grey">
              [Founder portrait placeholder]
            </span>
          </div>
        </div>

        <div className="container-content mt-20">
          <h2 className="text-sm uppercase tracking-wider text-grey">
            Twenty Years, Then AI
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
            {TIMELINE.map((t, i) => (
              <div key={i} className="border-t-2 border-gold pt-4">
                <span className="text-xs text-grey">Milestone {i + 1}</span>
                <p className="mt-2 text-sm text-charcoal">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container-content mt-20">
          <h2 className="text-sm uppercase tracking-wider text-grey">
            Firm Principles
          </h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <li key={p} className="text-sm text-charcoal">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
