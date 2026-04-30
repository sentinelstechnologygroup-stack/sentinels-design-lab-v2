"use client";

import CTASection from "@/components/shared/CTASection";
import { aboutSections, primaryCta } from "@/lib/siteData";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div>
      <section className="relative overflow-hidden pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div className="pb-12 lg:pb-16">
              <span className="eyebrow mb-6">About</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                Full-stack digital solutions built for practical business use
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {aboutSections.whoWeAre}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={primaryCta.path} className="btn-primary px-7 py-3 text-sm">
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/work" className="btn-secondary px-7 py-3 text-sm">
                  View Work
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/images/about/hero.png"
                alt="Sentinels Design Lab"
                className="rounded-t-2xl border border-border/30 shadow-2xl shadow-black/30"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="panel-safe p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What We Build</div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {aboutSections.whatWeBuild.map((item) => (
                <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel-safe p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Our Doctrine</div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{aboutSections.doctrine}</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="panel-safe p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Who We Help</div>
            <div className="mt-5 space-y-3">
              {aboutSections.whoWeHelp.map((item) => (
                <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="panel-safe p-8">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">How We Work</div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {aboutSections.howWeWork.map((item, index) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">0{index + 1}</div>
                  <div className="mt-2 font-heading text-xl font-semibold text-foreground">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
