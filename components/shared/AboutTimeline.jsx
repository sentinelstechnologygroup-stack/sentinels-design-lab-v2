"use client";

export default function AboutTimeline({ items = [] }) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/12 to-transparent hidden md:block" />
      <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent md:hidden" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-14">
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Timeline</div>
        </div>

        <ol className="timeline-grid">
          {items.map((item) => {
            const isPrimary = item.year === "2026";

            return (
              <li key={`${item.year}-${item.label}`} className="timeline-item relative pl-14 md:pl-0">
                <div className="flex flex-col md:items-center md:text-center">
                  <div className="absolute left-0 top-1 md:static md:mb-6">
                    <span
                      className={[
                        "relative flex h-6 w-6 items-center justify-center rounded-full",
                        isPrimary ? "bg-primary/18 shadow-[0_0_26px_rgba(59,130,246,0.45)]" : "bg-white/[0.05] shadow-[0_0_18px_rgba(148,163,184,0.18)]",
                      ].join(" ")}
                    >
                      <span className={[
                        "h-2.5 w-2.5 rounded-full",
                        isPrimary ? "bg-primary" : "bg-white/60",
                      ].join(" ")} />
                    </span>
                  </div>

                  <div className={isPrimary ? "text-primary/90" : "text-white/45"}>{item.year}</div>
                  <div
                    className={[
                      "mt-2 max-w-[16ch] text-lg font-semibold leading-tight",
                      isPrimary ? "text-white" : "text-white/88",
                    ].join(" ")}
                  >
                    {item.label}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <style jsx>{`
        .timeline-grid {
          display: grid;
          gap: 2.5rem;
        }

        @media (min-width: 768px) {
          .timeline-grid {
            grid-template-columns: repeat(7, minmax(0, 1fr));
            gap: 1.5rem;
          }

          .timeline-item {
            padding-left: 0;
          }
        }

        @media (min-width: 1280px) {
          .timeline-grid {
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
}
