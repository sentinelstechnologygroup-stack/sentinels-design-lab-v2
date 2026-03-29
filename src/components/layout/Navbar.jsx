// src/components/layout/Navbar.jsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { BUSINESS, NAV_LINKS, CTA, SERVICES } from "@/lib/constants";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050816]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
          {BUSINESS.name}
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((item) => {
            if (item.hasDropdown && item.path === "/services") {
              return (
                <div key={item.path} className="relative" ref={servicesRef}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-sm text-white/80 transition hover:text-white"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="menu"
                  >
                    {item.label}
                    <ChevronDown
                      size={16}
                      className={`transition ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {servicesOpen && (
                    <div className="absolute left-0 top-full mt-3 w-[320px] rounded-2xl border border-white/10 bg-[#0b1020] p-3 shadow-2xl">
                      <div className="grid gap-1">
                        <Link
                          href="/services"
                          className="rounded-xl px-3 py-2 text-sm font-medium text-white transition hover:bg-white/5"
                          onClick={() => setServicesOpen(false)}
                        >
                          All Services
                        </Link>

                        {SERVICES.map((service) => (
                          <Link
                            key={service.path}
                            href={service.path}
                            className="rounded-xl px-3 py-2 text-sm text-white/75 transition hover:bg-white/5 hover:text-white"
                            onClick={() => setServicesOpen(false)}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.path}
                href={item.path}
                className="text-sm text-white/80 transition hover:text-white"
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href={CTA.primary.path}
            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black transition hover:bg-white/90"
          >
            {CTA.primary.label}
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#050816] md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-6 py-4">
            {NAV_LINKS.map((item) => {
              if (item.hasDropdown && item.path === "/services") {
                return (
                  <div key={item.path} className="py-1">
                    <Link
                      href="/services"
                      className="py-3 text-sm font-medium text-white/90"
                      onClick={() => setOpen(false)}
                    >
                      Services
                    </Link>

                    <div className="mb-2 ml-3 flex flex-col border-l border-white/10 pl-4">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.path}
                          href={service.path}
                          className="py-2 text-sm text-white/70 transition hover:text-white"
                          onClick={() => setOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="py-3 text-sm text-white/80 transition hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href={CTA.primary.path}
              className="mt-3 inline-flex w-fit rounded-full bg-white px-5 py-2 text-sm font-medium text-black"
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