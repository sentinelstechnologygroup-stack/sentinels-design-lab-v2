// src/components/layout/Footer.jsx
"use client";

import React from "react";
import Link from "next/link";
import { BUSINESS, FOOTER_QUICK_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050816]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2">
        <div>
          <div className="text-lg font-semibold text-white">{BUSINESS.name}</div>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/70">
            {BUSINESS.tagline}
          </p>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <div>{BUSINESS.email}</div>
            <div>{BUSINESS.phone}</div>
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