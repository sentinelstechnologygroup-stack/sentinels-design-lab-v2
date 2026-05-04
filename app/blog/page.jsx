import BlogPage from "@/components/pages/Blog";
import { getAllPosts } from "@/lib/blog/getAllPosts";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Blog | Sentinels Design Lab",
  "Articles on website redesigns, WordPress modernization, SEO foundation, portals, dashboards, automations, and practical digital systems.",
  "/blog",
);

export default async function Page() {
  const posts = await getAllPosts();
  return <BlogPage posts={posts} />;
}
