const FAILURE_MODES = [
  {
    title: "No clear starting point",
    body: "Teams pilot the most visible use case, not the highest-value one.",
  },
  {
    title: "No governance plan",
    body: "Security and compliance concerns surface after the pilot, not before.",
  },
  {
    title: "No executive translation",
    body: "Technical teams and leadership are solving different problems.",
  },
];

export default function ProblemSection() {
  return (
    <section className="section-y bg-ink text-cream">
      <div className="container-content grid gap-12 md:grid-cols-2">
        <div>
          <p className="eyebrow">The Problem</p>
          <h2 className="mt-4 text-3xl md:text-4xl">
            Most AI pilots fail before they start.
          </h2>
          <p className="mt-6 max-w-md text-cream/80">
            Boards are demanding AI strategies. Budgets are being approved.
            And most of those initiatives stall — not because the technology
            doesn&apos;t work, but because no one read the operation before
            choosing where to point it.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          {FAILURE_MODES.map((f) => (
            <div
              key={f.title}
              className="rounded border border-cream/15 p-6"
            >
              <h3 className="text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-cream/70">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
