-- ============================================================
-- GALLERY SEED — MGR Construction LLC
-- ============================================================
-- This seeds brand_photos from a dedicated Supabase Storage
-- bucket. It auto-derives URL, alt_text, caption, and
-- sort_order from filenames — no manual row-by-row entry needed.
--
-- STEPS BEFORE RUNNING:
--
--   1. Create a storage bucket named exactly:
--        mgr_construction_gallery
--      Dashboard → Storage → New bucket
--      Set to PUBLIC (the gallery component reads public URLs)
--
--   2. Upload client photos to that bucket.
--      Naming convention affects the auto-generated captions:
--        siding-before.jpg        → "Siding Before"
--        siding-after.jpg         → "Siding After"
--        roofing-complete.jpg     → "Roofing Complete"
--        painting-exterior.jpg    → "Painting Exterior"
--        windows-install.jpg      → "Windows Install"
--        doors-install.jpg        → "Doors Install"
--      Sort order follows alphabetical filename order.
--      Prefix filenames with 01_, 02_, etc. to control order:
--        01_siding-after.jpg
--        02_siding-before.jpg
--        03_roofing-complete.jpg
--
--   3. Replace YOUR_USER_ID with the MGR auth user UUID.
--      Replace YOUR_PROJECT_REF with your Supabase project ref
--      (the subdomain in your NEXT_PUBLIC_SUPABASE_URL).
--
--   4. Run in the Supabase SQL editor.
--
-- RE-RUNNING:
--   The DELETE at the top clears existing rows for this user
--   before re-inserting. Safe to re-run after adding/reordering
--   photos in the bucket — just re-run the whole script.
-- ============================================================

-- Clear existing gallery rows for this client before re-seeding
DELETE FROM public.brand_photos
WHERE user_id = 'YOUR_USER_ID';

-- Seed from bucket
INSERT INTO public.brand_photos (user_id, url, alt_text, caption, sort_order)
SELECT
  'YOUR_USER_ID'::uuid,

  -- Full public CDN URL
  'https://YOUR_PROJECT_REF.supabase.co/storage/v1/object/public/mgr_construction_gallery/' || name,

  -- alt_text: filename → strip path + extension → dashes/underscores → spaces → title case
  initcap(
    replace(
      replace(
        regexp_replace(
          reverse(split_part(reverse(name), '/', 1)),  -- strip folder prefix
          '\.[^.]+$', ''                                -- strip file extension
        ),
        '-', ' '
      ),
      '_', ' '
    )
  ),

  -- caption: same derivation as alt_text
  initcap(
    replace(
      replace(
        regexp_replace(
          reverse(split_part(reverse(name), '/', 1)),
          '\.[^.]+$', ''
        ),
        '-', ' '
      ),
      '_', ' '
    )
  ),

  -- sort_order: alphabetical by filename (prefix with 01_, 02_ to control)
  (ROW_NUMBER() OVER (ORDER BY name))::integer

FROM storage.objects
WHERE bucket_id = 'mgr_construction_gallery'
  AND name NOT LIKE '.%'       -- skip hidden files
  AND name NOT LIKE '%/.%';   -- skip hidden files in subfolders
