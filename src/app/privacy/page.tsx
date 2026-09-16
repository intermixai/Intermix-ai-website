import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Intermix AI",
  description:
    "Intermix AI's privacy policy governing the collection and use of website and client data.",
};

// NOTE: Per spec Section 25, final legal text must be drafted or reviewed
// by qualified legal counsel before publication. This is placement/
// structure only, not binding legal language.

const SECTIONS = [
  { id: "information-we-collect", title: "Information We Collect" },
  { id: "how-we-use-information", title: "How We Use Information" },
  { id: "gated-downloads", title: "Downloadable Framework Requests" },
  { id: "cookies-analytics", title: "Cookies & Analytics" },
  { id: "data-sharing", title: "Data Sharing & Third Parties" },
  { id: "data-retention", title: "Data Retention" },
  { id: "your-rights", title: "Your Rights" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPage() {
  return (
    <section className="section-y bg-cream">
      <div className="container-content mx-auto max-w-legal">
        <h1 className="text-3xl md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-grey">
          Last updated: [Pending legal review]
        </p>

        <div className="mt-8 rounded border border-dashed border-ink/20 p-6 text-sm text-grey">
          This page defines placement and structure only. Final legal
          language must be drafted or reviewed by qualified counsel before
          publication.
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
                {s.id === "gated-downloads"
                  ? ", including data handling for the gated Downloadable Frameworks forms."
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
