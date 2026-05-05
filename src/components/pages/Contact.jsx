// src/pages/contact.jsx
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, MessageSquare, ChevronDown, X } from "lucide-react";
import { toast } from "sonner";
import { BUSINESS, FORM_ENDPOINT, SERVICES } from "@/lib/constants";

// ─── Static data ─────────────────────────────────────────────────────────────

const CONTACT_INFO = [
  { icon: Phone,         label: "Call Us",        value: BUSINESS.phone,  href: BUSINESS.phoneHref },
  { icon: Mail,          label: "Email Us",        value: BUSINESS.email,  href: `mailto:${BUSINESS.email}` },
  { icon: MapPin,        label: "Location",        value: BUSINESS.address },
  { icon: MessageSquare, label: "Quick Response",  value: "Replies Mon–Fri, 9am–6pm EST" },
];

const PROJECT_STAGES = [
  { value: "exploring",  label: "Just exploring" },
  { value: "soon",       label: "Ready to start soon" },
  { value: "immediate",  label: "Need help immediately" },
  { value: "existing",   label: "Existing site/system needs help" },
];

const WHAT_HAPPENS = [
  "Your project scope, goals, and fit will be reviewed.",
  "We'll confirm the best next step for your website, system, or digital strategy.",
  "You'll be contacted to discuss timing, budget, and next steps.",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeValue(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/\+/g, "plus")
    .replace(/\//g, " ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, " ");
}

// ─── Custom SelectField ───────────────────────────────────────────────────────

function SelectField({ name, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onMouseDown(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const selected = options.find((o) => (o.value ?? o.slug) === value);
  const displayLabel = selected ? (selected.label ?? selected.name) : null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-left focus:outline-none focus:border-primary/50 transition-colors"
      >
        <span className={displayLabel ? "text-foreground" : "text-muted-foreground/60"}>
          {displayLabel ?? placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-50 w-full mt-1 rounded-xl border border-border/50 bg-[#0c1322] shadow-[0_16px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {options.map((option) => {
            const val = option.value ?? option.slug;
            const label = option.label ?? option.name;
            const isActive = value === val;
            return (
              <li key={val} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => { onChange({ target: { name, value: val } }); setOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-primary/10 hover:text-primary ${isActive ? "bg-primary/5 text-primary" : "text-foreground"}`}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ─── Thank-you modal ──────────────────────────────────────────────────────────

function ThankYouModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function handler(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="relative w-full max-w-lg rounded-[28px] border border-white/12 bg-[#060e1c] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.65)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-white/50 transition hover:text-white hover:border-white/30"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex justify-center mb-6 opacity-95"
          >
            <Image
              src="/images/logo/logo.webp"
              alt="Sentinels Design Lab"
              width={260}
              height={80}
              priority
              className="object-contain mx-auto"
            />
          </motion.div>
          <h2 className="font-heading text-3xl font-bold text-white mb-3">Thank You</h2>
          <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
            Your message has been sent to Sentinels Design Lab. We&apos;ll review your
            project details and follow up within one business day.
          </p>
        </div>

        <div className="border-t border-white/8 pt-7 mb-7">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary mb-4">
            What Happens Next
          </div>
          <ul className="space-y-3">
            {WHAT_HAPPENS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-7 text-white/70">
                <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={BUSINESS.phoneHref}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-slate-950 transition-all hover:shadow-[0_10px_30px_rgba(56,189,248,0.20)]"
          >
            <Phone className="h-4 w-4" />
            Call Now
          </a>
          <Link
            href="/work"
            onClick={onClose}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-sky-400/[0.06] px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/40"
          >
            View Our Work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-white/35">
          Need to add something?{" "}
          <a href={`mailto:${BUSINESS.email}`} className="text-white/55 hover:text-white transition">
            Email {BUSINESS.email}
          </a>
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main Contact component ───────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    projectStage: "",
    message: "",
    company: "",
  });

  const [sending, setSending] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const serviceLookup = useMemo(() => {
    const map = new Map();

    SERVICES.forEach((service) => {
      const slug = service.slug;
      const name = service.name;
      map.set(normalizeValue(slug), slug);
      map.set(normalizeValue(name), slug);
    });

    map.set("lite website", "website-design");
    map.set("startup website", "website-design");
    map.set("growth website", "website-design");
    map.set("authority website", "website-design");
    map.set("custom website", "website-design");
    map.set("website development", "website-design");
    map.set("website builds", "website-design");
    map.set("brand launch combo", "branding");
    map.set("growth combo", "branding");
    map.set("authority combo", "branding");
    map.set("custom combo", "branding");
    map.set("combo packages", "branding");
    map.set("lite logo", "logo-design");
    map.set("startup logo", "logo-design");
    map.set("brand logo suite", "logo-design");
    map.set("authority identity", "logo-design");
    map.set("logo design", "logo-design");
    map.set("lite ecommerce", "ecommerce");
    map.set("startup ecommerce", "ecommerce");
    map.set("growth ecommerce", "ecommerce");
    map.set("custom ecommerce", "ecommerce");
    map.set("ecommerce solutions", "ecommerce");
    map.set("ecommerce development", "ecommerce");
    map.set("seo lite", "seo");
    map.set("seo foundation", "seo");
    map.set("seo growth", "seo");
    map.set("seo authority", "seo");
    map.set("seo add ons", "seo");
    map.set("seo services", "seo");
    map.set("lite branding", "branding");
    map.set("startup branding", "branding");
    map.set("brand system", "branding");
    map.set("authority branding", "branding");
    map.set("branding", "branding");
    map.set("branding and identity", "branding");
    map.set("ppc management", "ppc");
    map.set("social campaign management", "digital-marketing");
    map.set("ppc social management", "digital-marketing");
    map.set("ppc plus social management", "digital-marketing");
    map.set("authority marketing", "digital-marketing");
    map.set("starter ppc", "ppc");
    map.set("growth ppc", "ppc");
    map.set("authority ppc", "ppc");
    map.set("enterprise ppc", "ppc");
    map.set("ppc", "ppc");
    map.set("paid ads", "ppc");
    map.set("digital marketing", "digital-marketing");
    map.set("website care", "hosting");
    map.set("website growth", "hosting");
    map.set("website authority", "hosting");
    map.set("custom support", "hosting");
    map.set("monthly care plans", "hosting");
    map.set("monthly support", "hosting");
    map.set("hosting and maintenance", "hosting");
    map.set("basic hosting", "hosting");
    map.set("standard hosting", "hosting");
    map.set("professional hosting", "hosting");
    map.set("enterprise hosting", "hosting");
    map.set("hosting", "hosting");

    return map;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const rawService = params.get("service");
    const rawMessage = params.get("message");
    if (!rawService && !rawMessage) return;
    const normalizedService = rawService
      ? serviceLookup.get(normalizeValue(rawService)) || ""
      : "";
    setForm((prev) => ({
      ...prev,
      service: normalizedService || prev.service,
      message:
        prev.message ||
        rawMessage ||
        (rawService ? `Interested in: ${rawService}` : ""),
    }));
  }, [serviceLookup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = useCallback(() => {
    setForm({ name: "", email: "", phone: "", service: "", projectStage: "", message: "", company: "" });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;

    // Honeypot — bots fill this, humans don't
    if (form.company) {
      console.warn("[SDL Contact] bot submission blocked");
      return;
    }

    if (!form.name?.trim() || !form.email?.trim() || !form.message?.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const endpoint = FORM_ENDPOINT || "https://formspree.io/f/mnjgoknr";

    const selectedService = SERVICES.find((s) => s.slug === form.service);
    const selectedStage   = PROJECT_STAGES.find((s) => s.value === form.projectStage);

    const payload = {
      _subject: "New SDL Website Inquiry",
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone?.trim() || "Not provided",
      service: selectedService?.name || form.service || "Not selected",
      projectStage: selectedStage?.label || form.projectStage || "Not specified",
      message: form.message.trim(),
      source: "SDL Contact Page",
    };

    setSending(true);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();

      if (!res.ok) {
        throw new Error(`Formspree ${res.status}: ${responseText}`);
      }

      resetForm();
      setTimeout(() => setShowThankYou(true), 180);
    } catch (error) {
      console.error("[SDL Contact] submission error:", error);
      toast.error("The form did not send. Please email us directly at Info@SentinelsDesignLab.com.");
      alert("The form did not send. Please email us directly at Info@SentinelsDesignLab.com.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      {showThankYou && <ThankYouModal onClose={() => setShowThankYou(false)} />}

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* ── Left: info panel ── */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <span className="eyebrow mb-6">Get In Touch</span>

              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Let&apos;s Build Something{" "}
                <span className="text-primary">Remarkable</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-lg">
                Ready to start your project? Send us a message and we&apos;ll
                follow up within one business day.
              </p>

              <div className="space-y-6">
                {CONTACT_INFO.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a href={item.href} className="font-heading font-semibold text-foreground hover:text-primary transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-heading font-semibold text-foreground">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Right: form ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border/50 rounded-2xl p-8 space-y-5"
              >
                {/* Honeypot — hidden from real users, catches bots */}
                <input
                  type="text"
                  name="company"
                  value={form.company || ""}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>

                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Jane Smith"
                      className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="jane@company.com"
                      className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Service Interest
                    </label>
                    <SelectField
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      options={SERVICES}
                      placeholder="Select a service..."
                    />
                  </div>
                </div>

                {/* Project Stage */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Project Stage
                  </label>
                  <SelectField
                    name="projectStage"
                    value={form.projectStage}
                    onChange={handleChange}
                    options={PROJECT_STAGES}
                    placeholder="Select project stage..."
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="What are you looking to improve or build? Website, leads, automation, operations, or something else?"
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                {/* What happens next */}
                <div className="rounded-xl border border-white/8 bg-white/[0.02] px-5 py-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary mb-3">
                    What happens next
                  </div>
                  <ul className="space-y-2">
                    {WHAT_HAPPENS.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs leading-5 text-muted-foreground">
                        <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-slate-950 py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
                >
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      <span>Request Project Review</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground/70 leading-relaxed">
                  We review every request and respond within one business day.
                  <br />No spam. No pressure. Just a clear next step.
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
