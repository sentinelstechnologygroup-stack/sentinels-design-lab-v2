"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProofPreview({ projects = [] }) {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Proof Preview</div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Built from real client rebuilds and practical systems</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              SDL work is based on real business problems: outdated websites, weak lead paths, disconnected tools, and systems that need to be easier to run.
            </p>
          </div>
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white">
            View Work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <Link key={project.title} href={project.href || "/work"} className="group overflow-hidden rounded-[26px] border border-white/10 bg-[#08101d] shadow-[0_22px_60px_rgba(0,0,0,0.28)] transition hover:-translate-y-1">
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/10 bg-[#09111f]">
                <Image src={project.imageSrc} alt={project.imageAlt || project.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 33vw, 100vw" />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{project.type}</div>
                <h3 className="mt-3 font-heading text-2xl font-bold text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
