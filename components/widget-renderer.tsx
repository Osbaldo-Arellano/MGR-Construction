"use client";

import { useBrand } from "@/contexts/brand-context";
import { resolveWidget } from "@/components/registry";

/**
 * Reads layout.widgets from BrandContext and renders each registered
 * widget. Widgets are floating/persistent UI elements (chatbots, calculators,
 * badges) that live outside the main page section flow.
 */
export function WidgetRenderer() {
  const { layout } = useBrand();

  if (!layout.widgets || layout.widgets.length === 0) return null;

  return (
    <>
      {layout.widgets.map((widgetId) => {
        const Widget = resolveWidget(widgetId);
        if (!Widget) return null;
        return <Widget key={widgetId} />;
      })}
    </>
  );
}
