"use client";

export default function TimelineStrip({ items = [] }) {
  return (
    <section className="pb-20 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B1220]/82 px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.32)] backdrop-blur md:px-10 md:py-10">
          <div className="mb-10 md:mb-14">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Timeline</div>
          </div>

          <div className="absolute inset-x-10 top-[112px] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
          <div className="absolute bottom-10 left-11 top-28 w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:hidden" />

          <ol className="timeline-grid">
            {items.map((item) => (
              <li key={`${item.year}-${item.label}`} className="timeline-item relative pl-14 md:pl-0">
                <div className="flex flex-col md:items-center md:text-center">
                  <div className="absolute left-0 top-1 md:static md:mb-5">
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-[#08101d] shadow-[0_0_30px_rgba(148,163,184,0.12)]">
                      <span
                        className={[
                          "h-3 w-3 rounded-full",
                          item.highlight ? "bg-primary shadow-[0_0_22px_rgba(59,130,246,0.75)]" : "bg-white/70",
                        ].join(" ")}
                      />
                    </span>
                  </div>
                  <div className={item.highlight ? "text-primary/90" : "text-white/45"}>{item.year}</div>
                  <div
                    className={[
                      "mt-2 max-w-[16ch] text-lg font-semibold leading-tight",
                      item.highlight ? "text-white" : "text-white/85",
                    ].join(" ")}
                  >
                    {item.label}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <style jsx>{`
        .timeline-grid {
          display: grid;
          gap: 2rem;
        }

        @media (min-width: 768px) {
          .timeline-grid {
            grid-template-columns: repeat(7, minmax(0, 1fr));
            gap: 1.25rem;
          }
        }

        @media (min-width: 1280px) {
          .timeline-grid {
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
