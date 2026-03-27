"use client";

import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function AboutStatsForward() {
  const { brand } = useBrand();

  return (
    <section
      id="about"
      className="scroll-mt-28 py-20 lg:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="border border-border overflow-hidden lg:flex">

            {/* ── Main content ─────────────────────────────── */}
            <div className="flex-1 p-8 lg:p-14 lg:border-r border-border">

              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {brand.about.headline}
              </span>

              <h2 className="text-3xl lg:text-5xl font-black tracking-tight mt-3 mb-6 leading-tight">
                {brand.about.subheadline}
              </h2>

              <p className="text-base lg:text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed">
                {brand.about.description}
              </p>

              {/* Values */}
              <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-border">
                {brand.about.values.map((value, i) => (
                  <AnimateOnScroll
                    key={value.title}
                    animation="fade-up"
                    delay={i * 80}
                    triggerOnce={false}
                  >
                    <div>
                      <div
                        className="text-3xl font-black mb-3 leading-none"
                        style={{ color: "hsl(var(--primary)/0.2)" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">
                        {value.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
            </div>

            {/* ── Stats sidebar ─────────────────────────────── */}
            <div
              className="flex flex-row lg:flex-col items-center justify-around lg:justify-center lg:w-64 px-4 py-6 lg:p-12 gap-2 lg:gap-12 relative overflow-hidden"
              style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}
            >
              {/* subtle noise texture */}
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: "128px 128px",
                }}
              />

              {brand.hero.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative text-center lg:text-left flex-1 lg:flex-none"
                >
                  {i > 0 && (
                    <div className="hidden lg:block absolute -top-6 left-0 right-0 h-px bg-white/10" />
                  )}
                  <div className="text-2xl sm:text-3xl lg:text-6xl font-black leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
