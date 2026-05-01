"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BUSINESS, NAV_LINKS, CTA, IMAGES } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center" aria-label={`${BUSINESS.name} home`}>
          <Image
            src={IMAGES.logo}
            alt={`${BUSINESS.name} logo`}
            width={779}
            height={442}
            priority
            className="h-12 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}

          <a href={BUSINESS.phoneHref} className="text-sm text-white/80 transition hover:text-white">
            {BUSINESS.phone}
          </a>

          <Link href={CTA.primary.path} className="btn-primary text-sm">
            {CTA.primary.label}
          </Link>
        </nav>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#050816]/96 backdrop-blur-xl md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="py-3 text-sm text-white/80 transition hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <a
              href={BUSINESS.phoneHref}
              className="py-3 text-sm text-white/80 transition hover:text-white"
              onClick={() => setOpen(false)}
            >
              {BUSINESS.phone}
            </a>

            <Link
              href={CTA.primary.path}
              className="btn-primary mt-3 w-fit text-sm"
              onClick={() => setOpen(false)}
            >
              {CTA.primary.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
