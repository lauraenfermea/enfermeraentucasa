export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/studio/', // Block Sanity Studio from search results
    },
    sitemap: 'https://enfermeraentucasa.es/sitemap.xml',
  }
}
