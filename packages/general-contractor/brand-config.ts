// ============================================================
// GENERAL CONTRACTOR PACKAGE — Brand Config Template
// ============================================================
// Replace placeholder values with the client's real info.
// Upload logos/photos to Supabase Storage and swap the URLs.
// Then INSERT this data into the `brands` table.
// ============================================================

export const gcBrandConfig = {
  company: {
    name: "Apex General Contractors",
    tagline: "From Blueprint to Build. On Time, On Budget.",
    description:
      "Licensed general contractor serving residential and commercial clients across the region. New construction, remodels, additions, and commercial build-outs — managed start to finish with full permit handling and a dedicated project manager on every job.",
    email: "info@apexgc.com",
    phone: "+1 (555) 700-0001",
    address: "Denver, CO",
  },

  assets: {
    logo: {
      light: "https://knhgoaphmtewjhtvglpe.supabase.co/storage/v1/object/public/logos/MGR_Logo-removebg-preview.png",  // replace with Supabase Storage URL
      dark: "https://knhgoaphmtewjhtvglpe.supabase.co/storage/v1/object/public/logos/MGR_Logo-removebg-preview.png",    // replace with Supabase Storage URL
      favicon:" https://knhgoaphmtewjhtvglpe.supabase.co/storage/v1/object/public/logos/MGR_Logo-removebg-preview.png",   // replace with Supabase Storage URL
    },
    hero: {
      image: "/hero-gc-aerial.jpg",  // aerial or exterior shot of completed project
      imageAlt: "Aerial view of completed residential construction project",
    },
    partnerLogos: [
      { name: "NAHB",  url: "/partners/nahb.png" },
      { name: "AGC",   url: "/partners/agc.png" },
      { name: "BBB",   url: "/partners/bbb.png" },
      { name: "OSHA",  url: "/partners/osha.png" },
    ],
  },

  navigation: {
    links: [
      { label: "About",    href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Our Work", href: "#gallery" },
      { label: "Contact",  href: "#contact" },
    ],
    cta: {
      label: "Get a Free Estimate",
      href: "#contact",
    },
  },

  hero: {
    headline: "Built Right. The First Time.",
    subheadline:
      "Apex General Contractors handles new construction, full remodels, and commercial build-outs from permit to punch list. Licensed, bonded, and fully insured — with a dedicated project manager on every job.",
    primaryCta: {
      label: "Get a Free Estimate",
      href: "#contact",
    },
    secondaryCta: {
      label: "See Our Work",
      href: "#gallery",
    },
    stats: [
      { value: "200+", label: "Projects Completed" },
      { value: "15yr", label: "In Business" },
      { value: "100%", label: "Licensed & Bonded" },
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
    headline: "Licensed, bonded, and backed by the industry's top associations",
    credentials: [
      "Licensed General Contractor",
      "Bonded & Insured",
      "NAHB Member",
      "AGC Member",
      "BBB Accredited",
      "Permit Specialists",
    ],
  },

  about: {
    headline: "One Team. Every Trade. Every Phase.",
    subheadline: "A general contractor built around accountability, not subcontractor chaos.",
    description:
      "Apex was founded by Derek and Carla Nguyen after watching too many construction projects fall apart at the handoff — one sub drops the ball, the next can't start, the homeowner is left holding the schedule together themselves. We built Apex around a different model: one project manager, one point of contact, and a vetted network of trade partners who show up on time. Every permit, every inspection, every punch list item — handled.",
    values: [
      {
        title: "Full Permit & Inspection Management",
        description:
          "We pull every permit, coordinate every inspection, and close out every job to code. You never wait on hold with the building department — that's our job.",
      },
      {
        title: "Vetted Trade Network",
        description:
          "Every subcontractor in our network is licensed, insured, and has worked with us long enough that we know their quality firsthand. No Craigslist subs, no surprises on your job.",
      },
      {
        title: "Fixed-Price Contracts",
        description:
          "We price the job before we start it. If something unexpected comes up — we handle the conversation, not the change order. Transparent budgets, no hidden markups.",
      },
    ],
  },

  services: {
    headline: "What We Build",
    subheadline:
      "From a single room addition to a ground-up commercial build — we manage the full scope.",
    items: [
      {
        icon: "Home",
        title: "New Home Construction",
        description:
          "Ground-up residential builds from foundation to finish. We work with your architect and designer or recommend our trusted partners. Full permit management, site supervision, and a single project manager from day one.",
      },
      {
        icon: "Hammer",
        title: "Remodels & Renovations",
        description:
          "Whole-home remodels, partial renovations, and structural changes. We coordinate all trades — demo, framing, electrical, plumbing, HVAC, drywall, finish — so you don't have to.",
      },
      {
        icon: "Plus",
        title: "Additions & ADUs",
        description:
          "Room additions, second-story additions, garage conversions, and accessory dwelling units. Full permit handling, design coordination, and seamless tie-in to your existing structure.",
      },
      {
        icon: "Building2",
        title: "Commercial Build-Outs",
        description:
          "Tenant improvements, office build-outs, retail fit-outs, and light industrial. We work fast, meet your lease timeline, and deliver spaces that pass inspection on the first walk.",
      },
      {
        icon: "ChefHat",
        title: "Kitchen & Bath Remodels",
        description:
          "Full kitchen and bathroom remodels with architectural layout, permit management, and all trade coordination included. We handle the project so you can focus on the finishes.",
      },
      {
        icon: "ClipboardList",
        title: "Project Management Only",
        description:
          "Already have your own subs but need someone to run the job? We offer project management and owner's rep services for clients who want professional oversight without a full GC contract.",
      },
    ],
  },

  whyUs: {
    headline: "Why Apex",
    subheadline: "What separates a great GC from a coordinator with a truck.",
    items: [
      {
        icon: "ShieldCheck",
        title: "Licensed & Bonded",
        description:
          "We carry a full general contractor's license, contractor's bond, and $2M general liability coverage. Every project is protected — yours and ours.",
      },
      {
        icon: "FileCheck",
        title: "Permit Experts",
        description:
          "We've pulled hundreds of permits across multiple jurisdictions. We know the inspectors, we know the code cycles, and we know how to get your project approved without delays.",
      },
      {
        icon: "CalendarCheck",
        title: "On-Time Delivery",
        description:
          "We build schedules before we break ground and hold our trade partners to them. Our on-time completion rate speaks for itself — ask us for references.",
      },
      {
        icon: "Users",
        title: "Dedicated Project Manager",
        description:
          "Every job has one named project manager — not a rotating cast of foremen. You have one number to call and one person accountable for every decision.",
      },
    ],
  },

  gallery: {
    headline: "Our Work",
    subheadline:
      "New builds, remodels, additions, and commercial projects across the region.",
    tabs: {
      photos: "Photos",
      videos: "Videos",
    },
    // First item = "After" (finished), Second item = "Before" (demo/rough)
    // These are used by the before-after slider section.
    items: [
      { image: "/gallery/new-construction-exterior.jpg",     title: "New Construction — Exterior Complete",       category: "New Build" },
      { image: "/gallery/kitchen-remodel-before.jpg",        title: "Kitchen Remodel Before Demo",                category: "Remodel" },
      { image: "/gallery/kitchen-remodel-after.jpg",         title: "Kitchen Remodel After — Complete",           category: "Remodel" },
      { image: "/gallery/addition-framing.jpg",              title: "Second-Story Addition — Framing",            category: "Addition" },
      { image: "/gallery/commercial-buildout-complete.jpg",  title: "Office Build-Out — Complete",                category: "Commercial" },
      { image: "/gallery/bathroom-remodel-after.jpg",        title: "Master Bath Remodel — After",                category: "Remodel" },
      { image: "/gallery/adu-exterior-complete.jpg",         title: "Accessory Dwelling Unit — Exterior",         category: "ADU" },
      { image: "/gallery/framing-crew-action.jpg",           title: "Framing Crew — New Build",                   category: "New Build" },
    ],
    videos: [
      { videoUrl: "/gallery/project-timelapse.mp4",     title: "Full Home Remodel Timelapse",        category: "Remodel" },
      { videoUrl: "/gallery/site-walkthrough.mp4",      title: "New Construction Site Walkthrough",  category: "New Build" },
    ],
  },

  announcementBar: {
    cta: "Planning a project? Get a free estimate — we respond within 24 hours →",
  },

  quoteModal: {
    title: "Get a Free Estimate",
    subtitle: "Tell us about your project and we'll schedule a free consultation within 48 hours.",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    servicesLabel: "What type of project?",
    servicesPlaceholder: "Select project type...",
    messageLabel: "Project Description",
    messagePlaceholder: "Describe your project — scope, timeline, any existing plans or permits...",
    submitLabel: "Request Free Estimate",
    submittingLabel: "Sending...",
    successTitle: "Estimate Request Sent!",
    successMessage: "We'll reach out within 24 hours to schedule your free project consultation.",
    sendAnother: "Submit Another Request",
  },

  cta: {
    headline: "Ready to Build?",
    subheadline:
      "Get a free estimate from a licensed general contractor. We serve homeowners and commercial clients across the region.",
    servicesLabel: "Project Type",
    getInTouchTitle: "Schedule Your Free Consultation",
    getInTouchDescription:
      "No pressure. No obligation. A straight conversation about your project, your timeline, and what it will realistically cost — with a contractor who's pulled the permits and built the jobs.",
    primaryCta: {
      label: "Get a Free Estimate",
      href: "#contact",
    },
    secondaryCta: {
      label: "See Our Work",
      href: "#gallery",
    },
  },

  footer: {
    description:
      "Licensed general contractor. New construction, remodels, additions, and commercial build-outs. Serving the region since 2009.",
    columns: [
      {
        title: "Navigate",
        links: [
          { label: "About Us",   href: "#about" },
          { label: "Services",   href: "#services" },
          { label: "Our Work",   href: "#gallery" },
          { label: "Contact",    href: "#contact" },
        ],
      },
      {
        title: "Services",
        links: [
          { label: "New Home Construction",  href: "#services" },
          { label: "Remodels & Renovations", href: "#services" },
          { label: "Additions & ADUs",       href: "#services" },
          { label: "Commercial Build-Outs",  href: "#services" },
          { label: "Kitchen & Bath",         href: "#services" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "info@apexgc.com",    href: "mailto:info@apexgc.com" },
          { label: "+1 (555) 700-0001",  href: "tel:+15557000001" },
          { label: "Denver, CO",         href: "#contact" },
        ],
      },
    ],
    social: [
      { platform: "facebook",  url: "https://facebook.com" },
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "youtube",   url: "https://youtube.com" },
    ],
    copyright: `© ${new Date().getFullYear()} Apex General Contractors. All rights reserved.`,
  },
} as const;

export type GCBrandConfig = typeof gcBrandConfig;
