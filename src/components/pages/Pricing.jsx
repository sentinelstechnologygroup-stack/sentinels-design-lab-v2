"use client";

import CTASection from "@/components/shared/CTASection";
import PageHero from "@/components/sections/PageHero";
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
      <PageHero
        eyebrow="Pricing"
        title="Public website pricing that still leaves room for custom digital builds"
        description="The packages below cover website redesign work. SEO, PPC, branding, ecommerce, hosting, maintenance, automation, dashboards, portals, and custom digital systems are quoted separately based on scope."
        primaryCtaLabel="Get Website Evaluation"
        primaryCtaHref="/contact?type=website-evaluation"
        secondaryCtaLabel="Contact"
        secondaryCtaHref="/contact"
        imageSrc="/images/hero/pricing-hero.webp"
        imageAlt="Approved SDL pricing hero visual"
      />

      <section className="pb-12 md:pb-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {pricingNotes.map((note) => (
              <div key={note.title} className="readability-inner h-full px-5 py-5 md:px-6">
                <div className="text-sm font-semibold text-foreground">{note.title}</div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{note.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-5 pb-16 md:pb-20">
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
                <div className="eyebrow mb-3">What affects price</div>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  The final price depends on content readiness, structural complexity, and how much system work sits behind the public website.
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {pricingFactors.map((factor) => (
                <div key={factor} className="readability-inner px-4 py-4 text-sm text-white/80">
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
