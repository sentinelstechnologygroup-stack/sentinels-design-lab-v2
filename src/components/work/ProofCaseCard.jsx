"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

function EvidenceList({ title, items = [] }) {
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

function ProofImage({ src, alt, label }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#09111f]">
        <Image src={src} alt={alt} fill className="object-cover object-top" sizes="(min-width: 1280px) 25vw, 50vw" />
      </div>
      {label && (
        <div className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white/45">
          {label}
        </div>
      )}
    </div>
  );
}

export default function ProofCaseCard({
  name,
  industry,
  projectType,
  status,
  imageSrc,
  imageAlt,
  allMedia,
  liveLink,
  originalState = [],
  whatChanged = [],
  result = [],
  note,
}) {
  const media =
    allMedia && allMedia.length > 0
      ? allMedia
      : imageSrc
      ? [{ src: imageSrc, alt: imageAlt || name, label: null }]
      : [];

  const isBeforeAfter = media.length >= 2;

  return (
    <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#08101d] shadow-[0_26px_70px_rgba(0,0,0,0.3)]">
      {/* Image section */}
      {isBeforeAfter ? (
        <div className="border-b border-white/10 bg-[#09111f] p-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/40 text-center">
            Before / After
          </div>
          <div className="flex gap-3">
            {media.map((m, i) => (
              <ProofImage key={i} src={m.src} alt={m.alt} label={m.label} />
            ))}
          </div>
        </div>
      ) : media.length === 1 ? (
        <div className="relative aspect-[16/10] border-b border-white/10 bg-[#09111f]">
          <Image
            src={media[0].src}
            alt={media[0].alt || name}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1280px) 42vw, 100vw"
          />
          {media[0].label && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#08101d]/90 to-transparent px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                {media[0].label}
              </span>
            </div>
          )}
        </div>
      ) : null}

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

        {note ? (
          <p className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-400/8 px-4 py-4 text-sm leading-7 text-amber-100/85">
            {note}
          </p>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <EvidenceList title="Original State" items={originalState} />
          <EvidenceList title="What Changed" items={whatChanged} />
          <EvidenceList title="Result" items={result} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/contact?type=website-evaluation"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition hover:text-white"
          >
            Request a website evaluation
            <ArrowRight className="h-4 w-4" />
          </Link>
          {liveLink ? (
            <a
              href={liveLink}
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
            >
              View live site
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
