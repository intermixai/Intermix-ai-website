import Link from "next/link";
import Brand from "./Brand";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-content">
        <div className="footer-top">
          <div>
            <Brand />
            <p>From AI ambition to adoption.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/services">AI Adoption Review</Link>
            <Link href="/about">About</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Schedule a Session</Link>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Intermix AI</p>
          <p>Review. Reframe. Run. Rise.</p>
          <Link href="/privacy">Website data & privacy</Link>
        </div>
      </div>
    </footer>
  );
}
