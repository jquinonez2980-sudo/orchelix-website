import { SignUp } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkWidgetAppearance } from "@/app/lib/clerkAppearance";

/* Redirects into /get-started rather than /dashboard: a fresh sign-up has no
   Clerk organization yet, so landing on /dashboard would only show the
   "ask your Orchelix contact for an invite" gate. /get-started continues
   straight into the self-serve application (SignupWizard). */

export default async function SignUpPage() {
  const { userId } = await auth();
  if (userId) redirect("/get-started");

  return (
    <SignUp
      path="/sign-up"
      routing="path"
      forceRedirectUrl="/get-started"
      fallbackRedirectUrl="/get-started"
      appearance={clerkWidgetAppearance}
      signInUrl="/sign-in"
    />
  );
}
