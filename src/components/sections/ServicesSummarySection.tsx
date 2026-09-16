import Link from "next/link";
import { services } from "@/lib/content";

export default function ServicesSummarySection() {
  return (
    <section className="section-y bg-cream">
      <div className="container-content">
        <p className="eyebrow text-center">Services</p>
        <h2 className="mt-4 text-center text-3xl md:text-4xl">
          Four services. One system.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.slug}
              className="flex flex-col rounded border border-ink/10 p-6 transition-shadow hover:shadow-sm"
            >
              <span className="eyebrow">{s.phase}</span>
              <h3 className="mt-2 text-lg">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-grey">
                {s.cardOutcome}
              </p>
              <Link
                href={`/services/${s.slug}`}
                className="mt-4 text-sm text-ink underline"
              >
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
