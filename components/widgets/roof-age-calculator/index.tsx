"use client";

import { useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { useBrand } from "@/contexts/brand-context";
import { QuoteModal } from "@/components/sections/shared/quote-modal";

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1970;

type CalcFlow = "input" | "result";

interface Health {
  label: string;
  color: string;
  barColor: string;
  recommendation: string;
}

function getHealth(age: number): Health {
  if (age <= 7)
    return {
      label: "Good",
      color: "text-emerald-500",
      barColor: "bg-emerald-500",
      recommendation:
        "Your roof is in good health. Annual inspections keep small issues from becoming expensive ones.",
    };
  if (age <= 15)
    return {
      label: "Monitor",
      color: "text-amber-500",
      barColor: "bg-amber-500",
      recommendation:
        "Your roof is entering its maintenance window. A quick inspection now can add years to its life.",
    };
  if (age <= 20)
    return {
      label: "At Risk",
      color: "text-orange-500",
      barColor: "bg-orange-500",
      recommendation:
        "Your roof is showing significant age. A professional inspection will tell you exactly what needs attention.",
    };
  return {
    label: "Replace",
    color: "text-red-500",
    barColor: "bg-red-500",
    recommendation:
      "Your roof has exceeded its typical lifespan. Schedule an inspection to understand your options.",
  };
}

export function RoofAgeCalculator() {
  const { brand } = useBrand();
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [flow, setFlow] = useState<CalcFlow>("input");
  const [year, setYear] = useState(CURRENT_YEAR - 10);

  const age = CURRENT_YEAR - year;
  const health = getHealth(age);
  const barWidth = Math.min(100, Math.round((age / 25) * 100));

  function handleClose() {
    setOpen(false);
    setFlow("input");
    setYear(CURRENT_YEAR - 10);
  }

  return (
    <>
      <QuoteModal open={quoteOpen} onOpenChange={setQuoteOpen} />

      {/* Panel */}
      {open && (
        <div
          className="fixed right-12 z-[60] w-[calc(100vw-4rem)] max-w-[340px] flex flex-col  border border-border bg-background shadow-2xl overflow-hidden"
          style={{
            top: "50%",
            animation: "calcSlideIn 0.25s cubic-bezier(0.22,1,0.36,1) forwards",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground shrink-0">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold leading-none truncate">
                {brand.company.name}
              </p>
              <p className="text-[11px] opacity-70 mt-0.5">Roof Age Calculator</p>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5  hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {flow === "input" && (
            <div className="p-6 flex flex-col gap-6">
              <div>
                <p className="text-sm font-semibold">
                  When was your roof last replaced?
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Drag the slider to set the year.
                </p>
              </div>

              {/* Year display */}
              <div className="text-center">
                <span className="text-5xl font-black tabular-nums text-primary">
                  {year}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  {age === 0
                    ? "brand new"
                    : age === 1
                      ? "1 year ago"
                      : `${age} years ago`}
                </p>
              </div>

              {/* Slider */}
              <div className="flex flex-col gap-1">
                <input
                  type="range"
                  min={MIN_YEAR}
                  max={CURRENT_YEAR}
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] text-muted-foreground/50">
                  <span>{MIN_YEAR}</span>
                  <span>{CURRENT_YEAR}</span>
                </div>
              </div>

              <button
                onClick={() => setFlow("result")}
                className="flex items-center justify-center gap-2 w-full py-3  bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
              >
                Check My Roof
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {flow === "result" && (
            <div className="p-6 flex flex-col gap-5">
              {/* Age */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">
                  Your roof is
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black tabular-nums">{age}</span>
                  <span className="text-lg font-semibold">
                    {age === 1 ? "year old" : "years old"}
                  </span>
                </div>
              </div>

              {/* Health bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Roof health</span>
                  <span className={`text-xs font-bold ${health.color}`}>
                    {health.label}
                  </span>
                </div>
                <div className="h-2  bg-muted overflow-hidden">
                  <div
                    className={`h-full  transition-all duration-700 ${health.barColor}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>

              {/* Recommendation */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {health.recommendation}
              </p>

              {/* CTA */}
              <button
                onClick={() => {
                  handleClose();
                  setQuoteOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-3  bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
              >
                Get a Free Inspection
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setFlow("input")}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                Check another year
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="px-4 py-2 border-t border-border bg-muted/20 text-center shrink-0">
            <p className="text-[10px] text-muted-foreground/50">
              Powered by <span className="font-semibold">BrandSync</span>
            </p>
          </div>
        </div>
      )}

      {/* Left flush tab */}
      <div
        className="fixed right-0 z-[60]" style={{ top: "calc(75% - 82px)" }}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className="relative w-7 h-12 sm:w-12 sm:h-20 rounded-l-lg  bg-primary text-primary-foreground shadow-xl hover:shadow-primary/40 active:scale-95 transition-all duration-200 flex items-center justify-center"
          aria-label={open ? "Close calculator" : "Roof age calculator"}
        >
          {open ? (
            <X className="w-5 h-5" />
          ) : (
            <span
              className="text-[7px] sm:text-[10px] font-bold uppercase tracking-widest leading-none"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              My Roof
            </span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes calcSlideIn {
          from { opacity: 0; transform: translateY(-50%) translateX(12px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
      `}</style>
    </>
  );
}
