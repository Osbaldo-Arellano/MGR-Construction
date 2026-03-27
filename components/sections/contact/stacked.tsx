"use client";

import { useRef, useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { formatPhone } from "@/lib/supabase";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function ContactStacked() {
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
    <section className="py-20 lg:py-32 bg-muted/50 dark:bg-muted/20">
      <div id="contact" className="scroll-mt-28" />
      <div className="container mx-auto px-4">
        <AnimateOnScroll animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-4 justify-center mb-4">
              <div className="h-px w-12 bg-primary/40" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Contact Us
              </span>
              <div className="h-px w-12 bg-primary/40" />
            </div>
            <h2 className="text-3xl lg:text-5xl tracking-tight font-bold mb-4">
              {brand.cta.headline}
            </h2>
            <p className="text-lg lg:text-2xl text-muted-foreground">
              {brand.cta.subheadline}
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <AnimateOnScroll animation="slide-left">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-6">{brand.cta.getInTouchTitle}</h3>
                <p className="text-muted-foreground mb-8">{brand.cta.getInTouchDescription}</p>
              </div>
              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: brand.company.email, href: `mailto:${brand.company.email}` },
                  { icon: Phone, label: "Phone", value: formatPhone(brand.company.phone), href: `tel:${brand.company.phone.replace(/\D/g, "")}` },
                  { icon: MapPin, label: "Address", value: brand.company.address, href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10  bg-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{label}</p>
                      {href ? (
                        <a href={href} className="text-muted-foreground hover:text-primary transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {/* Form */}
          <AnimateOnScroll animation="slide-right">
            <Card className="border-border shadow-md bg-background dark:bg-card">
              <CardContent className="p-6">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16  bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We&apos;ll get back to you soon.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6"
                      onClick={() => { setSubmitted(false); setSelectedServices([]); }}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot */}
                    <div
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden", opacity: 0, pointerEvents: "none" }}
                    >
                      <label htmlFor="csWebsite">Website</label>
                      <input type="text" id="csWebsite" name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="csFirstName" className="font-medium">First Name</Label>
                        <Input id="csFirstName" name="firstName" placeholder="John" required className="bg-muted/40 dark:bg-background border-border focus:bg-background" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="csLastName" className="font-medium">Last Name</Label>
                        <Input id="csLastName" name="lastName" placeholder="Doe" required className="bg-muted/40 dark:bg-background border-border focus:bg-background" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="csEmail" className="font-medium">Email</Label>
                      <Input id="csEmail" name="email" type="email" placeholder="john@example.com" required className="bg-muted/40 dark:bg-background border-border focus:bg-background" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="csPhone" className="font-medium">Phone</Label>
                      <Input id="csPhone" name="phone" type="tel" placeholder="+1 (555) 123-4567" required className="bg-muted/40 dark:bg-background border-border focus:bg-background" />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-medium">{brand.cta.servicesLabel}</Label>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {brand.services.items.map((service) => (
                          <label key={service.title} className="flex items-center gap-2 p-2  border border-border hover:bg-muted/40 cursor-pointer transition-colors text-sm">
                            <input type="checkbox" checked={selectedServices.includes(service.title)} onChange={() => toggleService(service.title)} className="rounded border-border text-primary focus:ring-primary" />
                            <span>{service.title}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="csMessage" className="font-medium">Message</Label>
                      <textarea
                        id="csMessage"
                        name="message"
                        rows={4}
                        placeholder="Tell us about your project..."
                        required
                        className="flex w-full  border border-border bg-muted/40 dark:bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:bg-background dark:focus:bg-background disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors"
                      />
                    </div>

                    <Button type="submit" className="w-full shadow-sm" disabled={isSubmitting}>
                      {isSubmitting ? "Sending…" : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
