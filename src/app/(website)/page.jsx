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

  // Fallback to default block layout if Sanity has no data yet
  if (!pageData || !pageData.pageBuilder) {
    return (
      <>
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
      <PageBuilder blocks={blocks} />
      <FeaturesBand />
      <MapSection />
    </>
  );
}
