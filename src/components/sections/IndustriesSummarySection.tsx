import Link from "next/link";
import { industries } from "@/lib/content";

export default function IndustriesSummarySection() {
  return (
    <section className="section-y bg-cream">
      <div className="container-content">
        <p className="eyebrow text-center">Who We Serve</p>
        <h2 className="mt-4 text-center text-3xl md:text-4xl">
          Built for operations-heavy enterprises.
        </h2>
        <Link href="/industries" className="mt-12 block">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {industries.priority.map((ind) => (
              <div
                key={ind.name}
                className="flex items-center justify-center rounded border border-ink/10 px-4 py-8 text-center text-sm hover:border-gold"
              >
                {ind.name}
              </div>
            ))}
          </div>
        </Link>
      </div>
    </section>
  );
}
