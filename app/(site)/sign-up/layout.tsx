import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider afterSignOutUrl="/">
      <div className="flex min-h-screen items-center justify-center bg-surface-2 px-4 py-16">
        {children}
      </div>
    </ClerkProvider>
  );
}
