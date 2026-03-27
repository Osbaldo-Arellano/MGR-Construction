"use client";

import { useRef, useEffect, MouseEvent } from "react";
import {
  Briefcase,
  Palette,
  Code,
  TrendingUp,
  Camera,
  Headphones,
  Zap,
  Home,
  Lightbulb,
  Shield,
  Battery,
  Wrench,
  Hammer,
  Layers,
  Droplets,
  CloudRain,
  HardHat,
  CheckCircle,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const iconMap: Record<string, LucideIcon> = {
  Briefcase,
  Palette,
  Code,
  TrendingUp,
  Camera,
  Headphones,
  Zap,
  Home,
  Lightbulb,
  Shield,
  Battery,
  Wrench,
  Hammer,
  Layers,
  Droplets,
  CloudRain,
  HardHat,
  CheckCircle,
};

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) scale(1.02)`;
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(600px) rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function ServicesGridTilt() {
  const { brand } = useBrand();
  const items = brand.services.items;
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const equalize = () => {
      const grid = gridRef.current;
      if (!grid) return;
      const cards = grid.querySelectorAll<HTMLElement>(".service-card");
      // Reset first so we measure natural heights
      cards.forEach((c) => (c.style.minHeight = ""));
      if (window.innerWidth < 1024) return; // desktop only
      const maxH = Math.max(...Array.from(cards).map((c) => c.offsetHeight));
      cards.forEach((c) => (c.style.minHeight = `${maxH}px`));
    };

    equalize();
    window.addEventListener("resize", equalize);
    return () => window.removeEventListener("resize", equalize);
  }, [items]);

  return (
    <section
      id="services"
      className="scroll-mt-28 relative overflow-hidden py-20 lg:py-32"
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/8  blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {brand.services.headline}
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl lg:text-5xl tracking-tight font-bold mb-4">
              {brand.services.subheadline}
            </h2>
          </div>
        </AnimateOnScroll>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {items.map((service, index) => {
            const Icon = iconMap[service.icon] || Briefcase;
            const cols = 3;
            const lastRowCount = items.length % cols;
            const isFirstInLastRow = lastRowCount !== 0 && index === items.length - lastRowCount;
            const lgColStart = isFirstInLastRow
              ? lastRowCount === 1 ? "lg:col-start-3" : "lg:col-start-2"
              : "";

            return (
              <div key={service.title} className={`lg:col-span-2 ${lgColStart} h-full`}>
              <AnimateOnScroll
                animation="fade-up"
                delay={index * 80}
                triggerOnce={false}
              >
                <TiltCard className="h-full">
                  <div className="service-card relative h-full border border-border bg-card p-6 lg:p-8 overflow-hidden group cursor-default">
                    {/* Background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-500 pointer-events-none " />

                    {/* Shimmer line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Index */}
                    <span className="absolute top-5 right-6 text-4xl font-black text-muted-foreground/8 select-none leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="relative z-10 space-y-4">
                      <div className="w-12 h-12  bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
                            {service.title}
                          </h3>
                          <ArrowUpRight className="w-4 h-4 text-muted-foreground/0 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </AnimateOnScroll>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
