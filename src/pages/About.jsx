     1|"use client";
     2|
     3|import CTASection from "@/components/shared/CTASection";
     4|import { aboutSections, primaryCta } from "@/lib/siteData";
     5|import Link from "next/link";
     6|import { ArrowRight } from "lucide-react";
     7|
     8|export default function About() {
     9|  return (
    10|    <div>
    11|      <section className="relative overflow-hidden pt-28">
    12|        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
    13|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    14|          <div className="grid items-end gap-10 lg:grid-cols-2">
    15|            <div className="pb-12 lg:pb-16">
    16|              <span className="eyebrow mb-6">About</span>
    17|              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
    18|                Full-stack digital solutions built for practical business use
    19|              </h1>
    20|              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
    21|                {aboutSections.whoWeAre}
    22|              </p>
    23|              <div className="mt-8 flex flex-wrap gap-4">
    24|                <Link href={primaryCta.path} className="btn-primary px-7 py-3 text-sm">
    25|                  {primaryCta.label}
    26|                  <ArrowRight className="h-4 w-4" />
    27|                </Link>
    28|                <Link href="/work" className="btn-secondary px-7 py-3 text-sm">
    29|                  View Work
    30|                </Link>
    31|              </div>
    32|            </div>
    33|            <div className="hidden lg:block">
    34|              <img
    35|                src="/images/about/hero.png"
    36|                alt="Sentinels Design Lab"
    37|                className="rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30"
    38|              />
    39|            </div>
    40|          </div>
    41|        </div>
    42|      </section>
    43|
    44|      <section className="py-20">
    45|        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
    46|          <div className="panel-safe p-8">
    47|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What We Build</div>
    48|            <div className="mt-6 grid gap-3 sm:grid-cols-2">
    49|              {aboutSections.whatWeBuild.map((item) => (
    50|                <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
    51|                  {item}
    52|                </div>
    53|              ))}
    54|            </div>
    55|          </div>
    56|
    57|          <div className="panel-safe p-8">
    58|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Our Doctrine</div>
    59|            <p className="mt-4 text-sm leading-7 text-muted-foreground">{aboutSections.doctrine}</p>
    60|          </div>
    61|        </div>
    62|      </section>
    63|
    64|      <section className="pb-20">
    65|        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
    66|          <div className="panel-safe p-8">
    67|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Who We Help</div>
    68|            <div className="mt-5 space-y-3">
    69|              {aboutSections.whoWeHelp.map((item) => (
    70|                <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
    71|                  {item}
    72|                </div>
    73|              ))}
    74|            </div>
    75|          </div>
    76|
    77|          <div className="panel-safe p-8">
    78|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">How We Work</div>
    79|            <div className="mt-6 grid gap-3 sm:grid-cols-2">
    80|              {aboutSections.howWeWork.map((item, index) => (
    81|                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
    82|                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">0{index + 1}</div>
    83|                  <div className="mt-2 font-heading text-xl font-semibold text-foreground">{item}</div>
    84|                </div>
    85|              ))}
    86|            </div>
    87|          </div>
    88|        </div>
    89|      </section>
    90|
    91|      <CTASection />
    92|    </div>
    93|  );
    94|}
    95|