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
const INK_2 = "rgba(46, 50, 62, 0.68)"; // --lg-ink-2, ~4.7:1 on the field
const FIELD = "#FFFFFF"; // --lg-field
const FIELD_2 = "#F1F3F5"; // --lg-field-2
const FOIL = "#B7135A"; // --lg-foil

export const clerkWidgetAppearance = {
  variables: {
    colorBackground: FIELD,
    colorText: INK,
    colorTextSecondary: INK_2,
    colorPrimary: FOIL,
    colorInputBackground: FIELD_2,
    colorInputText: INK,
    borderRadius: "0px",
  },
  elements: {
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

export default clerkWidgetAppearance;
