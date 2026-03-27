"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Check,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useBrand } from "@/contexts/brand-context";
import { QuoteModal } from "@/components/sections/shared/quote-modal";

function buildParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const seed = (i * 137.508) % 100;
    particles.push({
      left: `${seed}%`,
      top: `${(i * 53.7) % 100}%`,
      size: 1 + (i % 3),
      duration: 3 + (i % 5),
      delay: (i % 7) * 0.5,
    });
  }
  return particles;
}

const PARTICLES = buildParticles(15);

export function HeroCinematic() {
  const { brand } = useBrand();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mobileLogoRef = useRef<HTMLDivElement>(null);
  const scrollHintMobileRef = useRef<HTMLDivElement>(null);
  const scrollHintDesktopRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const imageRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [cardSlideIn, setCardSlideIn] = useState(false);
  const [textRevealed, setTextRevealed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formService, setFormService] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const formLoadedAt = useRef(Date.now());
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [headlineHeight, setHeadlineHeight] = useState(0);

  useEffect(() => {
    // Double RAF ensures the browser paints the off-screen state before
    // transitioning — without this, React batches the state update and the
    // browser never renders the initial translate: 72px position.
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setCardSlideIn(true));
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    // On mobile the logo animates first (~800ms spring); text waits for it.
    // On desktop keep the original 300ms feel.
    const textDelay = mq.matches ? 300 : 900;
    const timer = setTimeout(() => setTextRevealed(true), textDelay);
    const onMqChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onMqChange);
    return () => {
      clearTimeout(timer);
      mq.removeEventListener("change", onMqChange);
    };
  }, []);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setHeadlineHeight(entry.contentRect.height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (window.innerWidth < 1024 || !imageRef.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    imageRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.08)`;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  useEffect(() => {
    function applyScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const section = sectionRef.current;
        const card = cardRef.current;
        const cta = ctaRef.current;
        if (!section || !card) return;

        const isMobile = window.innerWidth < 1024;
        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const progress = Math.min(scrollY / (vh * 0.6), 1);

        const marginV = isMobile ? 0 : 40;
        const extraPad = isMobile ? (1 - progress) * 16 : (1 - progress) * 40;
        const sectionH = (1 - progress) * (vh - 64 - marginV);
        section.style.minHeight = `${sectionH}px`;
        section.style.paddingTop = isMobile ? "0px" : `${extraPad + 16}px`;
        section.style.paddingBottom = `${extraPad + 16}px`;
        section.style.justifyContent = isMobile ? "flex-start" : "center";

        if (isMobile) {
          card.style.transform = "none";
          card.style.borderRadius = "0";
          card.style.overflow = "hidden";
        } else {
          const scale = 1 + (1 - progress) * 0.08;
          const tY = (1 - progress) * -20;
          card.style.transform = `scale(${scale}) translateY(${tY}px)`;
          card.style.borderRadius = "1rem";
          card.style.overflow = "hidden";
        }

        const logo = mobileLogoRef.current;
        if (logo) {
          if (isMobile) {
            logo.style.opacity = `${1 - progress * 2}`;
            logo.style.transform = `translateY(${progress * -10}px)`;
          } else {
            logo.style.opacity = "1";
            logo.style.transform = "none";
          }
        }

        [scrollHintMobileRef.current, scrollHintDesktopRef.current].forEach(
          (hint) => {
            if (hint) hint.style.opacity = `${1 - progress * 3}`;
          },
        );

        if (cta) {
          if (isMobile) {
            cta.style.opacity = "1";
            cta.style.transform = "none";
          } else {
            cta.style.opacity = `${progress}`;
            cta.style.transform = `translateY(${(1 - progress) * 20}px)`;
          }
        }
      });
    }

    applyScroll();
    window.addEventListener("scroll", applyScroll, { passive: true });
    window.addEventListener("resize", applyScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", applyScroll);
      window.removeEventListener("resize", applyScroll);
    };
  }, []);

  const headlineWords = useMemo(
    () => brand.hero.headline.split(" "),
    [brand.hero.headline],
  );

  async function handleEstimateSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formStatus === "submitting") return;
    setFormStatus("submitting");
    try {
      const elapsed = Date.now() - formLoadedAt.current;
      const loadedAt = Date.now() - Math.max(elapsed, 3000);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formFirstName,
          lastName: formLastName,
          email: formEmail,
          phone: formPhone,
          services: formService ? [formService] : [],
          message: "[Free Estimate Request]",
          source: "contact",
          _hp: "",
          loadedAt,
        }),
      });
      if (!res.ok) throw new Error("non-ok");
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center items-stretch lg:mx-20 lg:my-5"
    >
      <div
        ref={cardRef}
        className="relative lg:flex-1 lg:flex lg:flex-col shadow-2xl will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <div className="relative min-h-[100svh] sm:aspect-[3/2] lg:aspect-auto lg:flex-1 overflow-hidden">
          <div
            ref={imageRef}
            className="absolute inset-[-20px] transition-transform duration-100 ease-out will-change-transform"
            style={{ transform: "scale(1.08)" }}
          >
            {/* Mobile image */}
            <Image
              src="https://knhgoaphmtewjhtvglpe.supabase.co/storage/v1/object/public/flawless_roofing_gallery/1(2).jpg"
              alt={brand.assets.hero.imageAlt}
              fill
              className="object-cover block md:hidden"
              priority
            />
            {/* Desktop image */}
            <Image
              src={brand.assets.hero.image}
              alt={brand.assets.hero.imageAlt}
              fill
              className="object-cover hidden md:block"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="hero-light-sweep absolute -top-1/2 -left-1/4 w-1/2 h-[200%] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent rotate-12" />
              <div className="hero-light-sweep-slow absolute -top-1/2 -right-1/4 w-1/3 h-[200%] bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -rotate-12" />
            </div>
          )}

          {mounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {PARTICLES.map((p, i) => (
                <div
                  key={i}
                  className="hero-particle absolute  bg-white/30"
                  style={{
                    left: p.left,
                    top: p.top,
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    animationDuration: `${p.duration}s`,
                    animationDelay: `${p.delay}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 flex flex-col justify-between lg:flex-row lg:items-center h-full p-6 sm:p-8 lg:p-10 container mx-auto gap-8 lg:gap-12">
            <div
              ref={mobileLogoRef}
              className="relative flex-1 flex flex-col justify-between lg:justify-center gap-6 lg:gap-8 px-4 py-5 lg:px-0 lg:py-0 bg-gradient-to-br from-white to-gray-50/80 lg:bg-none lg:bg-transparent  lg:rounded-none shadow-2xl lg:shadow-none overflow-hidden lg:overflow-visible"
              style={
                !isDesktop
                  ? {
                      translate: cardSlideIn ? "0px" : "125%",
                      transition:
                        "translate 2.1s cubic-bezier(0.22, 1, 0.36, 1)",
                    }
                  : undefined
              }
            >
              {/* Mobile accent bar — matches estimate form */}
              <div className="lg:hidden absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
              {/* Decorative background circle */}
              <div className="lg:hidden absolute -top-8 -right-8 w-32 h-32 bg-primary/5  pointer-events-none" />
              <div className="flex items-center justify-center lg:justify-start gap-4 sm:gap-5 lg:gap-6 max-w-4xl">
                <div
                  className="shrink-0"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted
                      ? "translateX(0) scale(1)"
                      : isDesktop
                        ? "translateX(-30px) scale(0.95)"
                        : "scale(0.15)",
                    transition: isDesktop
                      ? "all 1s cubic-bezier(0.22, 1, 0.36, 1)"
                      : "opacity 0.6s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    height: isDesktop
                      ? headlineHeight > 0
                        ? headlineHeight * 0.85
                        : undefined
                      : 120,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.assets.logo.uploaded ?? brand.assets.logo.light}
                    alt={brand.company.name}
                    className="h-full w-auto drop-shadow-lg dark:hidden"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.assets.logo.uploaded ?? brand.assets.logo.dark}
                    alt={brand.company.name}
                    className="h-full w-auto drop-shadow-lg hidden dark:block"
                  />
                </div>

                {/* Headline — desktop only */}
                <h1
                  ref={headlineRef}
                  className="hidden lg:block text-4xl xl:text-6xl font-black tracking-tight leading-tight text-white [perspective:600px]"
                >
                  {headlineWords.map((word, i) => (
                    <span
                      key={i}
                      className="inline-block mr-[0.3em] transition-all duration-700 ease-out"
                      style={{
                        opacity: textRevealed ? 1 : 0,
                        transform: textRevealed
                          ? "translateY(0) rotateX(0)"
                          : "translateY(40px) rotateX(-20deg)",
                        transitionDelay: `${i * 120}ms`,
                        textShadow: "0 2px 30px rgba(0,0,0,0.4)",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </h1>
              </div>

              <p
                className="text-sm sm:text-base lg:text-lg font-medium text-gray-500 lg:text-white max-w-xl leading-relaxed transition-all duration-1000 ease-out lg:[text-shadow:none]"
                style={{
                  opacity: isDesktop ? (textRevealed ? 1 : 0) : 1,
                  transform: isDesktop
                    ? textRevealed
                      ? "translateY(0)"
                      : "translateY(20px)"
                    : "translateY(0)",
                  transitionDelay: isDesktop
                    ? `${headlineWords.length * 120 + 200}ms`
                    : "0ms",
                }}
              >
                {brand.hero.subheadline}
              </p>

              {/* Mobile credential chips + nav pills */}
              <div className="lg:hidden flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "ShingleMaster Certified",
                    "Energy Trust Partner",
                    "HARP Recovery",
                    "Family Owned",
                  ].map((label) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1 px-2.5 py-1  bg-primary/8 border border-primary/20 text-xs font-semibold text-primary"
                    >
                      <Check className="w-3 h-3 shrink-0" />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="h-px bg-gray-100" />

                <div className="flex flex-row gap-3">
                  <a
                    href="#why-us"
                    className="inline-flex items-center justify-center gap-1.5 flex-1  text-xs font-semibold h-9 px-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all active:scale-95"
                  >
                    Why Us?
                    <ChevronDown className="w-3 h-3" />
                  </a>
                  <a
                    href="#certifications"
                    className="inline-flex items-center justify-center gap-1.5 flex-1  text-xs font-semibold h-9 px-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all active:scale-95"
                  >
                    Certifications
                    <ChevronDown className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Desktop CTAs + Stats — inside left column */}
              <div className="hidden lg:flex flex-col gap-8">
                <div
                  className="flex gap-4 transition-all duration-700 ease-out"
                  style={{
                    opacity: textRevealed ? 1 : 0,
                    transform: textRevealed
                      ? "translateY(0)"
                      : "translateY(30px)",
                    transitionDelay: `${headlineWords.length * 120 + 400}ms`,
                  }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="group/btn relative overflow-hidden"
                    onClick={() => setQuoteModalOpen(true)}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {brand.hero.primaryCta.label}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 skew-x-12 pointer-events-none" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white hover:border-white/30 backdrop-blur-sm transition-all duration-300"
                    asChild
                  >
                    <Link href={brand.hero.secondaryCta.href}>
                      {brand.hero.secondaryCta.label}
                    </Link>
                  </Button>
                </div>

                <p
                  className="text-sm sm:text-base text-white font-medium tracking-wide transition-all duration-700 ease-out"
                  style={{
                    opacity: textRevealed ? 1 : 0,
                    transform: textRevealed
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transitionDelay: `${headlineWords.length * 120 + 600}ms`,
                  }}
                >
                  100% Family Owned.&nbsp; 5-Star Reviewed.&nbsp; Local
                  Expertise.
                </p>
              </div>
            </div>

            {/* Form — far right on desktop, bottom on mobile */}
            <div
              className="self-start -ml-6 sm:-ml-8 lg:ml-auto lg:self-end w-full pr-8 sm:pr-10 lg:pr-0 lg:max-w-2xl 2xl:max-w-3xl"
              style={
                !isDesktop
                  ? {
                      opacity: mounted ? 1 : 0,
                      transform: mounted
                        ? "translateY(0) translateX(0)"
                        : "translateY(30px) translateX(20px)",
                      translate: cardSlideIn ? "0px" : "-100%",
                      transition:
                        "opacity 1000ms ease-out 800ms, transform 1000ms ease-out 800ms, translate 2.1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
                    }
                  : {
                      opacity: mounted ? 1 : 0,
                      transform: mounted
                        ? "translateY(0) translateX(0)"
                        : "translateY(30px) translateX(20px)",
                      transition:
                        "opacity 1000ms ease-out 800ms, transform 1000ms ease-out 800ms",
                    }
              }
            >
              {brand.hero.overlayCard.type === "estimate-form" ? (
                /* ── Free Estimate Form ─────────────────────────────── */
                <div className="relative bg-background dark:bg-card shadow-2xl overflow-hidden">
                  {/* Top accent bar */}
                  <div className="h-1 w-full bg-gradient-to-r from-primary via-primary/80 to-primary/60" />

                  <div className="p-8 sm:p-10">
                    {formStatus === "success" ? (
                      <div className="flex flex-col items-center gap-4 py-8 text-center">
                        <div className="w-16 h-16  bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Check className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <p className="text-base font-bold text-foreground">
                            Request received!
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            We will reach out soon.
                          </p>
                        </div>
                        <a
                          href={`tel:${brand.company.phone.replace(/\D/g, "")}`}
                          className="text-sm text-primary hover:underline flex items-center gap-2 font-medium"
                        >
                          <Phone className="w-4 h-4" />
                          {brand.company.phone}
                        </a>
                      </div>
                    ) : (
                      <form
                        onSubmit={handleEstimateSubmit}
                        className="flex flex-col gap-4"
                      >
                        {/* Header */}
                        <div className="mb-1">
                          <p className="text-lg font-bold text-foreground">
                            {brand.hero.overlayCard.eyebrow}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {brand.hero.overlayCard.description}
                          </p>
                        </div>

                        {/* Name row */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              First Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Jane"
                              value={formFirstName}
                              onChange={(e) => setFormFirstName(e.target.value)}
                              autoComplete="given-name"
                              className="w-full bg-muted/40 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                              Last Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Smith"
                              value={formLastName}
                              onChange={(e) => setFormLastName(e.target.value)}
                              autoComplete="family-name"
                              className="w-full bg-muted/40 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="jane@example.com"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            autoComplete="email"
                            className="w-full bg-muted/40 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                          />
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Phone
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="(555) 000-0000"
                            value={formPhone}
                            onChange={(e) => setFormPhone(e.target.value)}
                            autoComplete="tel"
                            className="w-full bg-muted/40 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                          />
                        </div>

                        {/* Service dropdown */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            What can we help you with?
                          </label>
                          <select
                            required
                            value={formService}
                            onChange={(e) => setFormService(e.target.value)}
                            className="w-full bg-muted/40 border border-border px-4 py-3 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled>
                              Select a service...
                            </option>
                            <option value="New Roof">New Roof</option>
                            <option value="Roof Repair">Roof Repair</option>
                            <option value="Gutters">Gutters</option>
                          </select>
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="mt-1 w-full flex items-center justify-center gap-2 py-3.5  bg-primary text-primary-foreground text-base font-semibold hover:opacity-90 active:scale-[0.98] disabled:opacity-60 transition-all shadow-lg shadow-primary/20"
                        >
                          {formStatus === "submitting" ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <>
                              Get My Free Estimate
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        {formStatus === "error" && (
                          <p className="text-sm text-red-500 text-center">
                            Something went wrong. Call us at{" "}
                            <a
                              href={`tel:${brand.company.phone.replace(/\D/g, "")}`}
                              className="underline font-medium"
                            >
                              {brand.company.phone}
                            </a>
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                </div>
              ) : (
                /* ── Default content card ───────────────────────────── */
                <div className="relative bg-white/[0.07] backdrop-blur-xl border border-white/[0.1]  p-5 2xl:p-7 space-y-4 overflow-hidden group/card hover:border-white/[0.18] transition-colors duration-500">
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/10  blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  <div className="flex items-center gap-2 relative">
                    <Sparkles className="w-3 h-3 text-white/50" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-white/80">
                      {brand.hero.overlayCard.eyebrow}
                    </span>
                  </div>

                  <p className="text-sm 2xl:text-base text-white/80 leading-relaxed relative">
                    {brand.hero.overlayCard.description}
                  </p>

                  <div className="flex gap-2 relative">
                    {brand.hero.overlayCard.buttons.map((btn) => (
                      <Link
                        key={btn.href}
                        href={btn.href}
                        className="group/link inline-flex items-center gap-1.5 px-4 2xl:px-5 py-2 2xl:py-2.5 text-xs 2xl:text-sm font-medium text-white border border-white/20  hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                      >
                        {btn.label}
                        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTAs */}
      <div ref={ctaRef} className="mt-6 space-y-6 lg:hidden relative px-4">
        <div className="flex flex-row gap-3">
          <Button
            size="sm"
            className="flex-1  text-xs font-medium h-9 group/btn"
            onClick={() => setQuoteModalOpen(true)}
          >
            <span className="flex items-center justify-center gap-1.5">
              {brand.hero.primaryCta.label}
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1  text-xs font-medium h-9"
            asChild
          >
            <Link href={brand.hero.secondaryCta.href}>
              {brand.hero.secondaryCta.label}
            </Link>
          </Button>
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col justify-center shrink-0">
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">
              100% Family Owned. <br />
              5-Star Reviewed. <br />
              Local Expertise.
            </p>
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between  border border-border bg-muted/50 p-3 gap-3">
            <a
              href={`tel:${brand.company.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-xs text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{brand.company.phone}</span>
            </a>
            <a
              href={`mailto:${brand.company.email}`}
              className="flex items-center gap-2 text-xs text-foreground hover:text-primary transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              <span className="truncate">{brand.company.email}</span>
            </a>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{brand.company.address}</span>
            </div>
          </div>
        </div>

        <div
          ref={scrollHintMobileRef}
          className="flex items-center justify-center text-muted-foreground/50 pt-1"
        >
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>

      {/* Desktop Scroll Hint */}
      <div
        ref={scrollHintDesktopRef}
        className="hidden lg:flex flex-col items-center justify-center gap-2 mt-4 w-full shrink-0"
      >
        <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-muted-foreground/70">
          {brand.hero.scrollHint}
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
        <div className="w-8 h-8  border border-muted-foreground/30 flex items-center justify-center animate-bounce">
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60" />
        </div>
      </div>

      <QuoteModal open={quoteModalOpen} onOpenChange={setQuoteModalOpen} />
    </section>
  );
}
