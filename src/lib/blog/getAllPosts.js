import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content/blog');
const SERIES_DIR = path.join(CONTENT_ROOT, 'series');
const STANDALONE_DIR = path.join(CONTENT_ROOT, 'standalone');

export async function getAllPosts() {
  const posts = [];

  // Series articles
  if (fs.existsSync(SERIES_DIR)) {
    for (const seriesSlug of fs.readdirSync(SERIES_DIR)) {
      const articlesDir = path.join(SERIES_DIR, seriesSlug, 'articles');
      if (!fs.existsSync(articlesDir)) continue;
      for (const file of fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))) {
        const filePath = path.join(articlesDir, file);
        const { data } = matter(fs.readFileSync(filePath, 'utf8'));
        posts.push(normalizePost(data));
      }
    }
  }

  // Standalone articles
  if (fs.existsSync(STANDALONE_DIR)) {
    for (const dir of fs.readdirSync(STANDALONE_DIR)) {
      const filePath = path.join(STANDALONE_DIR, dir, 'index.mdx');
      if (!fs.existsSync(filePath)) continue;
      const { data } = matter(fs.readFileSync(filePath, 'utf8'));
      // Skip if already added from series
      if (!posts.find(p => p.slug === data.slug)) {
        posts.push(normalizePost(data));
      }
    }
  }

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function normalizePost(data) {
  return {
    slug: data.slug,
    title: data.title,
    category: data.category,
    date: data.date,
    readTime: data.readTime,
    excerpt: data.excerpt,
    author: data.author || 'Sentinels Design Lab',
    series: data.series || '',
    seriesOrder: data.seriesOrder || 0,
    thumbnailUrl: data.thumbnailUrl || '/images/blog/fallback-editorial.svg',
    heroUrl: data.heroUrl || '/images/blog/fallback-editorial.svg',
    alt: data.alt || '',
    aliases: data.aliases || [],
  };
}
