import Link from "next/link";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Website data & privacy",
  "How this website handles contact details and scheduling.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <section className="page-hero">
        <div className="container-content">
          <p className="eyebrow">Website data & privacy</p>
          <h1>
            Information you share
            <br />
            <em>through this website.</em>
          </h1>
        </div>
      </section>
      <section className="section-y">
        <div className="container-content data-notice">
          <p>
            This page describes the website’s contact and scheduling features.
          </p>
          <h2>Contact messages</h2>
          <p>
            The contact form asks for your name, work email, company, title or
            role, company size, primary interest and an optional message. When
            you submit, the website sends those details to the configured
            Intermix AI delivery service so your inquiry can be handled. The
            form also sends the source page, any campaign tags in the page URL
            and a request identifier to help prevent duplicate submissions.
          </p>
          <p>
            The form displays confirmation only after the delivery service
            acknowledges acceptance. If messaging is unavailable, the website
            does not display a successful submission.
          </p>
          <h2>Scheduling</h2>
          <p>
            The scheduler loads only when you choose to load available times.
            Booking details are entered directly into Calendly. You can also
            open the scheduling page in a separate tab. Calendly’s own privacy
            notice applies to its service.
          </p>
          <h2>Website operation</h2>
          <p>
            This implementation does not add advertising trackers or analytics
            scripts. Hosting and scheduling providers may process technical
            information necessary to operate their services.
          </p>
          <h2>Keep the first message brief</h2>
          <p>
            Do not include passwords, confidential datasets or other sensitive
            business information. Detailed information-sharing arrangements can
            be discussed before an engagement.
          </p>
          <h2>Questions about information you have shared</h2>
          <p>
            Use the <Link href="/contact">contact page</Link> to ask about your
            inquiry or raise a data-handling question.
          </p>
        </div>
      </section>
    </>
  );
}
