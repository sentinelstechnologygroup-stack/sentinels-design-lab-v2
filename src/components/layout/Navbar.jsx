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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center" aria-label={`${BUSINESS.name} home`}>
          <Image
            src={IMAGES.logo}
            alt={`${BUSINESS.name} logo`}
            width={779}
            height={442}
            priority
            className="h-11 w-auto sm:h-12 xl:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="whitespace-nowrap text-sm text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              {item.label}
            </Link>
          ))}

          <a
            href={BUSINESS.phoneHref}
            className="whitespace-nowrap text-sm text-white/80 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
          >
            {BUSINESS.phone}
          </a>

          <Link href={CTA.primary.path} className="btn-primary whitespace-nowrap text-sm">
            {CTA.primary.label}
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 xl:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/10 bg-[#050816]/96 backdrop-blur-xl xl:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6" aria-label="Mobile navigation">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="flex min-h-11 items-center rounded-lg px-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <a
              href={BUSINESS.phoneHref}
              className="flex min-h-11 items-center rounded-lg px-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
              onClick={() => setOpen(false)}
            >
              {BUSINESS.phone}
            </a>

            <Link
              href={CTA.primary.path}
              className="btn-primary mt-3 w-full justify-center text-sm sm:w-fit"
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
