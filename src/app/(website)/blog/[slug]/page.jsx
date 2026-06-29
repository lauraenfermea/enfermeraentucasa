import { client } from '../../../../sanity/client';
import { urlFor } from '../../../../sanity/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PortableTextRenderer from '../../../../components/PortableTextRenderer';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{ title, description, image }`,
      { slug }
    );
    if (!post) return {};
    return {
      title: `${post.title} | Enfermera en tu casa`,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: post.image ? [urlFor(post.image).width(1200).height(630).url()] : [],
      },
    };
  } catch {
    return { title: 'Blog | Enfermera en tu casa' };
  }
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  let post = null;
  try {
    post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        description,
        image,
        content,
        publishedAt,
        "slug": slug.current
      }`,
      { slug }
    );
  } catch (error) {
    console.error('Failed to fetch blog post:', error);
  }

  if (!post) notFound();

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #3d5a5c 100%)',
        padding: '5rem 0 4rem',
        color: 'white',
        textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
          <Link href="/blog" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '0.95rem', marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            ← Volver al Blog
          </Link>
          {publishDate && (
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)', margin: '1rem 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {publishDate}
            </p>
          )}
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', lineHeight: 1.2, margin: '0.5rem 0 1.5rem' }}>
            {post.title}
          </h1>
          {post.description && (
            <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
              {post.description}
            </p>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {post.image && (
        <div style={{ backgroundColor: '#f7f9f9' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
            <img
              src={urlFor(post.image).width(900).url()}
              alt={post.image.alt || post.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '480px',
                objectFit: 'cover',
                borderRadius: '0 0 16px 16px',
                display: 'block',
              }}
            />
          </div>
        </div>
      )}

      {/* Article Body */}
      <div style={{ backgroundColor: '#f7f9f9', padding: '4rem 0 6rem' }}>
        <div className="container" style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '0 2rem',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
        }}>
          <div style={{ padding: '3rem 3rem' }}>
            {Array.isArray(post.content) ? (
              <PortableTextRenderer content={post.content} />
            ) : (
              /* Fallback for old plain-text posts */
              post.content && post.content.split('\n\n').map((para, i) => (
                <p key={i} style={{ marginBottom: '1.25rem', lineHeight: 1.8, color: '#3d4f51', fontSize: '1.05rem' }}>
                  {para}
                </p>
              ))
            )}
          </div>
        </div>

        {/* Back to blog */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/blog" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--primary)',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1rem',
            borderBottom: '2px solid var(--primary)',
            paddingBottom: '2px',
          }}>
            ← Ver todos los artículos
          </Link>
        </div>
      </div>
    </>
  );
}
