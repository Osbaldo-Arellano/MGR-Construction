"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Grid3X3, Loader2 } from "lucide-react";
import { useBrand } from "@/contexts/brand-context";
import { cn } from "@/lib/utils";

function GalleryPageInner() {
  const { brand } = useBrand();
  const router = useRouter();
  const searchParams = useSearchParams();

  const items = useMemo(
    () =>
      (brand.gallery.items ?? []).map((it) => ({
        image: it.image,
        title: it.title,
        category: it.category,
      })),
    [brand.gallery.items],
  );

  const startIndex = Number(searchParams.get("photo") ?? 0);
  const [index, setIndex] = useState(Math.max(0, Math.min(startIndex, items.length - 1)));
  const [showGrid, setShowGrid] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const prevIndexRef = useRef(index);

  if (prevIndexRef.current !== index) {
    prevIndexRef.current = index;
    setImageLoaded(false);
  }

  const total = items.length;
  const item = items[index];
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeStartX = useRef(0);
  const swipeStartY = useRef(0);
  const swiping = useRef(false);

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(target, total - 1));
      setIndex(clamped);
      window.history.replaceState(null, "", `/gallery?photo=${clamped}`);
    },
    [total],
  );

  const prev = useCallback(() => goTo((index - 1 + total) % total), [index, total, goTo]);
  const next = useCallback(() => goTo((index + 1) % total), [index, total, goTo]);

  useEffect(() => {
    const thumb = thumbRefs.current[index];
    const strip = thumbStripRef.current;
    if (!thumb || !strip) return;
    const thumbLeft = thumb.offsetLeft;
    const thumbWidth = thumb.offsetWidth;
    const stripWidth = strip.offsetWidth;
    strip.scrollTo({
      left: thumbLeft - stripWidth / 2 + thumbWidth / 2,
      behavior: "smooth",
    });
  }, [index]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") {
        if (zoomed) { setZoomed(false); return; }
        router.push("/#gallery");
        return;
      }
      if (e.key === "g") setShowGrid((v) => !v);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prev, next, router, zoomed]);

  function handlePointerDown(e: React.PointerEvent) {
    swiping.current = true;
    swipeStartX.current = e.clientX;
    swipeStartY.current = e.clientY;
  }

  function handlePointerUp(e: React.PointerEvent) {
    if (!swiping.current) return;
    swiping.current = false;
    const dx = e.clientX - swipeStartX.current;
    const dy = e.clientY - swipeStartY.current;
    if (Math.abs(dx) < 50 || Math.abs(dx) <= Math.abs(dy) * 1.2) return;
    if (dx < 0) next();
    else prev();
  }

  const categories = useMemo(() => {
    const cats = new Set(items.map((it) => it.category).filter(Boolean));
    return ["All", ...Array.from(cats)];
  }, [items]);
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredItems = useMemo(
    () => activeCategory === "All" ? items : items.filter((it) => it.category === activeCategory),
    [items, activeCategory],
  );

  if (!item) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto">
          <Link href="/#gallery" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to site</span>
          </Link>
          <div className="min-w-0 px-4" />
          <button
            onClick={() => setShowGrid((v) => !v)}
            className={cn(
              "flex items-center gap-2 text-sm px-3 py-1.5  border transition-colors",
              showGrid ? "bg-white/10 border-white/20 text-white" : "border-white/10 text-white/60 hover:text-white hover:border-white/20",
            )}
          >
            <Grid3X3 className="w-4 h-4" />
            <span className="hidden sm:inline">{showGrid ? "Viewing" : "Browse"}</span>
          </button>
        </div>
      </header>

      {showGrid ? (
        <div className="max-w-screen-2xl mx-auto px-4 py-6">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6" style={{ scrollbarWidth: "none" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "shrink-0 px-4 py-1.5  text-sm font-medium transition-colors border",
                  activeCategory === cat ? "bg-white text-black border-white" : "border-white/10 text-white/60 hover:text-white hover:border-white/30",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filteredItems.map((gridItem, i) => {
              const globalIndex = items.indexOf(gridItem);
              return (
                <button
                  key={i}
                  onClick={() => { goTo(globalIndex); setShowGrid(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={cn(
                    "group relative block w-full break-inside-avoid overflow-hidden  transition-all duration-300 hover:ring-2 hover:ring-white/40",
                    globalIndex === index && "ring-2 ring-primary",
                  )}
                >
                  <Image src={gridItem.image} alt={gridItem.title} width={600} height={400} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-screen-2xl mx-auto flex flex-col justify-center" style={{ minHeight: "calc(100dvh - 56px)" }}>
          <div className="relative w-full touch-pan-y" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
            {total > 1 && (
              <>
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 z-10  bg-black/50 hover:bg-black/70 border border-white/10 p-2 text-white transition-colors hidden sm:flex" aria-label="Previous">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 z-10  bg-black/50 hover:bg-black/70 border border-white/10 p-2 text-white transition-colors hidden sm:flex" aria-label="Next">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <div className="relative flex items-center justify-center px-2 sm:px-12 py-4 sm:py-8 min-h-[50vh] sm:min-h-[70vh]">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white/30 animate-spin" />
                </div>
              )}
              <Image
                key={index}
                src={item.image}
                alt={item.title}
                width={1600}
                height={1200}
                className={cn("max-w-full max-h-[50vh] sm:max-h-[75vh] w-auto h-auto object-contain  transition-opacity duration-300 cursor-zoom-in", imageLoaded ? "opacity-100" : "opacity-0")}
                sizes="100vw"
                priority
                onLoad={() => setImageLoaded(true)}
                onClick={(e) => { e.stopPropagation(); setZoomed(true); }}
              />
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 font-mono">
              {index + 1} / {total}
            </div>
          </div>
          {total > 1 && (
            <div className="border-t border-white/5 px-4 py-3">
              <div ref={thumbStripRef} className="flex gap-2 overflow-x-auto sm:justify-center py-1" style={{ scrollbarWidth: "none" }}>
                {items.map((thumbItem, i) => (
                  <button
                    key={i}
                    ref={(el) => { thumbRefs.current[i] = el; }}
                    onClick={() => goTo(i)}
                    className={cn("relative shrink-0 w-14 h-14 sm:w-16 sm:h-16  overflow-hidden transition-all duration-200", i === index ? "ring-2 ring-white ring-offset-2 ring-offset-black opacity-100" : "opacity-40 hover:opacity-70")}
                    aria-label={`View ${thumbItem.title}`}
                  >
                    <Image src={thumbItem.image} alt={thumbItem.title} fill className="object-cover" sizes="64px" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {zoomed && (
        <div className="fixed inset-0 z-[100] bg-black/95 cursor-zoom-out flex items-center justify-center p-4" onClick={() => setZoomed(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain animate-in fade-in zoom-in-95 duration-200" />
        </div>
      )}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense>
      <GalleryPageInner />
    </Suspense>
  );
}
