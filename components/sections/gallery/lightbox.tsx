"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ImageIcon,
  Video,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import { Play } from "lucide-react";

import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { cn } from "@/lib/utils";

type GalleryTab = "photos" | "videos";
const PER_PAGE = 6;

function BeforeAfterSlider({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPosition(
      Math.max(0, Math.min((clientX - rect.left) / rect.width, 1)) * 100,
    );
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragging.current) updatePosition(e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[64/45] lg:aspect-[16/9] overflow-hidden  select-none touch-none cursor-col-resize"
    >
      {/* After image */}
      <Image
        src={after}
        alt={`After — ${alt}`}
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Before image — clipped to left of divider */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={`Before — ${alt}`}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Divider line + handle — pointer-events-none so overlay below catches drags */}
      <div
        className="absolute inset-y-0 pointer-events-none z-20"
        style={{ left: `${position}%` }}
      >
        <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white/90 shadow-lg" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10  bg-white shadow-xl flex items-center justify-center gap-0.5">
          <ChevronLeft className="w-3.5 h-3.5 text-gray-600" />
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 z-20 px-2.5 py-1  bg-black/60 text-white text-xs font-semibold backdrop-blur-sm pointer-events-none">
        Before
      </span>
      <span className="absolute top-3 right-3 z-20 px-2.5 py-1  bg-black/60 text-white text-xs font-semibold backdrop-blur-sm pointer-events-none">
        After
      </span>

      {/* Full-cover drag capture overlay — sits on top, transparent */}
      <div
        className="absolute inset-0 z-30"
        onPointerDown={(e) => {
          dragging.current = true;
          updatePosition(e.clientX);
        }}
      />
    </div>
  );
}

/** Returns page indices (0-based) and "…" separators — always ≤5 numbers visible. */
function getVisiblePages(current: number, total: number): (number | "…")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i);

  const set = new Set<number>([0, total - 1, current]);
  if (current > 0) set.add(current - 1);
  if (current < total - 1) set.add(current + 1);

  const sorted = Array.from(set).sort((a, b) => a - b);
  const result: (number | "…")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…");
    result.push(sorted[i]);
  }
  return result;
}

function Pagination({
  page,
  totalPages,
  goTo,
}: {
  page: number;
  totalPages: number;
  goTo: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const visiblePages = getVisiblePages(page, totalPages);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          className="p-2  border border-border hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {visiblePages.map((p, i) =>
            p === "…" ? (
              <span
                key={`ellipsis-${i}`}
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-sm text-muted-foreground select-none"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => goTo(p)}
                className={cn(
                  "w-7 h-7 sm:w-8 sm:h-8  text-xs sm:text-sm font-medium transition-all",
                  p === page
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted text-muted-foreground",
                )}
                aria-label={`Go to page ${p + 1}`}
                aria-current={p === page ? "page" : undefined}
              >
                {p + 1}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages - 1}
          className="p-2  border border-border hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="w-48 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}

export function GalleryLightbox() {
  const { brand } = useBrand();
  const [activeTab, setActiveTab] = useState<GalleryTab>("photos");
  const [page, setPage] = useState(0);

  const hasVideos = (brand.gallery.videos?.length ?? 0) > 0;

  const items = useMemo(
    () =>
      (brand.gallery.items ?? []).map((it) => ({
        image: it.image,
        title: it.title,
        category: it.category,
      })),
    [brand.gallery.items],
  );

  const totalPages = Math.ceil(items.length / PER_PAGE);
  const pagedItems = items.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  function goTo(p: number) {
    const next = Math.max(0, Math.min(p, totalPages - 1));
    setPage(next);
    if (window.matchMedia("(max-width: 767px)").matches) {
      document
        .getElementById("gallery-pagination")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getGalleryHref(pagedIdx: number) {
    return `/gallery?photo=${page * PER_PAGE + pagedIdx}`;
  }

  // Mobile swipe
  const swipeRef = useRef<HTMLDivElement | null>(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const trackingRef = useRef(false);

  useEffect(() => {
    const el = swipeRef.current;
    if (!el) return;
    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

    const onPointerDown = (e: PointerEvent) => {
      if (!isMobile()) return;
      trackingRef.current = true;
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!trackingRef.current) return;
      trackingRef.current = false;
      const dx = e.clientX - startXRef.current;
      const dy = e.clientY - startYRef.current;
      if (Math.abs(dx) < 60 || Math.abs(dx) <= Math.abs(dy) * 1.2) return;
      if (dx < 0) goTo(page + 1);
      else goTo(page - 1);
    };
    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    el.addEventListener("pointerup", onPointerUp, { passive: true });
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
    };
  }, [activeTab, hasVideos, page, totalPages]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-muted/30">
      <div id="gallery" className="scroll-mt-28" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10  blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5  blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Photo Gallery
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl lg:text-5xl tracking-tight font-bold mb-4">
              {brand.gallery.headline}
            </h2>
            <p className="text-lg lg:text-2xl text-muted-foreground">
              {brand.gallery.subheadline}
            </p>
          </div>

          {brand.assets.aboutImage && (
            <div className="mb-12">
              <BeforeAfterSlider
                before={brand.assets.aboutImage}
                after={brand.assets.afterImage ?? brand.assets.hero.image}
                alt={brand.company.name}
              />
            </div>
          )}

          {hasVideos && (
            <div className="flex justify-center mb-12">
              <div className="inline-flex  bg-muted p-1">
                {(["photos", "videos"] as GalleryTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setPage(0);
                    }}
                    className={cn(
                      "inline-flex items-center gap-2 px-6 py-2.5  text-sm font-medium transition-all",
                      activeTab === tab
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tab === "photos" ? (
                      <ImageIcon className="w-4 h-4" />
                    ) : (
                      <Video className="w-4 h-4" />
                    )}
                    {brand.gallery.tabs[tab]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "photos" || !hasVideos ? (
            <div ref={swipeRef} className="touch-pan-y">
              <div
                id="gallery-pagination"
                className="mb-6 md:hidden scroll-mt-20"
              >
                <Pagination page={page} totalPages={totalPages} goTo={goTo} />
              </div>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pagedItems.map((item, idx) => (
                  <AnimateOnScroll
                    key={`${page}-${idx}`}
                    animation="fade-up"
                    delay={idx * 75}
                    triggerOnce={false}
                  >
                    <Link
                      href={getGalleryHref(idx)}
                      className={cn(
                        "group relative block w-full overflow-hidden  bg-background border border-border/50 hover:border-primary/50 transition-colors text-left",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2",
                      )}
                      aria-label={`View image: ${item.title}`}
                    >
                      <div className="aspect-[3/2] relative w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute top-3 right-3  bg-black/50 p-2 text-white opacity-60 md:opacity-0 group-hover:opacity-100 scale-100 md:scale-75 group-hover:scale-100 transition-all duration-300">
                          <Search className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
              <div className="flex items-center justify-center mt-10">
                <Pagination page={page} totalPages={totalPages} goTo={goTo} />
              </div>
            </div>
          ) : (
            /* Video grid inline */
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {brand.gallery.videos.map((item, index) => (
                <AnimateOnScroll
                  key={index}
                  animation="fade-up"
                  delay={index * 75}
                >
                  <Link
                    href={`/gallery/video?v=${index}`}
                    className="group relative block overflow-hidden  bg-background border border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <div className="aspect-[9/13] relative bg-black">
                      <video
                        src={item.videoUrl}
                        muted
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16  bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <Play className="w-8 h-8 text-primary-foreground ml-1" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded mb-2">
                          {item.category}
                        </span>
                        <h3 className="text-lg font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              ))}
            </div>
          )}
        </AnimateOnScroll>
      </div>
    </section>
  );
}
