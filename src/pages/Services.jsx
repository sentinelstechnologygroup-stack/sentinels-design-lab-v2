"use client";

import CTASection from "@/components/shared/CTASection";
import PageHero from "@/components/sections/PageHero";
import ServicesFlow from "@/components/sections/ServicesFlow";
import { primaryCta, servicesPage } from "@/lib/siteData";

export default function Services() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title={servicesPage.heroTitle}
        description={servicesPage.heroDescription}
        primaryCtaLabel={primaryCta.label}
        primaryCtaHref={primaryCta.path}
        secondaryCtaLabel="View Pricing"
        secondaryCtaHref="/pricing"
        imageSrc="/images/packages/hero-2.png"
        imageAlt="Approved SDL services hero visual"
      >
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          Website redesign packages start at published pricing. SEO, PPC, branding, ecommerce, hosting, automations, dashboards, portals, and custom systems are scoped separately after evaluation.
        </p>
      </PageHero>

      <ServicesFlow />

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-white/10 bg-[#0B1220]/82 px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Automation, Integrations & Middleware</div>
                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">{servicesPage.middlewareService.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{servicesPage.middlewareService.description}</p>
              </div>
              <ul className="space-y-4 text-sm leading-7 text-white/75">
                {servicesPage.middlewareService.points.map((item) => (
                  <li key={item} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[30px] border border-white/10 bg-[#0B1220]/82 px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur md:px-10 md:py-10">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What We Do Not Do</div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {servicesPage.notDo.map((item) => (
                <div key={item} className="rounded-[22px] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/75">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
