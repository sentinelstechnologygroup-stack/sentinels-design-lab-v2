"use client";

import PageHero from "@/components/sections/PageHero";
import VisualTrustSection from "@/components/sections/VisualTrustSection";
import ProcessLine from "@/components/sections/ProcessLine";
import ProofPreview from "@/components/sections/ProofPreview";
import CTASection from "@/components/shared/CTASection";
import { primaryCta, secondaryCta, workProjects } from "@/lib/siteData";

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
  const featuredVisual = workProjects.find((project) => project.slug === "best-solutions-distribution");

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
        imageSrc={featuredVisual?.media?.[0]?.src || "/images/about/hero.png"}
        imageAlt={featuredVisual?.media?.[0]?.alt || "Sentinels Design Lab project visual"}
      >
        <div className="grid gap-3 text-sm text-white/68 sm:grid-cols-3">
          <div>Modern website rebuilds for trust and lead flow</div>
          <div>Operational systems when the business needs more than pages</div>
          <div>Controlled builds, managed deployments, and cleaner long-term ownership</div>
        </div>
      </PageHero>

      <VisualTrustSection
        eyebrow="What SDL Actually Does"
        title="Websites first. Systems where they matter."
        body="We rebuild underperforming websites and replace disconnected tools with controlled, scalable systems."
        items={trustItems}
        visualType="image"
        imageSrc="/images/about/hero.png"
        imageAlt="SDL digital systems visual"
      />

      <ProofPreview projects={previewProjects} />

      <ProcessLine steps={processSteps} />

      <CTASection />
    </div>
  );
}
