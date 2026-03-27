"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  startTransition,
  ReactNode,
  useCallback,
} from "react";
import { brandConfig as configEN } from "@/config/brand.config";
import { supabase, formatAddress, formatPhone, type BrandRow, type BrandPhotoRow, type BrandCertificationRow } from "@/lib/supabase";
import { getPreset } from "@/config/presets";

export interface InitialBrandData {
  brand: BrandRow | null;
  photos: BrandPhotoRow[] | null;
  certifications: BrandCertificationRow[] | null;
}

// ── Language ──────────────────────────────────────────────────────────────────
export type Language = "en" | "es";

// ── Layout state — resolved at runtime from Supabase + preset ─────────────────
export interface LayoutState {
  preset: string;
  order: string[];
  sections: Record<string, boolean>;
  variants: Record<string, string>;
  widgets: string[];
}

// ── Theme state — resolved at runtime from Supabase + preset ──────────────────
export interface ThemeState {
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  radius: "sharp" | "rounded" | "pill";
  density: "compact" | "comfortable" | "spacious";
  font: { heading: string; body: string };
  mode: "light" | "dark" | "system";
}

// ── Brand content state ───────────────────────────────────────────────────────
export interface BrandState {
  company: {
    name: string;
    tagline: string;
    description: string;
    email: string;
    phone: string;
    address: string;
  };
  assets: {
    logo: {
      light: string;
      dark: string;
      favicon: string;
      icon: string | null;
      uploaded: string | null;
    };
    hero: {
      image: string;
      imageAlt: string;
    };
    aboutImage: string | null;
    afterImage: string | null;
    founderImage: string | null;
    partnerLogos: Array<{ name: string; url: string }>;
  };
  navigation: {
    links: Array<{ label: string; href: string }>;
    cta: { label: string; href: string };
  };
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stats: Array<{ value: string; label: string }>;
    scrollHint: string;
    overlayCard: {
      type?: "content" | "estimate-form";
      eyebrow: string;
      description: string;
      buttons: Array<{ label: string; href: string }>;
    };
  };
  trustBar: {
    headline: string;
    credentials: string[];
  };
  about: {
    headline: string;
    subheadline: string;
    description: string;
    values: Array<{ title: string; description: string }>;
  };
  services: {
    headline: string;
    subheadline: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  gallery: {
    headline: string;
    subheadline: string;
    tabs: { photos: string; videos: string };
    items: Array<{ image: string; title: string; category: string }>;
    videos: Array<{ videoUrl: string; title: string; category: string }>;
  };
  announcementBar: { cta: string };
  quoteModal: {
    title: string;
    subtitle: string;
    firstNameLabel: string;
    lastNameLabel: string;
    emailLabel: string;
    phoneLabel: string;
    servicesLabel: string;
    servicesPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
  };
  cta: {
    headline: string;
    subheadline: string;
    servicesLabel: string;
    getInTouchTitle: string;
    getInTouchDescription: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  footer: {
    description: string;
    columns: Array<{
      title: string;
      links: Array<{ label: string; href: string }>;
    }>;
    social: Array<{ platform: string; url: string }>;
    copyright: string;
  };
  certifications?: {
    headline: string;
    subheadline: string;
    items: Array<{
      name: string;
      logo: string;
      logoAlt: string;
      description: string;
    }>;
  } | null;
  harp?: {
    headline: string;
    subheadline: string;
    body: string;
    link: { label: string; href: string };
  } | null;
}

interface BrandContextType {
  brand: BrandState;
  layout: LayoutState;
  theme: ThemeState;
  language: Language;
  setLanguage: (lang: Language) => void;
  setCompanyName: (name: string) => void;
  setCompanyTagline: (tagline: string) => void;
  setCompanyEmail: (email: string) => void;
  setCompanyPhone: (phone: string) => void;
  setCompanyAddress: (address: string) => void;
  setUploadedLogo: (dataUrl: string | null) => void;
  updateBrand: (updates: Partial<BrandState>) => void;
  resetBrand: () => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

const STORAGE_KEY = "brand-sync-v2-config";
const LANGUAGE_KEY = "brand-sync-v2-language";
const CONFIG_VERSION_KEY = "brand-sync-v2-config-version";
const SCHEMA_VERSION = "1";

// ── Default layout/theme from the bold-craft preset ──────────────────────────
function getDefaultLayout(): LayoutState {
  const preset = getPreset("bold-craft");
  return {
    preset: "bold-craft",
    order: preset.layout.order,
    sections: { ...preset.layout.sections },
    variants: { ...preset.layout.variants },
    widgets: [...(preset.layout.widgets ?? [])],
  };
}

function getDefaultTheme(): ThemeState {
  const preset = getPreset("bold-craft");
  return {
    primaryColor: preset.theme.primaryColor ?? "oklch(0.7 0.15 260)",
    secondaryColor: preset.theme.secondaryColor,
    accentColor: preset.theme.accentColor,
    radius: preset.theme.radius ?? "rounded",
    density: preset.theme.density ?? "comfortable",
    font: preset.theme.font ?? { heading: "Inter", body: "Inter" },
    mode: preset.theme.mode ?? "system",
  };
}

function getInitialBrandState(): BrandState {
  const config = configEN;
  return {
    company: { ...config.company },
    assets: {
      logo: { ...config.assets.logo, icon: null, uploaded: null },
      hero: { ...config.assets.hero },
      aboutImage: null,
      afterImage: null,
      founderImage: null,
      partnerLogos: [...config.assets.partnerLogos],
    },
    navigation: JSON.parse(JSON.stringify(config.navigation)),
    hero: JSON.parse(JSON.stringify(config.hero)),
    trustBar: { ...config.trustBar, credentials: [...config.trustBar.credentials] },
    about: JSON.parse(JSON.stringify(config.about)),
    services: JSON.parse(JSON.stringify(config.services)),
    gallery: JSON.parse(JSON.stringify(config.gallery)),
    announcementBar: { ...config.announcementBar },
    quoteModal: { ...config.quoteModal },
    cta: JSON.parse(JSON.stringify(config.cta)),
    footer: JSON.parse(JSON.stringify(config.footer)),
    // Optional roofer-pro sections
    certifications: (config as Record<string, unknown>).certifications
      ? JSON.parse(JSON.stringify((config as Record<string, unknown>).certifications))
      : null,
    harp: (config as Record<string, unknown>).harp
      ? JSON.parse(JSON.stringify((config as Record<string, unknown>).harp))
      : null,
  };
}

function getHydratedState(): { lang: Language; brand: BrandState } {
  if (typeof window === "undefined") {
    return { lang: "en", brand: getInitialBrandState() };
  }

  const storedLang = (localStorage.getItem(LANGUAGE_KEY) as Language) || "en";
  const storedVersion = localStorage.getItem(CONFIG_VERSION_KEY);

  if (storedVersion !== SCHEMA_VERSION) {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(CONFIG_VERSION_KEY, SCHEMA_VERSION);
    return { lang: storedLang, brand: getInitialBrandState() };
  }

  const initial = getInitialBrandState();
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return {
        lang: storedLang,
        brand: {
          ...initial,
          assets: {
            ...initial.assets,
            logo: {
              ...initial.assets.logo,
              uploaded: parsed.assets?.logo?.uploaded || null,
            },
          },
        },
      };
    } catch {
      // ignore parse errors
    }
  }

  return { lang: storedLang, brand: initial };
}

function buildStateFromDBRows(
  dbBrand: BrandRow | null,
  dbPhotos: BrandPhotoRow[] | null,
  dbCertifications: BrandCertificationRow[] | null,
  language: Language = "en",
): { brand: BrandState; layout: LayoutState; theme: ThemeState } {
  let resolvedLayout = getDefaultLayout();
  let resolvedTheme = getDefaultTheme();
  let resolvedBrand = getInitialBrandState();

  if (dbBrand?.layout !== undefined) {
    const presetName = dbBrand.layout?.preset ?? "bold-craft";
    const preset = getPreset(presetName);
    resolvedLayout = {
      preset: presetName,
      order: dbBrand.layout?.order ?? preset.layout.order,
      sections: { ...preset.layout.sections, ...(dbBrand.layout?.sections ?? {}) },
      variants: { ...preset.layout.variants, ...(dbBrand.layout?.overrides ?? {}) },
      widgets: dbBrand.layout?.widgets ?? preset.layout.widgets ?? [],
    };
  }

  if (dbBrand?.theme !== undefined || dbBrand?.layout !== undefined) {
    const presetName = dbBrand?.layout?.preset ?? "bold-craft";
    const preset = getPreset(presetName);
    resolvedTheme = {
      primaryColor: dbBrand?.theme?.primaryColor ?? preset.theme.primaryColor ?? "oklch(0.7 0.15 260)",
      secondaryColor: dbBrand?.theme?.secondaryColor ?? preset.theme.secondaryColor,
      accentColor: dbBrand?.theme?.accentColor ?? preset.theme.accentColor,
      radius: dbBrand?.theme?.radius ?? preset.theme.radius ?? "rounded",
      density: dbBrand?.theme?.density ?? preset.theme.density ?? "comfortable",
      font: dbBrand?.theme?.font ?? preset.theme.font ?? { heading: "Inter", body: "Inter" },
      mode: dbBrand?.theme?.mode ?? preset.theme.mode ?? "system",
    };
  }

  if (dbBrand) {
    resolvedBrand.company = {
      ...resolvedBrand.company,
      ...(dbBrand.name && { name: dbBrand.name }),
      ...(dbBrand.tagline && { tagline: dbBrand.tagline }),
      ...(dbBrand.email && { email: dbBrand.email }),
      ...(dbBrand.phone && { phone: dbBrand.phone }),
      ...(dbBrand.address &&
        Object.keys(dbBrand.address).length > 0 && {
          address: formatAddress(dbBrand.address),
        }),
    };

    if (dbBrand.about_us && language === "en") {
      resolvedBrand.about = { ...resolvedBrand.about, description: dbBrand.about_us };
    }

    const variants = dbBrand.logo_variants ?? {};
    const primaryUrl = variants.primary ?? variants.light ?? dbBrand.logo_url;
    const faviconUrl = variants.favicon ?? dbBrand.icon_url ?? null;
    resolvedBrand.assets = {
      ...resolvedBrand.assets,
      logo: {
        ...resolvedBrand.assets.logo,
        ...(primaryUrl && { light: primaryUrl }),
        ...(variants.dark && { dark: variants.dark }),
        ...(faviconUrl && { favicon: faviconUrl }),
        ...(dbBrand.icon_url && { icon: dbBrand.icon_url }),
      },
      ...(dbBrand.hero_image_url && {
        hero: { ...resolvedBrand.assets.hero, image: dbBrand.hero_image_url },
      }),
      ...(dbBrand.about_image_url && { aboutImage: dbBrand.about_image_url }),
      ...(dbBrand.after_image_url && { afterImage: dbBrand.after_image_url }),
      ...(dbBrand.founder_image_url && { founderImage: dbBrand.founder_image_url }),
    };

    const footerUpdate = { ...resolvedBrand.footer };
    if (dbBrand.social_links && dbBrand.social_links.length > 0) {
      footerUpdate.social = dbBrand.social_links.map(({ platform, url }) => ({ platform, url }));
    }
    if (dbBrand.tagline) footerUpdate.description = dbBrand.tagline;
    if (dbBrand.name) {
      footerUpdate.copyright = `\u00a9 ${new Date().getFullYear()} ${dbBrand.name}. All rights reserved.`;
    }
    const contactLinks: Array<{ label: string; href: string }> = [];
    if (dbBrand.email) contactLinks.push({ label: dbBrand.email, href: `mailto:${dbBrand.email}` });
    if (dbBrand.phone) contactLinks.push({
      label: formatPhone(dbBrand.phone),
      href: `tel:${dbBrand.phone.replace(/\D/g, "")}`,
    });
    if (dbBrand.address && Object.keys(dbBrand.address).length > 0) {
      const addrStr = formatAddress(dbBrand.address);
      if (addrStr) contactLinks.push({ label: addrStr, href: "#contact" });
    }
    if (contactLinks.length > 0) {
      footerUpdate.columns = resolvedBrand.footer.columns.map((col) => {
        const isContactCol = col.links.some(
          (l) => l.href.startsWith("mailto:") || l.href.startsWith("tel:")
        );
        return isContactCol ? { ...col, links: contactLinks } : col;
      });
    }
    resolvedBrand.footer = footerUpdate;
  }

  if (dbPhotos && dbPhotos.length > 0) {
    resolvedBrand = {
      ...resolvedBrand,
      gallery: {
        ...resolvedBrand.gallery,
        items: dbPhotos.map((p) => ({
          image: p.url,
          title: p.caption ?? p.alt_text ?? "",
          category: "",
        })),
      },
    };
  }

  if (dbCertifications && dbCertifications.length > 0) {
    resolvedBrand = {
      ...resolvedBrand,
      certifications: {
        headline: resolvedBrand.certifications?.headline ?? "Certified. Credentialed.",
        subheadline: resolvedBrand.certifications?.subheadline ?? "",
        items: dbCertifications.map((c) => ({
          name: c.name,
          logo: c.logo_url ?? "",
          logoAlt: c.logo_alt ?? c.name,
          description: c.description ?? "",
        })),
      },
    };
  }

  if (dbBrand?.harp) {
    resolvedBrand = { ...resolvedBrand, harp: dbBrand.harp };
  }

  return { brand: resolvedBrand, layout: resolvedLayout, theme: resolvedTheme };
}

export function BrandProvider({ children, initialData }: { children: ReactNode; initialData?: InitialBrandData | null }) {
  const hydratedRef = useRef(false);
  const [language, setLanguageState] = useState<Language>("en");
  const [brand, setBrand] = useState<BrandState>(() =>
    initialData
      ? buildStateFromDBRows(initialData.brand, initialData.photos, initialData.certifications).brand
      : getInitialBrandState()
  );
  const [layout, setLayout] = useState<LayoutState>(() =>
    initialData
      ? buildStateFromDBRows(initialData.brand, initialData.photos, initialData.certifications).layout
      : getDefaultLayout()
  );
  const [theme, setTheme] = useState<ThemeState>(() =>
    initialData
      ? buildStateFromDBRows(initialData.brand, initialData.photos, initialData.certifications).theme
      : getDefaultTheme()
  );
  const [isHydrated, setIsHydrated] = useState(() => !!initialData);

  // Hydrate from localStorage after mount
  useEffect(() => {
    if (hydratedRef.current) return;
    hydratedRef.current = true;

    if (initialData) {
      // Server data is already correct — just restore user-uploaded logo from localStorage
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const uploaded = parsed.assets?.logo?.uploaded || null;
          if (uploaded) {
            setBrand((prev) => ({
              ...prev,
              assets: { ...prev.assets, logo: { ...prev.assets.logo, uploaded } },
            }));
          }
        }
      } catch {}
      return;
    }

    const state = getHydratedState();
    startTransition(() => {
      setLanguageState(state.lang);
      setBrand(state.brand);
      setIsHydrated(true);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch from Supabase and merge over defaults
  // Priority: Supabase DB > localStorage (uploaded logo) > static config
  useEffect(() => {
    if (!isHydrated) return;

    const userId = process.env.NEXT_PUBLIC_BRAND_USER_ID;
    if (!userId) return;

    async function fetchFromSupabase() {
      const [{ data: dbBrand }, { data: dbPhotos }, { data: dbCertifications }] = await Promise.all([
        supabase
          .from("brands")
          .select("*")
          .eq("user_id", userId)
          .single<BrandRow>(),
        supabase
          .from("brand_photos")
          .select("*")
          .eq("user_id", userId)
          .order("sort_order")
          .returns<BrandPhotoRow[]>(),
        supabase
          .from("brand_certifications")
          .select("*")
          .eq("user_id", userId)
          .order("sort_order")
          .returns<BrandCertificationRow[]>(),
      ]);

      if (!dbBrand && !dbPhotos) return;

      // ── Resolve layout from DB + preset ───────────────────────────────────
      if (dbBrand?.layout !== undefined) {
        const presetName = dbBrand.layout?.preset ?? "bold-craft";
        const preset = getPreset(presetName);
        setLayout({
          preset: presetName,
          order: dbBrand.layout?.order ?? preset.layout.order,
          sections: { ...preset.layout.sections, ...(dbBrand.layout?.sections ?? {}) },
          variants: { ...preset.layout.variants, ...(dbBrand.layout?.overrides ?? {}) },
          widgets: dbBrand.layout?.widgets ?? preset.layout.widgets ?? [],
        });
      }

      // ── Resolve theme from DB + preset ────────────────────────────────────
      if (dbBrand?.theme !== undefined || dbBrand?.layout !== undefined) {
        const presetName = dbBrand?.layout?.preset ?? "bold-craft";
        const preset = getPreset(presetName);
        setTheme({
          primaryColor: dbBrand?.theme?.primaryColor ?? preset.theme.primaryColor ?? "oklch(0.7 0.15 260)",
          radius: dbBrand?.theme?.radius ?? preset.theme.radius ?? "rounded",
          density: dbBrand?.theme?.density ?? preset.theme.density ?? "comfortable",
          font: dbBrand?.theme?.font ?? preset.theme.font ?? { heading: "Inter", body: "Inter" },
          mode: dbBrand?.theme?.mode ?? preset.theme.mode ?? "system",
        });
      }

      // ── Merge brand content ───────────────────────────────────────────────
      if (dbBrand) {
        setBrand((prev) => {
          const next = { ...prev };

          // Company info
          next.company = {
            ...prev.company,
            ...(dbBrand.name && { name: dbBrand.name }),
            ...(dbBrand.tagline && { tagline: dbBrand.tagline }),
            ...(dbBrand.email && { email: dbBrand.email }),
            ...(dbBrand.phone && { phone: dbBrand.phone }),
            ...(dbBrand.address &&
              Object.keys(dbBrand.address).length > 0 && {
                address: formatAddress(dbBrand.address),
              }),
          };

          // About Us (English only)
          if (dbBrand.about_us && language === "en") {
            next.about = { ...prev.about, description: dbBrand.about_us };
          }

          // Logo variants
          const variants = dbBrand.logo_variants ?? {};
          const primaryUrl = variants.primary ?? variants.light ?? dbBrand.logo_url;
          const faviconUrl = variants.favicon ?? dbBrand.icon_url ?? null;
          next.assets = {
            ...prev.assets,
            logo: {
              ...prev.assets.logo,
              ...(primaryUrl && { light: primaryUrl }),
              ...(variants.dark && { dark: variants.dark }),
              ...(faviconUrl && { favicon: faviconUrl }),
              ...(dbBrand.icon_url && { icon: dbBrand.icon_url }),
            },
            ...(dbBrand.about_image_url && { aboutImage: dbBrand.about_image_url }),
      ...(dbBrand.after_image_url && { afterImage: dbBrand.after_image_url }),
      ...(dbBrand.founder_image_url && { founderImage: dbBrand.founder_image_url }),
            ...(dbBrand.hero_image_url && {
              hero: { ...prev.assets.hero, image: dbBrand.hero_image_url },
            }),
          };

          // Footer: social + description + copyright + contact column
          {
            const footerUpdate = { ...prev.footer };

            if (dbBrand.social_links && dbBrand.social_links.length > 0) {
              footerUpdate.social = dbBrand.social_links.map(({ platform, url }) => ({ platform, url }));
            }

            if (dbBrand.tagline) {
              footerUpdate.description = dbBrand.tagline;
            }

            if (dbBrand.name) {
              footerUpdate.copyright = `\u00a9 ${new Date().getFullYear()} ${dbBrand.name}. All rights reserved.`;
            }

            const contactLinks: Array<{ label: string; href: string }> = [];
            if (dbBrand.email) {
              contactLinks.push({ label: dbBrand.email, href: `mailto:${dbBrand.email}` });
            }
            if (dbBrand.phone) {
              contactLinks.push({
                label: formatPhone(dbBrand.phone),
                href: `tel:${dbBrand.phone.replace(/\D/g, "")}`,
              });
            }
            if (dbBrand.address && Object.keys(dbBrand.address).length > 0) {
              const addrStr = formatAddress(dbBrand.address);
              if (addrStr) contactLinks.push({ label: addrStr, href: "#contact" });
            }
            if (contactLinks.length > 0) {
              footerUpdate.columns = prev.footer.columns.map((col) => {
                const isContactCol = col.links.some(
                  (l) => l.href.startsWith("mailto:") || l.href.startsWith("tel:")
                );
                return isContactCol ? { ...col, links: contactLinks } : col;
              });
            }

            next.footer = footerUpdate;
          }

          return next;
        });
      }

      // Photo gallery
      if (dbPhotos && dbPhotos.length > 0) {
        setBrand((prev) => ({
          ...prev,
          gallery: {
            ...prev.gallery,
            items: dbPhotos.map((p) => ({
              image: p.url,
              title: p.caption ?? p.alt_text ?? "",
              category: "",
            })),
          },
        }));
      }

      // Certifications (from brand_certifications table)
      if (dbCertifications && dbCertifications.length > 0) {
        setBrand((prev) => ({
          ...prev,
          certifications: {
            headline: prev.certifications?.headline ?? "Certified. Credentialed.",
            subheadline: prev.certifications?.subheadline ?? "",
            items: dbCertifications.map((c) => ({
              name: c.name,
              logo: c.logo_url ?? "",
              logoAlt: c.logo_alt ?? c.name,
              description: c.description ?? "",
            })),
          },
        }));
      }

      // HARP (from brands.harp JSONB column)
      if (dbBrand?.harp) {
        setBrand((prev) => ({
          ...prev,
          harp: dbBrand.harp,
        }));
      }
    }

    fetchFromSupabase();
  }, [isHydrated, language]);

  // Save customizations (uploaded logo only) to localStorage
  useEffect(() => {
    if (isHydrated) {
      const customizations = {
        assets: { logo: { uploaded: brand.assets.logo.uploaded } },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customizations));
    }
  }, [brand, isHydrated]);

  const setLanguage = useCallback(
    (lang: Language) => {
      setLanguageState(lang);
      localStorage.setItem(LANGUAGE_KEY, lang);
      localStorage.setItem(CONFIG_VERSION_KEY, SCHEMA_VERSION);
      const uploadedLogo = brand.assets.logo.uploaded;
      const newState = getInitialBrandState();
      newState.assets.logo.uploaded = uploadedLogo;
      setBrand(newState);
    },
    [brand.assets.logo.uploaded]
  );

  const setCompanyName = (name: string) =>
    setBrand((prev) => ({ ...prev, company: { ...prev.company, name } }));

  const setCompanyTagline = (tagline: string) =>
    setBrand((prev) => ({ ...prev, company: { ...prev.company, tagline } }));

  const setCompanyEmail = (email: string) =>
    setBrand((prev) => ({ ...prev, company: { ...prev.company, email } }));

  const setCompanyPhone = (phone: string) =>
    setBrand((prev) => ({ ...prev, company: { ...prev.company, phone } }));

  const setCompanyAddress = (address: string) =>
    setBrand((prev) => ({ ...prev, company: { ...prev.company, address } }));

  const setUploadedLogo = (dataUrl: string | null) =>
    setBrand((prev) => ({
      ...prev,
      assets: { ...prev.assets, logo: { ...prev.assets.logo, uploaded: dataUrl } },
    }));

  const updateBrand = (updates: Partial<BrandState>) =>
    setBrand((prev) => ({ ...prev, ...updates }));

  const resetBrand = () => {
    setBrand(getInitialBrandState());
    setLayout(getDefaultLayout());
    setTheme(getDefaultTheme());
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(CONFIG_VERSION_KEY, SCHEMA_VERSION);
  };

  return (
    <BrandContext.Provider
      value={{
        brand,
        layout,
        theme,
        language,
        setLanguage,
        setCompanyName,
        setCompanyTagline,
        setCompanyEmail,
        setCompanyPhone,
        setCompanyAddress,
        setUploadedLogo,
        updateBrand,
        resetBrand,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
}
