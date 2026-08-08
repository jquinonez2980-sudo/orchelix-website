import { SignUp } from "@clerk/nextjs";

/* Redirects into /get-started rather than /dashboard: a fresh sign-up has no
   Clerk organization yet, so landing on /dashboard would only show the
   "ask your Orchelix contact for an invite" gate. /get-started continues
   straight into the self-serve application (SignupWizard). */
export default function SignUpPage() {
  return <SignUp path="/sign-up" routing="path" forceRedirectUrl="/get-started" />;
}
