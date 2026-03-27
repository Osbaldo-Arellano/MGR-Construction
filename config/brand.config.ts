// ============================================
// BRAND CONFIG — FALLBACK SEED
// ============================================
// This file is the default fallback when no Supabase row exists.
// For new deployments, populate the Supabase `brands` table instead
// of editing this file directly.
// ============================================

export const brandConfig = {
  // ============================================
  // COMPANY INFO
  // ============================================
company: {
    name: "MGR Construction LLC",
    tagline: "Transforming Properties With Stunning Solutions",
    description:
      "Welcome to MGR Construction LLC, your trusted partner in exceptional construction services in Oregon. With a rich history spanning over two decades, we have mastered the art of transforming spaces into functional and aesthetically pleasing structures. Our dedication to quality craftsmanship and customer satisfaction has been the driving force behind our success.",
    email: "mcr.construction75@gmail.com",
    phone: "971-600-6445",
    phone2: "971-316-9918",
    address: "Oregon",
    serviceArea: "120+ miles around Oregon",
    hours: "Monday – Saturday, 7:00 AM – 7:00 PM",
  },

  assets: {
    logo: {
      light: "/mgr/logo-light.svg",   // replace with Supabase Storage URL
      dark: "/mgr/logo-dark.svg",     // replace with Supabase Storage URL
      favicon: "/favicon.ico",        // replace with Supabase Storage URL
    },
    hero: {
      image: "/mgr/hero.jpg",         // replace with client hero photo
      imageAlt: "MGR Construction LLC — Siding, roofing, and exterior renovation in Oregon",
    },
    partnerLogos: [
      // Add credential/partner logos here as they become available
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
    headline: "Transforming Properties With Stunning Solutions",
    subheadline:
      "MGR Construction LLC has been delivering exceptional siding, roofing, painting, windows, and doors services across Oregon and 120+ miles beyond for over 20 years. Licensed, insured, and 100% on time.",
    primaryCta: {
      label: "Get a Free Estimate",
      href: "#contact",
    },
    secondaryCta: {
      label: "See Our Work",
      href: "#gallery",
    },
    stats: [
      { value: "20+",  label: "Years of Experience" },
      { value: "120+", label: "Miles Around Oregon" },
      { value: "100%", label: "On Time" },
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
    headline: "Trusted across the region for over 20 years",
    credentials: [
      "20+ Years of Experience",
      "120+ Mile Service Area",
      "Free Estimates",
    ],
  },

  about: {
    headline: "A Little About Us",
    subheadline: "Painting Perfection For Spaces That Inspire.",
    description:
      "20 years of high-quality, reliable construction in Oregon — setting us apart.",
    values: [
      {
        title: "20+ Years of Proven Expertise",
        description:
          "Two decades of hands-on experience across siding, roofing, painting, windows, and doors — serving homeowners and commercial clients throughout the Pacific Northwest.",
      },
      {
        title: "120+ Mile Service Area",
        description:
          "Based in Oregon, we serve clients across a 120+ mile radius. Wherever your property is, our team shows up on time and fully equipped.",
      },
      {
        title: "Quality That Stands the Test of Time",
        description:
          "Our team of seasoned professionals uses the latest technologies and applies their extensive knowledge to deliver results that last. Whether it's a minor repair or a major renovation — precision and professionalism every time.",
      },
    ],
  },

  services: {
    headline: "Our Services",
    subheadline:
      "From curb appeal to structural protection — MGR Construction handles the full exterior of your property.",
    items: [
      {
        icon: "Layers",
        title: "Siding Installation",
        description:
          "Bring an aesthetic appeal and lasting durability to your property with our exceptional siding installation services at MGR Construction LLC. We understand the importance of quality materials and expert craftsmanship in protecting and beautifying your home or business.",
      },
      {
        icon: "Home",
        title: "Roofing Services",
        description:
          "Keep your property safe and secure with our comprehensive roofing services. At MGR Construction LLC, we understand the importance of a sturdy, well-maintained roof — and we bring the expertise to install, repair, and restore it right.",
      },
      {
        icon: "Paintbrush",
        title: "Painting Services",
        description:
          "Revitalize your property with our professional painting services. A fresh coat of paint can dramatically transform the look and feel of your space, adding value and making a lasting impression. Our team delivers a flawless finish every time.",
      },
      {
        icon: "Square",
        title: "Windows Installation",
        description:
          "Enhance your property's appearance and improve energy efficiency with our windows installation services. Windows play a critical role in any structure — bringing in light, reducing energy costs, and elevating the overall look of your property.",
      },
      {
        icon: "DoorOpen",
        title: "Doors Installation",
        description:
          "Secure and beautify your property with our professional doors installation services. A door does more than just provide access — it's a key component of your property's security, energy efficiency, and curb appeal.",
      },
    ],
  },

  gallery: {
    headline: "Our Work",
    subheadline:
      "Siding, roofing, painting, windows, and doors projects across Oregon and beyond.",
    tabs: {
      photos: "Photos",
      videos: "Videos",
    },
    // Replace with real client photos when available
    // First item = "After" (finished), Second item = "Before" (old/damaged)
    items: [
      { image: "/mgr/gallery/siding-complete.jpg",    title: "Siding Installation — Complete",        category: "Siding" },
      { image: "/mgr/gallery/siding-before.jpg",      title: "Siding Before Replacement",             category: "Siding" },
      { image: "/mgr/gallery/roofing-complete.jpg",   title: "Roofing — Complete",                    category: "Roofing" },
      { image: "/mgr/gallery/painting-exterior.jpg",  title: "Exterior Painting — Complete",          category: "Painting" },
      { image: "/mgr/gallery/windows-install.jpg",    title: "Windows Installation",                  category: "Windows" },
      { image: "/mgr/gallery/doors-install.jpg",      title: "Doors Installation",                    category: "Doors" },
    ],
    videos: [],
  },

  announcementBar: {
    cta: "Serving 120+ miles around Oregon — Mon–Sat, 7 AM to 7 PM. Call 971-600-6445 →",
  },

  quoteModal: {
    title: "Get a Free Estimate",
    subtitle: "Tell us about your project and we'll get back to you as soon as possible.",
    firstNameLabel: "Name",
    lastNameLabel: "Last Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    servicesLabel: "Select The Service You Need",
    servicesPlaceholder: "Select a service...",
    contactMethodLabel: "Best Way To Contact You",
    contactMethodOptions: ["Phone", "Email"],
    messageLabel: "Message",
    messagePlaceholder: "Tell us about your project...",
    submitLabel: "Request Free Estimate",
    submittingLabel: "Sending...",
    successTitle: "Request Sent!",
    successMessage: "We'll reach out shortly to discuss your project.",
    sendAnother: "Submit Another Request",
  },

  cta: {
    headline: "Windows that Illuminate and Elevate Your Property",
    subheadline:
      "From residential to commercial projects, our skilled team brings precision, expertise, and a keen eye for detail to every job.",
    servicesLabel: "Service Needed",
    getInTouchTitle: "Get in Touch",
    getInTouchDescription:
      "We approach every project with a commitment to providing high-quality work that exceeds expectations. With MGR Construction LLC, rest assured your construction needs are in expert hands.",
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
      "At MGR Construction LLC, we believe in the power of hard work, expertise, and innovative solutions. Our team of seasoned professionals uses the latest technologies and applies their extensive knowledge to deliver results that stand the test of time.",
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
          { label: "Siding Installation",  href: "#services" },
          { label: "Roofing Services",     href: "#services" },
          { label: "Painting Services",    href: "#services" },
          { label: "Windows Installation", href: "#services" },
          { label: "Doors Installation",   href: "#services" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "mcr.construction75@gmail.com", href: "mailto:mcr.construction75@gmail.com" },
          { label: "971-600-6445",                 href: "tel:+19716006445" },
          { label: "971-316-9918",                 href: "tel:+19713169918" },
          { label: "Oregon",                 href: "#contact" },
        ],
      },
    ],
    social: [
      { platform: "facebook",  url: "https://facebook.com" },   // replace with real URL
      { platform: "instagram", url: "https://instagram.com" },  // replace with real URL
      { platform: "tiktok",    url: "https://tiktok.com" },     // replace with real URL
      { platform: "twitter",   url: "https://twitter.com" },    // replace with real URL
    ],
    copyright: `© ${new Date().getFullYear()} MGR Construction LLC. All rights reserved.`,
  },
} as const;

export type BrandConfig = typeof brandConfig;
