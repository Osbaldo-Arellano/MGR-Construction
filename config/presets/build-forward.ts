import type { LayoutPreset } from "./types";

// ── build-forward ─────────────────────────────────────────────────────────────
// Commercial-forward GC preset. Built for contractors whose primary clients
// are developers, property managers, and commercial tenants — not homeowners.
//
// Design rationale:
//   • Dark mode + sharp corners — signals commercial seriousness. This is the
//     company that shows up in a hard hat and delivers on a deadline.
//   • Split hero — project rendering or exterior shot beside a clear value
//     statement. Commercial clients want capability confirmed immediately.
//   • Stats-forward About — $X million completed, N projects, Y years. Metrics
//     speak louder than founder stories for a commercial audience.
//   • Numbered-list services — positions GC work as a disciplined process
//     (Consult → Design → Permit → Build → Handoff), not just labor.
//   • Compact density — commercial decision-makers don't scroll for fun.
//
// Narrative arc:
//   1. hero        — Split. Project exterior + bold value statement.
//   2. trust-bar   — AGC, NAHB, BBB, Licensed & Bonded, Fully Insured.
//   3. about       — Stats-forward. Scope, projects completed, years active.
//   4. services    — Numbered process. How you work, start to finish.
//   5. gallery     — Completed commercial + residential projects.
//   6. contact     — Split form. Project type, budget range, timeline.
//
// Theme:
//   • Graphite/charcoal dark — serious, dependable, no-nonsense.
//   • Sharp corners — precision geometry; permits and blueprints are exact.
//   • Dark mode — makes the primary accent pop; signals modern capability.
//   • Compact density — respects a busy commercial client's time.
// ─────────────────────────────────────────────────────────────────────────────

export const buildForward: LayoutPreset = {
  name: "build-forward",
  layout: {
    order: [
      "hero",
      "trust-bar",
      "about",
      "services",
      "gallery",
      "contact",
    ],
    sections: {
      hero: true,
      "trust-bar": true,
      about: true,
      services: true,
      gallery: true,
      contact: true,
    },
    variants: {
      hero: "split",
      "trust-bar": "default",
      about: "stats-forward",
      services: "numbered-list",
      gallery: "lightbox",
      contact: "split-form",
    },
  },
  theme: {
    primaryColor: "oklch(0.72 0.15 215)",
    radius: "sharp",
    density: "compact",
    font: { heading: "Inter", body: "Inter" },
    mode: "dark",
  },
};
