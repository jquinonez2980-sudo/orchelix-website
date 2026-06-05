"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

/* Supplies the bearer token for AcumenAI dashboard API calls, from the Clerk
   session. getToken() returns a short-lived JWT that the Cloud Run API validates
   against Clerk's JWKS. All setState happens in async callbacks / a microtask to
   satisfy react-hooks/set-state-in-effect. */

export function useAcumenToken(): { token: string | null; ready: boolean; signedIn: boolean } {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    if (!isSignedIn) {
      queueMicrotask(() => { if (active) setToken(null); });
      return () => { active = false; };
    }
    getToken()
      .then((t) => { if (active) setToken(t); })
      .catch(() => { if (active) setToken(null); });
    return () => { active = false; };
  }, [isSignedIn, getToken]);

  return { token, ready: isLoaded, signedIn: !!isSignedIn };
}
