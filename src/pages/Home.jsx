     1|"use client";
     2|
     3|import Link from "next/link";
     4|import {
     5|  ArrowRight,
     6|  CheckCircle2,
     7|  LayoutDashboard,
     8|  ShieldCheck,
     9|  Wrench,
    10|} from "lucide-react";
    11|import CTASection from "@/components/shared/CTASection";
    12|import {
    13|  bestFit,
    14|  capabilityCards,
    15|  homeHeroTags,
    16|  opportunityPoints,
    17|  primaryCta,
    18|  processSteps,
    19|  secondaryCta,
    20|  whatWeDo,
    21|  whySentinels,
    22|} from "@/lib/siteData";
    23|
    24|const heroTiles = [
    25|  {
    26|    src: "/images/home/tile-branding.png",
    27|    alt: "Website redesign work",
    28|    label: "Website Redesigns",
    29|    className: "row-span-2",
    30|  },
    31|  {
    32|    src: "/images/home/tile-web-design.png",
    33|    alt: "Custom website builds",
    34|    label: "Custom Websites",
    35|    className: "",
    36|  },
    37|  {
    38|    src: "/images/home/tile-mobile.png",
    39|    alt: "Portals and dashboards",
    40|    label: "Portals & Dashboards",
    41|    className: "",
    42|  },
    43|  {
    44|    src: "/images/home/tile-seo.png",
    45|    alt: "SEO foundation and lead flow",
    46|    label: "SEO Foundation",
    47|    className: "",
    48|  },
    49|  {
    50|    src: "/images/home/tile-video.png",
    51|    alt: "Automation and integrations",
    52|    label: "Automations",
    53|    className: "",
    54|  },
    55|];
    56|
    57|export default function Home() {
    58|  return (
    59|    <div className="relative overflow-hidden text-white">
    60|      <section className="relative bg-transparent pb-8 pt-28">
    61|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    62|          <div className="grid items-end gap-10 lg:grid-cols-2">
    63|            <div className="pb-10 lg:pb-16">
    64|              <span className="eyebrow mb-6 px-4 py-1.5 text-xs">
    65|                <ShieldCheck className="h-3.5 w-3.5" />
    66|                Website redesigns first. Full-stack capability behind them.
    67|              </span>
    68|
    69|              <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
    70|                Websites Built to <span className="text-primary">Win More Business</span>
    71|              </h1>
    72|
    73|              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
    74|                We design and build modern websites and custom digital systems for businesses that need stronger trust, clearer messaging, better lead flow, and scalable infrastructure.
    75|              </p>
    76|
    77|              <div className="mb-8 flex flex-wrap gap-2">
    78|                {homeHeroTags.map((tag) => (
    79|                  <span key={tag} className="pill px-3 py-1.5 text-xs">
    80|                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
    81|                    {tag}
    82|                  </span>
    83|                ))}
    84|              </div>
    85|
    86|              <div className="mb-10 flex flex-wrap gap-4">
    87|                <Link href={primaryCta.path} className="btn-primary px-8 py-3.5 text-sm">
    88|                  {primaryCta.label}
    89|                  <ArrowRight className="h-4 w-4" />
    90|                </Link>
    91|
    92|                <Link href={secondaryCta.path} className="btn-secondary px-8 py-3.5 text-sm">
    93|                  {secondaryCta.label}
    94|                </Link>
    95|              </div>
    96|
    97|              <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
    98|                <div className="inline-flex items-center gap-2">
    99|                  <ShieldCheck className="h-4 w-4 text-primary" />
   100|                  Modern websites
   101|                </div>
   102|                <div className="inline-flex items-center gap-2">
   103|                  <LayoutDashboard className="h-4 w-4 text-primary" />
   104|                  Portals, dashboards, and automations
   105|                </div>
   106|                <div className="inline-flex items-center gap-2">
   107|                  <Wrench className="h-4 w-4 text-primary" />
   108|                  Controlled builds and managed infrastructure
   109|                </div>
   110|              </div>
   111|            </div>
   112|
   113|            <div className="relative hidden lg:block">
   114|              <div className="absolute -inset-4 rounded-[2rem] bg-sky-400/8 blur-2xl" />
   115|              <div className="relative grid h-[560px] grid-cols-2 grid-rows-3 gap-3">
   116|                {heroTiles.map((tile) => (
   117|                  <div
   118|                    key={tile.label}
   119|                    className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-transparent shadow-[0_16px_50px_rgba(0,0,0,0.28)] ${tile.className}`}
   120|                  >
   121|                    <img
   122|                      src={tile.src}
   123|                      alt={tile.alt}
   124|                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
   125|                    />
   126|                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/90 via-[#050816]/20 to-transparent" />
   127|                    <div className="absolute bottom-0 left-0 right-0 p-4">
   128|                      <span className="pill px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
   129|                        {tile.label}
   130|                      </span>
   131|                    </div>
   132|                  </div>
   133|                ))}
   134|
   135|                <div className="absolute -left-5 top-1/2 z-10 -translate-y-1/2 panel-safe px-4 py-3">
   136|                  <div className="text-2xl font-heading font-bold text-primary">Launch Wedge</div>
   137|                  <div className="text-xs text-slate-300">Website evaluations and redesigns</div>
   138|                </div>
   139|
   140|                <div className="absolute -right-4 bottom-16 z-10 panel-safe px-4 py-3">
   141|                  <div className="inline-flex items-center gap-2">
   142|                    <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
   143|                    <span className="text-xs font-semibold text-white">Full-stack capability beyond the public site</span>
   144|                  </div>
   145|                </div>
   146|              </div>
   147|            </div>
   148|          </div>
   149|        </div>
   150|      </section>
   151|
   152|      <section className="relative bg-transparent py-20">
   153|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   154|          <div className="mb-14 text-center">
   155|            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Capabilities</span>
   156|            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
   157|              Website-first launch positioning with deeper digital capability
   158|            </h2>
   159|            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
   160|              SDL helps businesses modernize their online presence and build practical digital systems that improve trust, lead flow, operations, and scalability.
   161|            </p>
   162|          </div>
   163|
   164|          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
   165|            {capabilityCards.map((service) => (
   166|              <Link
   167|                key={service.title}
   168|                href="/services"
   169|                className="group block h-full panel-safe p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.28)]"
   170|              >
   171|                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">Core capability</div>
   172|                <h3 className="font-heading text-xl font-semibold text-foreground">{service.title}</h3>
   173|                <p className="mt-3 text-sm leading-7 text-muted-foreground">{service.description}</p>
   174|                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
   175|                  See service details
   176|                  <ArrowRight className="h-4 w-4" />
   177|                </span>
   178|              </Link>
   179|            ))}
   180|          </div>
   181|        </div>
   182|      </section>
   183|
   184|      <section className="relative bg-transparent py-20">
   185|        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
   186|          <div className="panel-safe p-8">
   187|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What We Do</div>
   188|            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Modern websites backed by practical systems thinking</h2>
   189|            <div className="mt-6 grid gap-3 sm:grid-cols-2">
   190|              {whatWeDo.map((item) => (
   191|                <div key={item} className="surface-subtle px-4 py-4 text-sm text-white/80">
   192|                  {item}
   193|                </div>
   194|              ))}
   195|            </div>
   196|          </div>
   197|
   198|          <div className="panel-safe p-8">
   199|            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Best Fit</div>
   200|            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Best for businesses ready to modernize beyond a basic brochure site</h2>
   201|            <div className="mt-6 space-y-3">
   202|              {bestFit.map((item) => (
   203|                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/80">
   204|                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
   205|                  <span>{item}</span>
   206|                </div>
   207|              ))}
   208|            </div>
   209|          </div>
   210|        </div>
   211|      </section>
   212|
   213|      <section className="relative bg-transparent py-20">
   214|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   215|          <div className="mb-14 text-center">
   216|            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Why Sentinels</span>
   217|            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">A cleaner website launch now, stronger digital infrastructure later</h2>
   218|          </div>
   219|          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
   220|            {whySentinels.map((item) => (
   221|              <div key={item.title} className="panel-safe p-7">
   222|                <h3 className="font-heading text-xl font-semibold text-foreground">{item.title}</h3>
   223|                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
   224|              </div>
   225|            ))}
   226|          </div>
   227|        </div>
   228|      </section>
   229|
   230|      <section className="relative bg-transparent py-20">
   231|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   232|          <div className="mb-14 text-center">
   233|            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Process</span>
   234|            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Evaluate. Scope. Build. Launch & refine.</h2>
   235|          </div>
   236|          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
   237|            {processSteps.map((step) => (
   238|              <div key={step.step} className="panel-safe p-7">
   239|                <div className="text-sm font-semibold tracking-[0.18em] text-primary">{step.step}</div>
   240|                <h3 className="mt-3 font-heading text-2xl font-semibold text-foreground">{step.title}</h3>
   241|                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
   242|              </div>
   243|            ))}
   244|          </div>
   245|        </div>
   246|      </section>
   247|
   248|      <section className="relative bg-transparent py-20">
   249|        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
   250|          <div className="panel-safe-heavy px-6 py-8 md:px-10 md:py-10">
   251|            <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
   252|              <div>
   253|                <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Opportunity</div>
   254|                <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
   255|                  Website redesign is the launch wedge. Better digital systems are the broader capability.
   256|                </h2>
   257|                <p className="mt-4 max-w-3xl text-muted-foreground">
   258|                  The fastest path to revenue is usually a cleaner website evaluation and rebuild. But the brand should still make clear that SDL can build portals, dashboards, automations, integrations, and full-stack solutions when the business needs more.
   259|                </p>
   260|              </div>
   261|              <div className="grid gap-3">
   262|                {opportunityPoints.map((point) => (
   263|                  <div key={point} className="surface-subtle px-4 py-4 text-sm text-white/80">
   264|                    {point}
   265|                  </div>
   266|                ))}
   267|              </div>
   268|            </div>
   269|          </div>
   270|        </div>
   271|      </section>
   272|
   273|      <CTASection />
   274|    </div>
   275|  );
   276|}
   277|