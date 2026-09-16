"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-cream md:min-h-screen">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-ink/5 blur-3xl"
        aria-hidden
      />
      <div className="container-content relative flex flex-col items-center py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="eyebrow"
        >
          The Intermix Operating System — Read. Rank. Run. Rise.
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="mt-6 max-w-hero text-4xl leading-tight md:text-6xl"
        >
          Diagnosis before deployment.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mt-6 max-w-hero text-lg text-charcoal"
        >
          Every other AI partner asks what you want to build. Intermix AI
          reads your operation first — then ranks, runs, and scales only what
          earns its way there. A working pilot in 6 to 12 weeks, with
          governance built in from the start.
        </motion.p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link href="/contact" className="btn-primary">
            Book a Discovery Call
          </Link>
          <a href="#operating-system" className="text-sm text-ink underline">
            See How It Works ↓
          </a>
        </div>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mt-10 h-px w-32 origin-left bg-gold"
        />
      </div>
    </section>
  );
}
