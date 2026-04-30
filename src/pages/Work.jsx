     1|"use client";
     2|
     3|import Link from "next/link";
     4|import { ArrowRight, ExternalLink } from "lucide-react";
     5|import CTASection from "@/components/shared/CTASection";
     6|import { workProjects } from "@/lib/siteData";
     7|
     8|export default function Work() {
     9|  return (
    10|    <div>
    11|      <section className="relative overflow-hidden pt-28">
    12|        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
    13|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    14|          <div className="grid items-end gap-10 lg:grid-cols-2">
    15|            <div className="pb-12 lg:pb-16">
    16|              <span className="eyebrow mb-6">Work</span>
    17|              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
    18|                Real modernization work. No fake case studies.
    19|              </h1>
    20|              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
    21|                A look at real rebuilds, modernization work, and digital improvements completed by SDL.
    22|              </p>
    23|            </div>
    24|            <div className="hidden lg:block">
    25|              <div className="panel-safe-heavy p-8">
    26|                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Proof standard</div>
    27|                <p className="mt-4 text-sm leading-7 text-muted-foreground">
    28|                  SDL does not use fake testimonials, fake rankings, fake revenue lifts, or invented case-study metrics. This page is intentionally grounded in real work only.
    29|                </p>
    30|              </div>
    31|            </div>
    32|          </div>
    33|        </div>
    34|      </section>
    35|
    36|      <section className="pb-20">
    37|        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    38|          <div className="grid gap-6 lg:grid-cols-2">
    39|            {workProjects.map((project) => (
    40|              <article key={project.slug} className="panel-safe overflow-hidden p-6 md:p-8">
    41|                <div className="flex flex-wrap items-start justify-between gap-4">
    42|                  <div>
    43|                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{project.industry}</div>
    44|                    <h2 className="mt-3 font-heading text-2xl font-bold text-foreground">{project.name}</h2>
    45|                  </div>
    46|                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70">
    47|                    {project.status}
    48|                  </div>
    49|                </div>
    50|
    51|                <div className="mt-6 grid gap-4 md:grid-cols-2">
    52|                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5">
    53|                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Before</div>
    54|                    <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-[#09111f] px-4 py-10 text-center text-sm text-white/65">
    55|                      {project.beforeAsset}
    56|                    </div>
    57|                  </div>
    58|                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 to-white/[0.02] p-5">
    59|                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Current / rebuilt</div>
    60|                    <div className="mt-6 rounded-2xl border border-white/10 bg-[#09111f] px-4 py-10 text-center text-sm text-white/70">
    61|                      {project.currentAsset}
    62|                    </div>
    63|                  </div>
    64|                </div>
    65|
    66|                <div className="mt-6">
    67|                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Original issue</div>
    68|                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.originalIssue}</p>
    69|                </div>
    70|
    71|                <div className="mt-6">
    72|                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">What SDL improved</div>
    73|                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
    74|                    {project.improvements.map((item) => (
    75|                      <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
    76|                        {item}
    77|                      </div>
    78|                    ))}
    79|                  </div>
    80|                </div>
    81|
    82|                <div className="mt-6 flex flex-wrap gap-4">
    83|                  <Link href="/contact?type=website-evaluation" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white">
    84|                    Request a website evaluation
    85|                    <ArrowRight className="h-4 w-4" />
    86|                  </Link>
    87|                  {project.liveLink ? (
    88|                    <a href={project.liveLink} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white">
    89|                      View live site
    90|                      <ExternalLink className="h-4 w-4" />
    91|                    </a>
    92|                  ) : null}
    93|                </div>
    94|              </article>
    95|            ))}
    96|          </div>
    97|        </div>
    98|      </section>
    99|
   100|      <CTASection ctaLabel="Get Website Evaluation" />
   101|    </div>
   102|  );
   103|}
   104|