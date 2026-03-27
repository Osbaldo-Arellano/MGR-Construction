import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BrandProvider } from "@/contexts/brand-context";
import type { InitialBrandData } from "@/contexts/brand-context";
import { ThemeInjector } from "@/components/theme-injector";
import { ScrollBackground } from "@/components/scroll-background";
import { HashScrollFix } from "@/components/hash-scroll-fix";
import { ScrollToTop } from "@/components/scroll-to-top";
import { WidgetRenderer } from "@/components/widget-renderer";
import { createClient } from "@supabase/supabase-js";
import type { BrandRow, BrandPhotoRow, BrandCertificationRow } from "@/lib/supabase";
import { getPreset } from "@/config/presets";

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

let SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

async function fetchServerBrandData(): Promise<{
  initialData: InitialBrandData;
  primaryColor: string;
  secondaryColor?: string;
  accentColor?: string;
  mode: "light" | "dark" | "system";
} | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const userId = process.env.NEXT_PUBLIC_BRAND_USER_ID;
  if (!supabaseUrl || !supabaseKey || !userId) return null;

  try {
    const client = createClient(supabaseUrl, supabaseKey);
    const [{ data: brand }, { data: photos }, { data: certifications }] = await Promise.all([
      client.from("brands").select("*").eq("user_id", userId).single<BrandRow>(),
      client.from("brand_photos").select("*").eq("user_id", userId).order("sort_order").returns<BrandPhotoRow[]>(),
      client.from("brand_certifications").select("*").eq("user_id", userId).order("sort_order").returns<BrandCertificationRow[]>(),
    ]);

    // Resolve colors and mode from theme + preset
    const presetName = brand?.layout?.preset ?? "bold-craft";
    const preset = getPreset(presetName);
    const primaryColor = brand?.theme?.primaryColor ?? preset.theme.primaryColor ?? "oklch(0.7 0.15 260)";
    const secondaryColor = brand?.theme?.secondaryColor ?? preset.theme.secondaryColor;
    const accentColor = brand?.theme?.accentColor ?? preset.theme.accentColor;
    const mode = brand?.theme?.mode ?? preset.theme.mode ?? "system";

    return {
      initialData: {
        brand: brand ?? null,
        photos: photos ?? null,
        certifications: certifications ?? null,
      },
      primaryColor,
      secondaryColor,
      accentColor,
      mode: mode as "light" | "dark" | "system",
    };
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  let faviconUrl = "/favicon.ico";
  let siteName = "BrandSync";
  let siteDescription = "Professional services tailored for your needs.";

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const userId = process.env.NEXT_PUBLIC_BRAND_USER_ID;

  if (supabaseUrl && supabaseKey && userId) {
    try {
      const client = createClient(supabaseUrl, supabaseKey);
      const { data } = await client
        .from("brands")
        .select("name, tagline, logo_variants, icon_url, logo_url, website_url")
        .eq("user_id", userId)
        .single();

      if (data?.name) siteName = data.name;
      if (data?.tagline) siteDescription = data.tagline;
      if (data?.website_url) SITE_URL = data.website_url;
      const variants = data?.logo_variants ?? {};
      const remote = data?.icon_url ?? variants.favicon ?? variants.primary ?? variants.light ?? data?.logo_url ?? null;
      if (remote) faviconUrl = remote;
    } catch {
      // fall back to defaults
    }
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName,
      title: siteName,
      description: siteDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverData = await fetchServerBrandData();
  const primaryColor = serverData?.primaryColor ?? "oklch(0.7 0.15 260)";
  const secondaryColor = serverData?.secondaryColor;
  const accentColor = serverData?.accentColor;
  const mode = serverData?.mode ?? "system";
  const defaultTheme = mode === "system" ? "system" : mode;

  return (
    <html lang="en" suppressHydrationWarning className={mode === "dark" ? "dark" : "light"}>
      <head>
        {/* Inject brand colors before paint to eliminate color flash */}
        <style dangerouslySetInnerHTML={{ __html: [
          `:root { --primary: ${primaryColor};`,
          secondaryColor ? ` --brand-secondary: ${secondaryColor};` : "",
          accentColor    ? ` --brand-accent: ${accentColor};`       : "",
          ` }`,
        ].join("") }} />
      </head>
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme={defaultTheme}
          enableSystem={false}
          disableTransitionOnChange
        >
          <BrandProvider initialData={serverData?.initialData}>
            <ThemeInjector />
            <ScrollBackground />
            <HashScrollFix />
            {children}
            <ScrollToTop />
            <WidgetRenderer />
          </BrandProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
