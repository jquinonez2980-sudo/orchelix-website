import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkWidgetAppearance } from "@/app/lib/clerkAppearance";

/* Hosted-on-our-domain sign-in — replaces Clerk's Account Portal redirect.
   The dev Clerk instance can only redirect back to *.accounts.dev after a
   hosted-portal sign-in, never www.orchelix.com, so proxy.ts's auth.protect()
   (via NEXT_PUBLIC_CLERK_SIGN_IN_URL in .env.local) sends signed-out visitors
   here instead. ClerkProvider is scoped to this segment, same pattern as
   /dashboard, /app, and /get-started — the marketing site never touches Clerk.

   Appearance is set on the provider so every Clerk surface (form, modal,
   dropdown) gets readable ink-on-field tokens. The page shell is always
   painted so a slow Clerk load never looks like a blank white void. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in | Esmi",
  robots: { index: false, follow: false },
};

export default function SignInLayout({
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
            Sign in to your console
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
          No account yet?{" "}
          <Link
            href="/sign-up"
            style={{ color: "var(--lg-ink, #2E323E)", textDecoration: "underline" }}
          >
            Apply to get started
          </Link>
        </p>
      </div>
    </ClerkProvider>
  );
}
