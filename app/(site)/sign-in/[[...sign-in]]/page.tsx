import { SignIn } from "@clerk/nextjs";

/* Where a completed sign-in lands.

   THE BUG THIS FIXES. proxy.ts protects both consoles, so an unauthenticated
   visit to /app arrives here as /sign-in?redirect_url=…%2Fapp.
   `forceRedirectUrl="/dashboard"` overrode that param — which is exactly what
   the prop is for — so every sign-in went to the Esmi dashboard regardless of
   which product was being reached, and AcumenAI customers landed in another
   product's console. The destination now follows the intent already in the
   request instead of being hardcoded.

   WHY THE PROP STAYS. Deleting `forceRedirectUrl` and relying on
   `fallbackRedirectUrl` alone is the obvious-looking fix and it is wrong:
   Clerk's "already signed in" codepath reads forceRedirectUrl, and without it
   that path has nowhere to go. Both are set, both dynamic.

   SECURITY. `redirect_url` is attacker-controllable — anyone can link to
   /sign-in?redirect_url=https://evil.example and, unvalidated, send a
   freshly-authenticated user straight there. Note this surface did not exist
   before: the destination was a hardcoded constant. Making it dynamic is
   what creates the risk, so it is closed in two stages.

   First `safeRedirect` discards the origin and keeps only path, search, and
   hash, so a foreign host cannot survive. Then the result is checked against
   an allowlist of the only two consoles this site has. Stage one alone is
   already safe — no tested input escapes same-origin — but it is loose:
   "https://evil.example/pwn" resolves to "/pwn", which is harmless yet
   arbitrary. The allowlist means the output can only ever be /app…,
   /dashboard…, or /dashboard.

   That bound is the point. The worst case for ANY input, malformed or
   hostile, is /dashboard — which is exactly the behaviour being replaced.
   This change cannot route anyone somewhere worse than the bug it fixes.

   SEPARATE, PRE-EXISTING, NOT FIXED HERE. A visitor who already holds a
   session and lands on /sign-in gets a blank page: Clerk refuses to render
   <SignIn/>, logs "redirecting to the afterSignIn URL instead", and then does
   not navigate. This reproduces on the unmodified production file — it is not
   caused by anything above, and setting either redirect prop does not prevent
   it. See the fix/clerk-signin-blank-page branch for the previous encounter.
   Left alone deliberately rather than patched blind. */

/* The only authenticated consoles that exist. A destination outside these is
   not a legitimate post-sign-in target, whoever supplied it. */
const ALLOWED_PREFIXES = ["/app", "/dashboard"] as const;

function safeRedirect(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return "/dashboard";
  try {
    /* The base is a throwaway that only lets relative values parse. Whatever
       origin `value` carries is dropped on the next line either way. */
    const url = new URL(value, "http://invalid.internal");
    const path = `${url.pathname}${url.search}${url.hash}`;
    /* Protocol-relative input is already neutralised above — URL parsing
       resolves "//evil.example/x" against the throwaway base and leaves
       pathname "/x", so the host is gone either way. This guard is belt and
       braces for anything that reaches here without a leading slash
       ("javascript:alert(1)" parses to pathname "alert(1)"). */
    if (!path.startsWith("/") || path.startsWith("//")) return "/dashboard";

    /* Second stage: it must actually be one of our consoles. Bare equality,
       or the prefix followed by a boundary character — so "/app" and
       "/app/x" and "/app?t=1" pass, while "/appended" does not. */
    const allowed = ALLOWED_PREFIXES.some(
      (p) => path === p || /^[/?#]/.test(path.slice(p.length)) && path.startsWith(p)
    );
    return allowed ? path : "/dashboard";
  } catch {
    return "/dashboard";
  }
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect_url?: string | string[] }>;
}) {
  const target = safeRedirect((await searchParams).redirect_url);

  return (
    <SignIn
      path="/sign-in"
      routing="path"
      forceRedirectUrl={target}
      fallbackRedirectUrl={target}
    />
  );
}
