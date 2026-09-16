import Link from "next/link";
import { site, pageMetadata } from "@/lib/site";
import CTABanner from "@/components/shared/CTABanner";
export const metadata = pageMetadata(
  "AI Adoption Review",
  "A focused executive engagement: readiness findings, prioritized use cases and a sequenced 90-day implementation roadmap.",
  "/services",
);
export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container-content">
          <p className="eyebrow">AI Adoption Review</p>
          <h1>
            Know where to focus.
            <br />
            <em>Know what comes next.</em>
          </h1>
          <p className="lead">
            A clear leadership decision on what to pursue, what to defer and
            what to do next.
          </p>
          <Link className="button button-gold" href="/contact">
            {site.cta}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <section className="section-y">
        <div className="container-content split-intro">
          <div>
            <p className="eyebrow">The leadership problem</p>
            <h2>
              Build a shared view
              <br />
              <em>before you commit.</em>
            </h2>
          </div>
          <div className="prose">
            <p className="lead">
              Most organizations already have AI tools, experiments and pressure
              to move faster.
            </p>
            <p>
              What they often lack is a shared view of readiness, governed
              priorities and an implementation path tied to measurable business
              outcomes.
            </p>
            <p>
              The Review is for leadership teams that have begun using AI, or
              are preparing to, and need clarity across business value, workflow
              fit, data, security, governance, people and adoption.
            </p>
          </div>
        </div>
      </section>
      <section className="offer-section section-y">
        <div className="container-content">
          <p className="eyebrow">What leadership receives</p>
          <h2>
            Three outputs.
            <br />
            <em>One direction.</em>
          </h2>
          <div className="deliverable-grid">
            {site.deliverables.map((d, i) => (
              <article key={d.name}>
                <span className="index-label">0{i + 1}</span>
                <h3>{d.name}</h3>
                <p>{d.description}</p>
              </article>
            ))}
          </div>
          <p className="small-note">
            The roadmap covers the next 90 days of implementation. Review timing
            and scope are agreed before the engagement begins.
          </p>
        </div>
      </section>
      <section className="section-y">
        <div className="container-content">
          <div className="section-heading">
            <div>
              <p className="eyebrow">From assessment to action</p>
              <h2>
                A focused engagement.
                <br />
                <em>A decision you can act on.</em>
              </h2>
            </div>
            <p>
              The Review brings together the Review and Reframe stages of our
              Four Rs methodology.
            </p>
          </div>
          <ol className="review-steps">
            {[
              ["Align", "Executive goals and decision criteria"],
              ["Review", "Environment and readiness"],
              ["Reframe", "Use cases and priorities"],
              ["Act", "Roadmap, owners and next move"],
            ].map(([name, desc], i) => (
              <li key={name}>
                <span className="phase-number">0{i + 1}</span>
                <h3>{name}</h3>
                <p>{desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-y bordered-section">
        <div className="container-content split-intro">
          <div>
            <p className="eyebrow">The next step</p>
            <h2>
              Start with
              <br />
              <em>an executive session.</em>
            </h2>
          </div>
          <div className="prose">
            <p>
              In {site.sessionMinutes} minutes, we identify the outcome that
              matters most, explore current adoption barriers and determine
              whether the Review is the right fit.
            </p>
            <p>
              If it is, we define scope, participants and the decision point
              together. Investment is discussed directly based on the
              engagement.
            </p>
            <Link href="/faq" className="text-link dark-link">
              Questions before we speak? <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
