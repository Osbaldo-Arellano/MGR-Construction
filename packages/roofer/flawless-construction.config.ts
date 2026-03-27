// ============================================================
// CLIENT CONFIG — Flawless Construction and Roofing
// Owner: Rene Morales | Family-Owned | Oregon
// ============================================================
// New sections beyond the base template:
//   certifications — partner/credential logos + descriptions
//   harp           — HARP program spotlight block
// Both need corresponding components wired to the layout.
// ============================================================

export const flawlessConstructionConfig = {
  company: {
    name: "Flawless Construction and Roofing",
    tagline: "Family-Owned. Certified. Built for Oregon.",
    description:
      "Flawless Construction and Roofing is a family-owned company founded by Rene Morales. We serve Oregon homeowners with full-service roofing — from complete tear-offs and new installs to storm damage restoration and moss treatment. Credentialed by CertainTeed, partnered with the Energy Trust of Oregon, and proud to support Oregon's wildfire recovery programs.",
    email: "info@flawlessconstructionroofing.com",
    phone: "",           // fill in
    address: "Oregon",  // fill in city/region
  },

  assets: {
    logo: {
      light: "/roofer-pro/logo-light.svg",   // replace with actual logo
      dark: "/roofer-pro/logo-dark.svg",      // replace with actual logo
      favicon: "/favicon.ico",
    },
    hero: {
      image: "/roofer-pro/hero.jpg",          // replace with client hero photo
      imageAlt: "Flawless Construction and Roofing — Oregon residential roof installation",
    },
    partnerLogos: [
      { name: "CertainTeed ShingleMaster",         url: "/roofer-pro/certainteed_credential_logo.webp" },
      { name: "CertainTeed",                        url: "/roofer-pro/certainteed_logo.svg" },
      { name: "Energy Trust of Oregon",             url: "/roofer-pro/Energry_Trust.png" },
      { name: "Oregon Housing & Community Services", url: "/roofer-pro/OHCSlogo.png" },
    ],
  },

  navigation: {
    links: [
      { label: "About",           href: "#about" },
      { label: "Services",        href: "#materials" },
      { label: "Certifications",  href: "#certifications" },
      { label: "HARP Program",    href: "#harp" },
      { label: "Our Work",        href: "#gallery" },
      { label: "Contact",         href: "#contact" },
    ],
    cta: {
      label: "Free Roof Inspection",
      href: "#contact",
    },
  },

  hero: {
    headline: "Flawless Roofing. Every Time.",
    subheadline:
      "Family-owned by Rene Morales. CertainTeed ShingleMaster credentialed, Energy Trust of Oregon certified, and a proud partner in Oregon's wildfire recovery programs. We do the job right the first time.",
    primaryCta: {
      label: "Free Roof Inspection",
      href: "#contact",
    },
    secondaryCta: {
      label: "Our Services",
      href: "#materials",
    },
    stats: [
      { value: "100%", label: "Family Owned" },
      { value: "4",    label: "Certifications" },
      { value: "HARP", label: "Recovery Partner" },
    ],
    scrollHint: "Scroll to explore",
    overlayCard: {
      type: "estimate-form" as const,
      eyebrow: "Free Estimate",
      description: "No cost, no commitment. We respond same day.",
      buttons: [],
    },
  },

  trustBar: {
    headline: "Certified, credentialed, and community-connected",
    credentials: [
      "CertainTeed ShingleMaster Credentialed",
      "Energy Trust of Oregon Partner",
      "OHCS Partner",
      "HARP Partner",
      "Licensed & Insured",
      "Free Inspections",
    ],
  },

  about: {
    headline: "Family-Owned. Built on Trust.",
    subheadline: "Rene Morales founded Flawless Construction and Roofing to do one thing: give Oregon homeowners a contractor they can count on.",
    description:
      "Flawless Construction and Roofing is a family business. Rene Morales built this company on the belief that every homeowner deserves clear communication, certified craftsmanship, and a roof that holds up. We earned our CertainTeed ShingleMaster credential, became a Trade Ally of the Energy Trust of Oregon, and partnered with OHCS and HARP because we're not just here to install roofs — we're here to help our community.",
    values: [
      {
        title: "CertainTeed ShingleMaster Credentialed",
        description:
          "Our ShingleMaster credential means factory-authorized installation, proper ventilation design, and access to CertainTeed's strongest warranty tiers — protection that actually holds up when you need it.",
      },
      {
        title: "Energy Trust of Oregon Trade Ally",
        description:
          "As a certified Trade Ally, we help Oregon homeowners access rebates and incentives for energy-efficient roofing upgrades. We know what qualifies and how to make the process simple.",
      },
      {
        title: "Community & Recovery Programs",
        description:
          "We are proud partners with the Oregon Housing and Community Services Department and the HARP program — helping families whose homes were damaged by wildfires get the repairs and rebuilds they need.",
      },
    ],
  },

  // ── New section: Certifications & Partnerships ─────────────────────────────
  certifications: {
    headline: "Certified. Credentialed. Community-Connected.",
    subheadline:
      "Every certification we hold represents a commitment — to quality installation, energy efficiency, and serving Oregon homeowners through every program available to them.",
    items: [
      {
        name: "CertainTeed ShingleMaster Credentialed",
        logo: "/roofer-pro/certainteed_credential_logo.webp",
        logoAlt: "CertainTeed ShingleMaster Credentialed badge",
        description:
          "The ShingleMaster credential is CertainTeed's highest installer certification. It qualifies us to offer SureStart PLUS extended warranty coverage — among the strongest manufacturer warranties in the industry.",
      },
      {
        name: "Energy Trust of Oregon Trade Ally",
        logo: "/roofer-pro/Energry_Trust.png",
        logoAlt: "Trade Ally of Energy Trust of Oregon",
        description:
          "As an Energy Trust Trade Ally, we help Oregon homeowners access cash incentives for qualifying energy-efficient roofing and insulation improvements. We handle the paperwork.",
      },
      {
        name: "Oregon Housing & Community Services Department Partner",
        logo: "/roofer-pro/OHCSlogo.png",
        logoAlt: "Oregon Housing and Community Services logo",
        description:
          "We work directly with OHCS to connect eligible homeowners with state-funded housing assistance programs — including disaster recovery and affordable repair funding.",
      },
      {
        name: "Homeowner Assistance and Reconstruction Program (HARP) Partner",
        logo: "/roofer-pro/OHCSlogo.png",
        logoAlt: "Oregon Housing and Community Services — HARP Program",
        description:
          "Flawless Construction and Roofing is a verified HARP contractor, qualified to perform repairs and rebuilds funded through Oregon's wildfire recovery assistance program.",
      },
    ],
  },

  // ── New section: HARP Program Spotlight ───────────────────────────────────
  harp: {
    headline: "About HARP",
    subheadline: "Homeowner Assistance and Reconstruction Program",
    body:
      "ReOregon opened HARP so qualified homeowners whose properties were damaged or destroyed by wildfires and/or straight-line winds in 2020 can get the financial assistance needed to repair, rebuild, or replace their homes.",
    link: {
      label: "Read how HARP helped survivors rebuild homes and find stability.",
      href: "https://www.oregon.gov/ohcs/disaster-recovery/reoregon/about-reoregon/Pages/wildfire-recovery-spotlights.aspx",
    },
  },

  services: {
    headline: "Our Services",
    subheadline:
      "Full-service roofing for Oregon homeowners — from new installs and tear-offs to storm recovery, energy upgrades, and preventive maintenance.",
    items: [
      {
        icon: "Hammer",
        title: "Tear Offs and Install",
        description:
          "We expertly tear off old roofing materials and install new ones, ensuring the job is done right the first time with consistent customer communication throughout the entire process.",
      },
      {
        icon: "Wrench",
        title: "Reliable Roof Damage Restoration",
        description:
          "No job is too small. Our team excels at precise and careful roof repairs — whether it's a few damaged shingles or widespread storm damage requiring full section replacement.",
      },
      {
        icon: "Droplets",
        title: "Roof Cleaning, Moss & Algae Treatment",
        description:
          "We remove moss and algae without damaging your shingles and treat the roof for long-lasting cleanliness. Oregon's climate makes this essential — we do it the right way.",
      },
      {
        icon: "CloudRain",
        title: "Wildfire & Storm Damage Restoration",
        description:
          "As a HARP-partnered contractor, we specialize in wildfire damage assessment and full reconstruction. We work directly with recovery program administrators to streamline your claim.",
      },
      {
        icon: "Zap",
        title: "Energy-Efficient Roofing",
        description:
          "As an Energy Trust of Oregon Trade Ally, we install qualifying roofing systems that reduce energy costs and unlock state rebates. We handle the certification process for you.",
      },
      {
        icon: "CheckCircle",
        title: "Free Roof Inspections",
        description:
          "A thorough inspection of your decking, flashings, ventilation, gutters, and all penetrations — documented with photos and a written report. No pressure, no obligation.",
      },
    ],
  },

  gallery: {
    headline: "Our Work",
    subheadline: "Before-and-afters, completed installs, and restoration projects across Oregon.",
    tabs: {
      photos: "Photos",
      videos: "Videos",
    },
    items: [
      // Replace with real client photos
      { image: "/roofer-pro/gallery/install-complete.jpg",    title: "New Shingle Install — Complete",           category: "Install" },
      { image: "/roofer-pro/gallery/tear-off-before.jpg",     title: "Tear-Off Before New Install",              category: "Tear Off" },
      { image: "/roofer-pro/gallery/storm-damage-before.jpg", title: "Storm Damage — Before Restoration",        category: "Storm Damage" },
      { image: "/roofer-pro/gallery/storm-damage-after.jpg",  title: "Storm Damage — After Restoration",         category: "Storm Damage" },
      { image: "/roofer-pro/gallery/moss-before.jpg",         title: "Moss and Algae — Before Treatment",        category: "Cleaning" },
      { image: "/roofer-pro/gallery/moss-after.jpg",          title: "Moss and Algae — After Treatment",         category: "Cleaning" },
    ],
    videos: [],
  },

  announcementBar: {
    cta: "HARP wildfire recovery partner — we can help you navigate the program. Call today.",
  },

  quoteModal: {
    title: "Request a Free Inspection",
    subtitle: "Tell us about your roof and we will schedule a free inspection within 48 hours.",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    servicesLabel: "What do you need?",
    servicesPlaceholder: "Select services...",
    messageLabel: "Message",
    messagePlaceholder: "Describe your roofing concern, recent storm damage, or what you would like inspected...",
    submitLabel: "Request Free Inspection",
    submittingLabel: "Sending...",
    successTitle: "Inspection Request Sent!",
    successMessage: "We will reach out soon to schedule your free roof inspection.",
    sendAnother: "Submit Another Request",
  },

  cta: {
    headline: "Ready for a Roof Done Right?",
    subheadline:
      "Get a free inspection from a CertainTeed ShingleMaster credentialed contractor. Flawless Construction and Roofing serves homeowners across Oregon.",
    servicesLabel: "Services Needed",
    getInTouchTitle: "Schedule Your Free Inspection",
    getInTouchDescription:
      "No pressure. No obligation. A thorough inspection of your roof with honest recommendations — documented with photos and a full written report.",
    primaryCta: {
      label: "Request Free Inspection",
      href: "#contact",
    },
    secondaryCta: {
      label: "Our Services",
      href: "#materials",
    },
  },

  footer: {
    description:
      "Family-owned roofing by Rene Morales. CertainTeed ShingleMaster credentialed. Energy Trust of Oregon Trade Ally. HARP and OHCS partner. Serving Oregon homeowners.",
    columns: [
      {
        title: "Navigate",
        links: [
          { label: "About Us",         href: "#about" },
          { label: "Services",         href: "#materials" },
          { label: "Certifications",   href: "#certifications" },
          { label: "HARP Program",     href: "#harp" },
          { label: "Our Work",         href: "#gallery" },
          { label: "Contact",          href: "#contact" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Tear Offs & Install",            href: "#materials" },
          { label: "Roof Damage Restoration",        href: "#materials" },
          { label: "Moss & Algae Treatment",         href: "#materials" },
          { label: "Wildfire Recovery Restoration",  href: "#materials" },
          { label: "Energy-Efficient Roofing",       href: "#materials" },
          { label: "Free Inspections",               href: "#contact" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "info@flawlessconstructionroofing.com", href: "mailto:info@flawlessconstructionroofing.com" },
          { label: "Call Us",                              href: "tel:" },       // fill in phone
          { label: "Oregon",                               href: "#contact" },   // fill in city
        ],
      },
    ],
    social: [
      { platform: "facebook",  url: "https://facebook.com" },   // fill in
      { platform: "instagram", url: "https://instagram.com" },  // fill in
    ],
    copyright: `© ${new Date().getFullYear()} Flawless Construction and Roofing. All rights reserved.`,
  },
} as const;

export type FlawlessConstructionConfig = typeof flawlessConstructionConfig;
