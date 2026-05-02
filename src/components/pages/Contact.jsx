// src/pages/contact.jsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { BUSINESS, FORM_ENDPOINT, SERVICES } from "@/lib/constants";

const CONTACT_INFO = [
  { icon: Phone, label: "Call Us", value: BUSINESS.phone, href: BUSINESS.phoneHref },
  { icon: Mail, label: "Email Us", value: BUSINESS.email, href: `mailto:${BUSINESS.email}` },
  { icon: MapPin, label: "Location", value: BUSINESS.address },
  {
    icon: MessageSquare,
    label: "Quick Response",
    value: "Replies Mon–Fri, 9am–6pm EST",
  },
];

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

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const serviceLookup = useMemo(() => {
    const map = new Map();

    SERVICES.forEach((service) => {
      const slug = service.slug;
      const name = service.name;

      map.set(normalizeValue(slug), slug);
      map.set(normalizeValue(name), slug);
    });

    // Website packages -> Website Design & Development
    map.set("lite website", "website-design");
    map.set("startup website", "website-design");
    map.set("growth website", "website-design");
    map.set("authority website", "website-design");
    map.set("custom website", "website-design");
    map.set("website development", "website-design");
    map.set("website builds", "website-design");

    // Combo packages -> Branding (best-fit contact bucket for now)
    map.set("brand launch combo", "branding");
    map.set("growth combo", "branding");
    map.set("authority combo", "branding");
    map.set("custom combo", "branding");
    map.set("combo packages", "branding");

    // Logo packages -> Logo Design
    map.set("lite logo", "logo-design");
    map.set("startup logo", "logo-design");
    map.set("brand logo suite", "logo-design");
    map.set("authority identity", "logo-design");
    map.set("logo design", "logo-design");

    // Ecommerce packages -> Ecommerce Development
    map.set("lite ecommerce", "ecommerce");
    map.set("startup ecommerce", "ecommerce");
    map.set("growth ecommerce", "ecommerce");
    map.set("custom ecommerce", "ecommerce");
    map.set("ecommerce solutions", "ecommerce");
    map.set("ecommerce development", "ecommerce");

    // SEO packages -> SEO Services
    map.set("seo lite", "seo");
    map.set("seo foundation", "seo");
    map.set("seo growth", "seo");
    map.set("seo authority", "seo");
    map.set("seo add ons", "seo");
    map.set("seo services", "seo");

    // Branding packages -> Branding & Identity
    map.set("lite branding", "branding");
    map.set("startup branding", "branding");
    map.set("brand system", "branding");
    map.set("authority branding", "branding");
    map.set("branding", "branding");
    map.set("branding and identity", "branding");

    // Digital / PPC packages
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

    // Care plans -> Hosting & Maintenance (best-fit existing service bucket)
    map.set("website care", "hosting");
    map.set("website growth", "hosting");
    map.set("website authority", "hosting");
    map.set("custom support", "hosting");
    map.set("monthly care plans", "hosting");
    map.set("monthly support", "hosting");
    map.set("hosting and maintenance", "hosting");

    // Hosting plans -> Hosting & Maintenance
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

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSending(true);

    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!res.ok) {
          throw new Error("Form submission failed");
        }

        toast.success("Message sent! We'll be in touch shortly.");
        resetForm();
      } else {
        console.log("Form submission (no endpoint configured):", form);
        toast.success("Thank you! We'll be in touch shortly.");
        resetForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
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
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {item.label}
                      </div>

                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-heading font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-heading font-semibold text-foreground">
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border/50 rounded-2xl p-8 space-y-5"
              >
                <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                  Send Us a Message
                </h2>

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
                      className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
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
                      className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

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
                      className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Service Interest
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                    >
                      <option value="">Select a service...</option>
                      {SERVICES.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us about your project..."
                    className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50"
                >
                  {sending ? (
                    "Sending..."
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}