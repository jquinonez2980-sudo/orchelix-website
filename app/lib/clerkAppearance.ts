/* One Clerk appearance object for every Clerk widget on the site.

   It was duplicated verbatim in dashboard/layout.tsx and DashboardShell.tsx,
   which is how the org switcher in the header ended up unreadable while the
   one on the org gate was fine: a fix applied to one copy silently missed the
   other. Import this instead of declaring a third.

   Why `variables` at all: Clerk portals its dropdowns and modals to the
   document root, outside the `.lg-app` scope, so utility classes on the
   trigger never reach them. `variables` is Clerk's own token surface and
   ships with @clerk/nextjs — no @clerk/themes dependency. The values are
   literals because Clerk resolves them in JS, where `var()` would not
   compute.

   Why `elements` as well: `variables.colorText` colours Clerk's own chrome,
   but the organization NAME renders in a nested identifier node that carries
   its own colour. Setting a colour on the trigger does not cascade into a
   child with an explicit one — which is why the company name read as dark
   charcoal on the navy header. Each identifier node is named here so the
   colour lands on the element that actually paints the text.

   `app/globals.css` carries a scoped backstop for the same reason; see the
   `.lg-app .cl-` block there. Between the two, a Clerk node has to be both
   unnamed here and unmatched there to come out unstyled. */

/* 2026-08-10 rebrand: field flipped from dark navy to white/light-grey and
   ink flipped from a pale cream to Graphite to match. Ratios recomputed for
   the new pairing, same convention as before (ink-on-field). */
const INK = "#2E323E"; // --lg-ink,   ~12.8:1 on the field
const INK_2 = "rgba(46, 50, 62, 0.80)"; // --lg-ink-2, AA on field
const FIELD = "#FFFFFF"; // --lg-field
const FIELD_2 = "#F1F3F5"; // --lg-field-2
const FOIL = "#B7135A"; // --lg-foil
const FOIL_INK = "#FFFFFF"; // --lg-foil-ink

export const clerkWidgetAppearance = {
  variables: {
    colorBackground: FIELD,
    colorText: INK,
    colorTextSecondary: INK_2,
    colorPrimary: FOIL,
    colorInputBackground: FIELD_2,
    colorInputText: INK,
    colorNeutral: INK,
    borderRadius: "0px",
  },
  elements: {
    rootBox: { width: "100%" },
    card: {
      boxShadow: "none",
      border: "none",
      background: "transparent",
    },
    headerTitle: { color: INK, fontFamily: "inherit" },
    headerSubtitle: { color: INK_2 },
    socialButtonsBlockButton: {
      border: `1px solid rgba(46, 50, 62, 0.14)`,
      color: INK,
      background: FIELD,
    },
    formButtonPrimary: {
      background: FOIL,
      color: FOIL_INK,
      boxShadow: "none",
      borderRadius: "0px",
    },
    formFieldInput: {
      borderRadius: "0px",
      color: INK,
      background: FIELD_2,
    },
    footerActionLink: { color: FOIL },
    identityPreviewText: { color: INK },
    identityPreviewEditButton: { color: FOIL },
    formFieldLabel: { color: INK_2 },
    dividerText: { color: INK_2 },
    organizationSwitcherTrigger: "text-ink hover:bg-surface-2",
    /* The nodes that actually paint the company name and the user's name.
       Literal colours rather than utility classes: these render inside
       Clerk's portal on some breakpoints, where `.lg-app` does not reach. */
    organizationPreviewMainIdentifier: { color: INK },
    organizationPreviewSecondaryIdentifier: { color: INK_2 },
    organizationSwitcherTriggerIcon: { color: INK_2 },
    userButtonOuterIdentifier: { color: INK },
    userPreviewMainIdentifier: { color: INK },
    userPreviewSecondaryIdentifier: { color: INK_2 },
  },
};

/* 2026-08-19: the Esmi dashboard's variant of the same object, for the same
   reason the light one exists — Clerk portals dropdowns/modals to the
   document root, outside `.lg-app.esmi-dashboard`, so CSS can't reach them
   and the literals have to be duplicated here. Used only by
   DashboardShell.tsx and the org gate in dashboard/layout.tsx; every other
   Clerk mount (`/app`, `/get-started`, `/sign-in`, `/sign-up`) keeps
   `clerkWidgetAppearance` above untouched — AcumenAI's console is not
   part of this rebrand. Values are the same four constants as
   `.lg-app.esmi-dashboard` in app/globals.css; keep the two in sync. */
const ESMI_INK = "#EAF2FF"; // --lg-ink in .esmi-dashboard
const ESMI_INK_2 = "rgba(234, 242, 255, 0.72)"; // --lg-ink-2
const ESMI_FIELD = "#0A0F1C"; // --lg-field
const ESMI_FIELD_2 = "#0D1526"; // --lg-field-2
const ESMI_FOIL = "#00F0FF"; // --lg-foil
const ESMI_FOIL_INK = "#04141A"; // --lg-foil-ink

export const dashboardClerkAppearance = {
  variables: {
    colorBackground: ESMI_FIELD,
    colorText: ESMI_INK,
    colorTextSecondary: ESMI_INK_2,
    colorPrimary: ESMI_FOIL,
    colorInputBackground: ESMI_FIELD_2,
    colorInputText: ESMI_INK,
    colorNeutral: ESMI_INK,
    borderRadius: "0px",
  },
  elements: {
    rootBox: { width: "100%" },
    card: {
      boxShadow: "none",
      border: "none",
      background: "transparent",
    },
    headerTitle: { color: ESMI_INK, fontFamily: "inherit" },
    headerSubtitle: { color: ESMI_INK_2 },
    socialButtonsBlockButton: {
      border: `1px solid rgba(234, 242, 255, 0.14)`,
      color: ESMI_INK,
      background: ESMI_FIELD,
    },
    formButtonPrimary: {
      background: ESMI_FOIL,
      color: ESMI_FOIL_INK,
      boxShadow: "none",
      borderRadius: "0px",
    },
    formFieldInput: {
      borderRadius: "0px",
      color: ESMI_INK,
      background: ESMI_FIELD_2,
    },
    footerActionLink: { color: ESMI_FOIL },
    identityPreviewText: { color: ESMI_INK },
    identityPreviewEditButton: { color: ESMI_FOIL },
    formFieldLabel: { color: ESMI_INK_2 },
    dividerText: { color: ESMI_INK_2 },
    organizationSwitcherTrigger: "text-ink hover:bg-surface-2",
    organizationPreviewMainIdentifier: { color: ESMI_INK },
    organizationPreviewSecondaryIdentifier: { color: ESMI_INK_2 },
    organizationSwitcherTriggerIcon: { color: ESMI_INK_2 },
    userButtonOuterIdentifier: { color: ESMI_INK },
    userPreviewMainIdentifier: { color: ESMI_INK },
    userPreviewSecondaryIdentifier: { color: ESMI_INK_2 },
  },
};

/* 2026-08-19: the auth door (/sign-in, /sign-up).

   WHY A THIRD OBJECT rather than reusing `dashboardClerkAppearance`. That one
   dresses Clerk widgets sitting INSIDE the console chrome — an org switcher
   and a user button in a header, small and quiet. This one dresses the whole
   sign-in form as the only thing on the screen, over glass rather than over
   the flat `--lg-field`. Same six colour constants, different job: the
   surfaces here are transparent so the aurora shows through, and the form
   needs the larger type and targets that a full-page form earns.

   WHY SO FEW `elements` COMPARED TO THE OTHER TWO. Those objects fight the
   portal problem — Clerk moves dropdowns and modals to the document root
   where `.lg-app` cannot reach them, so the colours must be JS literals. A
   signed-out auth route renders no portalled widget at all, so the shape of
   the fix is inverted: `variables` below carries the palette (Clerk resolves
   these in JS to derive its own hover and border shades, so they must stay
   literals), and the `.esmi-auth .cl-` block in app/globals.css carries
   everything with a state or a media query. Anything added here that also
   appears there will lose — the CSS is two class levels deep, Clerk's
   generated class is one.

   The values are the same `.lg-app.esmi-dashboard` constants declared above;
   keep all three objects in sync with that block in app/globals.css. */
export const esmiAuthAppearance = {
  variables: {
    colorBackground: ESMI_FIELD,
    colorText: ESMI_INK,
    colorTextSecondary: ESMI_INK_2,
    colorPrimary: ESMI_FOIL,
    colorInputBackground: "rgba(234, 242, 255, 0.04)",
    colorInputText: ESMI_INK,
    colorNeutral: ESMI_INK,
    /* Failure/success come from the console's four-way status vocabulary
       rather than Clerk's defaults, so a wrong password reads in the same
       red the call register uses for a failed call. */
    colorDanger: "#FF6E68",
    colorSuccess: "#34D399",
    colorWarning: ESMI_FOIL,
    borderRadius: "0px",
  },
  elements: {
    rootBox: { width: "100%" },
    /* The glass panel is ours (`.esmi-auth-card`); Clerk's card is the
       transparent contents inside it. */
    card: {
      boxShadow: "none",
      border: "none",
      background: "transparent",
      width: "100%",
      padding: "0",
    },
    /* Clerk renders its own lockup slot above the title. Ours is already in
       the layout masthead, and two lockups stacked is the tell of a template
       that was themed rather than designed. */
    logoBox: { display: "none" },
    header: { textAlign: "left" as const },
    headerTitle: { color: ESMI_INK, fontFamily: "inherit" },
    headerSubtitle: { color: ESMI_INK_2 },
    formFieldInput: { color: ESMI_INK },
    formFieldLabel: { color: ESMI_INK_2 },
    formButtonPrimary: { background: ESMI_FOIL, color: ESMI_FOIL_INK },
    socialButtonsBlockButton: { color: ESMI_INK },
    dividerText: { color: ESMI_INK_2 },
    footerActionLink: { color: ESMI_FOIL },
    identityPreviewText: { color: ESMI_INK },
    identityPreviewEditButton: { color: ESMI_FOIL },
  },
};

export default clerkWidgetAppearance;
