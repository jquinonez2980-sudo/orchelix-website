import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",

    /* Vendored and extracted source. None of this is our app: it is
       third-party code checked in for reference, plus a design-system
       extraction that contains a copy of an app rather than part of one.
       Linting it produced roughly 90 of the 156 errors in the run on
       2026-09-10 — `no-var`, `prefer-const`, React-19 compiler complaints —
       none of it actionable, all of it drowning the findings in our own
       `app/` directory that are.

       Rules of thumb for adding to this list: the code is not ours to fix,
       or is not shipped. A file we would edit in response to a lint error
       does not belong here.

       Note the packages behind two of these were already dropped from
       package.json; only the checked-out directories remain. If they are
       genuinely dead, deleting them beats ignoring them. */
    "design-extract/**",
    "liquid-glass-js/**",
    "liquid-glass-react/**",
    "liquid-logo/**",
  ]),
]);

export default eslintConfig;
