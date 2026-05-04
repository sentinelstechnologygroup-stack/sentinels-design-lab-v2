import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const SERIES_DIR = path.join(process.cwd(), 'src/content/blog/series');

export async function getSeriesBySlug(slug) {
  const seriesDir = path.join(SERIES_DIR, slug);
  const jsonPath = path.join(seriesDir, 'series.json');
  if (!fs.existsSync(jsonPath)) return null;

  const seriesMeta = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  const articlesDir = path.join(seriesDir, 'articles');
  const articles = [];

  if (fs.existsSync(articlesDir)) {
    for (const file of fs.readdirSync(articlesDir).filter(f => f.endsWith('.mdx'))) {
      const { data } = matter(fs.readFileSync(path.join(articlesDir, file), 'utf8'));
      articles.push({
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        readTime: data.readTime,
        date: data.date,
        seriesOrder: data.seriesOrder || 0,
        thumbnailUrl: data.thumbnailUrl || '/images/blog/fallback-editorial.svg',
      });
    }
  }

  articles.sort((a, b) => a.seriesOrder - b.seriesOrder);
  return { ...seriesMeta, articles };
}
