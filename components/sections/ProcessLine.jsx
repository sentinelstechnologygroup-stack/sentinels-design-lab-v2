"use client";

export default function ProcessLine({ steps = [] }) {
  return (
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Process</div>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">Evaluate. Scope. Build. QA. Deploy. Support.</h2>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute left-0 right-0 top-5 h-px bg-gradient-to-r from-white/10 via-primary/35 to-white/10" />
          <ol className="grid grid-cols-6 gap-6">
            {steps.map((step) => (
              <li key={step.number} className="relative">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-[#08101d] text-sm font-semibold text-primary shadow-[0_0_24px_rgba(59,130,246,0.18)]">
                  {step.number}
                </div>
                <div className="text-xl font-semibold text-white">{step.title}</div>
                <p className="mt-3 text-sm leading-7 text-white/65">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative space-y-8 md:hidden">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-white/10 via-primary/35 to-white/10" />
          <ol className="space-y-8">
            {steps.map((step) => (
              <li key={step.number} className="relative pl-16">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-[#08101d] text-sm font-semibold text-primary shadow-[0_0_24px_rgba(59,130,246,0.18)]">
                  {step.number}
                </div>
                <div className="text-xl font-semibold text-white">{step.title}</div>
                <p className="mt-3 text-sm leading-7 text-white/65">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
