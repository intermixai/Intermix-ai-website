import CTABanner from "@/components/shared/CTABanner";
import { site, pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "About",
  "Meet Christopher Cedeno, Founder & CEO of Intermix AI. Enterprise experience focused on practical AI adoption.",
  "/about",
);
export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container-content">
          <p className="eyebrow">About Intermix AI</p>
          <h1>
            Technology only matters
            <br />
            <em>when people can use it.</em>
          </h1>
          <p className="lead">
            We help organizations move from AI ambition to adoption: secure,
            practical and repeatable business systems.
          </p>
        </div>
      </section>
      <section className="section-y">
        <div className="container-content founder-grid">
          <div className="founder-name">
            <p className="eyebrow">Founder-led</p>
            <h2>{site.founder.name}</h2>
            <p>{site.founder.role}</p>
            <div className="founder-rule" />
            <blockquote className="founder-belief">
              “The real challenge is turning AI tools into secure, practical and
              repeatable business systems.”
            </blockquote>
          </div>
          <div className="prose">
            <h2>
              Enterprise perspective.
              <br />
              <em>Practical application.</em>
            </h2>
            <p className="lead">{site.founder.bio}</p>
            <p>
              Intermix AI works with leadership to identify the right
              opportunities, prioritize high-value use cases and build a
              practical roadmap for execution.
            </p>
            <p>
              Our method connects four stages: Review, Reframe, Run and Rise.
              Business value, human responsibility and adoption guide the work
              from the first conversation.
            </p>
          </div>
        </div>
      </section>
      <section className="offer-section section-y">
        <div className="container-content">
          <p className="eyebrow">How we approach the work</p>
          <h2>Clarity before commitment.</h2>
          <div className="deliverable-grid">
            {[
              [
                "Understand the environment",
                "Start with goals, workflows, technology, data and readiness before recommending a path.",
              ],
              [
                "Make priorities explicit",
                "Connect each opportunity to business value, feasibility, risk and a decision leadership can make.",
              ],
              [
                "Keep people in the system",
                "Define human responsibilities, adoption needs and governance alongside the technology.",
              ],
            ].map(([title, body]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
