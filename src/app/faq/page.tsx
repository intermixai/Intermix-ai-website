import { site, pageMetadata } from "@/lib/site";
import CTABanner from "@/components/shared/CTABanner";
export const metadata = pageMetadata(
  "Frequently asked questions",
  "Answers about the AI Adoption Review, the first executive session, scope, governance and next steps.",
  "/faq",
);
export default function FAQ() {
  return (
    <>
      <section className="page-hero">
        <div className="container-content">
          <p className="eyebrow">Questions & answers</p>
          <h1>
            Clarity starts
            <br />
            <em>with a conversation.</em>
          </h1>
          <p className="lead">
            A few things you may want to know before we speak.
          </p>
        </div>
      </section>
      <section className="section-y">
        <div className="container-content faq-list">
          {site.faqs.map((faq, i) => (
            <details name="faq" key={faq.question}>
              <summary>
                <span className="faq-index">0{i + 1}</span>
                {faq.question}
                <span className="faq-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
