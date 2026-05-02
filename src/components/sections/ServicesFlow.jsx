"use client";

import SystemDiagram from "@/components/visuals/SystemDiagram";

const launchPriorityItems = [
  "Website redesigns",
  "New website builds",
  "Website evaluations",
  "SEO foundation",
  "Lead path cleanup",
  "Ongoing support",
];

const broaderCapabilityItems = [
  "Client portals",
  "Internal dashboards",
  "Workflow automation",
  "Form & CRM integrations",
  "Custom web tools",
  "Business system builds",
];

const systemsNodes = [
  { label: "Website" },
  { label: "Lead Path" },
  { label: "CRM / Form" },
  { label: "Dashboard" },
  { label: "Automation" },
  { label: "Support" },
];

function LaunchPriorityGraphic() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center">
      <div className="absolute inset-4 rounded-full border border-primary/18" />
      <div className="absolute inset-10 rounded-full border border-white/10" />
      <div className="absolute inset-[26%] rounded-full border border-primary/18" />
      <div className="absolute h-4 w-4 rounded-full bg-primary shadow-[0_0_22px_rgba(59,130,246,0.75)] animate-pulse" />
      <div className="absolute left-[16%] top-[28%] h-2.5 w-2.5 rounded-full bg-white/75 shadow-[0_0_12px_rgba(255,255,255,0.35)]" />
      <div className="absolute right-[18%] top-[22%] h-3 w-3 rounded-full bg-primary/75 shadow-[0_0_14px_rgba(59,130,246,0.5)]" />
      <div className="absolute bottom-[22%] left-[20%] h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.32)]" />
      <div className="absolute bottom-[18%] right-[22%] h-2.5 w-2.5 rounded-full bg-primary/80 shadow-[0_0_14px_rgba(59,130,246,0.5)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_58%)]" />
      <div className="relative rounded-full border border-white/10 bg-[#08101d] px-5 py-3 text-center shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">Launch</div>
        <div className="mt-1 text-sm text-white/76">Website-first path</div>
      </div>
    </div>
  );
}

function LaunchPriorityBlock() {
  return (
    <div className="rounded-[30px] border border-white/10 bg-[#0B1220]/82 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur md:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.9fr)] lg:items-center">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Launch Priority</div>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Where every engagement starts</h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
            Fastest path to real customers. Every engagement starts with evaluation and a clear website build path.
          </p>
          <div className="mt-8">
            <LaunchPriorityGraphic />
          </div>
        </div>

        <ol className="space-y-4">
          {launchPriorityItems.map((item, index) => (
            <li key={item} className="flex gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
              <span className="w-8 shrink-0 text-sm font-semibold tracking-[0.18em] text-primary/90">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-base leading-7 text-white/78">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function SystemsDivider() {
  return (
    <div className="py-10 md:py-12">
      <div className="mx-auto flex max-w-3xl items-center gap-4 text-center">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
          Then, when the business needs more
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/10 to-transparent" />
      </div>
    </div>
  );
}

function SystemsExpansionBlock() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(360px,1fr)] lg:items-start">
      <div>
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Broader Capability</div>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
          When a better homepage isn’t enough — SDL builds operational systems behind the public site.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {broaderCapabilityItems.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm leading-6 text-white/78">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[30px] border border-white/10 bg-[#0B1220]/82 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur md:p-8">
        <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Full-Stack Reach</div>
        <h3 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Systems built to run the business</h3>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Website → Lead Path → CRM/Form → Dashboard → Automation → Support.
        </p>
        <div className="mt-6">
          <SystemDiagram nodes={systemsNodes} />
        </div>
      </div>
    </div>
  );
}

export default function ServicesFlow() {
  return (
    <section className="pb-20 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LaunchPriorityBlock />
        <SystemsDivider />
        <SystemsExpansionBlock />
      </div>
    </section>
  );
}
