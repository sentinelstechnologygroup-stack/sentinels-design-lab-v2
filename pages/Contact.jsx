"use client";

import React, { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import {
  budgetOptions,
  projectTypeOptions,
  primaryCta,
  timelineOptions,
} from "@/lib/siteData";

const initialForm = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  projectType: "",
  budgetRange: "",
  timeline: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (type === "website-evaluation") {
      setForm((prev) => ({
        ...prev,
        projectType: prev.projectType || "Website redesign",
        message:
          prev.message ||
          "I would like a website evaluation and a recommendation on the clearest next step.",
      }));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("SDL contact request", form);
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <div>
      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <span className="eyebrow mb-6">Contact</span>
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                Request a website evaluation or scope a broader digital build
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                SDL leads publicly with website evaluations and redesigns, but we also scope portals, dashboards, automations, integrations, and other practical digital systems when the business needs more.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
                    <a href={BUSINESS.phoneHref} className="font-heading font-semibold text-foreground hover:text-primary">
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                    <a href={`mailto:${BUSINESS.email}`} className="font-heading font-semibold text-foreground hover:text-primary">
                      {BUSINESS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
                    <div className="font-heading font-semibold text-foreground">{BUSINESS.address}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="panel-safe space-y-5 p-8">
                <h2 className="font-heading text-xl font-bold text-foreground">{primaryCta.label}</h2>

                {submitted ? (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm leading-7 text-white/85">
                    Thanks — your request has been received. We’ll review your website or project needs and follow up with the clearest recommended next step.
                  </div>
                ) : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
                  <Field label="Business name" name="businessName" value={form.businessName} onChange={handleChange} required />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
                  <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
                </div>

                <Field label="Current website URL" name="websiteUrl" value={form.websiteUrl} onChange={handleChange} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField label="Project type" name="projectType" value={form.projectType} onChange={handleChange} options={projectTypeOptions} required />
                  <SelectField label="Budget range" name="budgetRange" value={form.budgetRange} onChange={handleChange} options={budgetOptions} />
                </div>

                <SelectField label="Timeline" name="timeline" value={form.timeline} onChange={handleChange} options={timelineOptions} />

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Message <span className="text-primary">*</span></label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell us about your website, business, or digital system needs."
                    className="w-full resize-none rounded-lg border border-border/50 bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-primary py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, value, onChange, required = false, type = "text" }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-border/50 bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label} {required ? <span className="text-primary">*</span> : null}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-lg border border-border/50 bg-secondary/50 px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary/50 focus:outline-none"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
