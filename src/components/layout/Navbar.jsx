     1|"use client";
     2|
     3|import React, { useState } from "react";
     4|import Link from "next/link";
     5|import { Menu, X } from "lucide-react";
     6|import { BUSINESS, NAV_LINKS, CTA } from "@/lib/constants";
     7|
     8|export default function Navbar() {
     9|  const [open, setOpen] = useState(false);
    10|
    11|  return (
    12|    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur-xl">
    13|      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
    14|        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
    15|          {BUSINESS.name}
    16|        </Link>
    17|
    18|        <nav className="hidden items-center gap-6 md:flex">
    19|          {NAV_LINKS.map((item) => (
    20|            <Link
    21|              key={item.path}
    22|              href={item.path}
    23|              className="text-sm text-white/80 transition hover:text-white"
    24|            >
    25|              {item.label}
    26|            </Link>
    27|          ))}
    28|
    29|          <Link href={CTA.primary.path} className="btn-primary text-sm">
    30|            {CTA.primary.label}
    31|          </Link>
    32|        </nav>
    33|
    34|        <button
    35|          type="button"
    36|          className="text-white md:hidden"
    37|          onClick={() => setOpen((v) => !v)}
    38|          aria-label="Toggle navigation"
    39|        >
    40|          {open ? <X size={22} /> : <Menu size={22} />}
    41|        </button>
    42|      </div>
    43|
    44|      {open && (
    45|        <div className="border-t border-white/10 bg-[#050816]/96 backdrop-blur-xl md:hidden">
    46|          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
    47|            {NAV_LINKS.map((item) => (
    48|              <Link
    49|                key={item.path}
    50|                href={item.path}
    51|                className="py-3 text-sm text-white/80 transition hover:text-white"
    52|                onClick={() => setOpen(false)}
    53|              >
    54|                {item.label}
    55|              </Link>
    56|            ))}
    57|
    58|            <Link
    59|              href={CTA.primary.path}
    60|              className="btn-primary mt-3 w-fit text-sm"
    61|              onClick={() => setOpen(false)}
    62|            >
    63|              {CTA.primary.label}
    64|            </Link>
    65|          </nav>
    66|        </div>
    67|      )}
    68|    </header>
    69|  );
    70|}
    71|