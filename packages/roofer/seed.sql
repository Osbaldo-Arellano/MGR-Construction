-- ============================================================
-- ROOFER PACKAGE — Deployment Seed
-- ============================================================
-- 1. Replace 'YOUR_USER_ID' with the client's Supabase auth user ID
-- 2. Replace placeholder URLs with real Supabase Storage URLs
-- 3. Update name, email, phone, address with client's real info
-- 4. Run in the Supabase SQL editor
-- ============================================================

insert into brands (
  user_id,
  name,
  tagline,
  email,
  phone,
  logo_url,
  about_us,
  address,
  social_links,
  logo_variants,
  icon_url,
  website_url,
  layout,
  theme
) values (
  'YOUR_USER_ID',

  'Summit Roofing Co.',
  'Built to Last. Backed by Warranty.',
  'info@summitroofingco.com',
  '+1 (555) 800-7663',

  -- Replace with Supabase Storage public URL for primary logo
  '/logo-light.svg',

  'Summit Roofing was founded by Marcus and Elena Torres after 20 years in commercial construction. We started this company because we were tired of seeing homeowners get burned by roofing crews who disappear after the check clears. Every roof we install carries our name — literally. We sign our work, we warranty our work, and we answer our phone when something goes wrong.',

  '{"city": "Portland", "state": "OR", "country": "US"}',

  '[
    {"platform": "facebook",  "url": "https://facebook.com"},
    {"platform": "instagram", "url": "https://instagram.com"},
    {"platform": "youtube",   "url": "https://youtube.com"}
  ]',

  -- Replace with Supabase Storage public URLs for logo variants
  '{
    "primary":  "/logo-light.svg",
    "dark":     "/logo-dark.svg",
    "favicon":  "/favicon.ico"
  }',

  -- Replace with Supabase Storage public URL for app icon / favicon
  null,

  -- Replace with client''s live domain once deployed
  'https://summitroofingco.com',

  -- Layout: roofer-pro flagship preset (all 9 sections)
  -- Switch to "storm-break", "craftsmans-mark", or "the-aerial" to change theme
  '{"preset": "roofer-pro"}',

  -- Theme: copper/amber dark — signature Roofer Package look
  -- primaryColor options:
  --   copper/amber dark   → oklch(0.65 0.16 48)   [roofer-pro / storm-break]
  --   terracotta light    → oklch(0.62 0.13 52)   [craftsmans-mark]
  --   amber/yellow dark   → oklch(0.70 0.18 85)   [the-aerial]
  '{"primaryColor": "oklch(0.65 0.16 48)", "radius": "sharp", "density": "comfortable", "mode": "dark"}'

) on conflict (user_id) do update set
  name          = excluded.name,
  tagline       = excluded.tagline,
  email         = excluded.email,
  phone         = excluded.phone,
  logo_url      = excluded.logo_url,
  about_us      = excluded.about_us,
  address       = excluded.address,
  social_links  = excluded.social_links,
  logo_variants = excluded.logo_variants,
  icon_url      = excluded.icon_url,
  website_url   = excluded.website_url,
  layout        = excluded.layout,
  theme         = excluded.theme;
