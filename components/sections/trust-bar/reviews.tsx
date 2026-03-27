"use client";

import { useBrand } from "@/contexts/brand-context";
import { useReviews } from "@/hooks/use-reviews";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PER_PAGE = 3;
const SWIPE_THRESHOLD = 50;
const CARD_H = "h-[232px]";

function Stars({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const cls = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          className={`${cls} ${i < rating ? "text-amber-400" : "text-muted-foreground/20"}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: { id: string; body: string; reviewer_name: string; rating: number };
}) {
  return (
    <div
      className={` border border-border bg-background p-6 flex flex-col gap-3 overflow-hidden ${CARD_H}`}
    >
      <svg
        viewBox="0 0 32 24"
        fill="currentColor"
        className="w-6 h-[18px] text-primary/25 shrink-0"
      >
        <path d="M0 24V14.4C0 6.08 5.12 1.28 15.36 0l1.28 2.56C11.52 3.52 8.96 5.76 8.32 9.6H14.4V24H0zm17.6 0V14.4C17.6 6.08 22.72 1.28 32.96 0l1.28 2.56c-5.12.96-7.68 3.2-8.32 7.04H32V24H17.6z" />
      </svg>
      <div className="flex-1 overflow-hidden">
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
          {review.body}
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-border shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8  bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
            {review.reviewer_name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold leading-none truncate mb-1">
              {review.reviewer_name}
            </p>
            <Stars rating={review.rating} />
          </div>
        </div>
        <span className="text-[10px] text-muted-foreground/40 font-medium shrink-0">
          Google
        </span>
      </div>
    </div>
  );
}

export function TrustBarReviews() {
  const { brand } = useBrand();
  const { reviews, loading } = useReviews();

  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true);
  const touchStartX = useRef(0);

  const totalPages =
    reviews.length > 0 ? Math.ceil(reviews.length / PER_PAGE) : 1;

  const goTo = useCallback((newPage: number) => {
    setVisible(false);
    setTimeout(() => {
      setPage(newPage);
      setVisible(true);
    }, 180);
  }, []);

  const next = useCallback(
    () => goTo((page + 1) % totalPages),
    [goTo, page, totalPages],
  );
  const prev = useCallback(
    () => goTo((page - 1 + totalPages) % totalPages),
    [goTo, page, totalPages],
  );

  // Mobile auto-advance
  useEffect(() => {
    if (totalPages <= 1) return;
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [next, totalPages]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > SWIPE_THRESHOLD) delta > 0 ? next() : prev();
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 5;
  const displayed = reviews.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const slots = [
    ...displayed,
    ...Array(Math.max(0, PER_PAGE - displayed.length)).fill(null),
  ] as ((typeof displayed)[number] | null)[];
  const startIdx = page * PER_PAGE + 1;
  const endIdx = Math.min((page + 1) * PER_PAGE, reviews.length);

  // ~100px/s drift — one pass through the first half of the duplicated list
  const marqueeSeconds = Math.max(
    10,
    Math.round((reviews.length * 336) / 1250),
  );

  if (loading) {
    return (
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={` border border-border bg-muted/30 animate-pulse ${CARD_H}`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 border-y border-border overflow-hidden">
      {/* Header */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center gap-4 justify-center mb-3">
            <div className="h-px w-12 bg-primary/40" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              What Our Clients Say
            </span>
            <div className="h-px w-12 bg-primary/40" />
          </div>
          <div className="flex items-center justify-center gap-3 mt-2">
            <Stars rating={Math.round(avgRating)} size="md" />
            <span className="text-sm font-bold tabular-nums">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              · {reviews.length + 2} Google{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop — CSS marquee infinite auto-scroll, clipped to container */}
      <div className="hidden lg:block container mx-auto px-4 overflow-hidden">
        <div
          className="reviews-marquee flex gap-4 pb-3"
          style={{ animationDuration: `${marqueeSeconds}s` }}
        >
          {[...reviews, ...reviews].map((review, i) => (
            <div key={`${review.id}-${i}`} className="shrink-0 w-80">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — paged grid */}
      <div className="lg:hidden container mx-auto px-4">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[744px] md:h-[232px] transition-opacity duration-200 touch-pan-y"
          style={{ opacity: visible ? 1 : 0 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {slots.map((review, i) =>
            review === null ? (
              <div
                key={`pad-${i}`}
                className={`${CARD_H} invisible`}
                aria-hidden="true"
              />
            ) : (
              <ReviewCard key={review.id} review={review} />
            ),
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous reviews"
              className="w-9 h-9  border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-muted-foreground tabular-nums min-w-[80px] text-center">
              {startIdx}–{endIdx} of {reviews.length}
            </span>
            <button
              onClick={next}
              aria-label="Next reviews"
              className="w-9 h-9  border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .reviews-marquee {
          animation: reviews-scroll linear infinite;
          will-change: transform;
        }
        .reviews-marquee:hover {
          animation-play-state: paused;
        }
        @keyframes reviews-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
