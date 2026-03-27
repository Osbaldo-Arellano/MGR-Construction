"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useReviews } from "@/hooks/use-reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          className={`w-3 h-3 ${i < rating ? "text-amber-400" : "text-muted-foreground/20"}`}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function SocialProofToasts() {
  const { reviews } = useReviews();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Initial appearance after 8s
  useEffect(() => {
    if (reviews.length === 0 || dismissed) return;
    const t = setTimeout(() => {
      setStarted(true);
      setVisible(true);
    }, 8000);
    return () => clearTimeout(t);
  }, [reviews.length, dismissed]);

  // Hide after 5s of visibility
  useEffect(() => {
    if (!visible || !started) return;
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, [visible, started]);

  // Advance to next review 3s after hiding
  useEffect(() => {
    if (!started || visible || dismissed || reviews.length === 0) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % reviews.length);
      setVisible(true);
    }, 3000);
    return () => clearTimeout(t);
  }, [visible, started, dismissed, reviews.length]);

  if (reviews.length === 0 || dismissed) return null;

  const review = reviews[index];
  const excerpt =
    review.body.length > 90 ? review.body.slice(0, 90).trimEnd() + "..." : review.body;

  return (
    <div
      className="fixed bottom-6 left-6 z-[59] w-72"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div className="bg-background border border-border  shadow-xl p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="w-9 h-9  bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0">
            {review.reviewer_name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-xs font-semibold truncate">{review.reviewer_name}</p>
              <button
                onClick={() => setDismissed(true)}
                className="text-muted-foreground/40 hover:text-muted-foreground transition-colors shrink-0"
                aria-label="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <Stars rating={review.rating} />
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              {excerpt}
            </p>
            <p className="text-[10px] text-muted-foreground/40 mt-1.5">via Google</p>
          </div>
        </div>
      </div>
    </div>
  );
}
