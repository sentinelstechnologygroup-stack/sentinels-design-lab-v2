     1|"use client";
     2|
     3|import React from "react";
     4|import Link from "next/link";
     5|import { BUSINESS, FOOTER_QUICK_LINKS } from "@/lib/constants";
     6|
     7|export default function Footer() {
     8|  return (
     9|    <footer className="border-t border-white/10 bg-[#050816]">
    10|      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.3fr,1fr]">
    11|        <div>
    12|          <div className="text-lg font-semibold text-white">{BUSINESS.name}</div>
    13|          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">
    14|            {BUSINESS.tagline}
    15|          </p>
    16|          <div className="mt-4 space-y-2 text-sm text-white/70">
    17|            <div>{BUSINESS.email}</div>
    18|            <div>{BUSINESS.phone}</div>
    19|            <div>{BUSINESS.address}</div>
    20|          </div>
    21|        </div>
    22|
    23|        <div>
    24|          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50">
    25|            Quick Links
    26|          </div>
    27|          <div className="mt-4 grid grid-cols-2 gap-3">
    28|            {FOOTER_QUICK_LINKS.map((item) => (
    29|              <Link
    30|                key={item.path}
    31|                href={item.path}
    32|                className="text-sm text-white/70 transition hover:text-white"
    33|              >
    34|                {item.label}
    35|              </Link>
    36|            ))}
    37|          </div>
    38|        </div>
    39|      </div>
    40|    </footer>
    41|  );
    42|}
    43|