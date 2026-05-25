# Operator console UI kit

A click-through recreation of the Orchelix operator console — the surface where
business owners watch their AI agents run, intervene when needed, and review
performance. The headline screen is the **Esmi · Virtual Receptionist** agent
mid-call.

## What's in it

- `index.html` — mounts `<App />` into the page.
- `Components.jsx` — every panel as a React component.
- `styles.css` — kit-scoped layout + component styles on top of design tokens.

## Layout

A two-column app shell: dark navy `<Sidebar>` on the left, neutral `<main>` on
the right with a sticky `<Topbar>` above. Main contains:

| Component | What it does |
|---|---|
| `<PageHead>` | Page title + timeframe segmented control + configure button. |
| `<KPIs>` + `<Spark>` | Four metric tiles with sparkline trends. |
| `<LivePanel>` | Active call card — caller info, language, and a timeline of agent steps with `done / active / idle` states and listen-in/transfer/end-call controls. |
| `<AgentList>` | Side rail listing every agent in the workspace with status pills. |
| `<Transcript>` | Live bilingual transcript with a composer for notes to the agent. |
| `<Icon>` | Inline Lucide-style SVG icons — `home`, `agents`, `inbox`, `calls`, `bell`, `play`, `transfer`, etc. |

## Notes

- Every interactive element is cosmetic — clicks don't do anything. The kit is
  about visual fidelity, not behaviour.
- The Esmi wordmark appears in two places: the agent list row and the live-call
  panel header. Both pull from `assets/esmi-logo.png`.
- The Orchelix helix mark appears in the sidebar header (light version) only.
