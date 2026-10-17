"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import { site } from "@/lib/site";
const links = [
  ["AI Adoption Review", "/services"],
  ["The Four Rs", "/#method"],
  ["About", "/about"],
  ["FAQ", "/faq"],
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function key(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
      if (e.key === "Tab") {
        const list = [
          button.current,
          ...Array.from(
            panel.current?.querySelectorAll<HTMLAnchorElement>("a") || [],
          ),
        ].filter(Boolean) as HTMLElement[];
        const first = list[0],
          last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    const media = window.matchMedia("(min-width: 960px)");
    const close = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", close);
    return () => {
      document.removeEventListener("keydown", key);
      media.removeEventListener("change", close);
    };
  }, [open]);
  return (
    <>
      <header className="site-header">
        <div className="container-content header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={path === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link className="button button-outline header-cta" href="/contact">
            {site.cta}
            <span aria-hidden="true">↗</span>
          </Link>
          <button
            ref={button}
            className="menu-toggle"
            aria-expanded={open}
            aria-controls={open ? "mobile-navigation" : undefined}
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
        {open && (
          <div ref={panel} id="mobile-navigation" className="mobile-navigation">
            <nav aria-label="Mobile navigation">
              {links.map(([label, href]) => (
                <Link onClick={() => setOpen(false)} key={href} href={href}>
                  {label}
                </Link>
              ))}
              <Link
                onClick={() => setOpen(false)}
                className="button button-gold"
                href="/contact"
              >
                {site.cta}
                <span aria-hidden="true">↗</span>
              </Link>
            </nav>
          </div>
        )}
      </header>
      {path !== "/contact" && (
        <div className="mobile-booking">
          <Link className="button button-gold" href="/contact">
            {site.cta}
            <span>
              {site.sessionMinutes} min <span aria-hidden="true">↗</span>
            </span>
          </Link>
        </div>
      )}
    </>
  );
}
