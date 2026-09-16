const DIFFERENTIATORS = [
  {
    title: "20 years of enterprise operations experience",
    body: "We've run the functions we're advising on, not just studied them.",
  },
  {
    title: "A named method, not an improvised process",
    body: "The Operating System means every engagement runs on the same proven sequence, not a bespoke reinvention each time.",
  },
  {
    title: "Scoped, not shopped",
    body: "Every engagement is priced to your organization's complexity, discussed directly with you, never off a public rate card.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="section-y bg-cream">
      <div className="container-content grid gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">Why Intermix AI</p>
          <h2 className="mt-4 text-3xl md:text-4xl">
            Enterprise fluency. One proven method.
          </h2>
          <div className="mt-8 space-y-6">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title}>
                <h3 className="text-lg">{d.title}</h3>
                <p className="mt-1 text-sm text-grey">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center rounded border border-ink/10 bg-ink/[0.03] p-10 text-center">
          <p className="text-sm text-grey">
            [Metric to be populated post-first-engagements — e.g., number of
            Readiness diagnostics delivered, average time from Read to Run]
          </p>
        </div>
      </div>
    </section>
  );
}
