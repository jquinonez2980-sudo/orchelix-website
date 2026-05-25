"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 480 }}>
        <span
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--teal-500, #14B8A6)",
            marginBottom: 16,
          }}
        >
          Something went wrong
        </span>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "-0.026em",
            lineHeight: 1.1,
            margin: "0 0 12px",
            color: "var(--ink, #0A2540)",
          }}
        >
          We hit an unexpected error.
        </h1>
        <p style={{ color: "var(--ink-2, #3F5570)", fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          Our team has been notified. You can try again or go back to the homepage.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              padding: "13px 24px",
              background: "var(--navy-600, #0A2540)",
              color: "#fff",
              borderRadius: 12,
              border: "none",
              fontWeight: 500,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Try again
          </button>
          <a
            href="/"
            style={{
              padding: "13px 24px",
              border: "1.5px solid var(--line-strong, #C9D1DC)",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 15,
              color: "var(--ink-2, #3F5570)",
            }}
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}
