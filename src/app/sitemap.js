import fs from 'fs';
import path from 'path';

function getSiteContent() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'site-content.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

export default async function sitemap() {
  const content = getSiteContent();
  const baseUrl = content?.seo?.canonicalUrl || 'https://enfermeraentucasa.es';
  const blogs = content?.blogs || [];

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Blog post routes (auto-generated from data)
  const blogRoutes = blogs
    .filter(b => !b.noIndex) // Exclude noindex posts
    .map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  return [...staticRoutes, ...blogRoutes];
}
