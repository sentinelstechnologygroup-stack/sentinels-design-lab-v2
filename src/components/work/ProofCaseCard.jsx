"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, X, ZoomIn } from "lucide-react";

function ImageModal({ src, alt, label, name, onClose }) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/96 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close preview"
          type="button"
          className="absolute -top-11 right-0 inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition hover:text-white"
        >
          <X className="h-4 w-4" />
          Close
        </button>

        <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#060d18] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
          <img
            src={src}
            alt={alt}
            className="max-h-[80vh] w-full object-contain"
          />
        </div>

        {(label || name) && (
          <div className="mt-3 text-center">
            {label && (
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
                {label}
              </span>
            )}
            {name && <p className="mt-1 text-sm text-white/60">{name}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function EvidenceList({ title, items = [] }) {
  return (
    <div>
      <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
        {title}
      </div>
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

function ProofImage({ src, alt, label, name, onOpen }) {
  return (
    <div className="flex-1 min-w-0">
      <button
        type="button"
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-[#09111f]"
        style={{ aspectRatio: "16/10" }}
        onClick={() => onOpen({ src, alt, label })}
        aria-label={`View larger: ${label || name || alt}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1280px) 25vw, 50vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/35 group-hover:opacity-100">
          <ZoomIn className="h-7 w-7 text-white drop-shadow-lg" />
        </div>
      </button>
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
  originalStateLabel = "Original State",
  whatChangedLabel = "What Changed",
  resultLabel = "Result",
  note,
}) {
  const [modal, setModal] = useState(null);
  const openModal = useCallback((item) => setModal(item), []);
  const closeModal = useCallback(() => setModal(null), []);

  const media =
    allMedia && allMedia.length > 0
      ? allMedia
      : imageSrc
        ? [{ src: imageSrc, alt: imageAlt || name, label: null }]
        : [];

  const isBeforeAfter = media.length >= 2;

  return (
    <>
      {modal && (
        <ImageModal
          src={modal.src}
          alt={modal.alt}
          label={modal.label}
          name={name}
          onClose={closeModal}
        />
      )}

      <article className="overflow-hidden rounded-[28px] border border-white/10 bg-[#08101d] shadow-[0_26px_70px_rgba(0,0,0,0.3)]">
        {isBeforeAfter ? (
          <div className="border-b border-white/10 bg-[#09111f] p-4">
            <div className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/35">
              Before / After
            </div>
            <div className="flex gap-3">
              {media.map((m, i) => (
                <ProofImage
                  key={i}
                  src={m.src}
                  alt={m.alt}
                  label={m.label}
                  name={name}
                  onOpen={openModal}
                />
              ))}
            </div>
          </div>
        ) : media.length === 1 ? (
          <button
            type="button"
            className="group relative block w-full cursor-zoom-in overflow-hidden border-b border-white/10 bg-[#09111f]"
            style={{ aspectRatio: "16/10" }}
            onClick={() => openModal(media[0])}
            aria-label={`View larger: ${media[0].label || name}`}
          >
            <Image
              src={media[0].src}
              alt={media[0].alt || name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(min-width: 1280px) 42vw, 100vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/35 group-hover:opacity-100">
              <ZoomIn className="h-8 w-8 text-white drop-shadow-lg" />
            </div>
            {media[0].label && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#08101d]/92 to-transparent px-4 py-3">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  {media[0].label}
                </span>
              </div>
            )}
          </button>
        ) : null}

        <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {industry}
              </div>
              <h3 className="mt-3 font-heading text-2xl font-bold text-white">
                {name}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-white/70">
                {status}
              </span>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-primary">
                {projectType}
              </span>
            </div>
          </div>

          {note ? (
            <p className="mt-4 rounded-2xl border border-amber-300/15 bg-amber-400/[0.08] px-4 py-4 text-sm leading-7 text-amber-100/85">
              {note}
            </p>
          ) : null}

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <EvidenceList title={originalStateLabel} items={originalState} />
            <EvidenceList title={whatChangedLabel} items={whatChanged} />
            <EvidenceList title={resultLabel} items={result} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="https://sentinelsdesignlab.com/contact/?type=website-evaluation"
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
    </>
  );
}
