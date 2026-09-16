import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact Intermix AI | Book a Discovery Call",
  description:
    "Schedule a 20-minute discovery call with Intermix AI to discuss your organization's AI adoption path.",
};

export default function ContactPage() {
  return (
    <section className="section-y bg-cream">
      <div className="container-content grid gap-16 lg:grid-cols-[40%_60%]">
        <div>
          <h1 className="text-3xl md:text-4xl">
            Let&apos;s find out what a Read of your operation would show.
          </h1>
          <p className="mt-6 text-charcoal">
            A discovery call is 20 minutes. No pitch deck, no pricing
            negotiation, no pressure — just a conversation about where your
            operation stands and whether the Operating System is the right
            fit.
          </p>

          {/* Scheduling widget placeholder — needs a Calendly (or similar)
              link before launch. */}
          <div className="mt-10 rounded border border-dashed border-ink/20 p-6 text-sm text-grey">
            [Scheduling widget placeholder — embed link pending]
          </div>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
