"use client";

import { ShieldCheck, Award, BadgeCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function WarrantyDefault() {
  const { brand } = useBrand();

  // Use the first 4 credentials as manufacturer certification badges
  const certBadges = brand.trustBar.credentials.slice(0, 4);

  return (
    <section
      id="warranty"
      className="scroll-mt-28 relative overflow-hidden py-20 lg:py-32 bg-foreground text-background"
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/15  blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-primary/10  blur-[100px] pointer-events-none" />

      <div className="container relative mx-auto px-4">

        {/* Header */}
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="text-center mb-14 space-y-3">
            <div className="flex items-center gap-4 justify-center">
              <div className="h-px w-12 bg-primary/60" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Our Guarantee
              </span>
              <div className="h-px w-12 bg-primary/60" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight">
              Two Layers of Protection
            </h2>
            <p className="text-background/60 max-w-xl mx-auto leading-relaxed text-base">
              Every roof we install is backed by both the manufacturer's material
              warranty and our personal workmanship guarantee.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Warranty cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto mb-14">

          {/* Manufacturer warranty */}
          <AnimateOnScroll animation="fade-up" delay={0} triggerOnce={false}>
            <div className="group relative  border border-background/10 bg-background/5 hover:bg-background/8 p-8 lg:p-10 transition-colors duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10  blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14  bg-primary/15 flex items-center justify-center">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-primary leading-none">50</p>
                    <p className="text-xs text-background/50 uppercase tracking-wider">Year Max</p>
                  </div>
                </div>

                <h3 className="text-xl font-black mb-2">Manufacturer Warranty</h3>
                <p className="text-sm text-background/60 leading-relaxed mb-6">
                  Material and product defects covered directly by the manufacturer.
                  Duration varies by product line — ask us about lifetime coverage options.
                </p>

                {/* Cert badges */}
                <div className="flex flex-wrap gap-2">
                  {certBadges.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5  bg-background/10 text-background/70 border border-background/10"
                    >
                      <BadgeCheck className="w-3 h-3 text-primary" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Workmanship warranty */}
          <AnimateOnScroll animation="fade-up" delay={100} triggerOnce={false}>
            <div className="group relative  border border-primary/30 bg-primary/10 hover:bg-primary/15 p-8 lg:p-10 transition-colors duration-300 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/20  blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14  bg-primary/20 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-black text-primary leading-none">10</p>
                    <p className="text-xs text-background/50 uppercase tracking-wider">Year Min</p>
                  </div>
                </div>

                <h3 className="text-xl font-black mb-2">Workmanship Warranty</h3>
                <p className="text-sm text-background/60 leading-relaxed mb-6">
                  Our personal guarantee on every nail, seam, and flashing detail.
                  If the installation causes any issue within{" "}
                  <span className="text-primary font-semibold">10 years</span>, we come
                  back and make it right — at no charge. Backed by {brand.company.name}.
                </p>

                <div className="flex items-center gap-2 text-xs text-background/50">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Transferable to new homeowner upon sale</span>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

        </div>

        {/* Bottom CTA */}
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="text-center space-y-4">
            <p className="text-background/50 text-sm">
              Have questions about your coverage? We explain every detail before
              the first nail goes in.
            </p>
            <Button
              variant="outline"
              className="border-background/20 text-background hover:bg-background/10 hover:text-background hover:border-background/30 group/btn"
              asChild
            >
              <a href="#contact">
                <span className="flex items-center gap-2">
                  Ask About Our Warranty
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </span>
              </a>
            </Button>
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
}
