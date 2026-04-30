     1|"use client";
     2|
     3|import CTASection from "@/components/shared/CTASection";
     4|import { pricingFactors, pricingPackages } from "@/lib/siteData";
     5|import PricingCard from "@/components/shared/PricingCard";
     6|
     7|export default function Pricing() {
     8|  return (
     9|    <div>
    10|      <section className="relative overflow-hidden pt-28">
    11|        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
    12|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    13|          <div className="grid items-end gap-10 lg:grid-cols-2">
    14|            <div className="pb-12 lg:pb-16">
    15|              <span className="eyebrow mb-6">Pricing</span>
    16|              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
    17|                Public website pricing that still leaves room for custom digital builds
    18|              </h1>
    19|              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
    20|                Website packages are starting points. Custom portals, dashboards, automations, integrations, and application builds are scoped separately after discovery.
    21|              </p>
    22|            </div>
    23|            <div className="hidden lg:block">
    24|              <div className="panel-safe-heavy p-8">
    25|                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Important</div>
    26|                <p className="mt-4 text-sm leading-7 text-muted-foreground">
    27|                  SDL leads publicly with website evaluation, redesign, and build offers because that is the fastest path to real customers. Broader digital-system work is quoted after scope.
    28|                </p>
    29|              </div>
    30|            </div>
    31|          </div>
    32|        </div>
    33|      </section>
    34|
    35|      <section className="pb-20">
    36|        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    37|          <div className="grid gap-6 lg:grid-cols-4">
    38|            {pricingPackages.map((item) => (
    39|              <div key={item.name}>
    40|                <PricingCard
    41|                  name={item.name}
    42|                  price={item.price}
    43|                  features={item.features}
    44|                  featured={item.featured}
    45|                />
    46|                <p className="mt-4 px-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
    47|              </div>
    48|            ))}
    49|          </div>
    50|        </div>
    51|      </section>
    52|
    53|      <section className="pb-20">
    54|        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    55|          <div className="panel-safe p-8 md:p-10">
    56|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What affects price</div>
    57|            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    58|              {pricingFactors.map((factor) => (
    59|                <div key={factor} className="surface-subtle px-4 py-4 text-sm text-white/80">
    60|                  {factor}
    61|                </div>
    62|              ))}
    63|            </div>
    64|          </div>
    65|        </div>
    66|      </section>
    67|
    68|      <CTASection ctaLabel="Request Website Evaluation" />
    69|    </div>
    70|  );
    71|}
    72|