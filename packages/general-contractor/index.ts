// ============================================================
// GENERAL CONTRACTOR PACKAGE
// ============================================================
// A complete, production-ready website package for residential
// and commercial general contractors.
//
// What's included:
//   Presets (3 layout themes):
//     • gc-pro          — flagship, full-featured, residential + commercial (default)
//     • build-forward   — dark, commercial-forward, stats-driven, process-focused
//     • the-blueprint   — bento hero, process-first, navy precision, light mode
//
//   Standard sections used:
//     • hero (cinematic, split, bento)
//     • trust-bar (default, reviews)
//     • services (grid-tilt, numbered-list)
//     • why-us (cards)
//     • gallery (lightbox)
//     • before-after (slider)
//     • about (founder-spotlight, stats-forward, photo-grid-quote)
//     • contact (split-form, stacked)
//
//   Brand config template:
//     • /packages/general-contractor/brand-config.ts — complete GC starter content
//     • /packages/general-contractor/seed.sql        — ready-to-run Supabase INSERT
//
// Deployment steps:
//   1. Run supabase/migrations/001_initial_schema.sql
//   2. Run supabase/migrations/002_add_layout_theme_columns.sql
//   3. Edit brand-config.ts with client's real info
//   4. Run seed.sql in Supabase SQL editor
//   5. Set NEXT_PUBLIC_BRAND_USER_ID to the client's auth user ID
//   6. Upload logos + photos to Supabase Storage, update URLs in brands row
// ============================================================

export const generalContractorPackage = {
  id: "general-contractor",
  name: "General Contractor Pro",
  version: "1.0.0",
  description:
    "Complete website package for residential and commercial general contractors. Includes 3 layout themes and a ready-to-deploy brand content template covering new construction, remodels, additions, and commercial build-outs.",

  defaultPreset: "gc-pro",

  presets: [
    {
      id: "gc-pro",
      label: "GC Pro (Flagship)",
      description:
        "8-section full experience. Light, steel blue, cinematic hero. Every section purpose-built for a full-service GC serving homeowners and developers.",
    },
    {
      id: "build-forward",
      label: "Build Forward",
      description:
        "Dark, commercial-forward. Stats-driven About. Numbered process. For GCs whose primary clients are developers, property managers, and commercial tenants.",
    },
    {
      id: "the-blueprint",
      label: "The Blueprint",
      description:
        "Bento hero, process-first narrative, navy precision. For GCs who win on transparency and want to show project range and method before credentials.",
    },
  ],

  sections: {
    // No GC-specific sections — all standard sections cover the use case
    gcSpecific: [],
    standard: [
      "hero",
      "trust-bar",
      "services",
      "why-us",
      "gallery",
      "before-after",
      "about",
      "contact",
    ],
  },

  targetAudience: [
    "Residential general contractors (new construction + remodels)",
    "Commercial build-out and tenant improvement contractors",
    "Design-build firms",
    "Custom home builders",
    "Renovation and addition specialists",
    "Family-owned regional GCs",
  ],
} as const;

export { gcBrandConfig } from "./brand-config";
export type { GCBrandConfig } from "./brand-config";
