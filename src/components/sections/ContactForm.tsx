"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { companySizes, interests } from "@/lib/contact-schema";
type Errors = Record<string, string[]>;
export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const requestId = useRef<string | null>(null);
  const notice = useRef<HTMLDivElement>(null);
  const focusNotice = () =>
    requestAnimationFrame(() => notice.current?.focus());
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    if (!requestId.current) requestId.current = crypto.randomUUID();
    const utm: Record<string, string> = {};
    const params = new URLSearchParams(window.location.search);
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ]) {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 200);
    }
    setStatus("sending");
    setErrors({});
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          requestId: requestId.current,
          source: "/contact",
          utm,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await res.json();
      if (
        !res.ok ||
        result.ok !== true ||
        typeof result.receiptId !== "string" ||
        !result.receiptId.trim()
      ) {
        setErrors(result.fields || {});
        setMessage(
          typeof result.error === "string"
            ? result.error
            : "We could not confirm delivery. Please try again.",
        );
        setStatus("error");
        const first = Object.keys(result.fields || {})[0];
        const input = first ? form.elements.namedItem(first) : null;
        if (input instanceof HTMLElement) input.focus();
        else focusNotice();
        return;
      }
      setStatus("success");
      focusNotice();
    } catch {
      setStatus("error");
      setMessage(
        "We could not confirm delivery. Check your connection and try again.",
      );
      focusNotice();
    }
  }
  const invalid = (name: string) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });
  const error = (name: string) =>
    errors[name] ? (
      <p className="field-error" id={`${name}-error`}>
        {errors[name][0]}
      </p>
    ) : null;
  if (status === "success")
    return (
      <div className="form-success" role="status" ref={notice} tabIndex={-1}>
        <h3>Your message has been received.</h3>
        <p>
          Thank you for sharing your priorities. A session is booked only when
          you select a time and receive confirmation through the scheduler.
        </p>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      className="contact-form"
      aria-busy={status === "sending"}
    >
      {(
        [
          ["name", "Name", "name", "text", 120],
          ["email", "Work email", "email", "email", 254],
          ["company", "Company", "organization", "text", 160],
          ["title", "Title / role", "organization-title", "text", 160],
        ] as const
      ).map(([name, label, autocomplete, type, max]) => (
        <div className="form-field" key={name}>
          <label htmlFor={name}>
            {label} <span aria-hidden="true">*</span>
          </label>
          <input
            id={name}
            name={name}
            type={type}
            autoComplete={autocomplete}
            required
            maxLength={max}
            {...invalid(name)}
          />
          {error(name)}
        </div>
      ))}
      <div className="form-field">
        <label htmlFor="companySize">
          Company size <span aria-hidden="true">*</span>
        </label>
        <select
          id="companySize"
          name="companySize"
          required
          defaultValue=""
          {...invalid("companySize")}
        >
          <option value="" disabled>
            Select company size
          </option>
          {companySizes.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        {error("companySize")}
      </div>
      <div className="form-field">
        <label htmlFor="primaryInterest">
          Primary interest <span aria-hidden="true">*</span>
        </label>
        <select
          id="primaryInterest"
          name="primaryInterest"
          required
          defaultValue="AI Adoption Review"
          {...invalid("primaryInterest")}
        >
          {interests.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>
        {error("primaryInterest")}
      </div>
      <div className="form-field form-wide">
        <label htmlFor="message">
          What would you like to discuss? <span>(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={3000}
          {...invalid("message")}
        />
        {error("message")}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="form-help form-wide">
        * Required. Please keep sensitive business details out of this form. See{" "}
        <Link href="/privacy">how website information is handled</Link>.
      </p>
      <div className="form-wide">
        <button
          className="button button-dark"
          type="submit"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send Message"}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      {status === "error" && (
        <div
          className="form-error form-wide"
          role="alert"
          ref={notice}
          tabIndex={-1}
        >
          {message}
        </div>
      )}
      <noscript>
        <p className="form-help form-wide">
          Enable JavaScript to send a message, or use the direct scheduling link
          above when available.
        </p>
      </noscript>
    </form>
  );
}
