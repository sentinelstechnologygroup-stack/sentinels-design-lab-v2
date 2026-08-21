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
    title: "Built and managed for you",
    description:
      "Your monthly website plan includes the build, hosting, maintenance, security, backups, monitoring, deployment management, and routine technical support.",
  },
  {
    title: "No separate maintenance plan",
    description:
      "The managed service is part of the website plan from day one, so clients are not handed a site and left to manage the technical stack themselves.",
  },
  {
    title: "Custom systems stay custom",
    description:
      "Software, CRM, portals, dashboards, AI, automation, ecommerce, and deeper integrations are scoped separately around the business requirements.",
  },
];

export default function Pricing() {
  return (
    <div>
      <PageHero
        eyebrow="Pricing"
        title="Professional websites without the large upfront investment"
        description="Choose a managed monthly website plan that includes the build and the ongoing technical care required to keep it secure, maintained, monitored, and online. Custom software, CRM, portals, AI, and advanced digital systems are scoped separately."
        primaryCtaLabel="Get Website Evaluation"
        primaryCtaHref="/contact?type=website-evaluation"
        secondaryCtaLabel="Contact"
        secondaryCtaHref="/contact"
        imageSrc="/images/hero/pricing-hero.webp"
        imageAlt="Sentinels Design Lab managed website plans"
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

      <section className="pt-5 pb-10 md:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:items-stretch">
            {pricingPackages.map((item) => (
              <PricingCard
                key={item.name}
                name={item.name}
                price={item.price}
                periodLabel={item.periodLabel}
                categoryLabel={item.categoryLabel}
                ctaLabel={item.ctaLabel}
                description={item.description}
                features={item.features}
                featured={item.featured}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="readability-banner px-6 py-7 text-center md:px-10 md:py-9">
            <div className="eyebrow mb-3">Prefer to own it outright?</div>
            <h2 className="font-heading text-2xl font-bold text-foreground md:text-3xl">
              Prefer to purchase your website outright?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              Traditional project pricing is available. We&apos;ll scope the build, provide an upfront project price, and define the ongoing hosting and maintenance arrangement separately.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14 md:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="panel-safe p-7 md:p-8 lg:p-10">
            <div className="eyebrow mb-3">Included with every managed website plan</div>
            <h2 className="max-w-3xl font-heading text-2xl font-bold text-foreground md:text-3xl">
              The website and the technical care behind it are one service.
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              SDL manages the production foundation so clients are not left coordinating separate hosting, routine technical maintenance, security basics, backups, monitoring, or deployment support.
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

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="panel-safe p-7 md:p-8 lg:p-10">
              <div className="eyebrow mb-3">What can affect scope</div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                The monthly plans cover the standard managed website scope. Larger content requirements, custom functionality, and system-level work can change the recommended plan or require a custom quote.
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
              <div className="eyebrow mb-3">Not included in the base plan</div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                Pass-through costs and material additions outside the selected plan remain separate so monthly pricing stays predictable.
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
