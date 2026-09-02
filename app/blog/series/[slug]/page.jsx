import { notFound } from "next/navigation";
import Link from "next/link";
import { getSeriesBySlug } from "@/lib/blog/getSeriesBySlug";
import { getAllSeries } from "@/lib/blog/getAllSeries";
import { pageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  const series = await getAllSeries();
  return series.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) return pageMetadata("Blog | Sentinels Design Lab", "SDL series.", "/blog");
  return pageMetadata(`${series.title} | Sentinels Design Lab`, series.description, `/blog/series/${series.slug}`);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  if (!series) notFound();

  return (
    <div>
      <section className="section-shell pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-4xl">
          <Link href="/blog" className="text-sm font-medium text-primary transition hover:text-white">
            ← Back to Blog
          </Link>
          <div className="mt-8 text-xs uppercase tracking-[0.18em] text-primary">Article Series</div>
          <h1 className="mt-4 font-heading text-4xl font-bold text-white md:text-5xl">{series.title}</h1>
          <p className="mt-6 text-lg leading-8 text-white/70">{series.description}</p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="space-y-4 max-w-4xl">
          {series.articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block overflow-hidden rounded-[20px] border border-white/10 bg-[#08101d] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.28)] transition hover:border-primary/30 hover:bg-[#09111f]"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-3xl font-bold text-primary/30 font-heading">
                  {String(article.seriesOrder).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-white">{article.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/60">{article.excerpt}</p>
                  <div className="mt-3 text-xs text-white/40">{article.date} • {article.readTime}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
