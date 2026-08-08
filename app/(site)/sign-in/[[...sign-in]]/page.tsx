import { SignIn } from "@clerk/nextjs";

/* Both redirect props are required, not redundant: forceRedirectUrl governs
   the redirect immediately after a sign-in is completed (overriding any
   ?redirect_url= param); fallbackRedirectUrl is what Clerk's "you're already
   signed in" codepath uses when a visitor with an active session lands here
   directly. Without fallbackRedirectUrl, that codepath logs its intent to
   redirect but never navigates anywhere, leaving a blank page. */
export default function SignInPage() {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      forceRedirectUrl="/dashboard"
      fallbackRedirectUrl="/dashboard"
    />
  );
}
