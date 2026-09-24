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
        title: siteContent.homePage?.servicesHeader?.title ?? block.title,
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
        title: siteContent.homePage?.ratesHeader?.title ?? block.title,
        ratesList: siteContent.rates ?? block.ratesList,
        bonosList: siteContent.bonos ?? block.bonosList,
      };
    case 'team':
      return {
        ...block,
        title: siteContent.team?.title ?? block.title,
        subtitle: siteContent.team?.subtitle ?? block.subtitle,
        teamMembers: siteContent.team?.members ?? block.teamMembers,
        bio: siteContent.team?.paragraphs ?? block.bio,
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
        heading: siteContent.homePage?.hero?.heading ?? siteContent.hero?.heading ?? block.heading,
        body: siteContent.homePage?.hero?.body ?? siteContent.hero?.body ?? block.body,
        bgImage: siteContent.homePage?.hero?.bgImage ?? siteContent.hero?.bgImage ?? block.bgImage,
        badgeText: siteContent.homePage?.hero?.badgeText ?? siteContent.hero?.badgeText ?? block.badgeText,
        primaryCtaText: siteContent.homePage?.hero?.primaryCtaText ?? siteContent.hero?.primaryCtaText ?? block.primaryCtaText,
        primaryCtaUrl: siteContent.homePage?.hero?.primaryCtaUrl ?? siteContent.hero?.primaryCtaUrl ?? block.primaryCtaUrl,
        secondaryCtaText: siteContent.homePage?.hero?.secondaryCtaText ?? siteContent.hero?.secondaryCtaText ?? block.secondaryCtaText,
        secondaryCtaUrl: siteContent.homePage?.hero?.secondaryCtaUrl ?? siteContent.hero?.secondaryCtaUrl ?? block.secondaryCtaUrl,
      };
    case 'ctaBanner':
      return {
        ...block,
        title: siteContent.homePage?.ctaBanner?.title ?? block.title,
        desc: siteContent.homePage?.ctaBanner?.subtitle ?? block.desc,
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

  const seo = siteContent?.seo || {};
  const settings = siteContent?.settings || {};

  // Comprehensive MedicalBusiness & AI Search JSON-LD Structured Data Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "LocalBusiness"],
    "name": seo.businessName || settings.siteName || "Enfermera en tu casa",
    "description": seo.metaDescription || "Atención de enfermería profesional a domicilio en Zaragoza",
    "image": "https://enfermeraentucasa.es/assets/logo.png",
    "@id": "https://enfermeraentucasa.es/#organization",
    "url": seo.canonicalUrl || "https://enfermeraentucasa.es",
    "telephone": settings.phone || "+34641635705",
    "email": settings.email || "info@enfermeraentucasa.es",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": seo.addressLocality || "Zaragoza",
      "addressRegion": seo.addressRegion || "Aragón",
      "postalCode": seo.postalCode || "50001",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": Number(seo.latitude || 41.6504492),
      "longitude": Number(seo.longitude || -0.8827468)
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "knowsAbout": [
      "Enfermería a domicilio",
      "Curas de heridas y úlceras por presión",
      "Extracciones de sangre y analíticas a domicilio",
      "Inyectables y administración de medicación",
      "Control de constantes vitales",
      "Cuidados del recién nacido",
      "Sondas, drenajes y ostomías",
      "Cuidados de personas mayores a domicilio en Zaragoza"
    ],
    "disambiguatingDescription": seo.aiSummary || "Servicio sanitario certificado de enfermería a domicilio en Zaragoza",
    "sameAs": [
      "https://share.google/jfi2BZwBHaDbi7EFt"
    ]
  };

  const defaultBlocks = [
    { _type: 'hero',     ...(siteContent?.homePage?.hero || siteContent?.hero || {}) },
    { _type: 'services', title: siteContent?.homePage?.servicesHeader?.title, servicesList: siteContent?.services },
    { _type: 'rates',    title: siteContent?.homePage?.ratesHeader?.title, ratesList: siteContent?.rates, bonosList: siteContent?.bonos },
    { _type: 'team',     title: siteContent?.team?.title, subtitle: siteContent?.team?.subtitle, teamMembers: siteContent?.team?.members, bio: siteContent?.team?.paragraphs },
    { _type: 'faq',      faqsList: siteContent?.faq },
    { _type: 'reviews',  reviewsList: siteContent?.reviews },
    { _type: 'ctaBanner', ...(siteContent?.homePage?.ctaBanner || {}) },
  ];

  if (!pageData || !pageData.pageBuilder) {
    const heroBlock = defaultBlocks[0];
    const rest = defaultBlocks.slice(1);
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <PageBuilder blocks={[heroBlock]} />
        <FeaturesBand items={siteContent?.homePage?.featuresBand} />
        <PageBuilder blocks={rest} />
        <MapSection {...(siteContent?.homePage?.mapSection || {})} />
      </>
    );
  }

  const allBlocks = (pageData.pageBuilder || [])
    .filter(b => b._type !== 'blogSection')
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
        <FeaturesBand items={siteContent?.homePage?.featuresBand} />
        <PageBuilder blocks={afterHero} />
        <MapSection {...(siteContent?.homePage?.mapSection || {})} />
      </>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageBuilder blocks={allBlocks} />
      <FeaturesBand items={siteContent?.homePage?.featuresBand} />
      <MapSection {...(siteContent?.homePage?.mapSection || {})} />
    </>
  );
}
