"use client";

import { Phone, Shield, AlertTriangle, Clock } from "lucide-react";
import { useBrand } from "@/contexts/brand-context";

export function EmergencyDefault() {
  const { brand } = useBrand();

  return (
    <section
      id="emergency"
      className="relative overflow-hidden bg-primary text-primary-foreground py-14 lg:py-18"
    >
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)",
          backgroundSize: "10px 10px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10  blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-white/5  blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">

          {/* Left — message */}
          <div className="text-center space-y-4 max-w-2xl">
            <div className="flex items-center gap-2 justify-center">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80">
                24 / 7 Emergency Storm Response
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black leading-tight">
              Storm Damage?{" "}
              <span className="opacity-80">We Respond Today.</span>
            </h2>

            <p className="text-sm lg:text-base opacity-70 leading-relaxed max-w-xl">
              Don't wait — unprotected roof damage compounds fast. We dispatch
              within hours, tarp the same day, and work directly with your
              insurance company at no extra cost to you.
            </p>

            <div className="flex flex-wrap items-center gap-4 justify-center pt-1">
              {[
                { icon: Clock,  label: "Same-Day Response" },
                { icon: Shield, label: "Insurance Assistance" },
                { icon: Phone,  label: "No Voicemail — Always Live" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-xs opacity-75">
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — phone CTA */}
          <div className="shrink-0 flex flex-col items-center gap-3">
            <a
              href={`tel:${brand.company.phone.replace(/\D/g, "")}`}
              className="group flex items-center gap-4 bg-white/15 hover:bg-white/25 border border-white/25 hover:border-white/40  px-8 py-5 transition-all duration-300 shadow-xl"
            >
              <div className="w-12 h-12  bg-white/20 group-hover:bg-white/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider opacity-70 mb-0.5">
                  Call Now — Available 24 / 7
                </p>
                <p className="text-2xl lg:text-3xl font-black tracking-tight leading-none">
                  {brand.company.phone}
                </p>
              </div>
            </a>
            <p className="text-[11px] opacity-50 text-center">
              {brand.company.name} · {brand.company.address}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
