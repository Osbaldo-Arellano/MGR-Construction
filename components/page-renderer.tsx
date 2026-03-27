"use client";

import { useBrand } from "@/contexts/brand-context";
import { resolveSection } from "@/components/registry";

/**
 * Reads the layout from BrandContext and renders each enabled section
 * in order, using the correct variant component from the registry.
 *
 * The layout object (from Supabase or preset defaults) drives:
 *   - Which sections are enabled (sections map)
 *   - The render order (order array)
 *   - Which variant each section uses (overrides map)
 */
export function PageRenderer() {
  const { layout } = useBrand();

  const { order, sections, variants } = layout;

  return (
    <>
      {order.map((sectionId) => {
        // Skip disabled sections
        if (sections[sectionId] === false) return null;

        // Determine variant: layout variants map > fallback "default"
        const variant = variants?.[sectionId] || "default";

        const Component = resolveSection(sectionId, variant);
        if (!Component) return null;

        return <Component key={sectionId} />;
      })}
    </>
  );
}
