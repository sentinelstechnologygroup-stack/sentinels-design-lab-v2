import { notFound } from "next/navigation";
import CTASection from "@/components/shared/CTASection";
import BlogArticleTemplate from "@/components/blog/BlogArticleTemplate";
import { blogPosts } from "@/lib/blogPosts";
import { pageMetadata } from "@/lib/metadata";

function findPost(slug) {
  return blogPosts.find((post) => post.slug === slug || post.aliases?.includes(slug));
}

export function generateStaticParams() {
  return blogPosts.flatMap((post) => [post.slug, ...(post.aliases || [])]).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const post = findPost(params.slug);

  if (!post) {
    return pageMetadata("Blog | Sentinels Design Lab", "SDL articles and insights.", "/blog");
  }

  return pageMetadata(`${post.title} | Sentinels Design Lab`, post.excerpt, `/blog/${post.slug}`, post.heroImage);
}

export default function Page({ params }) {
  const post = findPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <BlogArticleTemplate {...post} />
      <CTASection
        title="Need a cleaner website or smarter digital system?"
        description="Request a website evaluation and we’ll show you the clearest next step."
        ctaLabel="Get Website Evaluation"
      />
    </div>
  );
}
