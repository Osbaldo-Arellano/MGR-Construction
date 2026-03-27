"use client";

import { useEffect } from "react";
import { useBrand } from "@/contexts/brand-context";

const radiusMap = {
  sharp: {
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.375rem",
    xl: "0.5rem",
    "2xl": "0.625rem",
    "3xl": "0.75rem",
    "4xl": "1rem",
  },
  rounded: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.25rem",
    "3xl": "1.5rem",
    "4xl": "2rem",
  },
  pill: {
    sm: "999px",
    md: "999px",
    lg: "999px",
    xl: "999px",
    "2xl": "999px",
    "3xl": "999px",
    "4xl": "999px",
  },
};

/**
 * Reads theme state from BrandContext and applies CSS variable overrides
 * to the document root at runtime. This means every deployment can have
 * a unique visual identity without touching globals.css.
 */
export function ThemeInjector() {
  const { theme } = useBrand();

  useEffect(() => {
    const root = document.documentElement;

    if (theme.primaryColor) {
      root.style.setProperty("--primary", theme.primaryColor);
    }
    if (theme.secondaryColor) {
      root.style.setProperty("--brand-secondary", theme.secondaryColor);
    }
    if (theme.accentColor) {
      root.style.setProperty("--brand-accent", theme.accentColor);
    }

    const r = radiusMap[theme.radius ?? "rounded"];
    Object.entries(r).forEach(([k, v]) => {
      root.style.setProperty(`--radius-${k}`, v);
    });
  }, [theme]);

  return null;
}
