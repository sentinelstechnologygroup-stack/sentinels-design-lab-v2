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
    isNewBuild: true,
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
    isNewBuild: true,
    originalState: [
      "The business needed a stronger first-impression website to present its services and company credibility online.",
      "Core service and company information needed to be easier to understand at a glance.",
      "The site needed a clearer path for prospects to evaluate the company and take the next step.",
    ],
    whatChanged: [
      "Built a cleaner homepage structure around services, trust, and next-step action.",
      "Strengthened hero messaging and CTA placement.",
      "Used a more polished visual system to support conversion instead of ambiguity.",
    ],
    result: [
      "The site now reads as a credible operating business rather than a thin placeholder presence.",
      "Core services are easier to scan and act on.",
      "The live homepage gives SDL a stronger proof asset for real service-business work.",
    ],
  },
};

const digitalSystems = [
  {
    slug: "dadson-admin-portal",
    name: "Dadson Trucking Admin Portal",
    industry: "Logistics Operations Platform",
    projectType: "Admin Portal",
    status: "LIVE SYSTEM",
    imageSrc: "/images/work/dadson-admin-portal.webp",
    imageAlt: "Dadson Trucking admin portal dashboard managing loads, drivers, and documents",
    whatItDoes: [
      "Manages loads, drivers, and documents from a centralized admin dashboard.",
      "Provides operational visibility across driver states and workflow stages.",
      "Supports document handling, status tracking, and admin workflow control.",
    ],
    systemRole: [
      "Admin visibility",
      "Operational coordination",
      "Workflow control",
    ],
    proofNotes: [
      "Live system in active daily use across the Dadson Trucking operation.",
      "Visual shows the admin layer of a real logistics platform, not a concept.",
      "SDL built the admin portal and driver hub as connected systems.",
    ],
    confidentialityNote: "Visual is intentionally abstracted to protect internal workflow details while still showing that the system exists.",
  },
  {
    slug: "dadson-driver-hub",
    name: "Dadson Driver Hub",
    industry: "Driver Workflow App",
    projectType: "Mobile App",
    status: "LIVE SYSTEM",
    imageSrc: "/images/work/dadson-driver-hub.webp",
    imageAlt: "Dadson Driver Hub mobile workflow interface for field load and document management",
    whatItDoes: [
      "Supports drivers in creating loads, continuing active work, and resolving incomplete submissions.",
      "Mobile-first field experience built around real driver friction points.",
      "Keeps documentation and load state moving without requiring admin intervention.",
    ],
    systemRole: [
      "Driver field operations",
      "Mobile workflow",
      "Load and document state",
    ],
    proofNotes: [
      "Live system used by drivers in the field across the Dadson Trucking operation.",
      "Built as the mobile counterpart to the Dadson Admin Portal.",
      "Both systems share a unified backend and operational data layer.",
    ],
    confidentialityNote: "Visual is intentionally abstracted to protect internal workflow details while still showing that the system exists.",
  },
  {
    slug: "shared-grocery-list",
    name: "Shared Grocery List",
    industry: "Household Utility System",
    projectType: "Utility App",
    status: "ACTIVE BUILD",
    imageSrc: "/images/work/shared-grocery-list.webp",
    imageAlt: "Shared Grocery List app showing household item tracking and real-time collaboration",
    whatItDoes: [
      "Shared list collaboration across household members in real time.",
      "Item tracking and update visibility without unnecessary account complexity.",
      "Built for practical everyday mobile and desktop use.",
    ],
    systemRole: [
      "Household coordination",
      "Real-time list sync",
      "Productized utility workflow",
    ],
    proofNotes: [
      "Active build with functional shared-list and item tracking already in place.",
      "Real-world daily use case built for households, not a portfolio concept.",
      "SDL is extending the system with additional household coordination features.",
    ],
  },
  {
    slug: "painter-bid",
    name: "PainterBid / Painter Pro",
    industry: "Contractor Business System",
    projectType: "Business System",
    status: "ACTIVE BUILD",
    imageSrc: "/images/work/painter-pro.webp",
    imageAlt: "PainterBid Painter Pro contractor business management system for quotes, jobs, and clients",
    whatItDoes: [
      "Quote creation workflow for painting contractors with job and client management.",
      "Desktop and mobile experience designed around real contractor operations.",
      "Operational visibility across jobs, scheduling, and active work.",
    ],
    systemRole: [
      "Quote and job management",
      "Client operations",
      "Contractor workflow visibility",
    ],
    proofNotes: [
      "Active build with core quote and job workflows already functional.",
      "Designed around real contractor operational needs, not generic business software.",
      "SDL is extending into scheduling and reporting for a complete contractor OS.",
    ],
  },
];

const infrastructureCards = [
  {
    title: "Operations Sync Layer",
    label: "SYSTEM INFRASTRUCTURE",
    labelClass: "border-amber-400/25 bg-amber-400/[0.08] text-amber-300",
    description:
      "Connects field workflows, admin dashboards, and operational records so teams are not manually copying the same information across disconnected systems.",
    bullets: [
      "Workflow syncing",
      "Form-to-dashboard routing",
      "Operational state tracking",
    ],
  },
  {
    title: "Intake + CRM Middleware",
    label: "INTEGRATION LAYER",
    labelClass: "border-sky-400/25 bg-sky-400/[0.08] text-sky-400",
    description:
      "Routes website inquiries, quote requests, and client intake data into structured workflows that can support follow-up, reporting, and fulfillment.",
    bullets: [
      "Contact and quote intake",
      "CRM-ready data structure",
      "Follow-up workflow support",
    ],
  },
  {
    title: "Reporting + Visibility Pipeline",
    label: "DATA SYSTEM",
    labelClass: "border-amber-400/25 bg-amber-400/[0.08] text-amber-300",
    description:
      "Turns operational activity into cleaner visibility for owners and managers without forcing teams to rebuild their process around generic software.",
    bullets: [
      "Dashboard-ready data",
      "Business visibility workflows",
      "Cleaner reporting foundations",
    ],
  },
];

export default function Work() {
  const websiteProjects = workProjects.filter((p) => p.section === "website-work");

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
        imageSrc="/images/hero/work-hero.webp"
        imageAlt="Approved SDL work hero visual showing performance dashboards and analytics"
      />

      {/* WEBSITE WORK */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Website Work</div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Proof-driven website rebuilds and launch work
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Each project is shown with real context: what was wrong, what SDL changed, and what result the business now has — without fake metrics.
            </p>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            {websiteProjects.map((project) => {
              const proof = websiteProof[project.slug];
              const allMedia = project.media?.length
                ? project.media
                : [{ src: "/images/blog/fallback-editorial.webp", alt: project.name, label: null }];
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
                  originalStateLabel={proof?.isNewBuild ? "Business Need" : "Original State"}
                  whatChangedLabel={proof?.isNewBuild ? "What SDL Built" : "What Changed"}
                  resultLabel={proof?.isNewBuild ? "Outcome" : "Result"}
                  note={proof?.note}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* DIGITAL SYSTEMS */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Digital Systems</div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Operational systems in active use and active development
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              These are real product and system builds in active use or active development. SDL does not present fake case studies, invented rankings, or fabricated metrics.
            </p>
          </div>

          <div className="mt-10 grid gap-8 xl:grid-cols-2">
            {digitalSystems.map((system) => (
              <SystemProofCard
                key={system.slug}
                name={system.name}
                industry={system.industry}
                projectType={system.projectType}
                status={system.status}
                visualSrc={system.imageSrc}
                visualAlt={system.imageAlt}
                whatItDoes={system.whatItDoes}
                systemRole={system.systemRole}
                proofNotes={system.proofNotes}
                confidentialityNote={system.confidentialityNote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEMS INFRASTRUCTURE */}
      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="eyebrow mb-4">Systems Infrastructure</div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Middleware, integrations, and automation layers
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Most businesses do not just need a better screen. They need the systems behind the screen to connect. SDL builds middleware, integrations, sync workflows, and automation layers that help websites, dashboards, CRMs, forms, and operational tools work together.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {infrastructureCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[24px] border border-white/10 bg-[#08101d] p-7 shadow-[0_16px_50px_rgba(0,0,0,0.22)]"
              >
                <span className={`inline-block rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${card.labelClass}`}>
                  {card.label}
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-white">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/65">
                  {card.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm leading-7 text-white/72">
                      <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection ctaLabel="Get Website Evaluation" />
    </div>
  );
}
