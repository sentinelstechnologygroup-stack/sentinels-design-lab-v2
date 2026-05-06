import Image from "next/image";
import Link from "next/link";

const fallbackImage = "/images/blog/fallback-editorial.webp";

export default function BlogArticleTemplate({ title, category, date, readTime, excerpt, heroImage, heroImageAlt, children }) {
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

        {heroImage && (
          <div className="mt-10 max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-white/10 bg-[#09111f] shadow-2xl shadow-black/30">
              <Image src={imageSrc} alt={imageAlt} fill priority sizes="(min-width: 1280px) 1120px, (min-width: 768px) 90vw, 100vw" className="object-cover" />
            </div>
          </div>
        )}
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
