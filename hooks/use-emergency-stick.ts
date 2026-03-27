"use client";

import { useEffect, useState } from "react";

/**
 * Tracks the #emergency section's bottom edge and sticks the calling tab to it
 * while the section crosses the tab's natural viewport position.
 *
 * When the section scrolls off the top of the viewport the tab follows it
 * off-screen (tabTop goes negative). It releases back to the natural CSS
 * position only when the section bottom descends past the natural tab position
 * (scrolling back up).
 *
 * @param offset - pixels relative to the Questions? natural top (center + 2).
 *                 0   → Questions? tab
 *                 -84 → My Roof tab (80px height + 4px gap above Questions?)
 */
export function useEmergencyStick(offset: number = 0) {
  const [tabTop, setTabTop] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    function update() {
      const emergency = document.getElementById("emergency");
      if (!emergency) return;

      const { bottom } = emergency.getBoundingClientRect();
      const questionsNatural = window.innerHeight * 0.75 + 2;

      if (bottom >= questionsNatural) {
        // Section hasn't reached the tab zone — use natural CSS position.
        setTabTop(null);
        setIsTracking(false);
      } else {
        // Section is crossing or has scrolled above — follow it off-screen.
        setTabTop(bottom + offset);
        setIsTracking(bottom > 0);
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [offset]);

  return { tabTop, isTracking };
}
