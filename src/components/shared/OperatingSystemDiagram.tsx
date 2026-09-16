"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Phase = {
  letter: string;
  word: string;
  description: string;
  href: string;
};

const PHASES: Phase[] = [
  {
    letter: "R",
    word: "READ",
    description:
      "We diagnose your data, workflows, and organizational readiness before recommending anything.",
    href: "/services/ai-readiness-assessment",
  },
  {
    letter: "R",
    word: "RANK",
    description:
      "We rank every opportunity by ROI, feasibility, and risk, so effort goes where it pays back fastest.",
    href: "/services/ai-strategy",
  },
  {
    letter: "R",
    word: "RUN",
    description:
      "We build and run a working pilot in weeks, with automation built into delivery where the workflow calls for it.",
    href: "/services/ai-implementation",
  },
  {
    letter: "R",
    word: "RISE",
    description:
      "We help you rise into governed, enterprise-wide scale, with security and compliance built in from the start.",
    href: "/services/executive-ai-advisory",
  },
];

export default function OperatingSystemDiagram({
  activePhase,
  showDescriptions = true,
}: {
  activePhase?: "READ" | "RANK" | "RUN" | "RISE";
  showDescriptions?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-6">
        {PHASES.map((phase, i) => {
          const isActive = activePhase === phase.word;
          return (
            <motion.div
              key={phase.word}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="relative flex flex-1 flex-col items-start md:items-center md:text-center"
            >
              {i > 0 && (
                <div
                  className="absolute left-0 top-6 hidden h-px w-full -translate-x-1/2 bg-ink/15 md:block"
                  aria-hidden
                />
              )}
              <Link
                href={phase.href}
                className={cn(
                  "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border font-display text-xl transition-colors duration-200",
                  isActive
                    ? "border-gold bg-gold text-ink"
                    : "border-ink bg-cream text-ink hover:border-gold"
                )}
              >
                {phase.letter}
              </Link>
              <div className="mt-3 md:mt-4">
                <div className="text-sm font-semibold uppercase tracking-widest text-charcoal">
                  {phase.word}
                </div>
                {showDescriptions && (
                  <p className="mt-1 max-w-[220px] text-sm text-grey">
                    {phase.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
