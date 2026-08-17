# Handoff: Inscription desktop regression + narrow-viewport framing

Written 2026-08-17 by the Claude session that has been working the mobile
issues. You own `app/inscription/`; this is what I found from outside it.

**Priority 1 is a live production regression on desktop.** Priorities 2 and 3
are mobile framing issues, one fixed and one half-fixed.

---

## 1. BLOCKING — the volume does not render on desktop in production

**Reproduce:** open `https://orchelix.com/` in a desktop browser at ~1920x911.
The hero is empty where the glass ledger should be.

**What I verified:**

| Check | Result |
| --- | --- |
| `<canvas>` present and sized | yes — 1905x896 buffer, matching CSS size |
| `[data-inscription]` `data-tier` | `high` |
| `data-backend` | `webgl` |
| Poster fallback mounted | no (`.ins-poster` absent) |
| Console errors | none |
| `.ins-stage` z-index / opacity | `0` / `1` — not hidden, not covered |
| `.ins-canvas` z-index / opacity | `1` / `1` |
| Anything painted over the hero right side | no — hit-testing returns only DOM (`lg-hero-grid`), the canvas sits behind as intended |

So the renderer is alive, the canvas is correct, nothing occludes it, and the
scene draws nothing visible. It is a scene-graph or camera problem, not a
mount, CSS, or context problem.

**It is not caused by uncommitted work.** I stashed everything local and the
volume was still missing.

**When it appeared.** The volume rendered correctly on this code at ~23:42 on
2026-08-16 (I have a screenshot). It is missing after PR #4 merged. PR #4 is
six commits and the two that touch the renderer or camera are the suspects:

- `9be6f77` — removed `preserveDrawingBuffer: true` from the `<Canvas gl>`
  props, added a `webglcontextlost` handler, added `transmissionScale` to the
  quality tiers and **assigned `renderer.transmissionResolutionScale` in
  `onCreated`**. That assignment is the one I would look at first.
- `f8e6f23` — added `dollyForAspect()` and made `isNarrowView()` also return
  true for portrait aspect. On a 1920x911 desktop `dollyForAspect` returns
  exactly `1` and `isNarrowView()` is `false`, so both *should* be identity
  there — but this is the other thing that changed.

`git bisect` across those six commits with the desktop hero as the test would
settle it in a few minutes. I could not, because I have no way to observe the
scene's internals (see "Constraints" below).

**Second, smaller production bug found alongside it:** the page scrolls
sideways on desktop. `documentElement.scrollWidth` is 2313 against a 1905
viewport — **408px of horizontal overflow**. The element responsible is
`.lg-menu`, the closed nav drawer: it is `position: fixed` and hidden with
`transform: translateX(104%)`, which still contributes to document scroll
width. This one looks pre-existing rather than from PR #4. `overflow-x: hidden`
on the root, or `visibility: hidden` on the closed drawer, both fix it; the
second is better because it also takes the drawer out of the tab order.

---

## 2. FIXED and merged — the mobile nav

Was wrapping into three rows in the wrong order, with the phone number and
BOOK A PILOT sitting *above* the wordmark and the header eating roughly a
quarter of the viewport.

Cause was `flex-wrap: wrap` on `.lg-nav__actions`. That container is `ml-auto`,
so once it wrapped its contents broke onto a line above the logo rather than
below it.

Below 900px the bar now carries only logo + stamp + menu (~291px inside 390px,
measured). Phone and language were already in the drawer; lighting was not, so
it was added there and hidden again at >=900px. `ConditionsControl` gained a
`parts` prop so the drawer does not offer the language choice twice under two
different labels.

Merged as PR #5 (`9800cd5`). Verified on desktop only — **the mobile layout
itself is still unconfirmed on a device.**

---

## 3. HALF-FIXED — the volume sits off the right edge on a phone

Two separate problems. The first is fixed, the second is not.

**Size — fixed.** `fov` in three is the *vertical* angle, so a tall phone sees
the same vertical extent through a much narrower horizontal one and the subject
grows to fill the width. At 393x852 the aspect is 0.46, which turns a
30-degree vertical field into roughly 14 degrees horizontally. `dollyForAspect`
pushes the camera back as the aspect narrows (3.14x on that phone, identity at
or above 1.6 aspect so desktop is untouched). The owner confirmed the size is
now right.

There is a temporary `?dolly=N` query override in `ScrollDirector.ts` for
tuning this on a real device without a deploy per guess. **It is still in
production. Delete it once the constants are settled.**

**Position — not fixed.** The volume sits hard against the right edge, cropped,
at every scroll position. Every `CAM_NARROW` shot aims at `x ~ 0` while the
ledger stands right of centre, so the camera is looking a long way to the left
of the object. On desktop that offset is deliberate — the copy holds the left
half — but on a phone the copy is full width and there is no left half to
protect.

There is an attempt on branch **`wip/narrow-recentre`**, deliberately not
merged. It adds `VOLUME_ORIGIN` to `volumeLayout.ts` and a `recentre()` that
trucks camera and target together on narrow viewports until the aim lands on
the volume's x, applied to all three return paths including the stamp lock.

**Its known flaw, worth reading before you use it:** `InscriptionVolume`
animates `g.position.x` per frame —

```ts
const heroX = narrow ? 0.36 + first * 0.1 : 1.02 + first * 0.16;
g.position.x = lerp(g.position.x, beat === 1 ? heroX : narrow ? -0.04 : 0.35 - p * 0.16, k);
```

— so `VOLUME_ORIGIN` is only the group's starting value, not where the object
actually is at any given beat. A correct recentre has to track that animated x
(or the two need to be driven from one source). Treat the branch as a sketch of
the idea, not a fix.

---

## Constraints I worked under, so you can discount my guesses appropriately

Several conclusions in this document are reasoned rather than measured, because
the environment could not observe the running scene:

- **No mobile viewport.** `resize_window` reports success and silently leaves
  the viewport at 1920. Narrowing the canvas alone gives a false reading,
  because `isNarrowView()` keys off `window.innerWidth` and so pairs a phone
  aspect with the desktop camera table — a combination no device produces.
  Sized popups open outside the automatable tab group.
- **No access to page globals.** Browser JS is evaluated in an isolated world,
  so `window.__whatever` set by the app is invisible. DOM is shared, so
  `document.documentElement.dataset` works as a channel — but an attempt to
  write camera state there from inside `ThemeBridge`'s `useFrame` never
  produced an attribute, with no console error, which I could not explain and
  did not resolve.

If you can read the camera and the volume's world position at beat 1 on both a
desktop and a phone viewport, both remaining problems should fall out quickly.
That is the one capability I lacked throughout.

---

## Suggested order

1. Bisect PR #4 for the desktop regression. Start at the
   `transmissionResolutionScale` assignment in `SceneCanvas.onCreated`.
2. Fix the 408px horizontal overflow from the closed `.lg-menu` drawer.
3. Redo the narrow recentre against the animated `g.position.x`, using
   `wip/narrow-recentre` as a starting point rather than as a patch.
4. Delete the `?dolly=` override once the framing constants are settled.
5. Confirm the mobile nav on a real device — it is merged but was only ever
   verified at desktop width.
