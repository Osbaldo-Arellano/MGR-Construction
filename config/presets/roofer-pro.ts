import type { LayoutPreset } from "./types";

// ── roofer-pro ────────────────────────────────────────────────────────────────
// The flagship preset of the Roofer Package.
//
// This is the "everything included" layout — built specifically for residential
// and commercial roofing contractors. Every section earns its place in a
// deliberate narrative arc designed to convert a homeowner from stranger to
// signed contract.
//
// Narrative arc:
//   1. hero        — Cinematic. Aerial drone shot of finished work. "Built to
//                    Last. Guaranteed." The work commands attention.
//   2. emergency   — Immediate urgency. Storm season visitors see a phone
//                    number within 2 seconds of landing. Same-day response CTA.
//   3. trust-bar   — GAF, CertainTeed, NRCA, BBB. Credentials scroll-revealed.
//                    Validates the company before the visitor reads any copy.
//   4. gallery     — Aerial before-afters, completed projects, crew in action.
//                    Proof before pitch. The work earns the trust.
//   5. before-after — Drag slider. Peak attention after gallery. The visceral
//                    transformation moment that no competitor shows this way.
//   6. materials   — Interactive system selector. "Here's what we use and why
//                    it matters." Educates and differentiates simultaneously.
//   7. about       — Founder spotlight. Family business, personal warranty,
//                    "I put my name on every roof." Human connection closes.
//   8. warranty    — Two-card guarantee: Manufacturer + Workmanship. Dark
//                    section that signals permanence and accountability.
//   9. contact     — Split form with urgency framing. Convert.
//
// Theme:
//   • Copper/amber — the color of copper flashing and premium roofing craft.
//     Zero other roofing sites use this. Immediately distinctive.
//   • Sharp corners — precision geometry; roofing is angular work.
//   • Dark mode — almost no roofing company is dark. Maximum contrast makes
//     the copper primary color glow.
//   • Comfortable density — homeowner audience, not a tech crowd.
// ─────────────────────────────────────────────────────────────────────────────

export const rooferPro: LayoutPreset = {
  name: "roofer-pro",
  layout: {
    order: [
      "hero",
      "trust-bar",
      "gallery",
      "why-us",
      "materials",
      "about",
      "certifications",
      "harp",
      "emergency",
      "contact",
      "before-after",
      "warranty",
    ],
    sections: {
      hero: true,
      emergency: true,
      "trust-bar": true,
      "why-us": true,
      gallery: true,
      "before-after": false,
      materials: true,
      about: true,
      certifications: true,
      harp: true,
      warranty: false,
      contact: true,
    },
    variants: {
      hero: "cinematic",
      emergency: "default",
      "trust-bar": "reviews",
      "why-us": "cards",
      gallery: "lightbox",
      "before-after": "slider",
      materials: "comparison",
      about: "founder-spotlight",
      certifications: "default",
      harp: "default",
      warranty: "default",
      contact: "split-form",
    },
    widgets: ["roof-chat", "social-proof-toasts", "roof-age-calculator"],
  },
  theme: {
    primaryColor: "oklch(0.65 0.16 48)",
    radius: "sharp",
    density: "comfortable",
    font: { heading: "Inter", body: "Inter" },
    mode: "light",
  },
};
