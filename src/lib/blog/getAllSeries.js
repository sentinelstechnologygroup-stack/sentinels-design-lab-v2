import fs from 'fs';
import path from 'path';

const SERIES_DIR = path.join(process.cwd(), 'src/content/blog/series');

export async function getAllSeries() {
  if (!fs.existsSync(SERIES_DIR)) return [];
  return fs.readdirSync(SERIES_DIR)
    .map(slug => {
      const jsonPath = path.join(SERIES_DIR, slug, 'series.json');
      if (!fs.existsSync(jsonPath)) return null;
      return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    })
    .filter(Boolean);
}
