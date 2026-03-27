import type { LayoutPreset } from "./types";

// ── craftsmans-mark ───────────────────────────────────────────────────────────
// Best for: premium roofing, luxury home services, custom builders, restoration
// specialists, and any trade company that competes on quality over price and
// where the owner's personal reputation is the primary differentiator.
//
// Concept: "We don't install roofs. We build legacies."
// While competitors race to the bottom on price and blast "CHEAP FREE ESTIMATE"
// everywhere, this preset signals craft, longevity, and personal accountability.
// The homeowner is hiring a craftsman, not a commodity contractor.
//
// Design rationale:
//   • Split hero — editorial and composed; the side-by-side layout conveys
//     deliberateness. For roofing, the image side should be an extreme close-up
//     of material texture (shingles, tile, slate) — almost abstract, completely
//     unexpected for the industry.
//   • About FIRST — for premium services, the visitor is deciding whether to
//     trust a person before they evaluate a price. Lead with the founder story:
//     family business, years of experience, personal warranty. The human
//     connection is the differentiator.
//   • Trust bar after About — credentials land harder once you've made the
//     emotional connection. "Meet the craftsman. Now here's why he's qualified."
//     The sequence matters: person → validation, not validation → person.
//   • Before/after follows trust — the visitor is now primed to believe; the
//     transformation slider delivers the visual proof at peak credibility.
//   • Numbered-list services — premium businesses present a curated service
//     menu, not a shotgun features list. Clean numbered items signal intention
//     and mastery of a defined scope.
//   • Gallery late — for premium local, the gallery is portfolio, not proof.
//     It comes after trust is fully established, as the final confirmation.
//   • Split-form contact — more formal and deliberate; matches the premium
//     positioning. Not a quick-fire "call now" form.
//
// Theme:
//   • Terracotta primary — warm clay tile tones; evokes Mediterranean craft,
//     natural materials, and premium roofing systems (tile, slate, cedar shake).
//     Completely differentiates from the red/blue contractor color wars.
//   • Rounded corners — approachable and trustworthy; premium but human.
//   • Spacious density — luxury is communicated through restraint. Breathing
//     room signals confidence, not a company that needs to shout.
//   • Light mode — traditional, readable, premium. Dark is a tech choice; a
//     60-year-old homeowner hiring a craftsman expects a light, clean layout.
// ─────────────────────────────────────────────────────────────────────────────

export const craftsmansMark: LayoutPreset = {
  name: "craftsmans-mark",
  layout: {
    order: ["hero", "about", "trust-bar", "before-after", "services", "gallery", "contact"],
    sections: {
      hero: true,
      about: true,
      "trust-bar": true,
      "before-after": true,
      services: true,
      gallery: true,
      contact: true,
    },
    variants: {
      hero: "split",
      about: "founder-spotlight",
      "trust-bar": "default",
      "before-after": "slider",
      services: "numbered-list",
      gallery: "lightbox",
      contact: "split-form",
    },
  },
  theme: {
    primaryColor: "oklch(0.62 0.13 52)",
    radius: "rounded",
    density: "spacious",
    font: { heading: "Inter", body: "Inter" },
    mode: "light",
  },
};
