import { ClerkProvider } from "@clerk/nextjs";
import ScrollUnlocker from "./ScrollUnlocker";

/* AcumenAI operator console layout — scopes ClerkProvider to /app so the rest of
   the marketing site never depends on Clerk. force-dynamic keeps this auth-gated
   segment out of static prerendering (so `next build` needs no Clerk keys). */

export const dynamic = "force-dynamic";

export default function AcumenAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <ScrollUnlocker />
      {children}
    </ClerkProvider>
  );
}
