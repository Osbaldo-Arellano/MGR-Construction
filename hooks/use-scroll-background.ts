"use client";

import { useEffect } from "react";

/**
 * Smoothly transitions the <body> background color based on scroll position.
 *
 * Dark mode:  #0A1022 (top) → #060810 (scrolled)
 * Light mode: #FFFFFF (top) → #F1F1F4 (scrolled)
 *
 * Fully interpolates over the first 600px of scroll.
 */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

const DARK_START = "#0A1022";
const DARK_END = "#060810";
const LIGHT_START = "#FFFFFF";
const LIGHT_END = "#F1F1F4";
const SCROLL_DISTANCE = 600;

export function useScrollBackground() {
  useEffect(() => {
    const body = document.body;
    body.style.transition = "background-color 0.15s ease-out";

    function update() {
      const t = Math.min(window.scrollY / SCROLL_DISTANCE, 1);
      const isDark = document.documentElement.classList.contains("dark");

      const [sr, sg, sb] = hexToRgb(isDark ? DARK_START : LIGHT_START);
      const [er, eg, eb] = hexToRgb(isDark ? DARK_END : LIGHT_END);

      body.style.backgroundColor = rgbToHex(
        Math.round(lerp(sr, er, t)),
        Math.round(lerp(sg, eg, t)),
        Math.round(lerp(sb, eb, t))
      );
    }

    update();
    window.addEventListener("scroll", update, { passive: true });

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
      body.style.transition = "";
      body.style.backgroundColor = "";
    };
  }, []);
}
