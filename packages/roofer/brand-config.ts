// ============================================================
// ROOFER PACKAGE — Brand Config Template
// ============================================================
// Replace placeholder values with the client's real info.
// Upload logos/photos to Supabase Storage and swap the URLs.
// Then INSERT this data into the `brands` table.
// ============================================================

export const rooferBrandConfig = {
  company: {
    name: "Summit Roofing Co.",
    tagline: "Built to Last. Backed by Warranty.",
    description:
      "Family-owned residential and commercial roofing. Licensed, insured, and certified by the top manufacturers in the industry. Every roof carries our personal guarantee.",
    email: "info@summitroofingco.com",
    phone: "+1 (555) 800-ROOF",
    address: "Portland, OR",
  },

  assets: {
    logo: {
      light: "/logo-light.svg",   // replace with Supabase Storage URL
      dark: "/logo-dark.svg",     // replace with Supabase Storage URL
      favicon: "/favicon.ico",    // replace with Supabase Storage URL
    },
    hero: {
      image: "/hero-roof-aerial.jpg",  // aerial drone shot of finished roof
      imageAlt: "Aerial view of completed architectural shingle roofing project",
    },
    partnerLogos: [
      { name: "GAF",          url: "/partners/gaf.png" },
      { name: "CertainTeed",  url: "/partners/certainteed.png" },
      { name: "Owens Corning", url: "/partners/owens-corning.png" },
      { name: "NRCA",         url: "/partners/nrca.png" },
      { name: "BBB",          url: "/partners/bbb.png" },
    ],
  },

  navigation: {
    links: [
      { label: "About",     href: "#about" },
      { label: "Systems",   href: "#materials" },
      { label: "Our Work",  href: "#gallery" },
      { label: "Warranty",  href: "#warranty" },
      { label: "Contact",   href: "#contact" },
    ],
    cta: {
      label: "Free Roof Inspection",
      href: "#contact",
    },
  },

  hero: {
    headline: "Your Roof. Our Reputation.",
    subheadline:
      "Summit Roofing installs, repairs, and restores residential and commercial roofs across the Pacific Northwest. GAF-certified, NRCA-member, and backed by a 10-year workmanship warranty on every job.",
    primaryCta: {
      label: "Free Roof Inspection",
      href: "#contact",
    },
    secondaryCta: {
      label: "See Our Work",
      href: "#gallery",
    },
    stats: [
      { value: "500+",  label: "Roofs Installed" },
      { value: "15yr",  label: "Max Warranty" },
      { value: "24/7",  label: "Storm Response" },
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
    headline: "Certified by the industry's top names",
    credentials: [
      "GAF Master Elite",
      "CertainTeed SELECT",
      "NRCA Member",
      "BBB Accredited",
      "Licensed & Insured",
      "Free Inspections",
    ],
  },

  about: {
    headline: "Family-Owned. Manufacturer-Certified.",
    subheadline: "A family business built on craft, accountability, and long-term relationships.",
    description:
      "Summit Roofing was founded by Marcus and Elena Torres after 20 years in commercial construction. We started this company because we were tired of seeing homeowners get burned by roofing crews who disappear after the check clears. Every roof we install carries our name — literally. We sign our work, we warranty our work, and we answer our phone when something goes wrong.",
    values: [
      {
        title: "Manufacturer-Certified Installation",
        description:
          "GAF Master Elite and CertainTeed SELECT certification means factory-authorized installation, proper ventilation design, and warranty coverage that actually holds up when you need it.",
      },
      {
        title: "10-Year Workmanship Guarantee",
        description:
          "We stand behind our labor independently of the manufacturer. If anything we installed causes a leak or failure within 10 years, we come back and fix it. No charge. No argument.",
      },
      {
        title: "Insurance Claim Specialists",
        description:
          "Storm damage claims are our specialty. We document the damage, communicate directly with your adjuster, and fight to make sure you get the coverage you've been paying for.",
      },
    ],
  },

  services: {
    headline: "Roofing Systems",
    subheadline: "We install every major roofing system — help you choose the right one for your home, budget, and climate.",
    items: [
      {
        icon: "Layers",
        title: "Architectural Shingles",
        description:
          "The most popular residential roofing system in North America. Dimensional shingles provide excellent wind resistance, a natural shadow line, and 30–50 year lifespans. Cost-effective protection without compromise.",
      },
      {
        icon: "Hammer",
        title: "Metal Roofing",
        description:
          "Standing seam and metal shingle systems last 40–70 years with minimal maintenance. Ideal for steep-pitch roofs, high-wind zones, and homeowners who want a permanent solution. Energy-efficient and 100% recyclable.",
      },
      {
        icon: "Layers",
        title: "Flat & TPO Membrane",
        description:
          "Single-ply TPO and modified bitumen systems for low-slope and flat roofs. Seamless, UV-resistant, and energy-reflective. The standard for commercial buildings and modern residential additions.",
      },
      {
        icon: "CloudRain",
        title: "Storm Damage Repair",
        description:
          "Hail, wind, falling trees — we've seen it all. Emergency tarping within hours, full damage documentation for your insurance claim, and complete restoration to pre-storm condition or better.",
      },
      {
        icon: "Droplets",
        title: "Gutters & Drainage",
        description:
          "Seamless aluminum gutters sized and pitched correctly for your roof's square footage. Proper drainage protects your foundation, siding, and landscaping. We install, repair, and clean.",
      },
      {
        icon: "CheckCircle",
        title: "Free Roof Inspections",
        description:
          "A thorough inspection of decking, flashings, ventilation, gutters, and all penetrations — documented with photos. No pressure, no obligation. Know your roof's condition before you need an emergency repair.",
      },
    ],
  },

  gallery: {
    headline: "Our Work",
    subheadline: "Aerial drone shots, before-and-afters, and completed projects across the Pacific Northwest.",
    tabs: {
      photos: "Photos",
      videos: "Videos",
    },
    // First item = "After" (finished work), Second item = "Before" (damage/old roof)
    // These are used by the before-after slider section.
    items: [
      { image: "/gallery/completed-shingle-aerial.jpg",     title: "Completed Architectural Shingle — Aerial", category: "Shingle" },
      { image: "/gallery/storm-damaged-roof-before.jpg",    title: "Storm-Damaged Roof Before Restoration",   category: "Storm Damage" },
      { image: "/gallery/metal-standing-seam-complete.jpg", title: "Standing Seam Metal Roof — Complete",     category: "Metal" },
      { image: "/gallery/tpo-commercial-flat.jpg",          title: "TPO Flat Roof — Commercial",              category: "Flat / TPO" },
      { image: "/gallery/gutter-install-seamless.jpg",      title: "Seamless Gutter Installation",            category: "Gutters" },
      { image: "/gallery/shingle-closeup-gaf.jpg",          title: "GAF Timberline HDZ Close-Up",             category: "Shingle" },
      { image: "/gallery/flashing-chimney-complete.jpg",    title: "Chimney Flashing — Complete",             category: "Detail Work" },
      { image: "/gallery/ridge-vent-install.jpg",           title: "Ridge Vent Installation",                 category: "Ventilation" },
    ],
    videos: [
      { videoUrl: "/gallery/installation-timelapse.mp4", title: "Full Roof Replacement Timelapse",     category: "Shingle" },
      { videoUrl: "/gallery/storm-walkthrough.mp4",      title: "Storm Damage Inspection Walkthrough", category: "Storm Damage" },
    ],
  },

  announcementBar: {
    cta: "Storm damage? Call for same-day emergency response →",
  },

  quoteModal: {
    title: "Request a Free Inspection",
    subtitle: "Tell us about your roof and we'll schedule a free inspection within 48 hours.",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    servicesLabel: "What do you need?",
    servicesPlaceholder: "Select services...",
    messageLabel: "Message",
    messagePlaceholder: "Describe your roofing concern, recent storm, or what you'd like inspected...",
    submitLabel: "Request Free Inspection",
    submittingLabel: "Sending...",
    successTitle: "Inspection Request Sent!",
    successMessage: "We'll reach out within 24 hours to schedule your free roof inspection.",
    sendAnother: "Submit Another Request",
  },

  cta: {
    headline: "Ready for a Roof That Lasts?",
    subheadline:
      "Get a free inspection from a GAF-certified roofing contractor. We serve homeowners across the Pacific Northwest.",
    servicesLabel: "Services Needed",
    getInTouchTitle: "Schedule Your Free Inspection",
    getInTouchDescription:
      "No pressure. No obligation. Just a thorough inspection of your roof's condition with honest recommendations — documented with photos.",
    primaryCta: {
      label: "Request Free Inspection",
      href: "#contact",
    },
    secondaryCta: {
      label: "See Our Work",
      href: "#gallery",
    },
  },

  footer: {
    description:
      "Family-owned residential and commercial roofing. GAF Master Elite certified. Serving the Pacific Northwest since 2004.",
    columns: [
      {
        title: "Navigate",
        links: [
          { label: "About Us",         href: "#about" },
          { label: "Roofing Systems",  href: "#materials" },
          { label: "Our Work",         href: "#gallery" },
          { label: "Warranty",         href: "#warranty" },
          { label: "Contact",          href: "#contact" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "Architectural Shingles",  href: "#materials" },
          { label: "Metal Roofing",           href: "#materials" },
          { label: "Flat / TPO",              href: "#materials" },
          { label: "Storm Damage Repair",     href: "#materials" },
          { label: "Free Inspections",        href: "#contact" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "info@summitroofingco.com", href: "mailto:info@summitroofingco.com" },
          { label: "+1 (555) 800-ROOF",        href: "tel:+15558007663" },
          { label: "Portland, OR",             href: "#contact" },
        ],
      },
    ],
    social: [
      { platform: "facebook",  url: "https://facebook.com" },
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "youtube",   url: "https://youtube.com" },
    ],
    copyright: `© ${new Date().getFullYear()} Summit Roofing Co. All rights reserved.`,
  },
} as const;

export type RooferBrandConfig = typeof rooferBrandConfig;
