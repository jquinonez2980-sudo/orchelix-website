"use client";

import { useOrganization } from "@clerk/nextjs";

/* Stable identity for the active Clerk organization — its slug is what the
   server-side proxy maps 1:1 to X-Tenant-Id (platformProxy.ts). Every
   tenant-scoped data-fetching effect on a /dashboard page must include this
   in its dependency array.

   Why: the org switcher navigates to afterSelectOrganizationUrl="/dashboard"
   on every switch, but Next's App Router doesn't remount page components on
   a same-URL client-side navigation — so a user who switches orgs while
   already on /dashboard (the common case, since that's where the switch
   always lands) keeps whatever page instance was already mounted. An effect
   keyed only on local filter/pagination state never re-fires, and the
   previous tenant's data is left on screen. useOrganization() is reactive on
   the client independent of the server render, so keying off it fixes this
   without relying on a remount. */
export function useActiveOrgSlug(): string | null {
  const { organization } = useOrganization();
  return organization?.slug ?? null;
}
