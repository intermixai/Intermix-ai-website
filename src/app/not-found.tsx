import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="container-content">
        <p className="eyebrow">404 / Page not found</p>
        <h1>
          Let’s get you
          <br />
          <em>back on track.</em>
        </h1>
        <p className="lead">
          That page is unavailable. Explore the AI Adoption Review or return to
          the homepage.
        </p>
        <Link className="button button-gold" href="/">
          Back to home <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
