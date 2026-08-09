import { ClerkProvider } from "@clerk/nextjs";
import ScrollUnlocker from "./ScrollUnlocker";

/* AcumenAI operator console layout — scopes ClerkProvider to /app so the rest of
   the marketing site never depends on Clerk. force-dynamic keeps this auth-gated
   segment out of static prerendering (so `next build` needs no Clerk keys). */

export const dynamic = "force-dynamic";

export default function AcumenAppLayout({ children }: { children: React.ReactNode }) {
  return (
    /* `signInFallbackRedirectUrl` is the provider-level backstop for the
       AcumenAI mis-routing bug. Anything inside this console that starts a
       sign-in — the two modal buttons, a session expiring, a Clerk widget
       added later — lands back on /app rather than on the Esmi dashboard.
       The modal buttons also set it themselves; this catches the ones that
       do not, including any added in future. */
    <ClerkProvider
      afterSignOutUrl="/"
      signInFallbackRedirectUrl="/app"
      signUpFallbackRedirectUrl="/app"
    >
      <ScrollUnlocker />
      {/* `lg-app` scopes the console into the ledger world by retargeting the
          design tokens for this subtree only; `lg-cloth` gives it the same
          buckram ground as the marketing surface. The console's own markup
          is unchanged by the scope — it reads tokens, and the tokens moved. */}
      <div className="lg-app lg-cloth" style={{ minHeight: "100vh" }}>
        {children}
      </div>
    </ClerkProvider>
  );
}
