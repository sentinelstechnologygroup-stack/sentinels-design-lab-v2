import Image from "next/image";
import Link from "next/link";

const fallbackImage = "/images/blog/fallback-editorial.webp";

export default function BlogArticleTemplate({ title, category, date, readTime, excerpt, heroImage, heroImageAlt, heroOverlay, children }) {
  const imageSrc = heroImage || fallbackImage;
  const imageAlt = heroImageAlt || title;

  return (
    <div>
      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl">
          <Link href="/blog" className="text-sm font-medium text-primary transition hover:text-white">
            ← Back to Blog
          </Link>
          <div className="mt-8 text-xs uppercase tracking-[0.18em] text-primary">{category}</div>
          <h1 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">{title}</h1>
          <div className="mt-4 text-sm text-white/45">{date} • {readTime}</div>
          <p className="mt-6 text-lg leading-8 text-white/70">{excerpt}</p>
        </div>

        <div className="mt-10 max-w-5xl">
          <div className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-[#09111f] shadow-2xl shadow-black/30 ${heroOverlay ? "aspect-[1456/816]" : "aspect-[16/9]"}`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1280px) 1120px, (min-width: 768px) 90vw, 100vw"
              className={heroOverlay ? "object-cover object-right" : "object-cover"}
            />
            {heroOverlay && (
              <>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.72)_30%,rgba(0,0,0,0.30)_52%,rgba(0,0,0,0)_65%)] max-md:bg-[linear-gradient(to_right,rgba(0,0,0,0.90)_0%,rgba(0,0,0,0.80)_50%,rgba(0,0,0,0.35)_80%,rgba(0,0,0,0)_100%)]"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-[7%] left-[3.5%] top-[7%] z-[1] w-[42%] rounded-[28px] bg-black/35 max-md:left-[3%] max-md:right-[18%] max-md:w-auto"
                />
                <div className="absolute inset-0 z-10 flex max-w-[54%] flex-col justify-center py-[5%] pl-[5.5%] pr-0 max-md:max-w-[88%] max-md:px-[5%]">
                  <p className="font-heading text-[clamp(4rem,8vw,7.6rem)] font-black leading-[0.92] tracking-[-0.03em] text-white">
                    {(heroOverlay.titleLines || []).map((line, i) => (
                      <span key={i} className={`block ${line === heroOverlay.accentLine ? "text-[#C9961A]" : ""}`}>
                        {line}
                      </span>
                    ))}
                  </p>
                  <div aria-hidden="true" className="my-5 h-1 w-56 rounded-sm bg-[#C9961A]" />
                  {(heroOverlay.subtitleLines || heroOverlay.subtitle) && (
                    heroOverlay.subtitleLines ? (
                      <p className="font-display text-[clamp(1.6rem,2.6vw,3rem)] font-semibold leading-[1.15] tracking-[0.02em] text-white">
                        {heroOverlay.subtitleLines.map((line, i) => (
                          <span key={i} className="block">{line}</span>
                        ))}
                      </p>
                    ) : (
                      <p className="max-w-[38ch] font-display text-[clamp(1.6rem,2.6vw,3rem)] font-semibold leading-[1.15] tracking-[0.02em] text-white">
                        {heroOverlay.subtitle}
                      </p>
                    )
                  )}
                  {heroOverlay.tagline && (
                    <div className="mt-6 flex items-center gap-5">
                      <span
                        aria-hidden="true"
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-[2.5px] border-[#C9961A] max-md:h-10 max-md:w-10"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-[55%] w-[55%]">
                          <path d="M12 2.5L2 20.5h20L12 2.5z" fill="#C9961A" stroke="#C9961A" strokeWidth="1.2" strokeLinejoin="round" />
                          <path d="M12 9v5" stroke="#000" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="12" cy="16.5" r="1" fill="#000" />
                        </svg>
                      </span>
                      <span className="font-display text-[clamp(1rem,1.45vw,1.35rem)] font-bold uppercase tracking-[0.18em] text-[#A0A0A0]">
                        {heroOverlay.tagline}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        <article className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-[#08101d] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.28)] md:p-10">
          <div className="space-y-2">
            {children}
          </div>
        </article>
      </section>
    </div>
  );
}
