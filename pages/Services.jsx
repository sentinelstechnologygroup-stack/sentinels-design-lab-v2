"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import { primaryCta, servicesPage } from "@/lib/siteData";

export default function Services() {
  return (
    <div>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div className="pb-12 lg:pb-16">
              <span className="eyebrow mb-6">Services</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                {servicesPage.heroTitle}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {servicesPage.heroDescription}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                Website redesign packages start at published pricing. SEO, PPC, branding, ecommerce, hosting, automations, dashboards, portals, and custom systems are scoped separately after evaluation.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={primaryCta.path} className="btn-primary px-7 py-3 text-sm">
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/pricing" className="btn-secondary px-7 py-3 text-sm">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="panel-safe-heavy p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Launch priority</div>
                <div className="mt-5 grid gap-3">
                  {servicesPage.launchPriority.map((item) => (
                    <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Core Services</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Broader capability, clear launch focus</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {servicesPage.coreServices.map((service) => (
              <div key={service} className="panel-safe p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground">{service}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="panel-safe p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Launch priority services</div>
            <div className="mt-5 space-y-3">
              {servicesPage.launchPriority.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-safe p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Broader capability</div>
            <div className="mt-5 space-y-3">
              {servicesPage.broaderCapability.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel-safe-heavy px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">New service</div>
                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  {servicesPage.middlewareService.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  {servicesPage.middlewareService.description}
                </p>
              </div>
              <div className="grid gap-3">
                {servicesPage.middlewareService.points.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/80">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel-safe-heavy px-6 py-8 md:px-10 md:py-10">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What We Do Not Do</div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {servicesPage.notDo.map((item) => (
                <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
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
