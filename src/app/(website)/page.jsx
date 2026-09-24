import { draftMode } from 'next/headers';
import fs from 'fs';
import path from 'path';
import { getClient } from '../../sanity/client';
import PageBuilder from '../../components/PageBuilder';
import FeaturesBand from '../../components/FeaturesBand';
import MapSection from '../../components/MapSection';

// Load local JSON content (from custom admin panel)
function getSiteContent() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'site-content.json');
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

// Merge JSON admin data into a Sanity block, so JSON always wins
function mergeBlockWithJson(block, siteContent) {
  if (!siteContent) return block;
  switch (block._type) {
    case 'services':
      return {
        ...block,
        servicesList: siteContent.services?.map(s => ({
          title: s.title,
          desc: s.desc,
          image: s.image,
          price: s.price,
        })) ?? block.servicesList,
      };
    case 'rates':
      return {
        ...block,
        ratesList: siteContent.rates ?? block.ratesList,
        bonosList: siteContent.bonos ?? block.bonosList,
      };
    case 'reviews':
      return {
        ...block,
        reviewsList: siteContent.reviews ?? block.reviewsList,
      };
    case 'faq':
      return {
        ...block,
        faqsList: siteContent.faq?.map(f => ({
          question: f.question,
          answer: f.answer,
        })) ?? block.faqsList,
      };
    case 'hero':
      return {
        ...block,
        heading: siteContent.hero?.heading ?? block.heading,
        body: siteContent.hero?.body ?? block.body,
      };
    default:
      return block;
  }
}

export default async function Home() {
  const isDraftMode = (await draftMode()).isEnabled;
  const siteContent = getSiteContent();
  let pageData = null;

  try {
    const fetchClient = getClient(isDraftMode);
    pageData = await fetchClient.fetch(
      `*[_type == "page" && slug.current == "home"][0]{
        title,
        pageBuilder
      }`
    );
  } catch (error) {
    console.error("Failed to fetch Sanity homepage data, falling back to defaults:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Enfermera en tu casa",
    "image": "https://enfermeraentucasa.es/assets/logo.png",
    "@id": "https://enfermeraentucasa.es/#organization",
    "url": "https://enfermeraentucasa.es",
    "telephone": siteContent?.settings?.phone || "+34641635705",
    "email": siteContent?.settings?.email || "info@enfermeraentucasa.es",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": siteContent?.settings?.location || "Zaragoza",
      "addressRegion": "Aragón",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6504492,
      "longitude": -0.8827468
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.google.com/maps/place/Enfermera+en+tu+casa/@41.6504532,-0.8853217,17z"
    ]
  };

  // No Sanity data — render pure defaults (JSON will still be applied via component fallbacks)
  if (!pageData || !pageData.pageBuilder) {
    const defaultBlocks = [
      { _type: 'hero',     ...(siteContent?.hero || {}) },
      { _type: 'services', servicesList: siteContent?.services },
      { _type: 'rates',    ratesList: siteContent?.rates, bonosList: siteContent?.bonos },
      { _type: 'team' },
      { _type: 'faq',     faqsList: siteContent?.faq },
      { _type: 'reviews',  reviewsList: siteContent?.reviews },
    ];
    const heroBlock = defaultBlocks[0];
    const rest = defaultBlocks.slice(1);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PageBuilder blocks={[heroBlock]} />
        <FeaturesBand />
        <PageBuilder blocks={rest} />
        <MapSection />
      </>
    );
  }

  // Sanity data found — merge JSON overrides into each block
  const allBlocks = (pageData.pageBuilder || [])
    .filter(b => b._type !== 'blogSection' && b._type !== 'ctaBanner')
    .map(b => mergeBlockWithJson(b, siteContent));

  const heroIndex = allBlocks.findIndex(b => b._type === 'hero');

  if (heroIndex !== -1) {
    const beforeHero = allBlocks.slice(0, heroIndex);
    const heroBlock  = allBlocks[heroIndex];
    const afterHero  = allBlocks.slice(heroIndex + 1);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PageBuilder blocks={beforeHero} />
        <PageBuilder blocks={[heroBlock]} />
        <FeaturesBand />
        <PageBuilder blocks={afterHero} />
        <MapSection />
      </>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageBuilder blocks={allBlocks} />
      <FeaturesBand />
      <MapSection />
    </>
  );
}
