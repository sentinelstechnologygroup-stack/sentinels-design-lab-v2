"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS, FOOTER_QUICK_LINKS, IMAGES } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.3fr,1fr]">
        <div>
          <Link href="/" className="inline-flex items-center" aria-label={`${BUSINESS.name} home`}>
            <Image
              src={IMAGES.logo}
              alt={`${BUSINESS.name} logo`}
              width={779}
              height={442}
              className="h-16 w-auto md:h-20"
            />
          </Link>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
            {BUSINESS.tagline}
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <div>{BUSINESS.email}</div>
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
                href={item.path}
                className="text-sm text-white/70 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
