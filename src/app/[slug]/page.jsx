import { draftMode } from 'next/headers';
import { getClient } from '../../sanity/client';
import PageBuilder from '../../components/PageBuilder';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const isDraftMode = (await draftMode()).isEnabled;
    const fetchClient = getClient(isDraftMode);
    const pageData = await fetchClient.fetch(
      `*[_type == "page" && slug.current == $slug][0]{
        title
      }`,
      { slug }
    );

    if (!pageData) return {};

    return {
      title: `${pageData.title} | Enfermera en tu casa`,
      description: `Atención sanitaria y enfermera a domicilio en Zaragoza - ${pageData.title}`,
    };
  } catch (error) {
    return {
      title: 'Enfermera en tu casa',
    };
  }
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;

  let pageData = null;
  try {
    const isDraftMode = (await draftMode()).isEnabled;
    const fetchClient = getClient(isDraftMode);
    pageData = await fetchClient.fetch(
      `*[_type == "page" && slug.current == $slug][0]{
        title,
        pageBuilder
      }`,
      { slug }
    );
  } catch (error) {
    console.error(`Failed to fetch page data for slug: ${slug}`, error);
  }

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <PageBuilder blocks={pageData.pageBuilder} />
    </>
  );
}

export async function generateStaticParams() {
  try {
    const pages = await client.fetch(`*[_type == "page" && defined(slug.current)]{ "slug": slug.current }`);
    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    return [];
  }
}
