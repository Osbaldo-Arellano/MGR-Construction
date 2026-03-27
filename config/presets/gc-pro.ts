import type { LayoutPreset } from "./types";

// ── gc-pro ────────────────────────────────────────────────────────────────────
// The flagship preset of the General Contractor Package.
//
// Built for residential and commercial GCs who do it all — new construction,
// remodels, additions, commercial build-outs. The goal is to signal competence,
// accountability, and range without looking chaotic.
//
// Narrative arc:
//   1. hero        — Cinematic. Job-site aerial or finished exterior shot.
//                    "From Blueprint to Build." Scope commands attention.
//   2. trust-bar   — Credential bar. Licensed, Bonded, Insured, Years, Service
//                    Area. Validates hard facts before the visitor reads copy.
//   3. services    — Grid of trade capabilities with a tilt hover effect.
//                    Answers "what do you build?" fast, shows breadth.
//   4. gallery     — Completed projects. Proof before the pitch lands.
//   5. before-after — Renovation reveal drag slider. Most persuasive format
//                    for remodel/exterior work.
//   6. about       — Stats-forward. Years, professionals, service area, on-time
//                    rate. Numbers over founder story for a trade audience.
//   7. contact     — Stacked form. Simple, locally-focused, no friction.
//
// Theme:
//   • Forest green primary — #006634. Completely distinct from roofer-pro's
//     copper/amber. Bold, trustworthy, Oregon-rooted.
//   • Deep indigo secondary — #282F99. Injected as --brand-secondary.
//   • Vivid orange accent — #EA4E1B. Injected as --brand-accent.
//   • Rounded corners — approachable. Different from roofer-pro's sharp.
//   • Light mode only. No dark variant for this package.
//   • Comfortable density — readable for homeowners and developers alike.
// ─────────────────────────────────────────────────────────────────────────────

export const gcPro: LayoutPreset = {
  name: "gc-pro",
  layout: {
    order: [
      "hero",
      "trust-bar",
      "services",
      "gallery",
      "before-after",
      "about",
      "contact",
    ],
    sections: {
      hero: true,
      "trust-bar": true,
      services: true,
      "why-us": false,
      gallery: true,
      "before-after": true,
      about: true,
      contact: true,
    },
    variants: {
      hero: "cinematic",
      "trust-bar": "default",      // credential bar — not reviews (roofer-pro uses reviews)
      services: "grid-tilt",
      gallery: "lightbox",
      "before-after": "slider",
      about: "stats-forward",      // numbers first — not founder-spotlight (roofer-pro)
      contact: "stacked",          // simple stacked — not split-form (roofer-pro)
    },
  },
  theme: {
    // MGR Construction brand colors:
    //   #006634 → oklch(0.40 0.13 151)  Forest green   → --primary
    //   #282F99 → oklch(0.37 0.17 268)  Deep indigo    → --brand-secondary
    //   #EA4E1B → oklch(0.62 0.21 33)   Vivid orange   → --brand-accent
    primaryColor:   "oklch(0.40 0.13 151)",
    secondaryColor: "oklch(0.37 0.17 268)",
    accentColor:    "oklch(0.62 0.21 33)",
    radius: "rounded",
    density: "comfortable",
    font: { heading: "Inter", body: "Inter" },
    mode: "light",
  },
};
