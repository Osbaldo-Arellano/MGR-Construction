"use client";

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

export function ServicesNumberedList() {
  const { brand } = useBrand();
  const items = brand.services.items;

  return (
    <section
      id="services"
      className="scroll-mt-28 relative overflow-hidden py-20 lg:py-32"
    >
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10  blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/5  blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl tracking-tight font-bold mb-4">
              {brand.services.headline}
            </h2>
            <p className="text-lg lg:text-2xl text-muted-foreground">
              {brand.services.subheadline}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="max-w-4xl mx-auto">
          {items.map((service, index) => {
            const Icon = iconMap[service.icon] || Briefcase;
            const num = String(index + 1).padStart(2, "0");

            return (
              <AnimateOnScroll
                key={service.title}
                animation="fade-up"
                delay={index * 100}
                triggerOnce={false}
              >
                <div className="group">
                  {index === 0 && (
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                  )}

                  <div className="flex items-start gap-5 lg:gap-8 py-8 lg:py-10 px-2">
                    <span className="text-5xl lg:text-7xl font-black tracking-tighter bg-gradient-to-b from-primary/30 to-primary/5 bg-clip-text text-transparent select-none leading-none shrink-0 w-16 lg:w-24">
                      {num}
                    </span>

                    <div className="w-11 h-11 lg:w-14 lg:h-14  bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors duration-300 shrink-0 mt-1">
                      <Icon className="w-5 h-5 lg:w-7 lg:h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <div className="pt-0.5">
                      <h3 className="text-lg lg:text-2xl font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">
                        {service.title}
                      </h3>
                      <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
