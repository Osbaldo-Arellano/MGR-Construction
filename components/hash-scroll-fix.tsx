"use client";

import { useEffect } from "react";

/**
 * Fixes hash link overshoot caused by the hero section collapsing
 * during scroll. Jumps instantly to collapse the hero, waits for
 * layout to settle, then smooth-scrolls to the exact position.
 */
export function HashScrollFix() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest("a[href^='#']");
      if (!link) return;

      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      history.pushState(null, "", hash);

      document.documentElement.style.scrollBehavior = "auto";
      target.scrollIntoView({ behavior: "instant" });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.documentElement.style.scrollBehavior = "smooth";
          target.scrollIntoView({ behavior: "smooth" });
        });
      });
    }

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, []);

  return null;
}
