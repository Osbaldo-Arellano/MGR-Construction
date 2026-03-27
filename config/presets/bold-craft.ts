import type { LayoutPreset } from "./types";

// ── bold-craft ────────────────────────────────────────────────────────────────
// Best for: trade businesses (electrical, plumbing, HVAC, construction,
// roofing, landscaping) and any blue-collar or veteran-owned service company.
//
// Design rationale:
//   • Cinematic hero — full-viewport drama that commands attention immediately
//   • Trust bar early — credentials (licenses, unions, accreditations) validate
//     the business before the visitor scrolls past the fold
//   • Services before About — answer "what do you do?" before "who are you?"
//     Trade visitors want to know capabilities fast
//   • Photo-grid About — real job-site photos build more trust than headshots
//     for trade businesses
//   • Stacked contact — simpler, locally-focused form suits local businesses
//
// Theme:
//   • Amber-orange primary — evokes tools, craft, warmth, hard work; avoids
//     the generic blue that most service companies default to
//   • Rounded corners — approachable and trustworthy, not sterile
//   • Comfortable density — readable for an older, less tech-savvy audience
//   • Light mode — maximum accessibility and readability
// ─────────────────────────────────────────────────────────────────────────────

export const boldCraft: LayoutPreset = {
  name: "bold-craft",
  layout: {
    order: ["hero", "trust-bar", "services", "about", "gallery", "contact"],
    sections: {
      hero: true,
      "trust-bar": true,
      about: true,
      services: true,
      gallery: true,
      contact: true,
    },
    variants: {
      hero: "cinematic",
      "trust-bar": "default",
      services: "numbered-list",
      about: "photo-grid-quote",
      gallery: "lightbox",
      contact: "stacked",
    },
  },
  theme: {
    primaryColor: "oklch(0.68 0.18 45)",
    radius: "rounded",
    density: "comfortable",
    font: { heading: "Inter", body: "Inter" },
    mode: "light",
  },
};
