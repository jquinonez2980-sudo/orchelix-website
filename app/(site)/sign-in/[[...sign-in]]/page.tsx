import { SignIn } from "@clerk/nextjs";

/* `forceRedirectUrl` was "/dashboard" here, and that was the AcumenAI
   mis-routing bug.

   proxy.ts protects both consoles, so an unauthenticated visitor to /app is
   sent to /sign-in?redirect_url=%2Fapp by `auth.protect()`. `forceRedirectUrl`
   does exactly what its name says — it overrides that param — so every
   sign-in landed on the Esmi dashboard regardless of which product the person
   was trying to reach. An AcumenAI customer would arrive looking at another
   product's data entirely.

   `fallbackRedirectUrl` is the correct prop for a default: Clerk honours
   `redirect_url` when it is present and falls back to this when it is not.
   That restores /app -> sign in -> /app, keeps /dashboard -> sign in ->
   /dashboard, and still gives a bare visit to /sign-in somewhere to land.

   Keeping the fallback also preserves what the previous comment was really
   protecting against: Clerk's "you are already signed in" codepath needs a
   destination or it logs its intent and never navigates, leaving a blank
   page. That path uses fallbackRedirectUrl, which is still set.

   Note the default remains /dashboard. A bare /sign-in visit carries no
   signal about which product the account belongs to; the session's
   organization is only known after authentication. If AcumenAI accounts ever
   need to land on /app from a bare visit, that is a post-auth resolver
   keyed on the org — not something this component can decide. */
export default function SignInPage() {
  return <SignIn path="/sign-in" routing="path" fallbackRedirectUrl="/dashboard" />;
}
