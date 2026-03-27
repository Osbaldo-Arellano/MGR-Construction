import type { LayoutPreset } from "./types";

// ── storm-break ───────────────────────────────────────────────────────────────
// Best for: roofing companies, storm restoration contractors, siding/gutters,
// exterior waterproofing, or any business whose product is literally protection
// against the elements.
//
// Concept: "We stand between your family and whatever's coming."
// Most roofing sites look identical — blue or red, stock house photo, "Free
// Estimate." This preset breaks that completely with a dark, dramatic identity
// that immediately says: we take this seriously.
//
// Design rationale:
//   • Cinematic hero — full-viewport drama with the hero image front-and-center.
//     For roofing, this should be a drone shot of a completed roof filling the
//     entire frame. The work IS the statement.
//   • Trust bar early — licenses, insurance, manufacturer certifications, and
//     warranties are the #1 purchase driver for roofing. Put them above the fold.
//   • Gallery BEFORE services — the single biggest differentiator from a generic
//     contractor site. Roofing work is visual proof. Let the photos sell before
//     you pitch services. The work earns the trust; then the services explain it.
//   • Before/after immediately follows gallery — while the visitor is in "proof
//     mode" from the gallery, the slider delivers the visceral transformation
//     moment. Maximum impact at the peak of attention.
//   • Numbered-list services — the 5-step process (Inspect → Estimate → Select
//     → Install → Warranty) reads as a clear, trustworthy process rather than
//     a jumbled features list. Roofing buyers fear the unknown; a numbered
//     process removes that fear.
//   • Photo-grid About — real job-site and crew photos beat headshots for trade
//     companies. Show the work, show the team in action.
//   • Split-form contact — two-column layout has a "storm emergency" urgency
//     feel; more structured and serious than a stacked form.
//
// Theme:
//   • Copper/amber primary — the color of copper flashing, aged to perfection.
//     Zero other roofing companies use this; it's immediately distinctive and
//     evokes premium craftsmanship and material quality.
//   • Sharp corners — precision geometry, no softness; roofing is angular work.
//   • Dark mode — almost no roofing site is dark. The drama and contrast make
//     the copper primary color glow against near-black backgrounds.
//   • Comfortable density — a homeowner audience, not a tech audience; don't
//     compress the layout.
// ─────────────────────────────────────────────────────────────────────────────

export const stormBreak: LayoutPreset = {
  name: "storm-break",
  layout: {
    order: ["hero", "trust-bar", "gallery", "before-after", "services", "about", "contact"],
    sections: {
      hero: true,
      "trust-bar": true,
      gallery: true,
      "before-after": true,
      services: true,
      about: true,
      contact: true,
    },
    variants: {
      hero: "cinematic",
      "trust-bar": "default",
      gallery: "lightbox",
      "before-after": "slider",
      services: "numbered-list",
      about: "photo-grid-quote",
      contact: "split-form",
    },
  },
  theme: {
    primaryColor: "oklch(0.65 0.16 48)",
    radius: "sharp",
    density: "comfortable",
    font: { heading: "Inter", body: "Inter" },
    mode: "dark",
  },
};
