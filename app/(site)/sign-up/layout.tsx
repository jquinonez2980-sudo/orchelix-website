import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkWidgetAppearance } from "@/app/lib/clerkAppearance";

/* Hosted-on-our-domain sign-up — same reasoning as app/sign-in/layout.tsx.
   ClerkProvider is scoped to this segment, same pattern as /dashboard, /app,
   and /get-started — the marketing site never touches Clerk. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign up | Esmi",
  robots: { index: false, follow: false },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/" appearance={clerkWidgetAppearance}>
      <div
        className="flex min-h-screen flex-col items-center justify-center px-4 py-16"
        style={{
          background: "var(--lg-field-2, #F1F3F5)",
          color: "var(--lg-ink, #2E323E)",
        }}
      >
        <div className="mb-8 flex flex-col items-center gap-3">
          <Link href="/" aria-label="Orchelix home">
            <Image
              src="/esmi-logo.png"
              alt="Esmi"
              width={160}
              height={77}
              priority
              style={{ height: 36, width: "auto" }}
            />
          </Link>
          <p
            className="lg-fig"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--lg-ink-3, rgba(46,50,62,0.72))",
              margin: 0,
            }}
          >
            Create your Esmi account
          </p>
        </div>

        <div
          className="w-full max-w-md"
          style={{
            background: "var(--lg-field, #FFFFFF)",
            border: "1px solid var(--lg-hair, rgba(46,50,62,0.14))",
            borderTop: "2px solid var(--lg-rule, rgba(46,50,62,0.55))",
            padding: "1.5rem 1.25rem 1.75rem",
          }}
        >
          {children}
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.8125rem",
            color: "var(--lg-ink-3, rgba(46,50,62,0.72))",
          }}
        >
          Already have an account?{" "}
          <Link
            href="/sign-in"
            style={{ color: "var(--lg-ink, #2E323E)", textDecoration: "underline" }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </ClerkProvider>
  );
}
