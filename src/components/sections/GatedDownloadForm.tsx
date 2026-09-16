"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid work email"),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  // honeypot - should stay empty
  website: z.string().max(0).optional(),
});

type FormData = z.infer<typeof schema>;

export default function GatedDownloadForm({
  frameworkSlug,
  frameworkTitle,
}: {
  frameworkSlug: string;
  frameworkTitle: string;
}) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch("/api/framework-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, frameworkSlug, frameworkTitle }),
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
        Thank you — your download link for &ldquo;{frameworkTitle}&rdquo; has
        been sent to your email.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 max-w-md space-y-5"
    >
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
          Role
        </label>
        <input
          {...register("role")}
          className="mt-1 w-full border-b border-grey bg-transparent py-2 text-sm focus:border-gold focus:outline-none"
        />
        {errors.role && (
          <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>
        )}
      </div>
      {/* Honeypot field - hidden from real users */}
      <input
        type="text"
        {...register("website")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <button type="submit" disabled={isSubmitting} className="btn-primary">
        {isSubmitting ? "Sending..." : "Download"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-600">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
