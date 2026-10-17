import Link from "next/link";
import { site } from "@/lib/site";
export default function CTABanner() {
  return (
    <section className="cta-band">
      <div className="container-content cta-inner">
        <div>
          <p className="eyebrow">The next conversation</p>
          <h2>
            Make your next AI move
            <br />
            <em>a clear one.</em>
          </h2>
          <p>
            Start with a focused {site.sessionMinutes}-minute executive session.
          </p>
        </div>
        <Link className="button button-gold" href="/contact">
          {site.cta}
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
