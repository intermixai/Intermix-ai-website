import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";
import OperatingSystemDiagram from "@/components/shared/OperatingSystemDiagram";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Enterprise AI Consulting Services | Intermix AI",
  description:
    "Readiness, strategy, implementation, and advisory services built around the Intermix Operating System for enterprise AI adoption.",
};

export default function ServicesOverviewPage() {
  return (
    <>
      <section className="section-y bg-cream">
        <div className="container-content text-center">
          <h1 className="mx-auto max-w-2xl text-3xl md:text-5xl">
            Four services. Each mapped to a phase of the Operating System.
          </h1>
          <div className="mx-auto mt-16 max-w-3xl">
            <OperatingSystemDiagram showDescriptions={false} />
          </div>
        </div>
      </section>

      <section className="bg-cream pb-24">
        <div className="container-content flex flex-col gap-16">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className={`flex flex-col items-start gap-8 md:flex-row ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <p className="eyebrow">{s.phase}</p>
                <h2 className="mt-2 text-2xl">{s.title}</h2>
                <p className="mt-3 text-charcoal">{s.cardOutcome}</p>
                <ul className="mt-4 space-y-2">
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d} className="text-sm text-grey">
                      &middot; {d}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${s.slug}`}
                  className="mt-6 inline-block text-sm text-ink underline"
                >
                  Explore {s.title} &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
