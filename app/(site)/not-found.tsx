import Link from "next/link";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import { Section, PageTitle, Prose, Stamp, QuietAction } from "@/app/components/ledger";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Section tone="field">
          <div className="mx-auto max-w-xl text-center">
            <p
              className="lg-fig"
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.13em",
                textTransform: "uppercase",
                color: "var(--lg-ink-3)",
                marginBottom: "1.25rem",
              }}
            >
              404 — Not found
            </p>
            <PageTitle max="12ch">Page not found.</PageTitle>
            <Prose
              size="1.0625rem"
              max="40ch"
              style={{ marginTop: "1.5rem", marginInline: "auto" }}
            >
              That URL is not on the record. Go home, hear Esmi, or book a pilot
              with a senior consultant.
            </Prose>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <Stamp href="/">Go home</Stamp>
              <QuietAction href="/try-esmi">Hear Esmi</QuietAction>
              <QuietAction href="/book">Book a pilot</QuietAction>
            </div>
            <p className="mt-8">
              <Link
                href="/solutions"
                className="lg-quiet"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--lg-ink-2)",
                  textDecoration: "none",
                }}
              >
                See the agent stack →
              </Link>
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
