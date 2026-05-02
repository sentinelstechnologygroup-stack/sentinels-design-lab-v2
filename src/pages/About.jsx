"use client";

import CTASection from "@/components/shared/CTASection";
import PageHero from "@/components/sections/PageHero";
import TimelineStrip from "@/components/sections/TimelineStrip";
import { primaryCta, aboutSections } from "@/lib/siteData";

const timelineItems = aboutSections.timeline.map((item) => ({
  ...item,
  highlight: item.year === "2026",
}));

const whatWeBuild = [
  "Modern websites",
  "Website redesigns",
  "Custom systems",
  "Dashboards and portals",
  "Automations and integrations",
  "Lead-generation systems",
];

const whoWeHelp = [
  "Businesses with outdated websites",
  "Businesses outgrowing templates",
  "Service companies needing stronger lead flow",
  "Teams needing systems, dashboards, portals, or automation",
];

const process = ["evaluate", "scope", "build", "QA", "deploy", "support"];

export default function About() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        title="Built from real work, not theory."
        description="Sentinels Design Lab was built from hands-on experience fixing broken websites and rebuilding real business systems."
        primaryCtaLabel={primaryCta.label}
        primaryCtaHref={primaryCta.path}
        secondaryCtaLabel="View Work"
        secondaryCtaHref="/work"
        imageSrc="/images/about/hero.png"
        imageAlt="Digital systems visual representing SDL project delivery"
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Where this came from</div>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">SDL didn’t start as an agency.</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>It started by fixing broken websites, unreliable systems, and disconnected tools for real businesses that needed cleaner ways to operate.</p>
                <p>That work turned into a repeatable delivery model built around practical execution instead of vague creative promises.</p>
                <p className="text-white/80">{process.join(" → ")}</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 text-sm leading-7 text-white/72">
                SDL’s operating model is built on trust, structure, and proof — not decorative layers that make the work look larger than it is.
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 text-sm leading-7 text-white/72">
                The goal is not to impress people with jargon. The goal is to make the business look more credible, convert more cleanly, and run more smoothly.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What we build</div>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Practical digital work, kept focused.</h2>
              <ul className="mt-8 space-y-4 text-base leading-7 text-white/78">
                {whatWeBuild.map((item) => (
                  <li key={item} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Doctrine</div>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Lean builds. Controlled delivery.</h2>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">We build using</div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/72">
                    <li>lean code</li>
                    <li>controlled deployments</li>
                    <li>managed infrastructure</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">We do not use</div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-white/72">
                    <li>plugin stacks as the default answer</li>
                    <li>bloated templates</li>
                    <li>decorative-only features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TimelineStrip items={timelineItems} />

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Who we help</div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Businesses that have outgrown patchwork.</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {whoWeHelp.map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/[0.03] px-5 py-5 text-sm leading-7 text-white/72">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
