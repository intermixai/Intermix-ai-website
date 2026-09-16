import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { frameworks } from "@/lib/content";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Insights & Frameworks on Enterprise AI Adoption | Intermix AI",
  description:
    "Executive insights and downloadable frameworks on AI readiness, strategy, implementation, and governance.",
};

// NOTE: Per spec Section 32.1, launch requires 2-3 founding Insights
// articles. That content has not been provided yet and is not fabricated
// here — this section renders empty with a note until real articles exist.

export default function ResourcesPage() {
  return (
    <>
      <section className="section-y bg-cream">
        <div className="container-content">
          <h1 className="text-3xl md:text-5xl">Insights &amp; Frameworks</h1>
          <p className="mt-4 max-w-xl text-charcoal">
            Executive thinking and practical tools, organized around the
            Intermix Operating System.
          </p>

          <div className="mt-16">
            <h2 className="text-xl">Insights</h2>
            <div className="mt-6 rounded border border-dashed border-ink/20 p-8 text-sm text-grey">
              Founding Insights articles are not yet published. Per the
              specification, this page launches with a minimum of 2-3
              articles — pending founder-provided content.
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-xl">Downloadable Frameworks</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {frameworks.map((f) => (
                <div
                  key={f.slug}
                  className="flex flex-col rounded border border-ink/10 p-6"
                >
                  <Download className="text-gold" size={22} />
                  <h3 className="mt-4 text-base">{f.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-grey">
                    {f.description}
                  </p>
                  <Link
                    href={`/resources/frameworks/${f.slug}`}
                    className="mt-4 text-sm text-ink underline"
                  >
                    Download &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
