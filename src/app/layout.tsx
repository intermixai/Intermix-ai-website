import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: {
    default: "Intermix AI | Enterprise AI Adoption & Transformation",
    template: "%s",
  },
  description:
    "Intermix AI helps enterprise organizations adopt, integrate, govern, and scale artificial intelligence — through the Intermix Operating System: Read, Rank, Run, Rise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
