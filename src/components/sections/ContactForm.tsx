"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { services } from "@/lib/content";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid work email"),
  company: z.string().min(1, "Company is required"),
  title: z.string().min(1, "Title/Role is required"),
  companySize: z.string().min(1, "Please select company size"),
  primaryInterest: z.string().min(1, "Please select a primary interest"),
  message: z.string().optional(),
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

const COMPANY_SIZES = [
  "$50M–$100M revenue",
  "$100M–$500M revenue",
  "$500M–$1B revenue",
  "$1B+ revenue",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded border border-gold bg-gold/10 p-6 text-sm text-ink">
        Thank you — your message has been received. We&apos;ll follow up
        shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-xs uppercase tracking-wider text-grey">
          Name
        </label>
        <input
          {...register("name")}
          className="mt-1 w-full border-b border-grey bg-transparent py-2 text-sm focus:border-gold focus:outline-none"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-grey">
          Work Email
        </label>
        <input
          {...register("email")}
          className="mt-1 w-full border-b border-grey bg-transparent py-2 text-sm focus:border-gold focus:outline-none"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-grey">
          Company
        </label>
        <input
          {...register("company")}
          className="mt-1 w-full border-b border-grey bg-transparent py-2 text-sm focus:border-gold focus:outline-none"
        />
        {errors.company && (
          <p className="mt-1 text-xs text-red-600">
            {errors.company.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-grey">
          Title / Role
        </label>
        <input
          {...register("title")}
          className="mt-1 w-full border-b border-grey bg-transparent py-2 text-sm focus:border-gold focus:outline-none"
        />
        {errors.title && (
          <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-grey">
          Company Size
        </label>
        <select
          {...register("companySize")}
          className="mt-1 w-full border-b border-grey bg-transparent py-2 text-sm focus:border-gold focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select...
          </option>
          {COMPANY_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        {errors.companySize && (
          <p className="mt-1 text-xs text-red-600">
            {errors.companySize.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-grey">
          Primary Interest
        </label>
        <select
          {...register("primaryInterest")}
          className="mt-1 w-full border-b border-grey bg-transparent py-2 text-sm focus:border-gold focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select...
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.title} — {s.phase}
            </option>
          ))}
          <option value="not-sure">Not sure yet</option>
        </select>
        {errors.primaryInterest && (
          <p className="mt-1 text-xs text-red-600">
            {errors.primaryInterest.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider text-grey">
          Message (optional)
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className="mt-1 w-full border-b border-grey bg-transparent py-2 text-sm focus:border-gold focus:outline-none"
        />
      </div>
      {/* Honeypot field */}
      <input
        type="text"
        {...register("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
