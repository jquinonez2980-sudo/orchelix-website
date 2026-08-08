import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

/* Hosted-on-our-domain sign-in — replaces Clerk's Account Portal redirect.
   The dev Clerk instance can only redirect back to *.accounts.dev after a
   hosted-portal sign-in, never www.orchelix.com, so proxy.ts's auth.protect()
   (via NEXT_PUBLIC_CLERK_SIGN_IN_URL in .env.local) sends signed-out visitors
   here instead. ClerkProvider is scoped to this segment, same pattern as
   /dashboard, /app, and /get-started — the marketing site never touches Clerk. */

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
    <ClerkProvider afterSignOutUrl="/">
      <div className="flex min-h-screen items-center justify-center bg-surface-2 px-4 py-16">
        {children}
      </div>
    </ClerkProvider>
  );
}
