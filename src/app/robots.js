import fs from 'fs';
import path from 'path';

function getSiteSeo() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'site-content.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data.seo || null;
  } catch {
    return null;
  }
}

export default function robots() {
  const seo = getSiteSeo();
  const baseUrl = seo?.canonicalUrl || 'https://enfermeraentucasa.es';
  const disallowPaths = (seo?.robotsDisallow || '/studio/,/admin,/api/')
    .split(',')
    .map(d => d.trim())
    .filter(Boolean);

  return {
    rules: {
      userAgent: '*',
      allow: seo?.robotsAllow || '/',
      disallow: disallowPaths,
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
