import Link from "next/link";

export default function CTABanner({
  headline = "Ready to find out what a Read of your operation would show?",
  subheadline = "A 20-minute conversation is enough to know if there's a fit.",
}: {
  headline?: string;
  subheadline?: string;
}) {
  return (
    <section className="bg-ink py-16 text-cream md:py-24">
      <div className="container-content flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-3xl md:text-4xl">{headline}</h2>
        <p className="mt-4 text-lg text-cream/80">{subheadline}</p>
        <Link
          href="/contact"
          className="btn-primary mt-8 !bg-gold !text-ink hover:!bg-cream"
        >
          Book a Discovery Call
        </Link>
      </div>
    </section>
  );
}
