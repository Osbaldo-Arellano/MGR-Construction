import type { LayoutPreset } from "./types";

// ── editorial-agency ──────────────────────────────────────────────────────────
// Best for: creative agencies, design studios, branding firms, marketing
// consultancies, freelance creatives, and any brand-forward service business.
//
// Design rationale:
//   • Split hero — editorial and composed; lets the image and text breathe
//     side-by-side rather than stacking, signals sophistication immediately
//   • About before Services — story-first narrative; agencies sell their
//     perspective and point of view before their capabilities list
//   • Founder Spotlight About — personal identity is a creative agency's
//     strongest differentiator; the founder's story IS the brand
//   • Grid-Tilt Services — interactive hover effect suits a brand that values
//     motion and craft; feels like a portfolio piece in itself
//   • No Trust Bar — credential bars read as corporate/trade; creative agencies
//     earn trust through work quality and storytelling, not badge lists
//   • Split-Form Contact — two-column layout is more designed and intentional
//     than a stacked form; matches the editorial aesthetic
//
// Theme:
//   • Deep indigo primary — distinctive, creative, authoritative; avoids the
//     predictable navy-blue that most "professional services" default to
//   • Sharp corners — clean, editorial, design-conscious; suggests precision
//   • Spacious density — generous whitespace is a hallmark of high-end design
//   • Light mode — editorial publications are light; dark is a tech choice
// ─────────────────────────────────────────────────────────────────────────────

export const editorialAgency: LayoutPreset = {
  name: "editorial-agency",
  layout: {
    order: ["hero", "about", "services", "gallery", "contact"],
    sections: {
      hero: true,
      "trust-bar": false,
      about: true,
      services: true,
      gallery: true,
      contact: true,
    },
    variants: {
      hero: "split",
      about: "founder-spotlight",
      services: "grid-tilt",
      gallery: "lightbox",
      contact: "split-form",
    },
  },
  theme: {
    primaryColor: "oklch(0.50 0.20 285)",
    radius: "sharp",
    density: "spacious",
    font: { heading: "Inter", body: "Inter" },
    mode: "light",
  },
};
