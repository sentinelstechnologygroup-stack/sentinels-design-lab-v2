import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_ROOT = path.join(process.cwd(), "src/content/blog");
const STANDALONE_ARTICLES_PATH = path.join(BLOG_ROOT, "standalone", "articles");
const STANDALONE_DIRECT_PATH = path.join(BLOG_ROOT, "standalone");

function normalizePost(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    title: data.title || "Untitled Article",
    slug: data.slug,
    aliases: Array.isArray(data.aliases) ? data.aliases : [],
    category: data.category || "Insights",
    date: data.date || "",
    readTime: data.readTime || "",
    excerpt: data.excerpt || "",
    author: data.author || "Sentinels Design Lab",
    series: data.series || "",
    seriesOrder: Number(data.seriesOrder || 0),
    thumbnailUrl: data.thumbnailUrl || data.thumbnail || "/images/blog/fallback-editorial.svg",
    heroUrl: data.heroUrl || data.hero || data.thumbnailUrl || "/images/blog/fallback-editorial.svg",
    alt: data.alt || data.title || "SDL blog article image",
    content,
    contentPath: filePath,
  };
}

function collectMdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectMdxFiles(fullPath);
      if (entry.isFile() && entry.name.endsWith(".mdx") && !entry.name.includes("Zone.Identifier")) return [fullPath];
      return [];
    });
}

function parseDate(value) {
  const time = Date.parse(value || "");
  return Number.isNaN(time) ? 0 : time;
}

export async function getAllPosts() {
  const files = [
    ...collectMdxFiles(STANDALONE_ARTICLES_PATH),
    ...collectMdxFiles(STANDALONE_DIRECT_PATH),
  ];

  const uniqueFiles = [...new Set(files)].filter((file) => file.endsWith(".mdx"));

  return uniqueFiles
    .map(normalizePost)
    .filter((post) => Boolean(post.slug))
    .sort((a, b) => parseDate(b.date) - parseDate(a.date));
}
