"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { useBrand } from "@/contexts/brand-context";

export function TrustBarDefault() {
  const { brand } = useBrand();
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const credGroups = useMemo(() => {
    return brand.trustBar.credentials.map((cred) => {
      const chars: { char: string; isSpace: boolean }[] = [];
      for (const ch of cred) {
        chars.push({ char: ch, isSpace: ch === " " });
      }
      return chars;
    });
  }, [brand.trustBar.credentials]);

  const totalLetters = credGroups.reduce(
    (sum, g) => sum + g.filter((c) => !c.isSpace).length,
    0,
  );
  const scrollPerLetter = 15;
  const scrollRunway = totalLetters * scrollPerLetter;

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const measure = () => setContentHeight(content.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(content);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const offset = window.innerWidth < 640 ? 150 : 100;
        const scrolled = window.innerHeight - rect.top - offset;
        if (scrolled < 0) {
          setRevealedCount(0);
          return;
        }
        const progress = Math.min(1, Math.max(0, scrolled / scrollRunway));
        setRevealedCount(Math.floor(progress * totalLetters));
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [scrollRunway, totalLetters]);

  const allRevealed = revealedCount >= totalLetters;

  let letterIndex = 0;

  return (
    <section
      ref={sectionRef}
      className="transition-[height] duration-500 ease-in-out"
      style={{
        height: allRevealed ? `${contentHeight}px` : `${scrollRunway}px`,
      }}
    >
      <div
        ref={contentRef}
        className="flex items-start pt-8"
        style={{
          position: allRevealed ? "relative" : "sticky",
          top: allRevealed ? undefined : 0,
        }}
      >
        <div className="container mx-auto px-4">
          <div className="relative max-w-4xl mx-auto  px-8 py-10">
            <div className="absolute -right-12 w-48 h-48 bg-primary/10  blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/5  blur-3xl pointer-events-none" />

            <p className="relative text-center text-lg font-semibold uppercase tracking-widest text-muted-foreground/70 mb-8">
              {brand.trustBar.headline}
            </p>

            <div className="relative flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-2 sm:gap-y-2 text-2xl sm:text-2xl lg:text-5xl font-black uppercase tracking-tight">
              {credGroups.map((group, gi) => {
                const isLast = gi === credGroups.length - 1;
                return (
                  <span
                    key={gi}
                    className={`flex items-center ${isLast ? "text-xl sm:text-4xl lg:text-5xl -order-1 sm:order-none" : ""}`}
                  >
                    {gi > 0 && (
                      <span className="hidden sm:inline text-muted-foreground/20 mx-1 sm:mx-2">
                        ·
                      </span>
                    )}
                    {group.map((c, ci) => {
                      if (c.isSpace) {
                        return (
                          <span key={ci} className="inline-block w-[0.3em]" />
                        );
                      }
                      const isRevealed = letterIndex < revealedCount;
                      letterIndex++;
                      return (
                        <span
                          key={ci}
                          className={`inline-block transition-all duration-150 ${
                            isRevealed
                              ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)]"
                              : "text-muted-foreground/20"
                          }`}
                        >
                          {c.char}
                        </span>
                      );
                    })}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
