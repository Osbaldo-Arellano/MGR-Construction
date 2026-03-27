"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useBrand } from "@/contexts/brand-context";
import { cn } from "@/lib/utils";

function VideoPageInner() {
  const { brand } = useBrand();
  const router = useRouter();
  const searchParams = useSearchParams();

  const videos = useMemo(() => brand.gallery.videos ?? [], [brand.gallery.videos]);

  const startIndex = Number(searchParams.get("v") ?? 0);
  const [index, setIndex] = useState(Math.max(0, Math.min(startIndex, videos.length - 1)));
  const [videoLoaded, setVideoLoaded] = useState(false);
  const prevIndexRef = useRef(index);

  if (prevIndexRef.current !== index) {
    prevIndexRef.current = index;
    setVideoLoaded(false);
  }

  const total = videos.length;
  const video = videos[index];
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(target, total - 1));
      setIndex(clamped);
      window.history.replaceState(null, "", `/gallery/video?v=${clamped}`);
    },
    [total],
  );

  const prev = useCallback(() => goTo((index - 1 + total) % total), [index, total, goTo]);
  const next = useCallback(() => goTo((index + 1) % total), [index, total, goTo]);

  useEffect(() => {
    const thumb = thumbRefs.current[index];
    if (!thumb || !thumbStripRef.current) return;
    thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") router.push("/#gallery");
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [prev, next, router]);

  if (!video) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto">
          <Link href="/#gallery" className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back to site</span>
          </Link>
          <div className="text-center min-w-0 px-4">
            <p className="text-sm font-medium truncate">{video.title}</p>
            {video.category && <p className="text-xs text-white/40">{video.category}</p>}
          </div>
          <div className="w-20" />
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto flex flex-col justify-center" style={{ minHeight: "calc(100dvh - 56px)" }}>
        <div className="relative w-full">
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
          <div className="relative flex items-center justify-center px-2 sm:px-6 py-4 sm:py-6 min-h-[60vh] sm:min-h-[75vh]">
            {!videoLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white/30 animate-spin" />
              </div>
            )}
            <video
              key={index}
              src={video.videoUrl}
              controls
              autoPlay
              playsInline
              className={cn("w-full max-h-[65vh] sm:max-h-[80vh]  transition-opacity duration-300", videoLoaded ? "opacity-100" : "opacity-0")}
              onLoadedData={() => setVideoLoaded(true)}
            />
          </div>
          {total > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/40 font-mono">
              {index + 1} / {total}
            </div>
          )}
        </div>
        {total > 1 && (
          <div className="border-t border-white/5 px-4 py-3">
            <div ref={thumbStripRef} className="flex gap-2 overflow-x-auto sm:justify-center py-1" style={{ scrollbarWidth: "none" }}>
              {videos.map((thumbVideo, i) => (
                <button
                  key={i}
                  ref={(el) => { thumbRefs.current[i] = el; }}
                  onClick={() => goTo(i)}
                  className={cn("relative shrink-0 w-20 h-14 sm:w-24 sm:h-16  overflow-hidden transition-all duration-200 bg-white/5", i === index ? "ring-2 ring-white ring-offset-2 ring-offset-black opacity-100" : "opacity-40 hover:opacity-70")}
                  aria-label={`View ${thumbVideo.title}`}
                >
                  <video src={thumbVideo.videoUrl} muted playsInline preload="metadata" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VideoPage() {
  return (
    <Suspense>
      <VideoPageInner />
    </Suspense>
  );
}
