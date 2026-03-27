"use client";

import Image from "next/image";
import { useBrand } from "@/contexts/brand-context";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

export function AboutPhotoGridQuote() {
  const { brand } = useBrand();

  return (
    <section
      id="about"
      className="scroll-mt-28 relative overflow-hidden py-20 lg:py-32"
    >
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10  blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5  blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4">
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-5xl tracking-tight font-bold mb-4">
              {brand.about.headline}
            </h2>
            <p className="text-lg lg:text-2xl text-muted-foreground">
              {brand.about.subheadline}
            </p>
          </div>
        </AnimateOnScroll>

        {/* Photo grid */}
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16 md:h-[400px] lg:h-[450px] -mx-4 md:mx-0">
            <div className="hidden lg:block  overflow-hidden border border-black/[0.06] dark:border-white/10">
              <Image
                src="/jobs/electrician-commercial-wire-pull.jpg"
                alt="Team at work"
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden lg:block  overflow-hidden border border-black/[0.06] dark:border-white/10">
              <Image
                src="/jobs/fully-stocked-work-van.jpg"
                alt="Work van"
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block  overflow-hidden border border-black/[0.06] dark:border-white/10">
              <Image
                src="/jobs/electrician-on-site.png"
                alt="On site"
                width={400}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-2 rounded-none  overflow-hidden border-y md:border border-black/[0.06] dark:border-white/10 aspect-[3/2] md:aspect-auto">
              <Image
                src="/jobs/service-mast-rooftop-install.png"
                alt="Rooftop install"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </AnimateOnScroll>

        {/* Description + shop photo */}
        <AnimateOnScroll animation="fade-up" triggerOnce={false}>
          <div className="grid lg:grid-cols-2 gap-8 mb-16 mt-2.5 lg:mt-0 -mx-4 md:mx-0">
            <div className="relative p-8 lg:p-10 mx-4 md:mx-0 bg-white/5 backdrop-blur-md ">
              <span className="absolute top-4 left-6 text-6xl lg:text-9xl font-serif text-primary/20 leading-none select-none">
                &ldquo;
              </span>
              <p className="relative z-10 text-muted-foreground pt-8 lg:pt-10 text-base lg:text-xl leading-relaxed">
                {brand.about.description}
              </p>
              <span className="absolute bottom-4 right-6 text-6xl lg:text-8xl font-serif text-primary/20 leading-none select-none">
                &rdquo;
              </span>
            </div>
            <div className="relative rounded-none  overflow-hidden border-y md:border border-black/[0.06] dark:border-white/10 min-h-[300px] lg:min-h-0">
              <Image
                src="/suburb.jpg"
                alt={brand.company.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </AnimateOnScroll>

        {/* Values */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center gap-0">
          {brand.about.values.map((value, index) => {
            const num = String(index + 1).padStart(2, "0");
            const isLast = index === brand.about.values.length - 1;
            return (
              <AnimateOnScroll
                key={value.title}
                animation="fade-up"
                delay={index * 120}
              >
                <div className="group relative flex items-start gap-5 lg:flex-col lg:items-center lg:text-center px-4 lg:px-10 py-8 lg:py-0">
                  {!isLast && (
                    <div className="absolute left-[2.35rem] top-[4.5rem] bottom-0 w-px bg-gradient-to-b from-primary/20 to-transparent lg:hidden" />
                  )}
                  {!isLast && (
                    <div className="absolute right-0 top-1/2 hidden lg:block w-px h-12 -translate-y-1/2 bg-gradient-to-b from-transparent via-border to-transparent" />
                  )}
                  <div className="relative shrink-0">
                    <span className="text-6xl lg:text-8xl font-black tracking-tighter bg-gradient-to-b from-primary/25 to-primary/5 bg-clip-text text-transparent select-none leading-none">
                      {num}
                    </span>
                  </div>
                  <div className="pt-2 lg:pt-4 lg:max-w-xs">
                    <h3 className="text-lg lg:text-xl font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {value.description}
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
