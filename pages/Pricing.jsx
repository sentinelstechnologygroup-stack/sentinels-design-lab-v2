"use client";

import CTASection from "@/components/shared/CTASection";
import { pricingFactors, pricingPackages } from "@/lib/siteData";
import PricingCard from "@/components/shared/PricingCard";

export default function Pricing() {
  return (
    <div>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div className="pb-12 lg:pb-16">
              <span className="eyebrow mb-6">Pricing</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                Public website pricing that still leaves room for custom digital builds
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Website packages are starting points. Custom portals, dashboards, automations, integrations, and application builds are scoped separately after discovery.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="panel-safe-heavy p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Important</div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  SDL leads publicly with website evaluation, redesign, and build offers because that is the fastest path to real customers. Broader digital-system work is quoted after scope.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-4">
            {pricingPackages.map((item) => (
              <div key={item.name}>
                <PricingCard
                  name={item.name}
                  price={item.price}
                  features={item.features}
                  featured={item.featured}
                />
                <p className="mt-4 px-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel-safe p-8 md:p-10">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What affects price</div>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {pricingFactors.map((factor) => (
                <div key={factor} className="surface-subtle px-4 py-4 text-sm text-white/80">
                  {factor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection ctaLabel="Request Website Evaluation" />
    </div>
  );
}
