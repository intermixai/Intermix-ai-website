import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug, getAdjacentServices } from "@/lib/content";
import OperatingSystemDiagram from "@/components/shared/OperatingSystemDiagram";
import CTABanner from "@/components/shared/CTABanner";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const service = getServiceBySlug(params.slug);
  if (!service) return {};
  return {
    title: service.titleTag,
    description: service.metaDescription,
  };
}

export default function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const { prior, next } = getAdjacentServices(params.slug);

  return (
    <>
      <section className="section-y bg-cream">
        <div className="container-content">
          <p className="eyebrow">
            Phase {service.phaseNumber} — {service.phase}
          </p>
          <h1 className="mt-4 max-w-3xl text-3xl md:text-5xl">
            {service.headline}
          </h1>
          <div className="mt-8">
            <Link href="/contact" className="btn-primary">
              Book a Discovery Call
            </Link>
          </div>
        </div>
      </section>

      <section className="section-y bg-cream pt-0">
        <div className="container-content grid gap-16 lg:grid-cols-[60%_40%]">
          <div>
            <p className="text-lg text-charcoal">{service.body}</p>

            <h2 className="mt-12 text-2xl">Deliverables</h2>
            <ul className="mt-6 space-y-4">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="border-l-2 border-gold pl-4 text-sm text-charcoal"
                >
                  {d}
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded bg-ink p-8 text-cream">
              <h2 className="text-xl">Business Outcomes</h2>
              <ul className="mt-4 space-y-3">
                {service.outcomes.map((o) => (
                  <li key={o} className="text-sm text-cream/85">
                    {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-12 rounded border border-ink/10 p-6">
              <h2 className="text-xl">Engagement Model</h2>
              <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-grey">
                    Duration
                  </dt>
                  <dd className="mt-1 text-sm">{service.engagement.duration}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-grey">
                    Format
                  </dt>
                  <dd className="mt-1 text-sm">{service.engagement.format}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-grey">
                    Team Involvement
                  </dt>
                  <dd className="mt-1 text-sm">{service.engagement.team}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-12">
              <h2 className="text-xl">Investment</h2>
              <p className="mt-3 max-w-lg text-sm text-grey">
                Scoped to your organization&apos;s complexity and confirmed
                directly with you —{" "}
                <Link href="/contact" className="underline text-ink">
                  see Contact
                </Link>{" "}
                to start a discovery conversation. No public pricing is
                listed for this service.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-32 lg:self-start">
            <OperatingSystemDiagram
              activePhase={service.phase}
              showDescriptions={false}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream py-16">
        <div className="container-content grid gap-6 sm:grid-cols-2">
          {prior && (
            <Link
              href={`/services/${prior.slug}`}
              className="rounded border border-ink/10 p-6 hover:border-gold"
            >
              <p className="eyebrow">Prior Phase — {prior.phase}</p>
              <h3 className="mt-2 text-lg">{prior.title}</h3>
            </Link>
          )}
          {next && (
            <Link
              href={`/services/${next.slug}`}
              className="rounded border border-ink/10 p-6 hover:border-gold"
            >
              <p className="eyebrow">Next Phase — {next.phase}</p>
              <h3 className="mt-2 text-lg">{next.title}</h3>
            </Link>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
