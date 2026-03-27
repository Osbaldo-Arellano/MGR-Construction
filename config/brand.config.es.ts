/**
 * Spanish fallback seed for BrandSync V2.
 * This file is only used when language === "es" and no Supabase data is available.
 * It should NOT be edited per deployment — all content overrides come from Supabase.
 */
export const brandConfig = {
  // ============================================
  // COMPANY INFO
  // ============================================
  company: {
    name: "BrandSync",
    tagline: "Servicios profesionales adaptados a tus necesidades.",
    description: "Servicios de calidad con integridad.",
    email: "info@example.com",
    phone: "+1 (555) 000-0000",
    address: "Tu ciudad, Estado",
    city: "Tu ciudad",
  },

  // ============================================
  // BRAND ASSETS
  // ============================================
  assets: {
    logo: {
      light: "/logoSmall.svg",
      dark: "/whiteLogo.svg",
      favicon: "/favicon.ico",
    },
    hero: {
      image: "/pnw.jpg",
      imageAlt: "Nuestro equipo en acción",
    },
    partnerLogos: [] as Array<{ name: string; url: string }>,
  },

  // ============================================
  // NAVIGATION
  // ============================================
  navigation: {
    links: [
      { label: "Nosotros", href: "#about" },
      { label: "Servicios", href: "#services" },
      { label: "Nuestro Trabajo", href: "#gallery" },
      { label: "Contacto", href: "#contact" },
    ],
    cta: { label: "Cotización Gratis", href: "#contact" },
  },

  // ============================================
  // HERO SECTION
  // ============================================
  hero: {
    headline: "Servicio Profesional Para Tu Negocio",
    subheadline: "Soluciones de calidad adaptadas a tus necesidades. Sin atajos. Sin sorpresas.",
    primaryCta: { label: "Cotización Gratis", href: "#contact" },
    secondaryCta: { label: "Ver Nuestro Trabajo", href: "#gallery" },
    stats: [
      { value: "500+", label: "Clientes Satisfechos" },
      { value: "10+", label: "Años de Experiencia" },
      { value: "100%", label: "Garantía de Satisfacción" },
    ],
    scrollHint: "Desliza para más",
    overlayCard: {
      eyebrow: "Por Qué Elegirnos",
      description: "Tu proveedor de confianza — con licencia, asegurado y especializado en servicio de calidad. Ofrecemos trabajo limpio, eficiente y honesto.",
      buttons: [
        { label: "Más Sobre Nosotros", href: "#about" },
        { label: "Contáctanos", href: "#contact" },
      ],
    },
  },

  // ============================================
  // TRUST BAR
  // ============================================
  trustBar: {
    headline: "De confianza en nuestra comunidad",
    credentials: ["Licenciado", "Asegurado", "Certificado", "Garantizado"],
  },

  // ============================================
  // ABOUT US SECTION
  // ============================================
  about: {
    headline: "Quiénes Somos",
    subheadline: "Servicio de calidad. Valores familiares. Construido con trabajo duro.",
    description: "Somos un negocio local comprometido con la excelencia. Nos enorgullecemos de hacer el trabajo bien desde la primera vez, con honestidad y profesionalismo en cada proyecto.",
    values: [
      {
        title: "Nuestra Misión",
        description: "Proveer servicios de alta calidad a un precio justo — sin tomar atajos.",
      },
      {
        title: "Experiencia",
        description: "Años de experiencia práctica y educación continua nos permiten ofrecer los mejores resultados.",
      },
      {
        title: "Nuestros Valores",
        description: "Trabajo duro, honestidad y respeto. Llegamos a tiempo y respaldamos todo lo que hacemos.",
      },
    ],
  },

  // ============================================
  // SERVICES SECTION
  // ============================================
  services: {
    headline: "Nuestros Servicios",
    subheadline: "Soluciones completas adaptadas a tus necesidades.",
    items: [
      { icon: "Briefcase", title: "Consultoría", description: "Asesoramiento experto para ayudarte a tomar las mejores decisiones para tu negocio." },
      { icon: "Wrench", title: "Mantenimiento", description: "Servicio de mantenimiento preventivo y correctivo para mantener tu operación funcionando." },
      { icon: "Shield", title: "Seguridad", description: "Soluciones de seguridad integrales para proteger tu negocio y tranquilidad." },
    ],
  },

  // ============================================
  // GALLERY SECTION
  // ============================================
  gallery: {
    headline: "Nuestro Trabajo",
    subheadline: "Un vistazo a nuestros proyectos recientes.",
    tabs: { photos: "Fotos", videos: "Videos" },
    items: [] as Array<{ image: string; title: string; category: string }>,
    videos: [] as Array<{ videoUrl: string; title: string; category: string }>,
  },

  // ============================================
  // ANNOUNCEMENT BAR
  // ============================================
  announcementBar: {
    cta: "Cotización Gratis AQUÍ",
  },

  // ============================================
  // QUOTE MODAL
  // ============================================
  quoteModal: {
    title: "Solicitar Cotización Gratis",
    subtitle: "Cuéntanos sobre tu proyecto y te responderemos en 24 horas.",
    firstNameLabel: "Nombre",
    lastNameLabel: "Apellido",
    emailLabel: "Correo Electrónico",
    phoneLabel: "Teléfono (Opcional)",
    servicesLabel: "Servicios Necesarios",
    servicesPlaceholder: "Seleccionar servicios...",
    messageLabel: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tu proyecto...",
    submitLabel: "Solicitar Cotización",
    submittingLabel: "Enviando...",
    successTitle: "¡Solicitud Enviada!",
    successMessage: "Te responderemos en 24 horas.",
    sendAnother: "Enviar Otra Solicitud",
  },

  // ============================================
  // CTA / CONTACT SECTION
  // ============================================
  cta: {
    headline: "¿Listo para Empezar?",
    subheadline: "Obtén una cotización gratis hoy. Estamos aquí para ayudarte.",
    servicesLabel: "Servicios Necesarios",
    getInTouchTitle: "Ponte en Contacto",
    getInTouchDescription: "¿Tienes alguna pregunta o quieres trabajar juntos? Llena el formulario y te responderemos lo antes posible.",
    primaryCta: { label: "Solicitar Cotización Gratis", href: "#contact" },
    secondaryCta: { label: "Ver Nuestro Trabajo", href: "#gallery" },
  },

  // ============================================
  // FOOTER
  // ============================================
  footer: {
    description: "Servicios profesionales de calidad sirviendo a nuestra comunidad.",
    columns: [
      {
        title: "Navegación",
        links: [
          { label: "Nosotros", href: "#about" },
          { label: "Servicios", href: "#services" },
          { label: "Nuestro Trabajo", href: "#gallery" },
          { label: "Contacto", href: "#contact" },
        ],
      },
      {
        title: "Contacto",
        links: [
          { label: "info@example.com", href: "mailto:info@example.com" },
          { label: "+1 (555) 000-0000", href: "tel:+15550000000" },
        ],
      },
    ],
    social: [] as Array<{ platform: string; url: string }>,
    copyright: `© ${new Date().getFullYear()} BrandSync. Todos los derechos reservados.`,
  },
} as const;

export type BrandConfigES = typeof brandConfig;
