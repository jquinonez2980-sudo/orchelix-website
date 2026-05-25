import Link from "next/link";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main
        id="main-content"
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          fontFamily: "var(--font-display), ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 520 }}>
          <span
            style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal-500)",
              marginBottom: 20,
            }}
          >
            404 — Not found
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 48px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              margin: "0 0 16px",
              color: "var(--ink)",
            }}
          >
            Page not found.
          </h1>
          <p
            style={{
              color: "var(--ink-2)",
              fontSize: 17,
              lineHeight: 1.6,
              marginBottom: 36,
              maxWidth: 400,
              marginInline: "auto",
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/"
              style={{
                padding: "13px 24px",
                background: "var(--navy-600)",
                color: "#fff",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 15,
              }}
            >
              Go home
            </Link>
            <Link
              href="/solutions"
              style={{
                padding: "13px 24px",
                border: "1.5px solid var(--line-strong)",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--ink-2)",
              }}
            >
              See our agents
            </Link>
            <Link
              href="/book"
              style={{
                padding: "13px 24px",
                border: "1.5px solid var(--line-strong)",
                borderRadius: 12,
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 15,
                color: "var(--ink-2)",
              }}
            >
              Book a demo
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
