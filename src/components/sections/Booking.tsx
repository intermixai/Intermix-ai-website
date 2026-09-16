"use client";
import { useEffect, useState } from "react";
export default function Booking({ url }: { url: string | null }) {
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [delayed, setDelayed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!show || loaded) return;
    const id = setTimeout(() => setDelayed(true), 12000);
    return () => clearTimeout(id);
  }, [show, loaded, attempt]);
  if (!url)
    return (
      <div className="booking-panel">
        <p className="eyebrow">45-minute executive session</p>
        <h2>Choose a time to talk.</h2>
        <p role="status">
          Online scheduling is currently unavailable. Please check back soon.
        </p>
      </div>
    );
  const embed = new URL(url);
  embed.searchParams.set("hide_gdpr_banner", "0");
  embed.searchParams.set("background_color", "f7f3ec");
  embed.searchParams.set("text_color", "1c1c1e");
  embed.searchParams.set("primary_color", "806335");
  return (
    <div className="booking-panel">
      <p className="eyebrow">45-minute executive session</p>
      <h2>Choose a time to talk.</h2>
      <p>
        Select a time in your time zone and complete your details. Your booking
        is confirmed in the scheduler after submission.
      </p>
      {!show ? (
        <>
          <button className="button button-dark" onClick={() => setShow(true)}>
            Load available times <span aria-hidden="true">↗</span>
          </button>
          <p className="small-note">
            This loads Calendly, which handles availability and booking details.
          </p>
        </>
      ) : (
        <>
          {!loaded && (
            <div className="booking-status" role="status">
              {delayed
                ? "The scheduler is taking longer than expected. Use the direct link below, or retry."
                : "Loading available times…"}
            </div>
          )}
          <iframe
            key={attempt}
            className="booking-frame"
            title="Schedule a 45-minute executive session with Intermix AI"
            src={embed.href}
            onLoad={() => setLoaded(true)}
            onError={() => setDelayed(true)}
            referrerPolicy="strict-origin-when-cross-origin"
          />
          {delayed && (
            <button
              className="button button-dark"
              onClick={() => {
                setLoaded(false);
                setDelayed(false);
                setAttempt(attempt + 1);
              }}
            >
              Retry scheduler
            </button>
          )}
        </>
      )}
      <a
        className="booking-fallback"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open scheduling in a new tab ↗
      </a>
    </div>
  );
}
