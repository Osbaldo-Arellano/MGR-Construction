"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown, Phone, Mail, MapPin, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBrand } from "@/contexts/brand-context";
import { QuoteModal } from "@/components/sections/shared/quote-modal";

export function HeroSplit() {
  const { brand } = useBrand();
  const [mounted, setMounted] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-2.5rem)] flex flex-col lg:flex-row overflow-hidden">
      {/* Left — content */}
      <div className="relative z-10 flex flex-col justify-center flex-1 px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-0 bg-background">
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-xl space-y-8">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3 transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
            }}
          >
            <div className="h-[1px] w-8 bg-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {brand.hero.overlayCard.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(24px)",
              transitionDelay: "100ms",
            }}
          >
            {brand.hero.headline.split(" ").map((word, i, arr) =>
              i === arr.length - 1 ? (
                <span
                  key={i}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60"
                >
                  {" "}
                  {word}
                </span>
              ) : (
                <span key={i}>{i > 0 ? " " : ""}{word}</span>
              ),
            )}
          </h1>

          {/* Subheadline */}
          <p
            className="text-base lg:text-lg text-muted-foreground leading-relaxed transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "200ms",
            }}
          >
            {brand.hero.subheadline}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-3 transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transitionDelay: "300ms",
            }}
          >
            <Button
              size="lg"
              className="group/btn relative overflow-hidden shadow-lg shadow-primary/20"
              onClick={() => setQuoteModalOpen(true)}
            >
              <span className="relative z-10 flex items-center gap-2">
                {brand.hero.primaryCta.label}
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={brand.hero.secondaryCta.href}>
                {brand.hero.secondaryCta.label}
              </Link>
            </Button>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-8 pt-2 transition-all duration-700"
            style={{
              opacity: mounted ? 1 : 0,
              transitionDelay: "400ms",
            }}
          >
            {brand.hero.stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-black text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </span>
                {i < brand.hero.stats.length - 1 && (
                  <div className="hidden" />
                )}
              </div>
            ))}
          </div>

          {/* Contact info strip */}
          <div
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 pt-2 text-sm text-muted-foreground transition-all duration-700"
            style={{
              opacity: mounted ? 0.7 : 0,
              transitionDelay: "500ms",
            }}
          >
            <a
              href={`tel:${brand.company.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {brand.company.phone}
            </a>
            <a
              href={`mailto:${brand.company.email}`}
              className="flex items-center gap-2 hover:text-foreground transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {brand.company.email}
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-8 left-16 xl:left-24 hidden lg:flex items-center gap-3 text-muted-foreground/50 transition-all duration-700"
          style={{ opacity: mounted ? 1 : 0, transitionDelay: "800ms" }}
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
          <span className="text-xs uppercase tracking-widest">{brand.hero.scrollHint}</span>
        </div>
      </div>

      {/* Right — image */}
      <div
        className="relative lg:w-[52%] xl:w-[55%] min-h-[50vh] lg:min-h-full overflow-hidden transition-all duration-1000"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateX(0)" : "translateX(40px)",
          transitionDelay: "200ms",
        }}
      >
        <Image
          src={brand.assets.hero.image}
          alt={brand.assets.hero.imageAlt}
          fill
          className="object-cover"
          priority
        />

        {/* Left-edge gradient blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent lg:from-background/80" />

        {/* Review badge floating */}
        <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-sm border border-border  p-4 shadow-xl max-w-[200px] transition-all duration-1000"
          style={{ opacity: mounted ? 1 : 0, transitionDelay: "600ms" }}>
          <div className="flex gap-0.5 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-xs text-muted-foreground leading-snug">
            {brand.hero.overlayCard.description.slice(0, 80)}…
          </p>
          <p className="text-xs font-semibold mt-1.5">{brand.company.name}</p>
        </div>
      </div>

      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
    </section>
  );
}
