"use client";

import {
  ShieldCheck,
  BadgeDollarSign,
  FileCheck2,
  Home,
  Star,
  ChevronDown,
} from "lucide-react";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { useState } from "react";

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "A 25-Year Warranty Backed by CertainTeed — Not Just Us",
    body: "As a SELECT ShingleMaster credentialed contractor, your roof comes with CertainTeed's SureStart PLUS warranty — up to 50 years on materials and 25 years on workmanship, guaranteed by the manufacturer. Most roofers can only offer their own word. We offer CertainTeed's.",
  },
  {
    icon: BadgeDollarSign,
    title:
      "Cash Incentives for Energy-Efficient Work — We Handle the Paperwork",
    body: "Oregon homeowners on Portland General Electric, Pacific Power, or NW Natural may qualify for $0.90–$2.85 per square foot in cash incentives for qualifying insulation and roofing upgrades. As an Energy Trust Trade Ally, we identify what qualifies, do the work to spec, and submit the application on your behalf.",
  },
  {
    icon: FileCheck2,
    title: "Access to State Repair Funding Most Homeowners Don't Know Exists",
    body: "Through our OHCS partnership, qualifying households can access up to $15,000 in no-cost health-and-safety home repairs — including roofing — funded through state and federal programs. We help you navigate eligibility and connect you to the right assistance program.",
  },
  {
    icon: Home,
    title: "Verified HARP Contractor for Wildfire Recovery",
    body: "We're one of a limited number of Oregon contractors verified to perform repairs and rebuilds funded through the state's Homeowner Assistance and Reconstruction Program. If your home was impacted by wildfires or straight-line winds, we can work directly within that funding.",
  },
  {
    icon: Star,
    title: "Family-Owned. One Point of Contact. Every Time.",
    body: "Rene Morales personally oversees every job. No subcontractors handed your project off mid-way, no chasing down a project manager. You get direct communication from the person whose name is on the company — from estimate to final walkthrough.",
  },
];

export function WhyUsCards() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="why-us"
      className="scroll-mt-28 py-20 lg:py-32 bg-background overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Why Flawless
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight mb-4">
              What You Get That Most Roofers Can't Offer
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our certifications and partnerships aren&apos;t wall decorations —
              each one unlocks something concrete for you as a homeowner.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Mobile: accordion list */}
        <div className="md:hidden border border-border divide-y divide-border">
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            const isOpen = openIndex === i;
            return (
              <div key={benefit.title}>
                <button
                  className="w-full flex items-center gap-4 px-5 py-4 text-left bg-muted/20 active:bg-muted/40 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <div className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <span className="flex-1 text-sm font-bold text-foreground leading-snug">
                    {benefit.title}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pt-3 pl-[3.25rem] text-sm text-muted-foreground leading-relaxed">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop: card grid */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          {BENEFITS.slice(0, 3).map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <AnimateOnScroll
                key={benefit.title}
                animation="fade-up"
                delay={i * 80}
                triggerOnce={false}
              >
                <div className="group flex flex-col gap-5 p-7 lg:p-8 border border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-colors duration-300 h-full">
                  <div className="w-11 h-11 bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300 shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        <div className="hidden md:flex md:flex-row justify-center gap-6">
          {BENEFITS.slice(3).map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <AnimateOnScroll
                key={benefit.title}
                animation="fade-up"
                delay={(i + 3) * 80}
                triggerOnce={false}
                className="md:w-1/2 xl:w-1/3"
              >
                <div className="group flex flex-col gap-5 p-7 lg:p-8 border border-border bg-muted/20 hover:bg-muted/40 hover:border-primary/30 transition-colors duration-300 h-full">
                  <div className="w-11 h-11 bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300 shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-base font-bold text-foreground leading-snug">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.body}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
