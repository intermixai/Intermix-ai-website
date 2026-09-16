import Link from "next/link";
import { services } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink/10 bg-cream pb-24 pt-16 md:pb-16">
      <div className="container-content">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-grey">
              <li>
                <Link href="/about" className="hover:text-ink">
                  About
                </Link>
              </li>
              <li>
                <Link href="/why-intermix-ai" className="hover:text-ink">
                  Why Intermix AI
                </Link>
              </li>
              <li className="text-grey/60">Careers</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-grey">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className="hover:text-ink">
                    {s.title} — {s.phase}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-grey">
              <li>
                <Link href="/resources" className="hover:text-ink">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/resources/frameworks" className="hover:text-ink">
                  Downloadable Frameworks
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-ink">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-charcoal">
              Legal
            </h4>
            <ul className="space-y-2 text-sm text-grey">
              <li>
                <Link href="/privacy" className="hover:text-ink">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-ink">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-8 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-display text-base">INTER&middot;MIX&middot;AI</span>
              <span className="rounded border border-gold px-2 py-0.5 text-xs tracking-widest text-gold">
                R&middot;R&middot;R&middot;R
              </span>
            </div>
            <p className="mt-2 max-w-md text-xs text-grey">
              Intermix AI helps enterprise organizations adopt, integrate,
              govern, and scale artificial intelligence with confidence —
              through the Intermix Operating System: Read, Rank, Run, Rise.
            </p>
          </div>
          <p className="text-xs text-grey">
            &copy; {year} Intermix AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
