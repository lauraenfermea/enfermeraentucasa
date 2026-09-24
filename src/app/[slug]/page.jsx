import { draftMode } from 'next/headers';
import { getClient, client } from '../../sanity/client';
import PageBuilder from '../../components/PageBuilder';
import SmartContentRenderer from '../../components/SmartContentRenderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

function getSiteContent() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'site-content.json');
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const siteContent = getSiteContent();
  const customPage = siteContent?.customPages?.find((p) => p.slug === slug);

  if (customPage) {
    return {
      title: `${customPage.metaTitle || customPage.title} | Enfermera en tu casa`,
      description: customPage.metaDescription || customPage.description || `Atención sanitaria y enfermera a domicilio en Zaragoza - ${customPage.title}`,
    };
  }

  try {
    const isDraftMode = (await draftMode()).isEnabled;
    const fetchClient = getClient(isDraftMode);
    const pageData = await fetchClient.fetch(
      `*[_type == "page" && slug.current == $slug][0]{ title }`,
      { slug }
    );
    if (pageData) {
      return {
        title: `${pageData.title} | Enfermera en tu casa`,
        description: `Atención sanitaria y enfermera a domicilio en Zaragoza - ${pageData.title}`,
      };
    }
  } catch {
    // fallback
  }

  return { title: 'Enfermera en tu casa' };
}

export async function generateStaticParams() {
  const siteContent = getSiteContent();
  const customPages = siteContent?.customPages || [];
  const localSlugs = customPages.map((p) => ({ slug: p.slug }));

  try {
    const pages = await client.fetch(`*[_type == "page" && defined(slug.current)]{ "slug": slug.current }`);
    const sanitySlugs = pages.map((page) => ({ slug: page.slug }));
    return [...localSlugs, ...sanitySlugs];
  } catch {
    return localSlugs;
  }
}

export default async function DynamicPage({ params }) {
  const { slug } = await params;
  const siteContent = getSiteContent();
  const localPage = siteContent?.customPages?.find((p) => p.slug === slug);

  if (localPage) {
    const blocks = localPage.blocks || [];
    return (
      <main style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
        {/* Top Header Banner */}
        <section style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #0D5C63 60%, #1E3A8A 100%)',
          padding: '5.5rem 1rem 4.5rem',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
        }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <Link href="/" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(10px)',
              color: '#E2E8F0',
              padding: '0.45rem 1.25rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: '600',
              textDecoration: 'none',
              marginBottom: '1.75rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
              ← Volver al Inicio
            </Link>
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: '900',
              lineHeight: 1.2,
              margin: '0.5rem 0 1.25rem',
              letterSpacing: '-0.025em',
              color: '#FFFFFF',
            }}>
              {localPage.title}
            </h1>
            {localPage.description && (
              <p style={{ fontSize: '1.2rem', color: 'rgba(241, 245, 249, 0.9)', maxWidth: '750px', margin: '0 auto', lineHeight: 1.65 }}>
                {localPage.description}
              </p>
            )}
          </div>
        </section>

        {/* Main Page Content Body */}
        <section style={{ padding: '4rem 1rem 6rem' }}>
          <div className="container" style={{
            maxWidth: '860px',
            margin: '0 auto',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.06)',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
          }}>
            <div style={{ padding: 'clamp(2rem, 5vw, 4rem)' }}>
              {blocks.length > 0 ? (
                <SmartContentRenderer blocks={blocks} />
              ) : (
                <p style={{ color: '#64748B', fontStyle: 'italic', textAlign: 'center' }}>
                  Página creada sin bloques de contenido aún. Añade contenido en el Panel de Control (`/admin`).
                </p>
              )}

              {/* Consultation Card */}
              <div style={{
                marginTop: '4rem',
                padding: '2.5rem 2rem',
                backgroundColor: '#F0FDF4',
                borderRadius: '20px',
                border: '1px solid #BBF7D0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
              }}>
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.2rem', fontWeight: '800', color: '#065F46' }}>
                    ¿Necesitas atención de enfermería a domicilio en Zaragoza?
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.98rem', color: '#166534', lineHeight: 1.5 }}>
                    Contáctanos directamente por WhatsApp para consultas o para reservar tu cita a domicilio.
                  </p>
                </div>
                <a
                  href="https://wa.me/34641635705?text=Hola,%20quisiera%20solicitar%20informaci%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.9rem 1.8rem',
                    backgroundColor: '#10B981',
                    color: 'white',
                    fontWeight: '800',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    fontSize: '1rem',
                    boxShadow: '0 8px 20px rgba(16, 185, 129, 0.35)',
                    flexShrink: 0,
                  }}
                >
                  <span>💬</span> Contactar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

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
