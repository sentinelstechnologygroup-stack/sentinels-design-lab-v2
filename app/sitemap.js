import { getAllPosts } from "@/lib/blog/getAllPosts";
import { seo } from "@/lib/siteData";

const STATIC_ROUTES = [
  { path: "/",         changeFrequency: "weekly",  priority: 1.0 },
  { path: "/about",    changeFrequency: "monthly", priority: 0.7 },
  { path: "/services",     changeFrequency: "monthly", priority: 0.8 },
  { path: "/systems/sis", changeFrequency: "monthly", priority: 0.8 },
  { path: "/work",        changeFrequency: "monthly", priority: 0.7 },
  { path: "/pricing",  changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog",     changeFrequency: "weekly",  priority: 0.8 },
  { path: "/contact",  changeFrequency: "monthly", priority: 0.6 },
];

export default async function sitemap() {
  const posts = await getAllPosts();

  // 🔒 Single build timestamp (cleaner for crawlers)
  const buildDate = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${seo.baseUrl}${path}`,
    lastModified: buildDate,
    changeFrequency,
    priority,
  }));

  const blogEntries = posts.map((post) => ({
    url: `${seo.baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : buildDate,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}