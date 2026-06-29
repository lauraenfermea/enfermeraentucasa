import { getClient } from '../sanity/client';

export default async function sitemap() {
  const baseUrl = 'https://enfermeraentucasa.es';

  // Fetch slug pages from Sanity
  let slugPages = [];
  try {
    const client = getClient(false);
    const pages = await client.fetch(`*[_type == "page" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`);
    slugPages = pages.map(page => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date(page._updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch (error) {
    console.error('Failed to fetch sitemap pages:', error);
  }

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
  ];

  return [...staticRoutes, ...slugPages];
}
