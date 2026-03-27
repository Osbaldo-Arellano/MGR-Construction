import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================
// DB row types (matches the Supabase schema)
// ============================================

export interface BrandRow {
  id: string;
  user_id: string;
  name: string | null;
  tagline: string | null;
  email: string | null;
  phone: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  about_image_url: string | null;
  after_image_url: string | null;
  founder_image_url: string | null;
  about_us: string | null;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  } | null;
  social_links: Array<{
    platform: string;
    url: string;
    handle?: string;
  }> | null;
  logo_variants: {
    primary?: string;
    horizontal?: string;
    dark?: string;
    light?: string;
    favicon?: string;
  } | null;
  // Direct icon URL (Supabase Storage). Favicon fallback when logo_variants.favicon is absent.
  icon_url: string | null;
  // Public URL of the client's deployed site. Used for canonical URLs / OG metadata.
  website_url: string | null;
  // ── V2 additions ──────────────────────────────────────────────────────────
  // harp: JSONB block for the HARP program spotlight section.
  harp: {
    headline: string;
    subheadline: string;
    body: string;
    link: { label: string; href: string };
  } | null;
  // layout drives which sections appear, in what order, and which variant each uses.
  // If null, the preset default from layout.preset is used.
  layout: {
    preset: string;
    sections?: Record<string, boolean>;  // sectionId → enabled/disabled
    overrides?: Record<string, string>;  // sectionId → variantName
    order?: string[];                    // explicit section ordering
    widgets?: string[];                  // widget IDs to render (e.g. "roof-chat")
  } | null;
  // theme drives visual identity tokens injected as CSS variables at runtime.
  // If null, the preset default is used.
  theme: {
    primaryColor?: string;              // OKLCH value string
    secondaryColor?: string;            // injected as --brand-secondary
    accentColor?: string;               // injected as --brand-accent
    radius?: "sharp" | "rounded" | "pill";
    density?: "compact" | "comfortable" | "spacious";
    font?: { heading: string; body: string };
    mode?: "light" | "dark" | "system";
  } | null;
  updated_at: string;
}

export interface BrandPhotoRow {
  id: string;
  user_id: string;
  url: string;
  alt_text: string | null;
  caption: string | null;
  sort_order: number;
  created_at: string;
}

export interface BrandCertificationRow {
  id: string;
  user_id: string;
  name: string;
  logo_url: string | null;
  logo_alt: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface BrandReviewRow {
  id: string;
  user_id: string;
  reviewer_name: string;
  rating: number;
  body: string;
  source: string;
  reviewer_photo_url: string | null;
  sort_order: number;
  created_at: string;
}

// ============================================
// Helper: format a raw phone string → (XXX) XXX-XXXX
// ============================================
export function formatPhone(raw: string | null | undefined): string {
  if (!raw) return "";
  const digits = raw.replace(/\D/g, "");
  const local = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits;
  if (local.length < 10) return raw;
  return `(${local.slice(0, 3)}) ${local.slice(3, 6)}-${local.slice(6, 10)}`;
}

// ============================================
// Helper: format address JSONB → display string
// ============================================
export function formatAddress(addr: BrandRow["address"]): string {
  if (!addr) return "";
  const { street, city, state, zip } = addr;
  const cityStateZip = [city, state && zip ? `${state} ${zip}` : state || zip]
    .filter(Boolean)
    .join(", ");
  return [street, cityStateZip].filter(Boolean).join(", ");
}
