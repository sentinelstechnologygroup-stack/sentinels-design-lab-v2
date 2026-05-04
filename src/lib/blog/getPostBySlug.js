import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_ROOT = path.join(process.cwd(), 'src/content/blog');
const SERIES_DIR = path.join(CONTENT_ROOT, 'series');
const STANDALONE_DIR = path.join(CONTENT_ROOT, 'standalone');

function getAllMdxFiles() {
  const files = [];

  if (fs.existsSync(SERIES_DIR)) {
    for (const seriesSlug of fs.readdirSync(SERIES_DIR)) {
      const articlesDir = path.join(SERIES_DIR, seriesSlug, 'articles');
      if (!fs.existsSync(articlesDir)) continue;
      for (const file of fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))) {
        files.push(path.join(articlesDir, file));
      }
    }
  }

  if (fs.existsSync(STANDALONE_DIR)) {
    for (const dir of fs.readdirSync(STANDALONE_DIR)) {
      const filePath = path.join(STANDALONE_DIR, dir, 'index.mdx');
      if (fs.existsSync(filePath)) files.push(filePath);
    }
  }

  return files;
}

export async function getPostBySlug(slug) {
  for (const filePath of getAllMdxFiles()) {
    const source = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(source);
    if (data.slug === slug || (data.aliases && data.aliases.includes(slug))) {
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
        content,
      };
    }
  }
  return null;
}
