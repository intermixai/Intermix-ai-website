import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Intermix AI",
  description: "Terms governing use of the Intermix AI website.",
};

// NOTE: Per spec Section 26, final legal text must be drafted or reviewed
// by qualified legal counsel before publication, including confirmation
// of trademark status for "Intermix AI" and "Intermix Operating System."

const SECTIONS = [
  { id: "acceptance", title: "Acceptance of Terms" },
  { id: "use-of-site", title: "Use of This Website" },
  { id: "intellectual-property", title: "Intellectual Property & Trademarks" },
  { id: "no-professional-advice", title: "No Professional Advice" },
  { id: "limitation-of-liability", title: "Limitation of Liability" },
  { id: "governing-law", title: "Governing Law" },
  { id: "contact", title: "Contact Us" },
];

export default function TermsPage() {
  return (
    <section className="section-y bg-cream">
      <div className="container-content mx-auto max-w-legal">
        <h1 className="text-3xl md:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-sm text-grey">
          Last updated: [Pending legal review]
        </p>

        <div className="mt-8 rounded border border-dashed border-ink/20 p-6 text-sm text-grey">
          This page defines placement and structure only. Final legal
          language must be drafted or reviewed by qualified counsel before
          publication, including confirmation of trademark status for
          &ldquo;Intermix AI&rdquo; and &ldquo;Intermix Operating
          System.&rdquo;
        </div>

        <nav className="mt-8 space-y-1 text-sm">
          {SECTIONS.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} className="block underline">
              {i + 1}. {s.title}
            </a>
          ))}
        </nav>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((s, i) => (
            <div key={s.id} id={s.id}>
              <h2 className="text-xl">
                {i + 1}. {s.title}
              </h2>
              <p className="mt-3 text-base text-charcoal">
                [Placeholder — content pending legal review. Section covers{" "}
                {s.title.toLowerCase()}
                {s.id === "intellectual-property"
                  ? ", including that the Operating System and Intermix AI naming are proprietary marks of the firm."
                  : "."}
                ]
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
