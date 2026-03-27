"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Phone, MapPin, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBrand } from "@/contexts/brand-context";
import { QuoteModal } from "@/components/sections/shared/quote-modal";

export function HeroBento() {
  const { brand } = useBrand();
  const [mounted, setMounted] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const delay = (ms: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted
      ? "translateY(0) scale(1)"
      : "translateY(20px) scale(0.97)",
    transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${ms}ms`,
  });

  return (
    <section className="min-h-[calc(100vh-2.5rem)] flex items-center py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Top headline */}
        <div
          className="mb-8 text-center space-y-3"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-20px)",
            transition: "all 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            {brand.hero.overlayCard.eyebrow}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight max-w-4xl mx-auto">
            {brand.hero.headline}
          </h1>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-[auto_auto_auto] gap-3 max-w-6xl mx-auto">
          {/* Hero image — spans 2 cols, 2 rows */}
          <div
            className="col-span-2 row-span-2 relative  overflow-hidden min-h-[320px] lg:min-h-[480px]"
            style={delay(100)}
          >
            <Image
              src={brand.assets.hero.image}
              alt={brand.assets.hero.imageAlt}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-sm">
                {brand.hero.subheadline}
              </p>
              <Button
                size="lg"
                className="group/btn shadow-xl"
                onClick={() => setQuoteModalOpen(true)}
              >
                {brand.hero.primaryCta.label}
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Stats cells */}
          {brand.hero.stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative  bg-muted/50 border border-border p-6 flex flex-col justify-between overflow-hidden group hover:border-primary/30 transition-colors duration-300"
              style={delay(150 + i * 80)}
            >
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/5  blur-xl group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="text-3xl lg:text-4xl font-black text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}

          {/* Secondary CTA cell */}
          <div
            className=" bg-primary text-primary-foreground p-6 flex flex-col justify-between overflow-hidden relative group"
            style={delay(400)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <Zap className="w-6 h-6 relative z-10" />
            <div className="relative z-10">
              <p className="text-sm font-medium mb-3">
                {brand.hero.overlayCard.description.slice(0, 60)}
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                asChild
              >
                <Link href={brand.hero.secondaryCta.href}>
                  {brand.hero.secondaryCta.label}
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Contact card */}
          <div
            className="col-span-2 lg:col-span-1  bg-muted/30 border border-border p-6 space-y-4"
            style={delay(480)}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {brand.company.address}
            </p>
            <div className="space-y-3">
              <a
                href={`tel:${brand.company.phone.replace(/\D/g, "")}`}
                className="flex items-center gap-2.5 text-sm hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                {brand.company.phone}
              </a>
              <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{brand.company.address}</span>
              </div>
            </div>
          </div>

          {/* Overlay card text */}
          <div
            className="col-span-2 lg:col-span-3  border border-border bg-background p-6 flex items-center gap-6"
            style={delay(560)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {brand.hero.overlayCard.description}
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-2">
              {brand.hero.overlayCard.buttons.map((btn) => (
                <Button key={btn.href} variant="outline" size="sm" asChild>
                  <Link href={btn.href}>
                    {btn.label}
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
    </section>
  );
}
