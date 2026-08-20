import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import { esmiAuthAppearance } from "@/app/lib/clerkAppearance";

/* Hosted-on-our-domain sign-up — same reasoning as app/(site)/sign-in/layout.tsx,
   including the 2026-08-19 note on why this wears the Esmi console's tokens.
   ClerkProvider is scoped to this segment, same pattern as /dashboard, /app,
   and /get-started — the marketing site never touches Clerk.

   This layout is deliberately the twin of the sign-in one rather than a
   shared component: they are eight lines of difference (the kicker, the
   footnote, the metadata) and the last time this pair drifted apart it was
   because a fix landed on one copy and missed the other. Keeping them
   visibly parallel makes that drift obvious in a diff. If a third auth
   surface ever appears, extract then — two is not yet a pattern. */

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
    <ClerkProvider ui={ui} afterSignOutUrl="/" appearance={esmiAuthAppearance}>
      <div
        className="lg-app esmi-dashboard esmi-auth flex flex-col items-center justify-center px-4 py-16"
        style={{
          minHeight: "100svh",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
          paddingBottom: "max(4rem, env(safe-area-inset-bottom))",
          color: "var(--lg-ink)",
        }}
      >
        <div className="esmi-auth-settle esmi-auth-settle-1 mb-8 flex flex-col items-center gap-3">
          <Link href="/" aria-label="Orchelix home">
            <Image
              src="/esmi-logo.png"
              alt="Esmi"
              width={160}
              height={77}
              preload
              style={{ height: 36, width: "auto" }}
            />
          </Link>
          <p className="esmi-auth-kicker">Create your Esmi account</p>
        </div>

        <div className="esmi-auth-card esmi-auth-settle esmi-auth-settle-2">
          {children}
        </div>

        <p className="esmi-auth-footnote esmi-auth-settle esmi-auth-settle-3" style={{ marginTop: "1.5rem" }}>
          Already have an account? <Link href="/sign-in">Sign in</Link>
        </p>
      </div>
    </ClerkProvider>
  );
}
