"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="page-hero">
      <div className="container-content">
        <h1>We couldn’t load this page.</h1>
        <p className="lead">Please try again.</p>
        <button className="button button-gold" onClick={reset}>
          Try again
        </button>
      </div>
    </section>
  );
}
