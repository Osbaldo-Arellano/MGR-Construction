// ============================================================
// BrandSync Deploy Script
// ============================================================
// Usage:
//   npm run deploy -- <client-id>
//
// Examples:
//   npm run deploy -- mgr-construction
//
// Required env vars (.env.local):
//   NEXT_PUBLIC_SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY   ← NOT the anon key. Settings → API → service_role.
//
// What this does:
//   1. Upserts the client's brand row in the brands table
//   2. Reads photos from their Supabase Storage bucket
//   3. Clears and re-seeds brand_photos for that user
//
// Safe to re-run — upserts are idempotent, photos are cleared before re-insert.
// ============================================================

import { createClient } from "@supabase/supabase-js";
import { clients } from "./clients";

// ── Args ─────────────────────────────────────────────────────────────────────

const clientId = process.argv[2];

if (!clientId) {
  console.error("Usage: npm run deploy -- <client-id>");
  console.error("Available clients:", Object.keys(clients).join(", ") || "(none registered)");
  process.exit(1);
}

const deployment = clients[clientId];

if (!deployment) {
  console.error(`Unknown client: "${clientId}"`);
  console.error("Available clients:", Object.keys(clients).join(", "));
  process.exit(1);
}

// ── Env ──────────────────────────────────────────────────────────────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing env vars. Both are required:\n" +
    "  NEXT_PUBLIC_SUPABASE_URL\n" +
    "  SUPABASE_SERVICE_ROLE_KEY  (Settings → API → service_role secret)"
  );
  process.exit(1);
}

if (deployment.userId === "YOUR_USER_ID") {
  console.error(
    `userId is still "YOUR_USER_ID" in ${clientId}.deploy.ts\n` +
    "Set it to the real Supabase auth user UUID before deploying."
  );
  process.exit(1);
}

// ── Supabase client ──────────────────────────────────────────────────────────

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false },
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function toTitle(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")          // strip extension
    .replace(/^\d+[_-]/, "")          // strip leading sort prefix (01_, 02-)
    .replace(/[-_]/g, " ")            // dashes/underscores → spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // title case
}

// ── Deploy ───────────────────────────────────────────────────────────────────

async function deploy() {
  const { userId, brand, preset, theme, gallery, websiteUrl } = deployment;

  console.log(`\nDeploying "${clientId}"...`);
  console.log(`  user_id : ${userId}`);
  console.log(`  preset  : ${preset}`);
  console.log(`  bucket  : ${gallery.bucket}\n`);

  // ── 1. Upsert brand row ────────────────────────────────────────────────────
  console.log("1/3  Upserting brand row...");

  const { error: brandError } = await supabase.from("brands").upsert(
    {
      user_id:           userId,
      name:              brand.name,
      tagline:           brand.tagline,
      email:             brand.email,
      phone:             brand.phone,
      about_us:          brand.aboutUs,
      address:           brand.address,
      social_links:      brand.social,
      logo_url:          brand.logoVariants.primary,
      logo_variants:     brand.logoVariants,
      website_url:       websiteUrl,
      ...(brand.heroImageUrl    && { hero_image_url:    brand.heroImageUrl }),
      ...(brand.aboutImageUrl   && { about_image_url:   brand.aboutImageUrl }),
      ...(brand.afterImageUrl   && { after_image_url:   brand.afterImageUrl }),
      ...(brand.founderImageUrl && { founder_image_url: brand.founderImageUrl }),
      layout: { preset },
      theme,
    },
    { onConflict: "user_id" }
  );

  if (brandError) throw new Error(`Brand upsert failed: ${brandError.message}`);
  console.log("     ✓ Brand row saved\n");

  // ── 2. List photos from bucket ─────────────────────────────────────────────
  console.log(`2/3  Reading photos from bucket "${gallery.bucket}"...`);

  const { data: files, error: listError } = await supabase.storage
    .from(gallery.bucket)
    .list("", { limit: 500, sortBy: { column: "name", order: "asc" } });

  if (listError) throw new Error(`Storage list failed: ${listError.message}`);

  const photos = (files ?? []).filter(
    (f) => f.name && !f.name.startsWith(".") && f.id !== null // id is null for folders
  );

  if (photos.length === 0) {
    console.log("     ⚠ No photos found in bucket — gallery will be empty");
    console.log("       Upload photos and re-run to populate the gallery.\n");
  } else {
    console.log(`     Found ${photos.length} photo(s)\n`);

    // ── 3. Seed brand_photos ─────────────────────────────────────────────────
    console.log("3/3  Seeding gallery...");

    const { data: urlData } = supabase.storage
      .from(gallery.bucket)
      .getPublicUrl("__placeholder__");
    const baseUrl = urlData.publicUrl.replace("/__placeholder__", "");

    const { error: deleteError } = await supabase
      .from("brand_photos")
      .delete()
      .eq("user_id", userId);

    if (deleteError) throw new Error(`Photo clear failed: ${deleteError.message}`);

    const rows = photos.map((f, i) => ({
      user_id:    userId,
      url:        `${baseUrl}/${f.name}`,
      alt_text:   toTitle(f.name),
      caption:    toTitle(f.name),
      sort_order: i + 1,
    }));

    const { error: insertError } = await supabase
      .from("brand_photos")
      .insert(rows);

    if (insertError) throw new Error(`Photo insert failed: ${insertError.message}`);
    console.log(`     ✓ ${photos.length} photos seeded\n`);
  }

  console.log(`✓ "${clientId}" deployed successfully`);
  console.log(`  ${websiteUrl}\n`);
}

deploy().catch((err: Error) => {
  console.error("\n✗ Deploy failed:", err.message);
  process.exit(1);
});
