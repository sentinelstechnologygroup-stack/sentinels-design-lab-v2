"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS, FOOTER_QUICK_LINKS, IMAGES } from "@/lib/constants";

const MAIN_SITE_URL = "https://sentinelsdesignlab.com";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <Link
          href="/pricing"
          className="group flex flex-col gap-3 rounded-2xl border border-primary/20 bg-sky-400/[0.05] px-5 py-5 transition hover:border-primary/40 hover:bg-sky-400/[0.08] sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="text-sm font-semibold text-white">Managed websites from $150/month</div>
            <div className="mt-1 text-xs leading-5 text-white/60">
              Hosting, maintenance, security, backups, monitoring & support included. Traditional project pricing is also available.
            </div>
          </div>
          <span className="shrink-0 text-sm font-semibold text-primary transition group-hover:text-white">
            View Pricing →
          </span>
        </Link>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.3fr,1fr]">
        <div>
          <a href={MAIN_SITE_URL} className="inline-flex items-center" aria-label={`${BUSINESS.name} home`}>
            <Image
              src={IMAGES.logo}
              alt={`${BUSINESS.name} logo`}
              width={779}
              height={442}
              className="h-16 w-auto md:h-20"
            />
          </a>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            {BUSINESS.tagline}
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <a href={`mailto:${BUSINESS.email}`} className="block transition hover:text-white">
              {BUSINESS.email}
            </a>
            <a href={BUSINESS.phoneHref} className="block transition hover:text-white">
              {BUSINESS.phone}
            </a>
            <div>{BUSINESS.address}</div>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
            Quick Links
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {FOOTER_QUICK_LINKS.map((item) => (
              <Link
                key={item.path}
                href={`${MAIN_SITE_URL}${item.path === "/" ? "" : item.path}`}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5">
            <Link href="/privacy" className="text-xs text-white/55 transition hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-white/55 transition hover:text-white">Terms of Service</Link>
            <Link href="/dashboard?view=accounts" className="text-xs text-white/55 transition hover:text-white">Connected Accounts</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
