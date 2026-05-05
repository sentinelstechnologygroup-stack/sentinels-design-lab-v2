"use client";

import Image from "next/image";
import Link from "next/link";

const fallbackImage = "/images/blog/fallback-editorial.webp";

function SectionContent({ section }) {
  return (
    <section>
      <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl">{section.heading}</h2>
      <div className="mt-5 space-y-4">
        {section.paragraphs?.map((paragraph, index) => (
          <p key={index} className="text-sm leading-8 text-white/75 md:text-base">
            {paragraph}
          </p>
        ))}
      </div>

      {section.bullets?.length ? (
        <ul className="mt-5 space-y-3 text-sm leading-7 text-white/75 md:text-base">
          {section.bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.quote ? (
        <blockquote className="mt-6 border-l-2 border-primary pl-5 font-heading text-xl italic leading-9 text-white/85">
          {section.quote}
        </blockquote>
      ) : null}
    </section>
  );
}

export default function BlogArticleTemplate({ title, category, date, readTime, excerpt, heroImage, heroImageAlt, sections = [] }) {
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
          <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-white/10 bg-[#09111f] shadow-2xl shadow-black/30">
            <Image src={imageSrc} alt={imageAlt} fill priority sizes="(min-width: 1280px) 1120px, (min-width: 768px) 90vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        <article className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-[#08101d] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.28)] md:p-10">
          <div className="space-y-12">
            {sections.map((section) => (
              <SectionContent key={section.heading} section={section} />
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
