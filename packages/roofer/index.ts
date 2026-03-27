// ============================================================
// ROOFER PACKAGE
// ============================================================
// A complete, production-ready website package for residential
// and commercial roofing contractors.
//
// What's included:
//   Presets (4 layout themes):
//     • roofer-pro        — flagship, 9-section full experience (default)
//     • storm-break       — dramatic dark, proof-first, copper/amber
//     • craftsmans-mark   — premium craft, light, founder-forward
//     • the-aerial        — drone-photography forward, dark amber, bento hero
//
//   Roofer-specific sections (3 new):
//     • emergency/default     — 24/7 storm damage response callout
//     • materials/comparison  — interactive roofing system selector
//     • warranty/default      — manufacturer + workmanship guarantee showcase
//
//   Standard sections (also included):
//     • before-after/slider   — drag-to-compare transformation reveal
//     • hero (cinematic, split, bento)
//     • trust-bar, gallery, about, services, contact
//
//   Brand config template:
//     • /packages/roofer/brand-config.ts — complete roofing starter content
//     • /packages/roofer/seed.sql        — ready-to-run Supabase INSERT
//
// Deployment steps:
//   1. Run supabase/migrations/001_initial_schema.sql
//   2. Run supabase/migrations/002_add_layout_theme_columns.sql
//   3. Edit brand-config.ts with client's real info
//   4. Run seed.sql in Supabase SQL editor
//   5. Set NEXT_PUBLIC_BRAND_USER_ID to the client's auth user ID
//   6. Upload logos + photos to Supabase Storage, update URLs in brands row
// ============================================================

export const rooferPackage = {
  id: "roofer",
  name: "Roofer Pro",
  version: "1.0.0",
  description:
    "Complete website package for residential and commercial roofing contractors. Includes 4 layout themes, 3 industry-specific sections, and a ready-to-deploy brand content template.",

  defaultPreset: "roofer-pro",

  presets: [
    {
      id: "roofer-pro",
      label: "Roofer Pro (Flagship)",
      description: "9-section full experience. Dark, copper, cinematic. Every section purpose-built for roofing.",
    },
    {
      id: "storm-break",
      label: "Storm Break",
      description: "Dramatic dark theme. Gallery-first proof. Built for storm restoration specialists.",
    },
    {
      id: "craftsmans-mark",
      label: "Craftsman's Mark",
      description: "Light, premium, founder-forward. For high-end roofing companies competing on craft over price.",
    },
    {
      id: "the-aerial",
      label: "The Aerial",
      description: "Bento hero, drone-photography forward, dark amber. For modern roofing companies with strong visual assets.",
    },
  ],

  sections: {
    // Roofer-specific (new in this package)
    rooferSpecific: ["emergency", "materials", "warranty"],
    // Standard sections used in roofing layouts
    standard: ["hero", "trust-bar", "gallery", "before-after", "about", "services", "contact"],
  },

  targetAudience: [
    "Residential roofing contractors",
    "Commercial roofing companies",
    "Storm damage restoration specialists",
    "Roofing + solar combo installers",
    "Premium custom roofing (slate, tile, metal)",
    "Family-owned regional roofing businesses",
  ],
} as const;

export { rooferBrandConfig } from "./brand-config";
export type { RooferBrandConfig } from "./brand-config";
