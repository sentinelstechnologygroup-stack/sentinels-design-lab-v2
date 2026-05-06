import { notFound } from "next/navigation";
import CTASection from "@/components/shared/CTASection";
import BlogArticleTemplate from "@/components/blog/BlogArticleTemplate";
import { getAllPosts } from "@/lib/blog/getAllPosts";
import { getPostBySlug } from "@/lib/blog/getPostBySlug";
import { compileMdxContent } from "@/lib/blog/renderMdx";
import { pageMetadata } from "@/lib/metadata";
import { business, seo } from "@/lib/siteData";

const mdxComponents = {
  h2: ({ children }) => (
    <h2 className="font-heading text-2xl font-semibold text-white md:text-3xl mt-10 mb-4">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-heading text-xl font-semibold text-white md:text-2xl mt-8 mb-3">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-sm leading-8 text-white/75 md:text-base mt-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mt-5 space-y-3 list-none pl-0">{children}</ul>
  ),
  li: ({ children }) => (
    <li className="flex gap-3 text-sm leading-7 text-white/75 md:text-base">
      <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-6 mb-6 border-l-2 border-primary pl-5 font-heading text-xl italic leading-9 text-white/85">{children}</blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-white">{children}</strong>
  ),
  hr: () => <hr className="border-white/10 my-8" />,
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.flatMap((post) => [
    { slug: post.slug },
    ...(post.aliases || []).map((alias) => ({ slug: alias })),
  ]);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return pageMetadata("Blog | Sentinels Design Lab", "SDL articles.", "/blog");
  return pageMetadata(`${post.title} | Sentinels Design Lab`, post.excerpt, `/blog/${post.slug}`, post.heroUrl);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const Content = await compileMdxContent(post.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: business.name,
      url: seo.baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: business.name,
      url: seo.baseUrl,
    },
    url: `${seo.baseUrl}/blog/${post.slug}`,
    image: post.heroUrl ? `${seo.baseUrl}${post.heroUrl}` : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${seo.baseUrl}/blog/${post.slug}`,
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogArticleTemplate
        title={post.title}
        category={post.category}
        date={post.date}
        readTime={post.readTime}
        excerpt={post.excerpt}
        heroImage={post.heroUrl}
        heroImageAlt={post.alt || post.title}
      >
        <Content components={mdxComponents} />
      </BlogArticleTemplate>
      <CTASection
        title="Need a cleaner website or smarter digital system?"
        description="Request a website evaluation and we'll show you the clearest next step."
        ctaLabel="Get Website Evaluation"
      />
    </div>
  );
}
