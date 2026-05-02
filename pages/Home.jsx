"use client";

import PageHero from "@/components/sections/PageHero";
import VisualTrustSection from "@/components/sections/VisualTrustSection";
import ProcessLine from "@/components/sections/ProcessLine";
import ProofPreview from "@/components/sections/ProofPreview";
import CTASection from "@/components/shared/CTASection";
import { primaryCta, secondaryCta } from "@/lib/siteData";

const processSteps = [
  { number: "01", title: "Evaluate", description: "Identify friction, goals, and the trust gaps that are costing the business momentum." },
  { number: "02", title: "Scope", description: "Define what should be built now, what should wait, and what should connect behind the site." },
  { number: "03", title: "Build", description: "Implement with clean structure, practical messaging, and controlled delivery." },
  { number: "04", title: "QA", description: "Test pages, forms, routes, responsive behavior, and failure paths before launch." },
  { number: "05", title: "Deploy", description: "Ship through managed deployment instead of patchwork publishing." },
  { number: "06", title: "Support", description: "Refine the system based on real usage, operations, and business needs." },
];

const trustItems = [
  { title: "Website redesigns", description: "Rebuild underperforming sites that no longer match the quality of the business." },
  { title: "Lead path optimization", description: "Remove confusion, tighten CTAs, and make the next step easier on every page." },
  { title: "Custom applications", description: "Build beyond brochure sites when the business needs a real operational layer." },
  { title: "Dashboards and portals", description: "Give teams and clients cleaner access to the information they actually need." },
  { title: "Automation and integrations", description: "Connect tools and workflows so the business is not held together by manual handoffs." },
  { title: "SEO-ready site foundations", description: "Structure the site so search visibility, speed, and technical clarity are built in." },
];

const previewProjects = [
  {
    title: "Website rebuilds",
    type: "Modernization",
    description: "Proof that SDL can clean up structure, trust, and lead flow on real business websites.",
    imageSrc: "/images/work/premier-current.jpg",
    imageAlt: "Premier Kitchens live website preview",
    href: "/work",
  },
  {
    title: "Local service business websites",
    type: "Lead generation",
    description: "Service-business pages built around credibility, contact clarity, and stronger first impressions.",
    imageSrc: "/images/work/bestpaint-current.jpg",
    imageAlt: "Best Solutions Distribution live website preview",
    href: "/work",
  },
  {
    title: "Custom systems and portals",
    type: "Digital systems",
    description: "Internal systems, portal layers, and practical operational tooling when a homepage is not enough.",
    imageSrc: "/images/work/dadson-admin-portal-anchor.svg",
    imageAlt: "Dadson Admin Portal system visual anchor",
    href: "/work",
  },
];

export default function Home() {
  return (
    <div>
      <PageHero
        eyebrow="Sentinels Design Lab"
        title="Websites built to win more business. Systems built where they matter."
        description="SDL rebuilds underperforming websites and replaces disconnected tools with controlled, scalable systems for businesses that need stronger trust, clearer messaging, and cleaner operations."
        primaryCtaLabel={primaryCta.label}
        primaryCtaHref={primaryCta.path}
        secondaryCtaLabel={secondaryCta.label}
        secondaryCtaHref={secondaryCta.path}
        imageSrc="/images/home/x.png"
        imageAlt="Approved SDL homepage hero visual showing a connected digital ecosystem over a city backdrop"
      >
        <div className="grid gap-3 text-sm text-white/68 sm:grid-cols-3">
          <div>Modern website rebuilds for trust and lead flow</div>
          <div>Operational systems when the business needs more than pages</div>
          <div>Controlled builds, managed deployments, and cleaner long-term ownership</div>
        </div>
      </PageHero>

      <section className="pb-12 md:pb-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 text-sm text-white/70 sm:grid-cols-3 sm:px-6 lg:px-8">
          <div className="border-b border-white/8 pb-4 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-4">Website-first positioning for service businesses that need cleaner trust and lead flow.</div>
          <div className="border-b border-white/8 pb-4 sm:border-b-0 sm:border-r sm:px-4 sm:pb-0">Systems capability stays behind the public site until the business actually needs deeper operational support.</div>
          <div className="sm:pl-4">Proof stays grounded in real project visuals and practical delivery — not inflated agency claims.</div>
        </div>
      </section>

      <VisualTrustSection
        eyebrow="What SDL Actually Does"
        title="Websites first. Systems where they matter."
        body="We rebuild underperforming websites and replace disconnected tools with controlled, scalable systems."
        items={trustItems}
        visualType="image"
        imageSrc="/images/packages/hero-2.png"
        imageAlt="Approved SDL systems flow visual"
      />

      <ProcessLine steps={processSteps} />

      <ProofPreview projects={previewProjects} />

      <CTASection />
    </div>
  );
}
