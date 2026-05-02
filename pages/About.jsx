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
        imageAlt="Approved SDL about hero visual"
      />

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-start">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Origin</div>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Built from real work, not theory.</h2>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted-foreground">
                <p>SDL started by fixing broken websites, unreliable systems, and disconnected tools for real businesses that needed cleaner ways to operate.</p>
                <p>That work became a repeatable delivery model focused on evaluation, scope clarity, controlled builds, and practical support after launch.</p>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#0B1220]/82 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why it matters</div>
              <p className="mt-5 text-sm leading-8 text-white/74">The goal is not to make the agency look larger than it is. The goal is to make the business look more credible, convert more cleanly, and run more smoothly.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What we build</div>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Practical digital work, kept focused.</h2>
              <ul className="mt-8 space-y-4 text-base leading-7 text-white/78">
                {whatWeBuild.map((item) => (
                  <li key={item} className="border-b border-white/8 pb-4 last:border-b-0 last:pb-0">{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-[#0B1220]/82 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Our doctrine</div>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Lean builds. Controlled delivery.</h2>
              <p className="mt-5 text-sm leading-8 text-white/74">SDL uses lean code, managed infrastructure, and controlled deployments instead of plugin stacks, bloated templates, or decorative-only features.</p>
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
          <ul className="mt-8 grid gap-4 text-sm leading-7 text-white/74 md:grid-cols-2">
            {whoWeHelp.map((item) => (
              <li key={item} className="border-b border-white/8 pb-4 last:border-b-0 md:pb-5">{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
