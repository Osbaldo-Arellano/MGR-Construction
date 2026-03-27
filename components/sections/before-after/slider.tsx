"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function BeforeAfterSlider() {
  const { brand } = useBrand();
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // First gallery item = "after" (finished work, most impressive shot)
  // Second gallery item = "before" (damage, old state, or starting condition)
  // Brand owner controls this via sort_order in Supabase.
  const after = brand.gallery.items[0];
  const before = brand.gallery.items[1] ?? brand.gallery.items[0];

  const clamp = (v: number) => Math.max(2, Math.min(98, v));

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, width } = el.getBoundingClientRect();
    setPosition(clamp(((clientX - left) / width) * 100));
    setHasInteracted(true);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isDragging) updatePosition(e.clientX);
    };
    const onTouch = (e: TouchEvent) => {
      if (isDragging) updatePosition(e.touches[0].clientX);
    };
    const stop = () => setIsDragging(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [isDragging, updatePosition]);

  if (!after || !before) return null;

  return (
    <section id="before-after" className="scroll-mt-28 py-20 lg:py-32 overflow-hidden bg-background">
      <div className="container mx-auto px-4">

        {/* Header */}
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="text-center mb-12 space-y-3">
            <div className="flex items-center gap-4 justify-center">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {brand.gallery.headline}
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight">
              See the Difference
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {brand.gallery.subheadline}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Slider */}
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div
            ref={containerRef}
            className="relative select-none overflow-hidden  aspect-video max-w-5xl mx-auto shadow-2xl cursor-col-resize"
            onMouseDown={(e) => { setIsDragging(true); updatePosition(e.clientX); }}
            onTouchStart={(e) => { setIsDragging(true); updatePosition(e.touches[0].clientX); }}
          >
            {/* Before — full bleed base layer */}
            <div className="absolute inset-0">
              <Image
                src={before.image}
                alt={before.title}
                fill
                className="object-cover pointer-events-none"
                draggable={false}
              />
              <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 ">
                Before
              </div>
            </div>

            {/* After — clipped from left edge to handle */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <Image
                src={after.image}
                alt={after.title}
                fill
                className="object-cover pointer-events-none"
                draggable={false}
              />
              <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 ">
                After
              </div>
            </div>

            {/* Divider line */}
            <div
              className="absolute inset-y-0 w-px bg-white/90 pointer-events-none z-20"
              style={{
                left: `${position}%`,
                transform: "translateX(-50%)",
                boxShadow: "0 0 16px rgba(0,0,0,0.5)",
              }}
            />

            {/* Drag handle */}
            <div
              className="absolute top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 w-11 h-11  bg-white flex items-center justify-center gap-px pointer-events-none transition-transform duration-150"
              style={{
                left: `${position}%`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
                transform: `translateX(-50%) translateY(-50%) scale(${isDragging ? 1.15 : 1})`,
              }}
            >
              <ChevronLeft className="w-3.5 h-3.5 text-gray-500" />
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            </div>

            {/* Drag hint — fades after first interaction */}
            <div
              className="absolute inset-0 flex items-end justify-center pb-6 pointer-events-none z-10 transition-opacity duration-500"
              style={{ opacity: hasInteracted ? 0 : 1 }}
            >
              <p className="text-white/70 text-xs font-medium tracking-widest uppercase bg-black/30 backdrop-blur-sm px-4 py-2 ">
                Drag to compare
              </p>
            </div>
          </div>

        </AnimateOnScroll>

      </div>
    </section>
  );
}
