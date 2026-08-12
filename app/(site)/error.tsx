"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    /* Surface digests in the console for support; never flash stack to the user. */
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      className="lg-world lg-field"
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.5rem",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 28 * 16 }}>
        <p
          className="lg-fig"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: "var(--lg-ink-3)",
            marginBottom: "1rem",
          }}
        >
          Something went wrong
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontStretch: "82%",
            fontWeight: 700,
            fontSize: "clamp(1.85rem, 3.2vw, 2.5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.022em",
            textTransform: "uppercase",
            color: "var(--lg-ink)",
            margin: "0 0 1rem",
          }}
        >
          We hit an unexpected error.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            lineHeight: 1.62,
            color: "var(--lg-ink-2)",
            marginBottom: "2rem",
          }}
        >
          Try again, or return home. If it keeps happening, call{" "}
          <a href="tel:+15615661066" style={{ color: "var(--lg-ink)" }}>
            +1 561 566 1066
          </a>
          .
        </p>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            onClick={reset}
            className="lg-stamp lg-foil-surface"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              fontWeight: 700,
              fontSize: "0.9375rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0.95rem 1.7rem",
              border: 0,
              cursor: "pointer",
              color: "var(--lg-foil-ink)",
            }}
          >
            Try again
          </button>
          <a
            href="/"
            className="lg-quiet"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              fontWeight: 600,
              fontSize: "0.9375rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: "var(--lg-ink)",
              textDecoration: "none",
            }}
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}
