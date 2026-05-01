import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTASection from "@/components/shared/CTASection";
import { blogPosts } from "@/lib/siteData";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  if (!post) {
    return pageMetadata("Blog | Sentinels Design Lab", "SDL articles and insights.", "/blog");
  }

  return pageMetadata(
    `${post.title} | Sentinels Design Lab`,
    post.excerpt,
    `/blog/${post.slug}`,
    post.heroImage,
  );
}

export default function Page({ params }) {
  const post = blogPosts.find((item) => item.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl">
          <Link href="/blog" className="text-sm font-medium text-blue-400 transition hover:text-blue-300">
            ← Back to Blog
          </Link>
          <div className="mt-8 text-xs uppercase tracking-[0.18em] text-primary">{post.category}</div>
          <h1 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">{post.title}</h1>
          <div className="mt-4 text-sm text-white/45">{post.date} • {post.readTime}</div>
          <p className="mt-6 text-lg leading-8 text-white/70">{post.excerpt}</p>
        </div>

        {post.heroImage ? (
          <div className="mt-10 max-w-5xl">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] border border-white/10 bg-[#09111f] shadow-2xl shadow-black/30">
              <Image
                src={post.heroImage}
                alt={post.heroImageAlt || post.title}
                fill
                priority
                sizes="(min-width: 1280px) 1120px, (min-width: 768px) 90vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </section>

      <section className="section-shell pb-24">
        <article className="panel-safe mx-auto max-w-3xl p-6 md:p-10">
          <div className="space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-heading text-2xl font-semibold text-white">{section.heading}</h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-sm leading-8 text-white/75 md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>
      </section>

      <CTASection
        title="Need a cleaner website or smarter digital system?"
        description="Request a Website Evaluation."
        ctaLabel="Get Website Evaluation"
      />
    </div>
  );
}
