"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Settings } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useBrand } from "@/contexts/brand-context";
import { useMounted } from "@/hooks/use-mounted";

export function NavbarDefault() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mountedHook = useMounted();
  const { resolvedTheme } = useTheme();
  const { brand } = useBrand();
  const rafRef = useRef<number>(0);

  const logoSrc = mountedHook
    ? brand.assets.logo.uploaded ||
      (resolvedTheme === "dark" ? brand.assets.logo.dark : brand.assets.logo.light)
    : null;

  const iconSrc = mountedHook
    ? brand.assets.logo.icon || logoSrc
    : null;

  useEffect(() => {
    setMounted(true);
  }, []);

  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setScrolled(window.scrollY > 20);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? window.scrollY / docHeight : 0);

      const sections = brand.navigation.links
        .map((l) => l.href.replace("#", ""))
        .map((id) => document.getElementById(id))
        .filter(Boolean) as HTMLElement[];

      let current = "";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150) current = section.id;
      }
      setActiveSection(current);
    });
  }, [brand.navigation.links]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <header
      className={`sticky top-10 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "shadow-[0_4px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : ""
      }`}
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            scrolled ? "bg-background/70 backdrop-blur-2xl" : "bg-transparent"
          }`}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 mix-blend-overlay ${
            scrolled ? "opacity-[0.02]" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
        <div
          className={`absolute -bottom-4 left-0 right-0 h-8 bg-gradient-to-b from-primary/[0.04] to-transparent transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <nav className="container mx-auto flex h-28 items-center px-4 relative z-10">
        {/* Logo */}
        <Link
          href="/"
          className="z-10 group/logo shrink-0"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          {iconSrc ? (
            <div className="relative flex items-center gap-3">
              <Image
                src={iconSrc}
                alt={brand.company.name}
                width={40}
                height={40}
                className="h-10 w-10 object-contain transition-all duration-500 group-hover/logo:scale-105 shrink-0"
              />
              {/* Company name + tagline */}
              <div className="flex flex-col leading-tight">
                <span className="text-xs lg:text-sm font-bold tracking-tight">{brand.company.name}</span>
                <span className="text-[10px] lg:text-xs text-muted-foreground">{brand.hero.headline}</span>
              </div>
              <div className="absolute inset-0 bg-primary/0 group-hover/logo:bg-primary/10  blur-2xl transition-all duration-500 pointer-events-none" />
            </div>
          ) : (
            <span className="text-xl font-bold">{brand.company.name}</span>
          )}
        </Link>

        {/* Desktop Navigation */}
        <div
          className="hidden lg:flex flex-1 items-center justify-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-16px)",
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 200ms",
          }}
        >
          <div className="flex items-center gap-0.5  bg-muted/40 backdrop-blur-md border border-border/30 px-1.5 py-1.5">
            {brand.navigation.links.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group/link relative px-4 py-1.5 text-sm font-medium  transition-all duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={{
                    opacity: mounted ? 1 : 0,
                    transitionDelay: `${250 + i * 60}ms`,
                  }}
                >
                  <span
                    className={`absolute inset-0  transition-all duration-300 ${
                      isActive
                        ? "bg-background shadow-sm"
                        : "bg-transparent group-hover/link:bg-background/60"
                    }`}
                  />
                  <span className="relative flex items-center gap-1.5">
                    <span
                      className={`w-1 h-1  bg-primary transition-all duration-300 ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                    />
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Desktop Actions */}
        <div
          className="hidden lg:flex items-center gap-3 z-10 shrink-0"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1) 400ms",
          }}
        >
          <ThemeToggle />
          <Link
            href="https://conducivelogic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground/30 hover:text-muted-foreground hover:rotate-90 transition-all duration-500"
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Actions */}
        <div
          className="flex items-center gap-2 lg:hidden ml-auto"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.5s ease-out 300ms",
          }}
        >
          <ThemeToggle />
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative overflow-hidden"
            >
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                }`}
              >
                <Menu className="h-5 w-5" />
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                }`}
              >
                <X className="h-5 w-5" />
              </span>
              <span className="sr-only">Toggle menu</span>
            </Button>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary navbar-pulse-dot" />
          </div>
        </div>
      </nav>

      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        <div
          className={`h-full transition-opacity duration-500 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-full w-[200%] navbar-shimmer-border bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-primary via-primary/60 to-primary transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 z-50 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative bg-background dark:bg-card shadow-xl border-t border-border/20">
          <div className="container mx-auto px-4 pt-2 pb-5 space-y-1">
            {brand.navigation.links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="group/mlink flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground  px-3 py-3 hover:bg-muted/60 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  opacity: mobileMenuOpen ? 1 : 0,
                  transform: mobileMenuOpen ? "translateX(0)" : "translateX(-20px)",
                  transition: "all 0.4s ease-out",
                  transitionDelay: mobileMenuOpen ? `${i * 60}ms` : "0ms",
                }}
              >
                <span className="w-1 h-1  bg-muted-foreground/30 group-hover/mlink:bg-primary group-hover/mlink:scale-150 transition-all duration-300" />
                {link.label}
              </Link>
            ))}
          </div>
          {/* Bottom accent bar — matches Free Estimate form */}
          <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        </div>
      </div>
    </header>
  );
}
