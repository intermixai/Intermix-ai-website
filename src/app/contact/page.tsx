import { site, pageMetadata, bookingUrl } from "@/lib/site";
import Booking from "@/components/sections/Booking";
import ContactForm from "@/components/sections/ContactForm";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Schedule a Session",
  "A 45-minute executive session to explore your AI priorities, adoption barriers and whether the AI Adoption Review is the right next step.",
  "/contact",
);
export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container-content">
          <p className="eyebrow">{site.cta}</p>
          <h1>
            Your ambition.
            <br />
            <em>Our next conversation.</em>
          </h1>
          <p className="lead">
            Let’s identify where AI can create meaningful value, and whether the
            AI Adoption Review is the right next step.
          </p>
        </div>
      </section>
      <section className="section-y">
        <div className="container-content contact-grid">
          <div className="contact-aside">
            <p className="eyebrow">A focused executive session</p>
            <h2>
              Bring your priorities.
              <br />
              <em>We’ll start there.</em>
            </h2>
            <div className="session-details">
              <span>{site.sessionMinutes} minutes</span>
              <span>Executive conversation</span>
            </div>
            <ol className="session-agenda">
              <li>Identify the business outcome that matters most.</li>
              <li>Understand where AI is used and what is slowing adoption.</li>
              <li>Determine whether a structured Review would create value.</li>
            </ol>
            <div className="prose">
              <p>
                Include the executive sponsor and the leaders closest to
                adoption. If there is a fit, we’ll define the scope,
                participants and decision point together.
              </p>
            </div>
          </div>
          <div className="contact-content">
            <Booking url={bookingUrl()} />
            <div className="write-first">
              <h2>Prefer to write first?</h2>
              <p>
                Share a little context about your organization and priorities.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
