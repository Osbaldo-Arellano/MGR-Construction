"use client";

import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { formatPhone } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function ContactSplitForm() {
  const { brand } = useBrand();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const loadedAt = useRef(Date.now());

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title],
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.get("firstName"),
          lastName: data.get("lastName"),
          email: data.get("email"),
          phone: data.get("phone"),
          services: selectedServices,
          message: data.get("message"),
          source: "contact",
          _hp: data.get("website"),
          loadedAt: loadedAt.current,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSubmitted(true);
    } catch (err) {
      console.error("Contact form error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 lg:py-32 overflow-hidden">
      <div id="contact" className="scroll-mt-28" />
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {brand.cta.getInTouchTitle}
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight">
              {brand.cta.headline}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {brand.cta.subheadline}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Split card */}
        <div className="grid lg:grid-cols-[5fr_7fr] overflow-hidden border border-border shadow-2xl">
          {/* Left — dark info panel (below form on mobile, left on desktop) */}
          <div className="relative bg-foreground text-background px-8 sm:px-10 py-12 lg:py-16 flex flex-col justify-between overflow-hidden order-last lg:order-first">
            {/* Grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(hsl(var(--background)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--background)) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/20  blur-3xl pointer-events-none" />

            <AnimateOnScroll animation="fade-up" triggerOnce={false}>
              <div className="relative space-y-8">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/40">
                    Get In Touch
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-black leading-tight tracking-tight">
                    {brand.company.name}
                  </h3>
                  <p className="text-background/60 leading-relaxed text-sm">
                    Family-owned and operated. Serving homeowners across Oregon with a personal commitment to quality on every job.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: Mail, label: brand.company.email, href: `mailto:${brand.company.email}` },
                    { icon: Phone, label: formatPhone(brand.company.phone), href: `tel:${brand.company.phone?.replace(/\D/g, "")}` },
                    { icon: MapPin, label: brand.company.address, href: null },
                  ].filter(({ label }) => label).map(({ icon: Icon, label, href }, i) => (
                    <div key={i} className="flex items-center gap-3 group">
                      <div className="w-8 h-8 bg-background/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="w-4 h-4 text-background/60 group-hover:text-primary transition-colors duration-300" />
                      </div>
                      {href ? (
                        <a href={href} className="text-background/70 hover:text-background transition-colors text-sm">
                          {label}
                        </a>
                      ) : (
                        <span className="text-background/70 text-sm">{label}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-background/10" />

                {/* Stats */}
                <p className="text-sm font-semibold text-background/70 leading-relaxed">
                  100% Family Owned.&nbsp; 5-Star Reviewed.&nbsp; Local Expertise.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right — form */}
          <div className="bg-background px-8 sm:px-10 py-12 lg:py-16 lg:flex lg:items-center lg:justify-center">
            <AnimateOnScroll animation="fade-up" triggerOnce={false}>
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12 h-full">
                  <div className="w-14 h-14  bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-5">
                    <Send className="w-7 h-7 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">We&apos;ll be in touch shortly.</p>
                  <Button variant="outline" onClick={() => { setSubmitted(false); setSelectedServices([]); }}>
                    Send Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
                  {/* Honeypot */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden", opacity: 0, pointerEvents: "none" }}>
                    <label htmlFor="sfWebsite">Website</label>
                    <input type="text" id="sfWebsite" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="sfFirstName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">First Name</Label>
                      <Input id="sfFirstName" name="firstName" required />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="sfLastName" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Name</Label>
                      <Input id="sfLastName" name="lastName" required />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="sfEmail" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</Label>
                    <Input id="sfEmail" name="email" type="email" required />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="sfPhone" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</Label>
                    <Input id="sfPhone" name="phone" type="tel" required />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{brand.cta.servicesLabel}</Label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {brand.services.items.map((service) => {
                        const checked = selectedServices.includes(service.title);
                        return (
                          <label
                            key={service.title}
                            className={`flex items-center gap-2.5 p-2.5 border cursor-pointer transition-colors text-sm select-none ${
                              checked
                                ? "border-primary/50 bg-primary/5 text-foreground"
                                : "border-border hover:border-border/80 hover:bg-muted/40 text-muted-foreground"
                            }`}
                          >
                            <span className={`shrink-0 w-4 h-4 flex items-center justify-center border transition-colors ${checked ? "border-primary bg-primary" : "border-border"}`}>
                              {checked && <CheckCircle2 className="w-3.5 h-3.5 text-primary-foreground" />}
                            </span>
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={checked}
                              onChange={() => toggleService(service.title)}
                            />
                            <span>{service.title}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="sfMessage" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</Label>
                    <textarea
                      id="sfMessage"
                      name="message"
                      rows={4}
                      required
                      className="flex w-full border border-border bg-muted/30 px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:bg-background disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full group/btn" disabled={isSubmitting}>
                    {isSubmitting ? "Sending…" : (
                      <span className="flex items-center gap-2">
                        Send Message
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
