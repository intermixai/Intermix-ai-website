import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CTABanner from "@/components/shared/CTABanner";
import { site, pageMetadata, siteOrigin } from "@/lib/site";
export const metadata = pageMetadata(
  "From AI ambition to adoption",
  "Readiness findings, prioritized use cases and a sequenced 90-day implementation roadmap for enterprise AI adoption.",
  "/",
);
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: siteOrigin(),
            description: site.tagline,
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <section className="section-y" id="the-challenge">
        <div className="container-content split-intro">
          <div>
            <p className="eyebrow">The adoption challenge</p>
            <h2>
              Access to AI is only
              <br />
              <em>the beginning.</em>
            </h2>
          </div>
          <div className="prose">
            <p className="lead">
              Tools, experiments and executive ambition need a shared direction.
            </p>
            <p>
              Intermix AI helps leadership connect AI to the way the
              organization actually works: its goals, people, workflows, data
              and decisions.
            </p>
            <p>
              The next step is clarity on what to pursue, what to defer and what
              must change before you move.
            </p>
          </div>
        </div>
      </section>
      <section className="offer-section section-y">
        <div className="container-content">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Start here / AI Adoption Review</p>
              <h2>
                A clear view.
                <br />
                <em>A practical next move.</em>
              </h2>
            </div>
            <p>
              A focused executive engagement that turns scattered AI activity
              into a secure, practical and measurable path forward.
            </p>
          </div>
          <div className="deliverable-grid">
            {site.deliverables.map((item, i) => (
              <article key={item.name}>
                <span className="index-label">
                  0{i + 1} / What leadership receives
                </span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <Link className="text-link dark-link" href="/services">
            Inside the AI Adoption Review <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <section className="section-y method-section" id="method">
        <div className="container-content">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The Four Rs</p>
              <h2>
                A method for
                <br />
                <em>moving forward.</em>
              </h2>
            </div>
            <p>
              Review → Reframe → Run → Rise.
              <br />A connected approach, from understanding your environment to
              expanding what works.
            </p>
          </div>
          <ol className="phase-grid">
            {site.phases.map((phase, i) => (
              <li key={phase.name}>
                <span className="phase-number">0{i + 1}</span>
                <h3>{phase.name}</h3>
                <p>{phase.description}</p>
                <span className="phase-output">{phase.output}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="maturity-section section-y">
        <div className="container-content">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The maturity path</p>
              <h2>
                Make AI part of
                <br />
                <em>how work gets done.</em>
              </h2>
            </div>
            <p>
              Meet your organization where it is today. Build the capabilities
              and confidence for the next stage.
            </p>
          </div>
          <ol className="maturity-grid">
            {site.maturity.map((stage, i) => (
              <li key={stage.name}>
                <span className="stage-label">
                  Stage 0{i + 1}
                  <span aria-hidden="true">{i < 3 ? "→" : "↗"}</span>
                </span>
                <h3>{stage.name}</h3>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-y" id="who-we-help">
        <div className="container-content split-intro">
          <div>
            <p className="eyebrow">Built around leadership decisions</p>
            <h2>
              For the people
              <br />
              <em>accountable for adoption.</em>
            </h2>
          </div>
          <div className="prose">
            <p className="lead">
              Mid-market and enterprise leaders aligning business ambition with
              operational reality.
            </p>
            <ul className="check-list">
              <li>Executive sponsors defining the business outcome.</li>
              <li>
                Operations and technology leaders choosing where to focus.
              </li>
              <li>People and transformation leaders making change stick.</li>
            </ul>
            <Link className="text-link dark-link" href="/about">
              Meet Intermix AI <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
