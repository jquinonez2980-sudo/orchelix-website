"use client";

/* ───────────────────────────────────────────────────────────────────────────
   useAcumenToken — supplies the bearer token for AcumenAI dashboard API calls.

   STUB until Clerk (or another provider) is installed. It returns no token, so the
   dashboard renders its "sign-in required" state and never calls /api/live/* with a
   bad token. This keeps the site building WITHOUT @clerk/nextjs installed.

   To wire Clerk (one change — see app/app/README.md):
     1. npm i @clerk/nextjs
     2. Add <ClerkProvider> in app/layout.tsx and middleware.ts (see README)
     3. Replace the body of this hook with:

          import { useAuth } from "@clerk/nextjs";
          export function useAcumenToken() {
            const { getToken, isSignedIn, isLoaded } = useAuth();
            const [token, setToken] = useState<string | null>(null);
            useEffect(() => {
              if (isSignedIn) getToken().then(setToken);
            }, [isSignedIn, getToken]);
            return { token, ready: isLoaded, signedIn: !!isSignedIn };
          }
   ─────────────────────────────────────────────────────────────────────────── */

export function useAcumenToken(): { token: string | null; ready: boolean; signedIn: boolean } {
  // No provider wired yet → no token, ready=true, signedIn=false.
  return { token: null, ready: true, signedIn: false };
}
