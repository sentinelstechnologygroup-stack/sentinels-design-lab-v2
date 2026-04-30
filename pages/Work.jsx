"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import { workProjects } from "@/lib/siteData";

export default function Work() {
  return (
    <div>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div className="pb-12 lg:pb-16">
              <span className="eyebrow mb-6">Work</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                Real modernization work. No fake case studies.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A look at real rebuilds, modernization work, and digital improvements completed by SDL.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="panel-safe-heavy p-8">
                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Proof standard</div>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  SDL does not use fake testimonials, fake rankings, fake revenue lifts, or invented case-study metrics. This page is intentionally grounded in real work only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {workProjects.map((project) => (
              <article key={project.slug} className="panel-safe overflow-hidden p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{project.industry}</div>
                    <h2 className="mt-3 font-heading text-2xl font-bold text-foreground">{project.name}</h2>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70">
                    {project.status}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Before</div>
                    <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-[#09111f] px-4 py-10 text-center text-sm text-white/65">
                      {project.beforeAsset}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 to-white/[0.02] p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Current / rebuilt</div>
                    <div className="mt-6 rounded-2xl border border-white/10 bg-[#09111f] px-4 py-10 text-center text-sm text-white/70">
                      {project.currentAsset}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">Original issue</div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.originalIssue}</p>
                </div>

                <div className="mt-6">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">What SDL improved</div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {project.improvements.map((item) => (
                      <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Link href="/contact?type=website-evaluation" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white">
                    Request a website evaluation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {project.liveLink ? (
                    <a href={project.liveLink} className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white">
                      View live site
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection ctaLabel="Get Website Evaluation" />
    </div>
  );
}
