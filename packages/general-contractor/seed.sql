-- ============================================================
-- GENERAL CONTRACTOR PACKAGE — Deployment Seed
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

  'Apex General Contractors',
  'From Blueprint to Build. On Time, On Budget.',
  'info@apexgc.com',
  '+1 (555) 700-0001',

  -- Replace with Supabase Storage public URL for primary logo
  '/logo-light.svg',

  'Apex was founded by Derek and Carla Nguyen after watching too many construction projects fall apart at the handoff — one sub drops the ball, the next can''t start, the homeowner is left holding the schedule together themselves. We built Apex around a different model: one project manager, one point of contact, and a vetted network of trade partners who show up on time.',

  '{"city": "Denver", "state": "CO", "country": "US"}',

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
  'https://apexgc.com',

  -- Layout: gc-pro flagship preset (8 sections, full-featured)
  -- Switch to "build-forward" for commercial-focused dark theme
  -- Switch to "the-blueprint" for bento hero, process-first narrative
  '{"preset": "gc-pro"}',

  -- Theme: steel blue light — professional, approachable, trustworthy
  -- primaryColor options:
  --   steel blue light     → oklch(0.58 0.14 240)   [gc-pro]
  --   cyan/teal dark       → oklch(0.72 0.15 215)   [build-forward]
  --   deep navy light      → oklch(0.42 0.12 255)   [the-blueprint]
  '{"primaryColor": "oklch(0.58 0.14 240)", "radius": "rounded", "density": "comfortable", "mode": "light"}'

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
