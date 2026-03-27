// ============================================================
// Deploy Config Type
// ============================================================
// One ClientDeployment per client. This is the single source
// of truth for a deployment — replaces seed.sql + gallery.sql.
// ============================================================

export interface ClientDeployment {
  // ── Identity ─────────────────────────────────────────────
  // The Supabase auth user UUID for this client.
  // Create via: Dashboard → Authentication → Users → Add User
  // This is the only place you set the user ID.
  userId: string;

  websiteUrl: string;

  // ── Layout ───────────────────────────────────────────────
  // Preset ID from /config/presets/index.ts
  preset: string;

  // Theme overrides. Any omitted key falls back to the preset default.
  theme: {
    primaryColor: string;
    radius: "rounded" | "sharp" | "pill";
    density: "compact" | "comfortable" | "spacious";
    mode: "light" | "dark" | "system";
  };

  // ── Gallery ──────────────────────────────────────────────
  // Supabase Storage bucket name. Must be PUBLIC.
  // Upload photos there — deploy script seeds brand_photos from it.
  gallery: {
    bucket: string;
  };

  // ── Brand content ─────────────────────────────────────────
  // Maps directly to columns in the brands table.
  brand: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    address: {
      street?: string;
      city: string;
      state: string;
      zip?: string;
      country: string;
    };
    aboutUs: string;
    logoVariants: {
      primary: string;   // light-background logo
      dark?: string;     // dark-background logo
      favicon?: string;  // favicon URL
    };
    social: Array<{ platform: string; url: string }>;
    // Optional image URLs (Supabase Storage public URLs)
    heroImageUrl?: string;
    aboutImageUrl?: string;
    afterImageUrl?: string;     // "after" image for before/after slider
    founderImageUrl?: string;
  };
}
