     1|"use client";
     2|
     3|import React, { useEffect, useState } from "react";
     4|import { Mail, MapPin, Phone } from "lucide-react";
     5|import { BUSINESS } from "@/lib/constants";
     6|import {
     7|  budgetOptions,
     8|  projectTypeOptions,
     9|  primaryCta,
    10|  timelineOptions,
    11|} from "@/lib/siteData";
    12|
    13|const initialForm = {
    14|  name: "",
    15|  businessName: "",
    16|  email: "",
    17|  phone: "",
    18|  websiteUrl: "",
    19|  projectType: "",
    20|  budgetRange: "",
    21|  timeline: "",
    22|  message: "",
    23|};
    24|
    25|export default function Contact() {
    26|  const [form, setForm] = useState(initialForm);
    27|  const [submitted, setSubmitted] = useState(false);
    28|
    29|  useEffect(() => {
    30|    if (typeof window === "undefined") return;
    31|    const params = new URLSearchParams(window.location.search);
    32|    const type = params.get("type");
    33|    if (type === "website-evaluation") {
    34|      setForm((prev) => ({
    35|        ...prev,
    36|        projectType: prev.projectType || "Website redesign",
    37|        message:
    38|          prev.message ||
    39|          "I would like a website evaluation and a recommendation on the clearest next step.",
    40|      }));
    41|    }
    42|  }, []);
    43|
    44|  const handleChange = (event) => {
    45|    const { name, value } = event.target;
    46|    setForm((prev) => ({ ...prev, [name]: value }));
    47|  };
    48|
    49|  const handleSubmit = (event) => {
    50|    event.preventDefault();
    51|    console.log("SDL contact request", form);
    52|    setSubmitted(true);
    53|    setForm(initialForm);
    54|  };
    55|
    56|  return (
    57|    <div>
    58|      <section className="relative overflow-hidden pt-28 pb-20">
    59|        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
    60|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    61|          <div className="grid gap-16 lg:grid-cols-2">
    62|            <div>
    63|              <span className="eyebrow mb-6">Contact</span>
    64|              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
    65|                Request a website evaluation or scope a broader digital build
    66|              </h1>
    67|              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
    68|                SDL leads publicly with website evaluations and redesigns, but we also scope portals, dashboards, automations, integrations, and other practical digital systems when the business needs more.
    69|              </p>
    70|
    71|              <div className="mt-10 space-y-6">
    72|                <div className="flex items-start gap-4">
    73|                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
    74|                    <Phone className="h-5 w-5 text-primary" />
    75|                  </div>
    76|                  <div>
    77|                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
    78|                    <a href={BUSINESS.phoneHref} className="font-heading font-semibold text-foreground hover:text-primary">
    79|                      {BUSINESS.phone}
    80|                    </a>
    81|                  </div>
    82|                </div>
    83|
    84|                <div className="flex items-start gap-4">
    85|                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
    86|                    <Mail className="h-5 w-5 text-primary" />
    87|                  </div>
    88|                  <div>
    89|                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
    90|                    <a href={`mailto:${BUSINESS.email}`} className="font-heading font-semibold text-foreground hover:text-primary">
    91|                      {BUSINESS.email}
    92|                    </a>
    93|                  </div>
    94|                </div>
    95|
    96|                <div className="flex items-start gap-4">
    97|                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
    98|                    <MapPin className="h-5 w-5 text-primary" />
    99|                  </div>
   100|                  <div>
   101|                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
   102|                    <div className="font-heading font-semibold text-foreground">{BUSINESS.address}</div>
   103|                  </div>
   104|                </div>
   105|              </div>
   106|            </div>
   107|
   108|            <div>
   109|              <form onSubmit={handleSubmit} className="panel-safe space-y-5 p-8">
   110|                <h2 className="font-heading text-xl font-bold text-foreground">{primaryCta.label}</h2>
   111|
   112|                {submitted ? (
   113|                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-4 text-sm leading-7 text-white/85">
   114|                    Thanks — your request has been received. We’ll review your website or project needs and follow up with the clearest recommended next step.
   115|                  </div>
   116|                ) : null}
   117|
   118|                <div className="grid gap-4 sm:grid-cols-2">
   119|                  <Field label="Name" name="name" value={form.name} onChange={handleChange} required />
   120|                  <Field label="Business name" name="businessName" value={form.businessName} onChange={handleChange} required />
   121|                </div>
   122|
   123|                <div className="grid gap-4 sm:grid-cols-2">
   124|                  <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
   125|                  <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} />
   126|                </div>
   127|
   128|                <Field label="Current website URL" name="websiteUrl" value={form.websiteUrl} onChange={handleChange} />
   129|
   130|                <div className="grid gap-4 sm:grid-cols-2">
   131|                  <SelectField label="Project type" name="projectType" value={form.projectType} onChange={handleChange} options={projectTypeOptions} required />
   132|                  <SelectField label="Budget range" name="budgetRange" value={form.budgetRange} onChange={handleChange} options={budgetOptions} />
   133|                </div>
   134|
   135|                <SelectField label="Timeline" name="timeline" value={form.timeline} onChange={handleChange} options={timelineOptions} />
   136|
   137|                <div>
   138|                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Message <span className="text-primary">*</span></label>
   139|                  <textarea
   140|                    name="message"
   141|                    value={form.message}
   142|                    onChange={handleChange}
   143|                    required
   144|                    rows={6}
   145|                    placeholder="Tell us about your website, business, or digital system needs."
   146|                    className="w-full resize-none rounded-lg border border-border/50 bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
   147|                  />
   148|                </div>
   149|
   150|                <button
   151|                  type="submit"
   152|                  className="w-full rounded-lg bg-primary py-3.5 font-semibold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/20"
   153|                >
   154|                  Submit Request
   155|                </button>
   156|              </form>
   157|            </div>
   158|          </div>
   159|        </div>
   160|      </section>
   161|    </div>
   162|  );
   163|}
   164|
   165|function Field({ label, name, value, onChange, required = false, type = "text" }) {
   166|  return (
   167|    <div>
   168|      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
   169|        {label} {required ? <span className="text-primary">*</span> : null}
   170|      </label>
   171|      <input
   172|        type={type}
   173|        name={name}
   174|        value={value}
   175|        onChange={onChange}
   176|        required={required}
   177|        className="w-full rounded-lg border border-border/50 bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary/50 focus:outline-none"
   178|      />
   179|    </div>
   180|  );
   181|}
   182|
   183|function SelectField({ label, name, value, onChange, options, required = false }) {
   184|  return (
   185|    <div>
   186|      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
   187|        {label} {required ? <span className="text-primary">*</span> : null}
   188|      </label>
   189|      <select
   190|        name={name}
   191|        value={value}
   192|        onChange={onChange}
   193|        required={required}
   194|        className="w-full rounded-lg border border-border/50 bg-secondary/50 px-4 py-2.5 text-sm text-foreground transition-colors focus:border-primary/50 focus:outline-none"
   195|      >
   196|        <option value="">Select an option</option>
   197|        {options.map((option) => (
   198|          <option key={option} value={option}>
   199|            {option}
   200|          </option>
   201|        ))}
   202|      </select>
   203|    </div>
   204|  );
   205|}
   206|