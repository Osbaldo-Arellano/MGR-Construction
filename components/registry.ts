import type { ComponentType } from "react";

// Announcement bar
import { AnnouncementBarDefault } from "@/components/sections/announcement-bar/default";

// Navbar
import { NavbarDefault } from "@/components/sections/navbar/default";

// Hero
import { HeroCinematic } from "@/components/sections/hero/cinematic";
import { HeroSplit } from "@/components/sections/hero/split";
import { HeroBento } from "@/components/sections/hero/bento";

// Trust bar
import { TrustBarDefault } from "@/components/sections/trust-bar/default";
import { TrustBarReviews } from "@/components/sections/trust-bar/reviews";

// Services
import { ServicesNumberedList } from "@/components/sections/services/numbered-list";
import { ServicesGridTilt } from "@/components/sections/services/grid-tilt";

// About
import { AboutPhotoGridQuote } from "@/components/sections/about/photo-grid-quote";
import { AboutFounderSpotlight } from "@/components/sections/about/founder-spotlight";
import { AboutStatsForward } from "@/components/sections/about/stats-forward";

// Gallery
import { GalleryLightbox } from "@/components/sections/gallery/lightbox";

// Contact
import { ContactStacked } from "@/components/sections/contact/stacked";
import { ContactSplitForm } from "@/components/sections/contact/split-form";

// Widgets
import { RoofChatWidget } from "@/components/widgets/roof-chat";
import { SocialProofToasts } from "@/components/widgets/social-proof-toasts";
import { RoofAgeCalculator } from "@/components/widgets/roof-age-calculator";

// Before / After
import { BeforeAfterSlider } from "@/components/sections/before-after/slider";

// Emergency
import { EmergencyDefault } from "@/components/sections/emergency/default";

// Materials
import { MaterialsComparison } from "@/components/sections/materials/comparison";

// Certifications
import { CertificationsDefault } from "@/components/sections/certifications/default";

// Why Us
import { WhyUsCards } from "@/components/sections/why-us/cards";

// HARP
import { HarpDefault } from "@/components/sections/harp/default";

// Warranty
import { WarrantyDefault } from "@/components/sections/warranty/default";

// Footer
import { FooterDefault } from "@/components/sections/footer/default";

/**
 * Registry mapping: sectionId → { variantName: Component }
 * Variants are React components that render a full page section.
 */
export const sectionRegistry: Record<string, Record<string, ComponentType>> = {
  "announcement-bar": {
    default: AnnouncementBarDefault,
  },
  navbar: {
    default: NavbarDefault,
  },
  hero: {
    cinematic: HeroCinematic,
    split: HeroSplit,
    bento: HeroBento,
  },
  "trust-bar": {
    default: TrustBarDefault,
    reviews: TrustBarReviews,
  },
  services: {
    "numbered-list": ServicesNumberedList,
    "grid-tilt": ServicesGridTilt,
  },
  about: {
    "photo-grid-quote": AboutPhotoGridQuote,
    "founder-spotlight": AboutFounderSpotlight,
    "stats-forward": AboutStatsForward,
  },
  gallery: {
    lightbox: GalleryLightbox,
  },
  contact: {
    stacked: ContactStacked,
    "split-form": ContactSplitForm,
  },
  "before-after": {
    slider: BeforeAfterSlider,
  },
  emergency: {
    default: EmergencyDefault,
  },
  materials: {
    comparison: MaterialsComparison,
  },
  certifications: {
    default: CertificationsDefault,
  },
  "why-us": {
    cards: WhyUsCards,
  },
  harp: {
    default: HarpDefault,
  },
  warranty: {
    default: WarrantyDefault,
  },
  footer: {
    default: FooterDefault,
  },
};

/**
 * Resolve a component from the registry. Falls back to the first variant
 * for the section if the requested variant is not found.
 */
export function resolveSection(
  sectionId: string,
  variant: string,
): ComponentType | null {
  const section = sectionRegistry[sectionId];
  if (!section) return null;
  return section[variant] ?? Object.values(section)[0] ?? null;
}

/**
 * Widget registry: widgetId → Component
 * Widgets are floating/persistent UI elements rendered outside the page flow.
 */
export const widgetRegistry: Record<string, ComponentType> = {
  "roof-chat": RoofChatWidget,
  "social-proof-toasts": SocialProofToasts,
  "roof-age-calculator": RoofAgeCalculator,
};

export function resolveWidget(widgetId: string): ComponentType | null {
  return widgetRegistry[widgetId] ?? null;
}
