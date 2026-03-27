import type { LayoutPreset } from "./types";

// ── tech-forward ──────────────────────────────────────────────────────────────
// Best for: software startups, SaaS products, tech agencies, dev shops,
// AI/ML companies, and any digitally-native business.
//
// Design rationale:
//   • Bento hero — modular grid layout signals "product thinking" instantly;
//     the multi-cell structure mirrors modern SaaS dashboards and app UIs
//   • Services before About — tech buyers evaluate capabilities first; lead
//     with what you build/do before the team backstory
//   • Stats-Forward About — metrics and numbers are the language of tech;
//     growth figures, uptime percentages, and user counts build credibility
//     faster than narrative prose for a technical audience
//   • Trust Bar enabled — but positioned after services; certifications like
//     SOC2, AWS Partner, and ISO badges are meaningful in tech sales cycles
//   • Gallery enabled — product screenshots, case study visuals, and UI
//     demos are powerful proof for tech companies; was incorrectly off by default
//   • Split-Form Contact — structured, professional; matches the expectation
//     of a business that takes process seriously
//
// Theme:
//   • Electric cyan primary — energetic, modern, forward-looking; the chroma
//     is intentionally high to feel confident and distinctive at small sizes
//   • Pill radius — the rounded-pill style is the SaaS/product design default;
//     signals "we are a product company" at a glance
//   • Compact density — information-dense layouts respect technical users who
//     scan quickly; avoids the "lots of whitespace = nothing to say" read
//   • Dark mode — tech and developer audiences skew dark; it also makes the
//     cyan primary color pop dramatically against dark backgrounds
// ─────────────────────────────────────────────────────────────────────────────

export const techForward: LayoutPreset = {
  name: "tech-forward",
  layout: {
    order: ["hero", "services", "about", "trust-bar", "gallery", "contact"],
    sections: {
      hero: true,
      "trust-bar": true,
      about: true,
      services: true,
      gallery: true,
      contact: true,
    },
    variants: {
      hero: "bento",
      services: "grid-tilt",
      about: "stats-forward",
      "trust-bar": "default",
      gallery: "lightbox",
      contact: "split-form",
    },
  },
  theme: {
    primaryColor: "oklch(0.72 0.17 195)",
    radius: "pill",
    density: "compact",
    font: { heading: "Inter", body: "Inter" },
    mode: "dark",
  },
};
