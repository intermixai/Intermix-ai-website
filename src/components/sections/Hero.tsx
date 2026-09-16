import Link from "next/link";
import { site } from "@/lib/site";
import OperatingSystemDiagram from "../shared/OperatingSystemDiagram";
export default function Hero() {
  return (
    <section className="hero">
      <div className="container-content hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Enterprise AI adoption</p>
          <h1>
            From AI ambition
            <br />
            to <em>adoption.</em>
          </h1>
          <p className="hero-description">{site.heroBody}</p>
          <div className="hero-actions">
            <Link className="button button-gold" href="/contact">
              {site.cta}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/services">
              Explore the AI Adoption Review <span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className="hero-audience">{site.audience}</p>
        </div>
        <div className="hero-method">
          <p className="eyebrow">A practical path forward</p>
          <OperatingSystemDiagram />
          <div className="method-caption">
            <span>
              Business value.
              <br />
              Human judgment.
              <br />
              Everyday execution.
            </span>
            <span className="method-mark" aria-hidden="true">
              R⁴
            </span>
          </div>
        </div>
      </div>
      <div className="container-content hero-bottom">
        <span>People · Process · Data · Technology · Governance</span>
        <a href="#the-challenge">
          Explore our approach <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
