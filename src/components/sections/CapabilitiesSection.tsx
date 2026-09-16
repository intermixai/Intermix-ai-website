import {
  ClipboardList,
  ListOrdered,
  Rocket,
  Map,
  ShieldCheck,
  Presentation,
} from "lucide-react";

const CAPABILITIES = [
  {
    icon: ClipboardList,
    title: "AI Readiness Diagnostics",
    body: "Structured assessment of data, workflows, and organizational readiness.",
  },
  {
    icon: ListOrdered,
    title: "Opportunity Prioritization",
    body: "ROI-ranked roadmaps that focus effort where it pays back fastest.",
  },
  {
    icon: Rocket,
    title: "Rapid Prototyping",
    body: "Working pilots built and tested in weeks, automated by design where it fits.",
  },
  {
    icon: Map,
    title: "Implementation Roadmapping",
    body: "Phased rollout plans with clear ownership and milestones.",
  },
  {
    icon: ShieldCheck,
    title: "Governance & Risk Design",
    body: "Security, compliance, and responsible-AI guardrails built into every Rise plan.",
  },
  {
    icon: Presentation,
    title: "Executive Enablement",
    body: "Board-ready reporting and leadership alignment sessions.",
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="section-y bg-cream">
      <div className="container-content">
        <p className="eyebrow text-center">Capabilities</p>
        <h2 className="mt-4 text-center text-3xl md:text-4xl">
          What we bring to the table.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <div key={c.title}>
              <c.icon className="text-ink" size={28} strokeWidth={1.5} />
              <h3 className="mt-4 text-lg">{c.title}</h3>
              <p className="mt-2 text-sm text-grey">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
