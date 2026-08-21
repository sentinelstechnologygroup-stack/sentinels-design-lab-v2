"use client";

import CTASection from "@/components/shared/CTASection";
import PageHero from "@/components/sections/PageHero";
import PricingCard from "@/components/shared/PricingCard";
import {
  managedWebsiteIncludes,
  pricingExclusions,
  pricingFactors,
  pricingPackages,
} from "@/lib/pricingData";

const pricingNotes = [
  {
    title: "Website evaluation first",
    description:
      "Every package starts with a website evaluation, scope clarity, and the cleanest recommendation for the business.",
  },
  {
    title: "Managed after launch",
    description:
      "Every website package includes managed hosting, maintenance, security, backups, monitoring, and basic technical support.",
  },
  {
    title: "Custom systems scoped separately",
    description:
      "Portals, dashboards, automations, ecommerce, and deeper integrations move into discovery-led digital-build pricing.",
  },
];

export default function Pricing() {
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="Straightforward website pricing with the essentials already included"
        description="Website packages start at $2,500 and include the launch plus the managed infrastructure required to keep the site online, maintained, secure, backed up, monitored, and supported. Advanced SEO, PPC, branding, ecommerce, automation, portals, dashboards, and custom integrations are scoped separately when needed."
        primaryCtaLabel="Get Website Evaluation"
        primaryCtaHref="/contact?type=website-evaluation"
        secondaryCtaLabel="Contact"
        secondaryCtaHref="/contact"
        imageSrc="/images/hero/pricing-hero.webp"
        imageAlt="Sentinels Design Lab website pricing and managed support"
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

      <section className="pb-14 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel-safe p-7 md:p-8 lg:p-10">
            <div className="eyebrow mb-3">Included with every website package</div>
            <h2 className="max-w-3xl font-heading text-2xl font-bold text-foreground md:text-3xl">
              Build, launch, hosting, maintenance, and ongoing website care are part of the package.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              SDL manages the production foundation so clients are not left coordinating separate hosting, routine maintenance, security basics, backups, or deployment support after launch.
            </p>

            <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {managedWebsiteIncludes.map((item) => (
                <div key={item} className="readability-inner px-4 py-4 text-sm leading-6 text-white/80">
                  {item}
                </div>
              ))}
            </div>
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
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="panel-safe p-7 md:p-8 lg:p-10">
              <div className="eyebrow mb-3">What affects price</div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                The final build price depends on content readiness, structural complexity, and any work that extends beyond the standard website package.
              </p>
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {pricingFactors.map((factor) => (
                  <div key={factor} className="readability-inner px-4 py-4 text-sm text-white/80">
                    {factor}
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-safe p-7 md:p-8 lg:p-10">
              <div className="eyebrow mb-3">Quoted separately when needed</div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                The website package covers the core managed website service. Pass-through costs and material scope additions remain separate so the base package stays predictable.
              </p>
              <div className="mt-6 grid gap-3">
                {pricingExclusions.map((item) => (
                  <div key={item} className="readability-inner px-4 py-4 text-sm text-white/80">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection ctaLabel="Request Website Evaluation" />
    </div>
  );
}
