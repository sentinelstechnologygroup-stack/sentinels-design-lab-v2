"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import { internalSystems, workProjects, workSections } from "@/lib/siteData";

function ProjectMedia({ project }) {
  if (!project.media?.length) {
    return null;
  }

  return (
    <div className={`mt-6 grid gap-4 ${project.media.length > 1 ? "md:grid-cols-2" : ""}`}>
      {project.media.slice(0, 2).map((item) => (
        <div key={`${project.slug}-${item.label}`} className="overflow-hidden rounded-[24px] border border-white/10 bg-[#0a1220] p-3">
          <div className="mb-3 px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">{item.label}</div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-white/10 bg-[#09111f]">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "border-white/10 bg-white/[0.03] text-white/72",
    primary: "border-primary/30 bg-primary/10 text-primary",
  };

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${tones[tone] || tones.neutral}`}>
      {children}
    </span>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function WebsiteWorkCard({ project }) {
  return (
    <article className="panel-safe flex h-full flex-col overflow-hidden p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{project.industry}</div>
          <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">{project.name}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{project.status}</Badge>
          <Badge tone="primary">{project.projectType}</Badge>
        </div>
      </div>

      <ProjectMedia project={project} />

      <div className="mt-7 space-y-7">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">Key Improvements</div>
          <BulletList items={project.keyImprovements} />
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">Scope & Deliverables</div>
          <BulletList items={project.scopeDeliverables} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 pt-1">
        <Link
          href="/contact?type=website-evaluation"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white"
        >
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
  );
}

function SystemWorkCard({ project }) {
  return (
    <article className="panel-safe flex h-full flex-col overflow-hidden p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{project.industry}</div>
          <h3 className="mt-3 font-heading text-2xl font-bold text-foreground">{project.name}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{project.status}</Badge>
          <Badge tone="primary">{project.projectType}</Badge>
        </div>
      </div>

      <ProjectMedia project={project} />

      <div className="mt-7 space-y-7">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">What it does</div>
          <BulletList items={project.whatItDoes} />
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">System role</div>
          <BulletList items={project.systemRole} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 pt-1">
        <Link
          href="/contact?type=website-evaluation"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white"
        >
          Request a website evaluation
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function WorkCard({ project }) {
  if (project.section === "digital-systems") {
    return <SystemWorkCard project={project} />;
  }

  return <WebsiteWorkCard project={project} />;
}

export default function Work() {
  return (
    <div>
      <section className="relative overflow-hidden pt-28 pb-10 md:pb-14">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10">
            <div className="pb-4 lg:pb-6">
              <span className="eyebrow mb-6">Work</span>
              <h1 className="font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
                Real modernization work. No fake case studies.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A structured look at SDL website work and digital systems capability, kept intentionally grounded in real delivery and controlled evidence.
              </p>
            </div>
            <div className="panel-safe-heavy p-7 md:p-8">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Proof standard</div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                SDL does not use fake testimonials, fake rankings, fake revenue lifts, invented case-study metrics, or fabricated before/after visuals. This page is intentionally grounded in real work only.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 md:space-y-24">
            {workSections.map((section, index) => {
              const sectionProjects = workProjects.filter((project) => project.section === section.slug);

              if (!sectionProjects.length) {
                return null;
              }

              return (
                <div key={section.slug} className={index > 0 ? "pt-4 md:pt-8" : ""}>
                  <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{section.title}</div>
                      <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-[2.2rem]">{section.title}</h2>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{section.description}</p>
                    </div>
                    <Badge>{sectionProjects.length} projects</Badge>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-2">
                    {sectionProjects.map((project) => (
                      <WorkCard key={project.slug} project={project} />
                    ))}
                  </div>
                </div>
              );
            })}

            {internalSystems.length ? (
              <div>
                <div className="mb-8">
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Internal Systems / Product Lab</div>
                  <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-[2.2rem]">Internal Systems / Product Lab</h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
                    Clearly labeled internal systems that are not presented as client work.
                  </p>
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                  {internalSystems.map((project) => (
                    <WorkCard key={project.slug} project={project} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <CTASection ctaLabel="Get Website Evaluation" />
    </div>
  );
}
