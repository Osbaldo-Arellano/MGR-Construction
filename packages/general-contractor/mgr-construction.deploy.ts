// ============================================================
// DEPLOY CONFIG — MGR Construction LLC
// ============================================================
// This is the single source of truth for the MGR deployment.
// Run:  npm run deploy -- mgr-construction
//
// Before running:
//   1. Set userId to the real Supabase auth user UUID
//   2. Create a PUBLIC storage bucket named "mgr_construction_gallery"
//   3. Upload photos to that bucket
//   4. Set SUPABASE_SERVICE_ROLE_KEY in .env.local
// ============================================================

import type { ClientDeployment } from "../../scripts/types";
import { mgrConstructionConfig } from "./mgr-construction.config";

export const mgrDeployment: ClientDeployment = {
  // ── Set this to the real Supabase auth user UUID ──────────
  userId: "YOUR_USER_ID",

  websiteUrl: "https://mgrconstructionllcor.com",

  // ── Layout ────────────────────────────────────────────────
  preset: "gc-pro",
  // Alternatives: "build-forward" | "the-blueprint"

  theme: {
    // MGR Construction brand colors:
    //   #006634 → oklch(0.40 0.13 151)  Forest green   → --primary
    //   #282F99 → oklch(0.37 0.17 268)  Deep indigo    → --brand-secondary
    //   #EA4E1B → oklch(0.62 0.21 33)   Vivid orange   → --brand-accent
    primaryColor:   "oklch(0.40 0.13 151)",
    secondaryColor: "oklch(0.37 0.17 268)",
    accentColor:    "oklch(0.62 0.21 33)",
    radius: "rounded",
    density: "comfortable",
    mode: "light",
  },

  // ── Gallery ───────────────────────────────────────────────
  // Create this bucket in Supabase Storage (must be PUBLIC).
  // Upload photos — filenames become captions automatically.
  // Prefix with 01_, 02_, etc. to control display order.
  gallery: {
    bucket: "mgr_construction_gallery",
  },

  // ── Brand content ─────────────────────────────────────────
  // Pulled from mgr-construction.config.ts — edit there.
  brand: {
    name:    mgrConstructionConfig.company.name,
    tagline: mgrConstructionConfig.company.tagline,
    email:   mgrConstructionConfig.company.email,
    phone:   mgrConstructionConfig.company.phone,
    address: {
      city:    "Woodburn",
      state:   "OR",
      country: "US",
    },
    aboutUs: mgrConstructionConfig.about.description,
    logoVariants: {
      primary: "/mgr/logo-light.svg",  // replace with Supabase Storage public URL
      dark:    "/mgr/logo-dark.svg",   // replace with Supabase Storage public URL
      favicon: "/favicon.ico",          // replace with Supabase Storage public URL
    },
    social: mgrConstructionConfig.footer.social.map((s) => ({
      platform: s.platform,
      url: s.url,
    })),
    // Uncomment and set these once photos are uploaded to Storage:
    // heroImageUrl:    "https://YOUR_REF.supabase.co/storage/v1/object/public/mgr/hero.jpg",
    // aboutImageUrl:   "https://YOUR_REF.supabase.co/storage/v1/object/public/mgr/about.jpg",
    // founderImageUrl: "https://YOUR_REF.supabase.co/storage/v1/object/public/mgr/founder.jpg",
  },
};
