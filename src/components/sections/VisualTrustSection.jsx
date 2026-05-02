"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

function DiagramStack({ items = [] }) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={item.title || item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/12 text-xs font-semibold text-primary">
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="text-sm text-white/80">{item.title || item}</div>
        </div>
      ))}
    </div>
  );
}

export default function VisualTrustSection({ eyebrow, title, body, items = [], visualType = "stack", imageSrc, imageAlt }) {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)] lg:gap-14">
          <div>
            {eyebrow ? <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">{eyebrow}</div> : null}
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">{title}</h2>
            {body ? <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">{body}</p> : null}
            <div className="mt-8 space-y-4">
              {items.map((item) => (
                <div key={item.title || item} className="flex items-start gap-3 border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <div className="text-base font-medium text-white">{item.title || item}</div>
                    {item.description ? <div className="mt-1 text-sm leading-7 text-white/65">{item.description}</div> : null}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/8 blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#08101d] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.3)] md:p-8">
              {visualType === "image" && imageSrc ? (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border border-white/10 bg-[#09111f]">
                  <Image src={imageSrc} alt={imageAlt || title} fill className="object-cover" sizes="(min-width: 1024px) 40vw, 100vw" />
                </div>
              ) : (
                <DiagramStack items={items} />
              )}
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                Built for trust, lead flow, and cleaner operations
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
