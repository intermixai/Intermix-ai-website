import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { frameworks } from "@/lib/content";
import CTABanner from "@/components/shared/CTABanner";

export const metadata: Metadata = {
  title: "Downloadable Frameworks | Intermix AI",
  description:
    "Practical, downloadable frameworks built around the Intermix Operating System.",
};

export default function FrameworksPage() {
  return (
    <>
      <section className="section-y bg-cream">
        <div className="container-content">
          <h1 className="text-3xl md:text-5xl">Downloadable Frameworks</h1>
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>
      <CTABanner />
    </>
  );
}
