"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function CertificationsDefault() {
  const { brand } = useBrand();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!brand.certifications) return null;

  const { headline, subheadline, items } = brand.certifications;

  return (
    <section
      id="certifications"
      className="scroll-mt-28 py-20 lg:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <AnimateOnScroll animation="fade-up">
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
            <div className="flex items-center gap-4 justify-center mb-3">
              <div className="h-px w-12 bg-primary/40" />
              <p className="text-sm font-semibold tracking-widest text-primary uppercase">
                Credentials
              </p>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {headline}
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              {subheadline}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Mobile: accordion list */}
        <div className="sm:hidden border border-border divide-y divide-border">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.name}>
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left bg-card active:bg-muted/40 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {item.logo && (
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center">
                      <Image
                        src={item.logo}
                        alt={item.logoAlt}
                        width={40}
                        height={40}
                        className="object-contain max-h-10 w-auto"
                      />
                    </div>
                  )}
                  <span className="flex-1 text-sm font-semibold text-foreground leading-snug">{item.name}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pt-3 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: cards grid */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-6 lg:gap-8">
          {items.map((item, i) => (
            <AnimateOnScroll key={item.name} animation="fade-up" delay={i * 80}>
              <div className="flex flex-col gap-5 p-6 lg:p-8  border border-border bg-card h-full">
                {item.logo && (
                  <div className="h-14 flex items-center">
                    <Image
                      src={item.logo}
                      alt={item.logoAlt}
                      width={160}
                      height={56}
                      className="object-contain object-left max-h-14 w-auto"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-base font-semibold text-foreground leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
