"use client";

import { useState } from "react";
import {
  Home,
  Shield,
  Wrench,
  Hammer,
  Layers,
  Droplets,
  CloudRain,
  HardHat,
  Zap,
  Briefcase,
  CheckCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { QuoteModal } from "@/components/sections/shared/quote-modal";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Shield,
  Wrench,
  Hammer,
  Layers,
  Droplets,
  CloudRain,
  HardHat,
  Zap,
  Briefcase,
  CheckCircle,
};

export function MaterialsComparison() {
  const { brand } = useBrand();
  const [active, setActive] = useState(0);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const items = brand.services.items;
  const current = items[active];
  if (!current) return null;

  const Icon = iconMap[current.icon] ?? Home;

  // Split description into up to 3 key points on sentence boundaries
  const points = current.description
    .split(/\.(?=\s|$)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12)
    .slice(0, 3);

  return (
    <section
      id="materials"
      className="scroll-mt-28 relative overflow-hidden py-20 lg:py-32 bg-background"
    >
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-primary/5  blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">

        {/* Header */}
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="text-center mb-14 space-y-3">
            <div className="flex items-center gap-4 justify-center">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {brand.services.headline}
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight">
              {brand.services.subheadline}
            </h2>
          </div>
        </AnimateOnScroll>

        {/* Main panel */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-4 lg:gap-6">

          {/* Left — service tabs: 2-col grid on mobile, vertical list on desktop */}
          <AnimateOnScroll animation="fade-up" triggerOnce={false}>
            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2">
              {items.map((item, i) => {
                const TabIcon = iconMap[item.icon] ?? Home;
                const isActive = i === active;
                return (
                  <button
                    key={item.title}
                    onClick={() => setActive(i)}
                    className={`
                      flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-3 lg:py-3.5  text-left transition-all duration-200
                      ${isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                        : "bg-muted/50 hover:bg-muted text-foreground border border-border hover:border-primary/20"
                      }
                    `}
                  >
                    <div className={`w-7 h-7 lg:w-8 lg:h-8  flex items-center justify-center shrink-0 ${isActive ? "bg-white/20" : "bg-primary/10"}`}>
                      <TabIcon className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <span className="text-xs lg:text-sm font-semibold leading-tight">
                      {item.title}
                    </span>
                    {isActive && (
                      <ArrowRight className="w-4 h-4 ml-auto shrink-0 hidden lg:block" />
                    )}
                  </button>
                );
              })}
            </div>
          </AnimateOnScroll>

          {/* Right — detail panel — fixed height, contents adapt */}
          <AnimateOnScroll animation="fade-up" delay={100} triggerOnce={false}>
            <div
              className="relative  border border-border bg-muted/30 overflow-hidden
                         min-h-[360px] sm:min-h-[380px] lg:h-[420px]
                         flex flex-col p-5 sm:p-7 lg:p-10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5  blur-3xl pointer-events-none" />

              {/* Icon + title — fixed, never shrinks */}
              <div
                key={`header-${active}`}
                className="flex items-start gap-4 shrink-0 mb-4"
                style={{ animation: "fadeSlideIn 0.25s ease-out" }}
              >
                <div className="w-11 h-11 lg:w-14 lg:h-14  bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-primary" />
                </div>
                <h3 className="text-xl lg:text-3xl font-black tracking-tight leading-tight pt-1">
                  {current.title}
                </h3>
              </div>

              {/* Scrollable content — fills remaining space, clips at the fixed boundary */}
              <div
                key={`body-${active}`}
                className="lg:flex-1 lg:overflow-hidden flex flex-col gap-3 lg:min-h-0"
                style={{ animation: "fadeSlideIn 0.25s ease-out" }}
              >
                {/* Description */}
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed lg:line-clamp-3">
                  {current.description}
                </p>

                {/* Key points */}
                {points.length > 0 && (
                  <div className="space-y-2 lg:space-y-2.5">
                    {points.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-foreground/80 leading-snug lg:line-clamp-2">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA — always pinned to the bottom */}
              <div className="shrink-0 pt-4 mt-auto">
                <Button
                  className="group/btn relative overflow-hidden shadow-md shadow-primary/15"
                  onClick={() => setQuoteOpen(true)}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get a Free Inspection
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none" />
                </Button>
              </div>

              {/* Counter */}
              <p className="absolute bottom-4 right-6 text-xs text-muted-foreground/40 font-mono tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
            </div>
          </AnimateOnScroll>

        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />
    </section>
  );
}
