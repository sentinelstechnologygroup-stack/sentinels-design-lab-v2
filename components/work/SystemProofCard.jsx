"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function ListBlock({ title, items = [] }) {
  return (
    <div>
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">{title}</div>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-white/72">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SystemProofCard({ name, whatItDoes = [], systemRole = [], visualSrc, visualAlt, proofNotes = [], confidentialityNote, status, projectType, industry }) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#08101d] shadow-[0_26px_70px_rgba(0,0,0,0.3)]">
      <div className="relative aspect-[16/10] border-b border-white/10 bg-[#09111f]">
        <Image src={visualSrc} alt={visualAlt || name} fill className="object-cover object-top" sizes="(min-width: 1280px) 42vw, 100vw" />
      </div>
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{industry}</div>
            <h3 className="mt-3 font-heading text-2xl font-bold text-white">{name}</h3>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-white/70">{status}</span>
            <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-primary">{projectType}</span>
          </div>
        </div>

        {confidentialityNote ? <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-white/65">{confidentialityNote}</p> : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <ListBlock title="What it does" items={whatItDoes} />
          <ListBlock title="System role" items={systemRole} />
          <ListBlock title="Proof" items={proofNotes} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/contact?type=website-evaluation" className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white">
            Request a website evaluation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
