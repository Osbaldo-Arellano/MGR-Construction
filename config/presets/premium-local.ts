import type { LayoutPreset } from "./types";

// ── premium-local ─────────────────────────────────────────────────────────────
// Best for: high-end local services — law firms, financial advisors, luxury
// real estate, estate planning, premium medical/dental, high-end contractors,
// and any local professional whose credibility is their primary differentiator.
//
// Design rationale:
//   • Split hero — dignified and composed; the side-by-side layout conveys
//     professionalism without the aggressive full-bleed drama of cinematic
//   • About first (before Services) — premium local clients buy the person
//     before the service; a founder spotlight immediately after the hero
//     builds the personal trust that converts high-value clients
//   • Founder Spotlight About — for premium local businesses the operator IS
//     the brand; credentials, tenure, and personal story are the product
//   • Trust Bar after About — the narrative arc is deliberate: meet the person
//     (hero → about), then see the credentials (trust bar), then learn the
//     services. Validation lands harder after the personal connection is made
//   • Numbered-List Services — clean, authoritative list presentation matches
//     the tone of premium service menus; avoids the playful tilt effects
//   • Split-Form Contact — two-column layout feels more formal and curated
//     than a stacked form; appropriate for high-ticket service inquiries
//
// Theme:
//   • Forest green primary — sophisticated, trustworthy, and natural authority;
//     evokes established institutions (law, finance, land, medicine) without
//     the coldness of navy or the aggression of red
//   • Rounded corners — professional but approachable; not as sterile as sharp,
//     not as informal as pill
//   • Spacious density — luxury is communicated through restraint and breathing
//     room; generous whitespace signals confidence and premium positioning
//   • Light mode — traditional, readable, and universally accessible; the
//     right default for an audience that skews older and values clarity
// ─────────────────────────────────────────────────────────────────────────────

export const premiumLocal: LayoutPreset = {
  name: "premium-local",
  layout: {
    order: ["hero", "about", "trust-bar", "services", "gallery", "contact"],
    sections: {
      hero: true,
      "trust-bar": true,
      about: true,
      services: true,
      gallery: true,
      contact: true,
    },
    variants: {
      hero: "split",
      about: "founder-spotlight",
      "trust-bar": "default",
      services: "numbered-list",
      gallery: "lightbox",
      contact: "split-form",
    },
  },
  theme: {
    primaryColor: "oklch(0.48 0.12 155)",
    radius: "rounded",
    density: "spacious",
    font: { heading: "Inter", body: "Inter" },
    mode: "light",
  },
};
