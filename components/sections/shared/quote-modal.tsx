"use client";

import { useEffect, useState } from "react";
import { Send } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBrand } from "@/contexts/brand-context";

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuoteModal({ open, onOpenChange }: QuoteModalProps) {
  const { brand } = useBrand();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [loadedAt, setLoadedAt] = useState(0);

  useEffect(() => {
    if (open) setLoadedAt(Date.now());
  }, [open]);

  const toggleService = (title: string) => {
    setSelectedServices((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
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
          source: "quote",
          _hp: data.get("website"),
          loadedAt,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setSubmitted(true);
    } catch (err) {
      console.error("Quote modal error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSelectedServices([]);
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setSubmitted(false);
      setSelectedServices([]);
    }
    onOpenChange(value);
  };

  const inputClassName =
    "bg-muted/40 dark:bg-background border-border focus:bg-background dark:focus:bg-background";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg" onOpenAutoFocus={(e) => e.preventDefault()}>
        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16  bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {brand.quoteModal.successTitle}
            </h3>
            <p className="text-muted-foreground">{brand.quoteModal.successMessage}</p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <Button variant="outline" onClick={handleReset}>
                {brand.quoteModal.sendAnother}
              </Button>
              <DialogClose asChild>
                <Button variant="ghost">Close</Button>
              </DialogClose>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">{brand.quoteModal.title}</DialogTitle>
              <DialogDescription>{brand.quoteModal.subtitle}</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              {/* Honeypot */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              >
                <label htmlFor="quoteWebsite">Website</label>
                <input type="text" id="quoteWebsite" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quoteFirstName" className="font-medium">
                    {brand.quoteModal.firstNameLabel}
                  </Label>
                  <Input id="quoteFirstName" name="firstName" required className={inputClassName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quoteLastName" className="font-medium">
                    {brand.quoteModal.lastNameLabel}
                  </Label>
                  <Input id="quoteLastName" name="lastName" required className={inputClassName} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quoteEmail" className="font-medium">
                  {brand.quoteModal.emailLabel}
                </Label>
                <Input id="quoteEmail" name="email" type="email" required className={inputClassName} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quotePhone" className="font-medium">
                  {brand.quoteModal.phoneLabel}
                </Label>
                <Input id="quotePhone" name="phone" type="tel" required className={inputClassName} />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">{brand.quoteModal.servicesLabel}</Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {brand.services.items.map((service) => (
                    <label
                      key={service.title}
                      className="flex items-center gap-2 p-2  border border-border hover:bg-muted/40 cursor-pointer transition-colors text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service.title)}
                        onChange={() => toggleService(service.title)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                      <span>{service.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quoteMessage" className="font-medium">
                  {brand.quoteModal.messageLabel}
                </Label>
                <textarea
                  id="quoteMessage"
                  name="message"
                  rows={3}
                  placeholder={brand.quoteModal.messagePlaceholder}
                  className="flex w-full  border border-border bg-muted/40 dark:bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus:bg-background dark:focus:bg-background disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-colors"
                />
              </div>

              <Button type="submit" className="w-full shadow-sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  brand.quoteModal.submittingLabel
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {brand.quoteModal.submitLabel}
                  </>
                )}
              </Button>

              <DialogClose asChild>
                <Button variant="ghost" type="button" className="w-full">
                  Close
                </Button>
              </DialogClose>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
