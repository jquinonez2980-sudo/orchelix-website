"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

/* Supplies the bearer token for AcumenAI dashboard API calls, from the Clerk
   session. The Cloud Run API validates it against Clerk's JWKS. All setState
   happens in async callbacks / a microtask to satisfy
   react-hooks/set-state-in-effect.

   WHY A TEMPLATE. A bare getToken() returns Clerk's default session token,
   whose claims are sub / iss / aud / azp / exp / iat / nbf / sid — and no
   email. dashboard/auth.py in vtx-os authorises against AUTH_ALLOWED_EMAILS
   by reading `email` off the verified claims, so with the default token that
   lookup resolves to "" and every request 403s, including allowlisted ones.
   Confirmed against a live token on 2026-08-09: no email claim present.

   The named template adds it. Configure in the Clerk Dashboard under
   JWT Templates as `acumen`, with:  { "email": "{{user.primary_email_address}}" }

   WHY THE FALLBACK. getToken({ template }) rejects if the template does not
   exist on the instance. Without a fallback, that failure returns null, and
   LiveConsole bails on `if (!token) return` without rendering an error — a
   silently blank console, which is strictly worse than the 403 it replaces.
   Falling back to the default token keeps the current behaviour instead, so
   this change is safe to ship before or after the Clerk-side config lands. */

const ACUMEN_JWT_TEMPLATE = "acumen";

export function useAcumenToken(): { token: string | null; ready: boolean; signedIn: boolean } {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!isSignedIn) {
      queueMicrotask(() => { if (active) setToken(null); });
      return () => { active = false; };
    }

    (async () => {
      let next: string | null = null;
      try {
        next = await getToken({ template: ACUMEN_JWT_TEMPLATE });
      } catch {
        next = null;
      }
      if (!next) {
        /* Template missing or errored — fall back so the console still loads
           and fails visibly at the API rather than rendering nothing. */
        try {
          next = await getToken();
        } catch {
          next = null;
        }
      }
      if (active) setToken(next);
    })();

    return () => { active = false; };
  }, [isSignedIn, getToken]);

  return { token, ready: isLoaded, signedIn: !!isSignedIn };
}
