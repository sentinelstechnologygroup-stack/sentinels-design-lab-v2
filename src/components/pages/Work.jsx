"use client";

import CTASection from "@/components/shared/CTASection";
import PageHero from "@/components/sections/PageHero";
import ProofCaseCard from "@/components/work/ProofCaseCard";
import SystemProofCard from "@/components/work/SystemProofCard";
import { workProjects } from "@/lib/siteData";

const websiteProof = {
  "eli-land-design": {
    originalState: [
      "Strong visual intent but overextended structure that made the site harder to navigate.",
      "Gallery flow and project browsing needed clearer organization.",
      "Residential and commercial paths were not framed cleanly enough for trust.",
    ],
    whatChanged: [
      "Rescoped the presentation around cleaner hierarchy and stronger service flow.",
      "Reorganized navigation and gallery structure for easier scanning.",
      "Prepared the rebuild as a staged modernization lane instead of forcing a fake finished-state story.",
    ],
    result: [
      "The project now reads as a controlled staged rebuild instead of an ambiguous concept.",
      "SDL can show the original-state proof honestly while clarifying the modernization direction.",
      "The case study reflects real work without inventing an after-state that is not yet live.",
    ],
    note: "Shown as an in-progress modernization. Both the original site and SDL's current rebuild preview are displayed. Final client launch approval is pending.",
  },
  "premier-kitchens": {
    originalState: [
      "The previous site felt dated and text-heavy for a premium remodeling business.",
      "Service, showroom, and portfolio paths were not supporting trust as clearly as they should.",
      "Mobile usability and navigation behavior created unnecessary friction.",
    ],
    whatChanged: [
      "Rebuilt the experience around cleaner hierarchy and premium presentation.",
      "Clarified how visitors move between services, showroom details, and project proof.",
      "Tightened mobile behavior and the overall lead path.",
    ],
    result: [
      "The current site presents the business with more authority and visual clarity.",
      "Trust signals and project proof now support the sales conversation instead of getting buried.",
      "The live domain reflects a more modern, controlled brand experience.",
    ],
  },
  "my-buddys-mobile-detail": {
    originalState: [
      "The business needed a professional web presence instead of relying on scattered informal channels.",
      "Service explanation and booking flow needed stronger structure from day one.",
      "Trust presentation for a local service audience had to be built from scratch.",
    ],
    whatChanged: [
      "Built a new lead-oriented website with clearer service messaging and CTA flow.",
      "Structured the homepage around mobile-first contact and booking behavior.",
      "Added a more credible presentation layer for a local detailing business.",
    ],
    result: [
      "The business now has a real launch-ready web presence instead of a placeholder impression.",
      "Visitors can understand the offer faster and move toward contact more cleanly.",
      "The site gives the operator a more credible first impression in market.",
    ],
  },
  "best-solutions-distribution": {
    originalState: [
      "The business needed a stronger first-impression site for painting, flooring, and managed services.",
      "Service clarity and estimate flow needed to be visible immediately.",
      "Trust signals had to be stronger at the top of the experience.",
    ],
    whatChanged: [
      "Built a cleaner homepage structure around services, trust, and next-step action.",
      "Strengthened hero messaging and estimate CTA placement.",
      "Used a more polished visual system to support conversion instead of ambiguity.",
    ],
    result: [
      "The site now reads as a credible local service company rather than a thin placeholder presence.",
      "Core services are easier to scan and estimate intent is easier to act on.",
      "The live homepage gives SDL a stronger proof asset for real service-business work.",
    ],
  },
};

const systemProof = {
  "dadson-driver-app": {
    proofNotes: [
      "Visual anchor shows a real workflow-oriented interface concept, not a text-only claim.",
      "The system is framed as a field-operations tool with controlled workflow context.",
      "SDL capability is demonstrated through operational product thinking, not just marketing pages.",
    ],
    confidentialityNote: "Visual is intentionally abstracted to protect internal workflow details while still showing that the system exists.",
  },
  "dadson-admin-portal": {
    proofNotes: [
      "Visual anchor supports the admin and oversight layer described in the case study.",
      "The system is positioned as an internal coordination tool rather than decorative concept art.",
      "Operational visibility and control are made concrete through the interface proof.",
    ],
    confidentialityNote: "Visual is intentionally abstracted to protect internal workflow details while still showing that the system exists.",
  },
  "painter-pro": {
    proofNotes: [
      "Visual anchor prevents the system from reading like a text-only idea.",
      "The case study shows SDL capability in operations-oriented system design for service businesses.",
      "The proof format keeps the system believable without overstating confidential internals.",
    ],
    confidentialityNote: "Visual is intentionally abstracted to protect internal workflow details while still showing that the system exists.",
  },
};

export default function Work() {
  const websiteProjects = workProjects.filter((project) => project.section === "website-work");
  const systemProjects = workProjects.filter((project) => project.section === "digital-systems");

  return (
    <div>
      <PageHero
        eyebrow="Work"
        title="Real modernization work. Real system proof. No fake case studies."
        description="SDL uses real screenshots, real system anchors, and plain-language delivery summaries instead of invented metrics, fabricated rankings, or decorative portfolio filler."
        primaryCtaLabel="Get Website Evaluation"
        primaryCtaHref="/contact?type=website-evaluation"
        secondaryCtaLabel="Contact"
        secondaryCtaHref="/contact"
        imageSrc="/images/home/tile-seo.png"
        imageAlt="Approved SDL work hero visual showing performance dashboards and analytics"
      />

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Website Work</div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Proof-driven website rebuilds and launch work</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Each project is shown with real context: what was wrong, what SDL changed, and what result the business now has — without fake metrics.</p>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            {websiteProjects.map((project) => {
              const proof = websiteProof[project.slug];
              const allMedia = project.media?.length
                ? project.media
                : [{ src: "/images/blog/fallback-editorial.svg", alt: project.name, label: null }];
              return (
                <ProofCaseCard
                  key={project.slug}
                  name={project.name}
                  industry={project.industry}
                  projectType={project.projectType}
                  status={project.status}
                  allMedia={allMedia}
                  liveLink={project.liveLink}
                  originalState={proof?.originalState || project.keyImprovements || []}
                  whatChanged={proof?.whatChanged || project.scopeDeliverables || []}
                  result={proof?.result || project.keyImprovements || []}
                  note={proof?.note}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Digital Systems</div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Operational systems with visible proof</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Every system includes a visual anchor so the page demonstrates that the work exists instead of relying on text-only claims.</p>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            {systemProjects.map((project) => {
              const media = project.media?.[0];
              const proof = systemProof[project.slug];
              return (
                <SystemProofCard
                  key={project.slug}
                  name={project.name}
                  industry={project.industry}
                  projectType={project.projectType}
                  status={project.status}
                  visualSrc={media?.src || "/images/blog/fallback-editorial.svg"}
                  visualAlt={media?.alt || project.name}
                  whatItDoes={project.whatItDoes || []}
                  systemRole={project.systemRole || []}
                  proofNotes={proof?.proofNotes || []}
                  confidentialityNote={proof?.confidentialityNote}
                />
              );
            })}
          </div>
        </div>
      </section>

      <CTASection ctaLabel="Get Website Evaluation" />
    </div>
  );
}
