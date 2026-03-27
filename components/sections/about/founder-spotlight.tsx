"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function AboutFounderSpotlight() {
  const { brand } = useBrand();

  return (
    <section
      id="about"
      className="scroll-mt-28 relative overflow-hidden py-20 lg:py-32"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5  blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">
        {/* Section label */}
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {brand.about.headline}
            </span>
            <div className="h-px w-12 bg-primary/40" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-black text-center tracking-tight mb-4">
            {brand.about.subheadline}
          </h2>
        </AnimateOnScroll>

        {/* Main two-column layout */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — founder image + badge */}
          <AnimateOnScroll animation="fade-up" triggerOnce={false}>
            <div className="relative">
              <div className="relative  overflow-hidden aspect-[4/5] max-w-xl mx-auto lg:mx-0">
                <Image
                  src={brand.assets.founderImage ?? brand.assets.aboutImage ?? brand.assets.hero.image}
                  alt={brand.company.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating name badge */}
              <div className="absolute -bottom-6 -right-4 lg:right-0 bg-background border border-border  p-4 shadow-xl max-w-[220px]">
                <p className="font-bold text-sm">{brand.company.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{brand.company.address}</p>
                <p className="mt-2 text-[10px] text-muted-foreground leading-relaxed">
                  100% Family Owned.{" "}5-Star Reviewed.{" "}Local Expertise.
                </p>
              </div>

              {/* Decorative ring */}
              <div className="absolute -top-6 -left-6 w-24 h-24  border-2 border-primary/20 pointer-events-none" />
            </div>
          </AnimateOnScroll>

          {/* Right — quote + values */}
          <div className="space-y-10">
            <AnimateOnScroll animation="fade-up" triggerOnce={false}>
              <div className="relative">
                <Quote className="w-10 h-10 text-primary/20 mb-4" />
                <p className="text-xl lg:text-2xl font-medium leading-relaxed text-foreground/90 italic">
                  {brand.about.description}
                </p>
              </div>
            </AnimateOnScroll>

            <div className="space-y-6">
              {brand.about.values.map((value, i) => (
                <AnimateOnScroll
                  key={value.title}
                  animation="fade-up"
                  delay={i * 100}
                  triggerOnce={false}
                >
                  <div className="flex items-start gap-4 group">
                    <div className="shrink-0 w-10 h-10  bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300">
                      <span className="text-xs font-black text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
