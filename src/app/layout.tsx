import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { indexable, siteOrigin } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: "Intermix AI | From AI ambition to adoption",
    template: "%s | Intermix AI",
  },
  description:
    "AI adoption for mid-market and enterprise leaders. Readiness findings, prioritized use cases and a sequenced 90-day implementation roadmap.",
  robots: indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  icons: { icon: "/icon.svg" },
  applicationName: "Intermix AI",
  // Name Safari suggests for "Add to Home Screen". The icon itself comes from
  // src/app/apple-icon.png (linked by Next.js) and /apple-touch-icon.png.
  other: { "apple-mobile-web-app-title": "Intermix AI" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
