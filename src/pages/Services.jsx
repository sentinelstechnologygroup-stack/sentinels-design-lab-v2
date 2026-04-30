     1|"use client";
     2|
     3|import Link from "next/link";
     4|import { ArrowRight, CheckCircle2 } from "lucide-react";
     5|import CTASection from "@/components/shared/CTASection";
     6|import { primaryCta, servicesPage } from "@/lib/siteData";
     7|
     8|export default function Services() {
     9|  return (
    10|    <div>
    11|      <section className="relative overflow-hidden pt-28">
    12|        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
    13|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    14|          <div className="grid items-end gap-10 lg:grid-cols-2">
    15|            <div className="pb-12 lg:pb-16">
    16|              <span className="eyebrow mb-6">Services</span>
    17|              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
    18|                {servicesPage.heroTitle}
    19|              </h1>
    20|              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
    21|                {servicesPage.heroDescription}
    22|              </p>
    23|              <div className="mt-8 flex flex-wrap gap-4">
    24|                <Link href={primaryCta.path} className="btn-primary px-7 py-3 text-sm">
    25|                  {primaryCta.label}
    26|                  <ArrowRight className="h-4 w-4" />
    27|                </Link>
    28|                <Link href="/pricing" className="btn-secondary px-7 py-3 text-sm">
    29|                  View Pricing
    30|                </Link>
    31|              </div>
    32|            </div>
    33|            <div className="hidden lg:block">
    34|              <div className="panel-safe-heavy p-8">
    35|                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Launch priority</div>
    36|                <div className="mt-5 grid gap-3">
    37|                  {servicesPage.launchPriority.map((item) => (
    38|                    <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
    39|                      {item}
    40|                    </div>
    41|                  ))}
    42|                </div>
    43|              </div>
    44|            </div>
    45|          </div>
    46|        </div>
    47|      </section>
    48|
    49|      <section className="py-20">
    50|        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    51|          <div className="mb-14 text-center">
    52|            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Core Services</span>
    53|            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Broader capability, clear launch focus</h2>
    54|          </div>
    55|          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
    56|            {servicesPage.coreServices.map((service) => (
    57|              <div key={service} className="panel-safe p-6">
    58|                <h3 className="font-heading text-xl font-semibold text-foreground">{service}</h3>
    59|              </div>
    60|            ))}
    61|          </div>
    62|        </div>
    63|      </section>
    64|
    65|      <section className="pb-20">
    66|        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
    67|          <div className="panel-safe p-8">
    68|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Launch priority services</div>
    69|            <div className="mt-5 space-y-3">
    70|              {servicesPage.launchPriority.map((item) => (
    71|                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/80">
    72|                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
    73|                  <span>{item}</span>
    74|                </div>
    75|              ))}
    76|            </div>
    77|          </div>
    78|
    79|          <div className="panel-safe p-8">
    80|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Broader capability</div>
    81|            <div className="mt-5 space-y-3">
    82|              {servicesPage.broaderCapability.map((item) => (
    83|                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/80">
    84|                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
    85|                  <span>{item}</span>
    86|                </div>
    87|              ))}
    88|            </div>
    89|          </div>
    90|        </div>
    91|      </section>
    92|
    93|      <section className="pb-20">
    94|        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    95|          <div className="panel-safe-heavy px-6 py-8 md:px-10 md:py-10">
    96|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What We Do Not Do</div>
    97|            <div className="mt-6 grid gap-4 md:grid-cols-2">
    98|              {servicesPage.notDo.map((item) => (
    99|                <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
   100|                  {item}
   101|                </div>
   102|              ))}
   103|            </div>
   104|          </div>
   105|        </div>
   106|      </section>
   107|
   108|      <CTASection />
   109|    </div>
   110|  );
   111|}
   112|