import type { LayoutPreset } from "./types";

// ── the-blueprint ─────────────────────────────────────────────────────────────
// Process-driven GC preset. Built for contractors who win on transparency —
// the ones who explain how they work and why that makes them the right choice.
//
// Design rationale:
//   • Bento hero — multi-cell grid shows project variety at a glance.
//     New construction, remodels, commercial, and residential simultaneously.
//     Signals range without a single word of copy.
//   • Services first (after trust) — for a process-forward GC, the "how we
//     build" story comes before social proof. Leads with method, earns trust
//     through transparency.
//   • Photo-grid About — real job-site photos (crews, concrete, framing)
//     outperform headshots. Shows the actual work, not the salesperson.
//   • Before-after after gallery — visual proof of transformation reinforces
//     the gallery portfolio with a more visceral format.
//   • Navy/blueprint — echoes the craft of architectural drawing. Every
//     project starts with a blueprint; the brand should signal that precision.
//
// Narrative arc:
//   1. hero        — Bento grid. Multiple project types visible instantly.
//   2. trust-bar   — Credentials first scroll. Licensed, Bonded, Insured.
//   3. services    — Numbered process steps. Here's how we build.
//   4. why-us      — Differentiator cards. Why us over the next GC.
//   5. gallery     — Portfolio. Proof that the process produces results.
//   6. before-after — Renovation reveal. The transformation moment.
//   7. about       — Photo-grid + founder quote. The people behind the work.
//   8. contact     — Stacked form. Simple, accessible, locally focused.
//
// Theme:
//   • Navy blue — precision, blueprints, trust. Darker than steel, warmer
//     than corporate black. The color of a rolled plan on a jobsite table.
//   • Sharp corners — plans are precise; so is this company.
//   • Light mode — accessible, clean, residential-friendly.
//   • Comfortable density — serves both homeowners and developers.
// ─────────────────────────────────────────────────────────────────────────────

export const theBlueprint: LayoutPreset = {
  name: "the-blueprint",
  layout: {
    order: [
      "hero",
      "trust-bar",
      "services",
      "why-us",
      "gallery",
      "before-after",
      "about",
      "contact",
    ],
    sections: {
      hero: true,
      "trust-bar": true,
      services: true,
      "why-us": true,
      gallery: true,
      "before-after": true,
      about: true,
      contact: true,
    },
    variants: {
      hero: "bento",
      "trust-bar": "default",
      services: "numbered-list",
      "why-us": "cards",
      gallery: "lightbox",
      "before-after": "slider",
      about: "photo-grid-quote",
      contact: "stacked",
    },
  },
  theme: {
    primaryColor: "oklch(0.42 0.12 255)",
    radius: "sharp",
    density: "comfortable",
    font: { heading: "Inter", body: "Inter" },
    mode: "light",
  },
};
