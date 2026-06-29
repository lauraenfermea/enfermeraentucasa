import { draftMode } from 'next/headers';
import { getClient } from '../../sanity/client';
import PageBuilder from '../../components/PageBuilder';
import FeaturesBand from '../../components/FeaturesBand';
import MapSection from '../../components/MapSection';


export default async function Home() {
  const isDraftMode = (await draftMode()).isEnabled;
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
    "telephone": "+34641635705",
    "email": "info@enfermeraentucasa.es",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zaragoza",
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
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://www.google.com/maps/place/Enfermera+en+tu+casa/@41.6504532,-0.8853217,17z"
    ]
  };

  // Fallback to default block layout if Sanity has no data yet
  if (!pageData || !pageData.pageBuilder) {
    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PageBuilder blocks={[{ _type: 'hero' }]} />
        <FeaturesBand />
        <PageBuilder blocks={[
          { _type: 'services' },
          { _type: 'rates' },
          { _type: 'team' },
          { _type: 'faq' },
          { _type: 'reviews' }
        ]} />
        <MapSection />
      </>
    );
  }

  const blocks = (pageData.pageBuilder || []).filter(block => block._type !== 'blogSection' && block._type !== 'ctaBanner');
  const heroIndex = blocks.findIndex(block => block._type === 'hero');

  if (heroIndex !== -1) {
    const beforeHero = blocks.slice(0, heroIndex);
    const heroBlock = blocks[heroIndex];
    const afterHero = blocks.slice(heroIndex + 1);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageBuilder blocks={blocks} />
      <FeaturesBand />
      <MapSection />
    </>
  );
}
