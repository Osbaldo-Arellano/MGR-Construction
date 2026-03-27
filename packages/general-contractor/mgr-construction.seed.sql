-- ============================================================
-- CLIENT SEED — MGR Construction LLC
-- Website: mgrconstructionllcor.com | Oregon
-- ============================================================
-- ONBOARDING STEPS:
--
-- 1. Create a Supabase auth user for the client:
--      Dashboard → Authentication → Users → Add User
--      Email: mcr.construction75@gmail.com
--      Copy the generated UUID — that is YOUR_USER_ID below.
--
-- 2. Upload assets to Supabase Storage (bucket: "brand-assets"):
--      /mgr/logo-light.svg    ← primary logo (light backgrounds)
--      /mgr/logo-dark.svg     ← logo for dark backgrounds
--      /favicon.ico           ← site favicon
--      /mgr/hero.jpg          ← hero section background photo
--      /mgr/gallery/*.jpg     ← project photos (siding, roofing, etc.)
--      After uploading, copy each file's public URL and replace the
--      placeholder paths in the logo_variants and layout JSON below.
--
-- 3. Replace 'YOUR_USER_ID' with the UUID from step 1.
--
-- 4. Run this script in the Supabase SQL editor.
--
-- 5. Set the environment variable on your deployment:
--      NEXT_PUBLIC_BRAND_USER_ID=YOUR_USER_ID
--
-- 6. Verify the site loads at mgrconstructionllcor.com
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
  'bef22242-0c61-49a8-8d51-a9e86213d9d9',

  'MGR Construction LLC',
  'Transforming Properties With Stunning Solutions',
  'mcr.construction75@gmail.com',
  '971-600-6445',

  -- Replace with Supabase Storage public URL after uploading logo
  '/mgr/logo-light.svg',

  'MGR Construction LLC embarked on its journey 20 years ago with a goal to deliver unmatched construction services in Oregon. Today, we take pride in our well-established reputation for providing high-quality, reliable, and efficient construction solutions. Our meticulous attention to detail and commitment to excellent customer service set us apart in the construction industry.',

  '{"city": "Woodburn", "state": "OR", "country": "US"}',

  '[
    {"platform": "facebook",  "url": "https://facebook.com"},
    {"platform": "instagram", "url": "https://instagram.com"},
    {"platform": "tiktok",    "url": "https://tiktok.com"},
    {"platform": "twitter",   "url": "https://twitter.com"}
  ]',

  -- Replace with Supabase Storage public URLs after uploading logos
  '{
    "primary":  "https://knhgoaphmtewjhtvglpe.supabase.co/storage/v1/object/public/logos/MGR_Logo-removebg-preview.png",
    "dark":     "https://knhgoaphmtewjhtvglpe.supabase.co/storage/v1/object/public/logos/MGR_Logo-removebg-preview.png",
    "favicon":  "https://knhgoaphmtewjhtvglpe.supabase.co/storage/v1/object/public/logos/MGR_Logo-removebg-preview.png"
  }',

  null,

  'https://mgrconstructionllcor.com',

  -- Preset: gc-pro (flagship — cinematic hero, light, full 8-section layout)
  -- Alternatives:
  --   "build-forward"  → dark, commercial-forward, split hero, stats-driven About
  --   "the-blueprint"  → bento hero, process-first, light mode
  '{"preset": "gc-pro"}',

  -- Brand colors (hex → OKLCH):
  --   #006634  →  oklch(0.40 0.13 151)   Forest green   — trust, quality, Oregon
  --   #282F99  →  oklch(0.37 0.17 268)   Deep indigo    — authority, reliability
  --   #EA4E1B  →  oklch(0.62 0.21 33)    Vivid orange   — energy, action, CTAs
  --
  -- primaryColor is used for buttons, links, highlights, and accents.
  -- Orange (#EA4E1B) is set as primary — it has the contrast and energy needed
  -- for CTAs on a light-mode site and is the most distinctive of the three.
  -- Switch to green or indigo here if the client prefers a different dominant color.
  '{"primaryColor": "oklch(0.62 0.21 33)", "radius": "rounded", "density": "comfortable", "mode": "light"}'

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
