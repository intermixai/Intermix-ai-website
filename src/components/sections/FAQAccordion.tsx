"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/content";

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <div className="mx-auto max-w-legal">
      {categories.map((category) => (
        <div key={category} className="mb-10">
          <h2 className="mb-4 text-sm uppercase tracking-wider text-grey">
            {category}
          </h2>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {faqs
              .filter((f) => f.category === category)
              .map((f) => {
                const idx = faqs.indexOf(f);
                const isOpen = openIndex === idx;
                return (
                  <div key={f.question}>
                    <button
                      className="flex min-h-[48px] w-full items-center justify-between py-4 text-left"
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                    >
                      <span className="pr-4 text-base">{f.question}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-sm text-grey">{f.answer}</p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}
