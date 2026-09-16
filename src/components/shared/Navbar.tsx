"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "The Operating System", href: "/#operating-system" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-colors duration-200",
          scrolled
            ? "border-b border-ink/10 bg-cream/95 backdrop-blur"
            : "bg-transparent"
        )}
      >
        <div className="container-content flex h-20 items-center justify-between">
          <Link href="/" className="font-display text-lg tracking-wide">
            INTER&middot;MIX&middot;AI
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm text-ink hover:text-charcoal">
                Services <ChevronDown size={14} />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 top-full w-[560px] rounded border border-ink/10 bg-cream p-6 shadow-lg">
                  <div className="grid grid-cols-2 gap-6">
                    <ul className="space-y-4">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/services/${s.slug}`}
                            className="block"
                          >
                            <div className="text-sm font-semibold">
                              {s.title} —{" "}
                              <span className="text-gold">{s.phase}</span>
                            </div>
                            <div className="mt-0.5 text-xs text-grey">
                              {s.cardOutcome}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="rounded border border-ink/10 bg-ink p-5 text-cream">
                      <p className="text-sm">
                        Not sure where to start? Take the Readiness
                        Assessment.
                      </p>
                      <Link
                        href="/services/ai-readiness-assessment"
                        className="mt-3 inline-block text-sm text-gold underline"
                      >
                        Learn more &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink hover:text-charcoal"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/contact" className="btn-primary text-sm">
              Book a Discovery Call
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-cream p-6 md:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg">INTER&middot;MIX&middot;AI</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="mt-10 flex flex-1 flex-col gap-2">
            <details className="border-b border-ink/10 py-3">
              <summary className="min-h-[48px] text-lg">Services</summary>
              <ul className="mt-2 space-y-3 pl-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="block min-h-[48px] py-2 text-base"
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.title} — {s.phase}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-[48px] items-center border-b border-ink/10 text-lg"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            className="btn-primary mt-6 w-full text-base"
            onClick={() => setMobileOpen(false)}
          >
            Book a Discovery Call
          </Link>
        </div>
      )}

      {/* Sticky mobile CTA bar */}
      <div className="fixed bottom-0 left-0 z-40 w-full border-t border-ink/10 bg-cream p-3 md:hidden">
        <Link href="/contact" className="btn-primary w-full text-sm">
          Book a Discovery Call
        </Link>
      </div>
    </>
  );
}
