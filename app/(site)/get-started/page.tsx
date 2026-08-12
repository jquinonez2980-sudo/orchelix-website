import { auth, currentUser } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import SignupWizard from "./SignupWizard";

export const dynamic = "force-dynamic";

/* Signed-out visitors get an in-page card with a modal sign-in — the same
   pattern app/app/AcumenDashboard.tsx uses — rather than an auth.protect()
   bounce to Clerk's hosted portal. Keeps /get-started linkable from the
   marketing site without a redirect hop. */
function SignInGate() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center px-6 py-24">
      <div
        className="w-full border border-line bg-surface p-8 text-center"
        style={{ borderTop: "2px solid var(--lg-rule)" }}
      >
        <h1
          className="text-2xl font-semibold tracking-tight text-ink"
          style={{
            fontFamily: "var(--font-display)",
            fontStretch: "82%",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          Get started with Esmi
        </h1>
        <p className="mt-3 text-sm leading-6 text-ink-2">
          Create an account to apply. It takes about two minutes — you&apos;ll
          tell us about your business, and Orchelix reviews every application
          before anything goes live.
        </p>
        <SignInButton mode="modal">
          <button
            type="button"
            className="lg-stamp lg-foil-surface mt-6 w-full px-5 py-3 text-sm font-semibold transition hover:brightness-105"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: 0,
              color: "var(--lg-foil-ink)",
            }}
          >
            Sign in to continue
          </button>
        </SignInButton>
        <p className="mt-4 text-xs text-ink-3">
          Already onboarded?{" "}
          <a href="/dashboard" className="text-ink underline hover:text-ink-2">
            Go to your dashboard
          </a>
        </p>
      </div>
    </main>
  );
}

export default async function GetStartedPage() {
  const { userId } = await auth();
  if (!userId) return <SignInGate />;

  const user = await currentUser();
  return (
    <SignupWizard
      defaultEmail={user?.primaryEmailAddress?.emailAddress ?? ""}
      defaultName={
        [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim()
      }
    />
  );
}
