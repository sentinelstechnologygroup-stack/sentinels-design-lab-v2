"use client";

import CTASection from "@/components/shared/CTASection";
import { pricingFactors, pricingPackages } from "@/lib/siteData";
import PricingCard from "@/components/shared/PricingCard";

const pricingNotes = [
  {
    title: "Website evaluation first",
    description:
      "Every package starts with evaluation, scope clarity, and the cleanest next-step recommendation.",
  },
  {
    title: "Build scope drives final price",
    description:
      "Page count, content readiness, galleries, integrations, and timeline affect the final project shape.",
  },
  {
    title: "Custom systems quoted separately",
    description:
      "Portals, dashboards, automations, and deeper integrations move into scoped digital-build pricing after discovery.",
  },
];

export default function Pricing() {
  return (
    <div>
      <section className="relative overflow-hidden pt-28 pb-10 md:pb-14">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10">
            <div className="pb-4 lg:pb-6">
              <span className="eyebrow mb-6">Pricing</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                Public website pricing that still leaves room for custom digital builds
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Website packages are starting points. The packages below cover website redesign work. SEO, PPC, branding, ecommerce, hosting, maintenance, automation, dashboards, portals, and custom digital systems are quoted separately based on scope.
              </p>
            </div>
            <div className="panel-safe-heavy p-7 md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Important</div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                SDL leads publicly with website evaluation, redesign, and build offers because that is the fastest path to real customers. Broader digital-system work is quoted after scope.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {pricingNotes.map((note) => (
              <div key={note.title} className="surface-subtle h-full px-5 py-5 md:px-6">
                <div className="text-sm font-semibold text-foreground">{note.title}</div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{note.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
            {pricingPackages.map((item) => (
              <PricingCard
                key={item.name}
                name={item.name}
                price={item.price}
                description={item.description}
                features={item.features}
                featured={item.featured}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel-safe p-7 md:p-8 lg:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What affects price</div>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  The final price depends on content readiness, structural complexity, and how much system work sits behind the public website.
                </p>
              </div>
            </div>
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
