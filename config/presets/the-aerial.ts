import type { LayoutPreset } from "./types";

// ── the-aerial ────────────────────────────────────────────────────────────────
// Best for: roofing companies with strong drone photography, solar + roofing
// combos, modern construction firms, and any exterior contractor that wants to
// project innovation and a "we see your home differently" perspective.
//
// Concept: "We see your home differently."
// The aerial perspective is the roofing company's unique vantage point — they
// literally work at the top of the world. Most homeowners have never seen their
// own roof from above. This preset weaponizes that perspective as an identity.
//
// Design rationale:
//   • Bento hero — the multi-cell grid layout mirrors how a roofer actually
//     sees a project: multiple zones, multiple systems, all part of a whole.
//     It's also the most modern hero format available, signaling a tech-forward
//     company that invests in quality (including drone photography).
//     Every cell should be a different aerial shot of completed work.
//   • Services immediately after hero — drone-photography roofing companies
//     are often premium installers of specific systems (metal, solar-ready,
//     architectural shingle). Lead with capability after the visual hook.
//   • Grid-tilt services — the 3D hover effect on each service card echoes the
//     idea of perspective and different angles of view. Unexpected for roofing;
//     memorable for exactly that reason.
//   • Before/after in the middle — placed between services and gallery, the
//     slider is a palate cleanser and proof moment. The visitor has seen the
//     system options; now see the transformation. Then the gallery confirms.
//   • Trust bar near the end — in this preset, trust is earned through the
//     work first (gallery, slider) and then confirmed with credentials. The
//     inverse of the traditional order; works because the visual proof is so
//     strong upfront.
//   • Stats-forward About — this type of company leads with scale and data:
//     500+ roofs installed, 15-year warranty, 48-hour emergency response.
//     Numbers communicate confidence to the analytical homeowner buyer.
//   • Split-form contact — structured and professional; matches the premium
//     drone-photography brand identity.
//
// Theme:
//   • Amber/yellow primary — the bold, high-visibility color of safety markers,
//     caution tape, and construction signage. Completely unexpected as a brand
//     primary color for a roofing company. Against dark mode it creates a
//     electric contrast that is impossible to ignore and impossible to forget.
//   • Pill radius — modern, SaaS-influenced; signals a tech-forward, innovative
//     company. No other roofing company has pill-radius buttons.
//   • Compact density — information-dense layout that respects the visitor's
//     time. For a company that uses drone photography and invests in brand,
//     the audience is likely younger and more digitally fluent.
//   • Dark mode — the amber primary color is 10x more dramatic on a dark
//     background. It glows. Combined with aerial photography, it creates a
//     cinematic experience unlike anything in the roofing industry.
// ─────────────────────────────────────────────────────────────────────────────

export const theAerial: LayoutPreset = {
  name: "the-aerial",
  layout: {
    order: ["hero", "services", "before-after", "gallery", "trust-bar", "about", "contact"],
    sections: {
      hero: true,
      services: true,
      "before-after": true,
      gallery: true,
      "trust-bar": true,
      about: true,
      contact: true,
    },
    variants: {
      hero: "bento",
      services: "grid-tilt",
      "before-after": "slider",
      gallery: "lightbox",
      "trust-bar": "default",
      about: "stats-forward",
      contact: "split-form",
    },
  },
  theme: {
    primaryColor: "oklch(0.70 0.18 85)",
    radius: "pill",
    density: "compact",
    font: { heading: "Inter", body: "Inter" },
    mode: "dark",
  },
};
