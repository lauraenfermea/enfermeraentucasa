import { client } from '../../../../sanity/client';
import { urlFor } from '../../../../sanity/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import PortableTextRenderer from '../../../../components/PortableTextRenderer';
import SmartContentRenderer from '../../../../components/SmartContentRenderer';
import { blogPosts as fallbackPosts } from '../../../../data/blogPosts';

function getLocalBlogs() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'site-content.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return data.blogs || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const localBlogs = getLocalBlogs();
  const localPost = localBlogs?.find((p) => p.slug === slug);
  
  // Try to get global SEO config for canonical base
  let globalSeo = null;
  try {
    const filePath = path.join(process.cwd(), 'data', 'site-content.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    globalSeo = data.seo || null;
  } catch {}
  const baseUrl = globalSeo?.canonicalUrl || 'https://enfermeraentucasa.es';

  if (localPost) {
    const title = localPost.seoTitle || `${localPost.title} | Blog Enfermera en tu Casa`;
    const description = localPost.seoDescription || localPost.description || `Artículo sobre cuidados de enfermería a domicilio en Zaragoza.`;
    const canonical = localPost.canonical || `${baseUrl}/blog/${localPost.slug}`;
    
    return {
      title,
      description,
      keywords: localPost.focusKeyword || undefined,
      alternates: {
        canonical,
      },
      robots: localPost.noIndex ? { index: false, follow: true } : undefined,
      openGraph: {
        title: localPost.seoTitle || localPost.title,
        description,
        url: canonical,
        type: 'article',
        publishedTime: localPost.publishedAt,
        authors: [localPost.author || 'Laura Pueyo'],
        images: localPost.image ? [localPost.image] : [],
      },
    };
  }

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
        images: post.image && typeof post.image === 'object' ? [urlFor(post.image).width(1200).height(630).url()] : [],
      },
    };
  } catch {
    return { title: 'Blog de Salud | Enfermera en tu casa' };
  }
}

export async function generateStaticParams() {
  const localBlogs = getLocalBlogs();
  if (localBlogs && localBlogs.length > 0) {
    return localBlogs.map((post) => ({ slug: post.slug }));
  }
  try {
    const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`);
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return fallbackPosts.map((p) => ({ slug: p.slug }));
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const localBlogs = getLocalBlogs();
  let post = localBlogs?.find((p) => p.slug === slug);

  if (!post) {
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
      console.error('Failed to fetch blog post from Sanity:', error);
    }
  }

  if (!post) {
    post = fallbackPosts.find((p) => p.slug === slug);
  }

  if (!post) notFound();

  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    : '10 de Febrero, 2026';

  let imgUrl = null;
  if (typeof post.image === 'string') {
    imgUrl = post.image.startsWith('/') || post.image.startsWith('http') ? post.image : `/assets/${post.image}`;
  } else if (post.image && typeof post.image === 'object') {
    try {
      imgUrl = urlFor(post.image).width(1200).url();
    } catch {
      imgUrl = null;
    }
  }

  const allBlogs = localBlogs || fallbackPosts;
  const currentIndex = allBlogs.findIndex((b) => b.slug === slug);
  const nextPost = currentIndex >= 0 && currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;

  // Get global SEO config for schema
  let globalSeo = null;
  try {
    const seoPath = path.join(process.cwd(), 'data', 'site-content.json');
    const seoData = JSON.parse(fs.readFileSync(seoPath, 'utf-8'));
    globalSeo = seoData.seo || null;
  } catch {}
  const baseUrl = globalSeo?.canonicalUrl || 'https://enfermeraentucasa.es';

  // Build JSON-LD Schema for this blog post
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': post.schemaType || 'BlogPosting',
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.description || '',
    image: imgUrl || '',
    datePublished: post.publishedAt || '',
    dateModified: post.publishedAt || '',
    author: {
      '@type': 'Person',
      name: post.author || 'Laura Pueyo',
    },
    publisher: {
      '@type': 'Organization',
      name: globalSeo?.businessName || 'Enfermera en tu casa',
      url: baseUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': post.canonical || `${baseUrl}/blog/${post.slug}`,
    },
    keywords: post.focusKeyword || '',
  };

  return (
    <main style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      {/* JSON-LD Schema for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {/* Top Header Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #0F172A 0%, #0D5C63 60%, #1E3A8A 100%)',
        padding: '5.5rem 1rem 4.5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow backdrop elements */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ maxWidth: '940px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          {/* Top Breadcrumb Badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <Link
              href="/blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                color: '#E2E8F0',
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: '600',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.2s ease',
              }}
            >
              ← Volver al Blog
            </Link>

            <span style={{
              backgroundColor: 'rgba(16, 185, 129, 0.25)',
              color: '#34D399',
              padding: '0.4rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: '700',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              🩺 Consejos de Salud en Casa
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
            fontWeight: '900',
            lineHeight: 1.2,
            margin: '0.5rem 0 1.5rem',
            letterSpacing: '-0.025em',
            color: '#FFFFFF',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}>
            {post.title}
          </h1>

          {/* Subtitle / Excerpt */}
          {post.description && (
            <p style={{
              fontSize: '1.2rem',
              color: 'rgba(241, 245, 249, 0.9)',
              maxWidth: '780px',
              lineHeight: 1.65,
              marginBottom: '2rem',
            }}>
              {post.description}
            </p>
          )}

          {/* Author & Published Metadata Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1.2rem',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              }}>
                👩‍⚕️
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#FFFFFF' }}>
                  {post.author || 'Laura Pueyo'}
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>
                  Enfermera Colegiada en Zaragoza
                </p>
              </div>
            </div>

            <div style={{ color: 'rgba(255,255,255,0.3)' }}>|</div>

            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              📅 <span>{publishDate}</span>
            </div>

            <div style={{ color: 'rgba(255,255,255,0.3)' }}>|</div>

            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              ⏱️ <span>4 min de lectura</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Main Cover Image */}
      {imgUrl && (
        <div style={{ marginTop: '-2.5rem', position: 'relative', zIndex: 20 }}>
          <div className="container" style={{ maxWidth: '940px', margin: '0 auto', padding: '0 1rem' }}>
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)',
              border: '4px solid #FFFFFF',
              backgroundColor: '#FFFFFF',
            }}>
              <img
                src={imgUrl}
                alt={post.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Article Reading Body */}
      <section style={{ padding: '3.5rem 1rem 6rem' }}>
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
            {/* Render Content Blocks using Smart Renderer */}
            <SmartContentRenderer blocks={post.blocks} fallbackContent={post.content} />

            {/* Author Profile & WhatsApp Consultation Card */}
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
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#10B981',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                flexShrink: 0,
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
              }}>
                👩‍⚕️
              </div>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h4 style={{ margin: '0 0 0.4rem', fontSize: '1.25rem', fontWeight: '800', color: '#065F46' }}>
                  ¿Necesitas atención de enfermería a domicilio en Zaragoza?
                </h4>
                <p style={{ margin: 0, fontSize: '0.98rem', color: '#166534', lineHeight: 1.5 }}>
                  Ofrecemos atención médica personalizada en tu hogar sin esperas ni desplazamientos. Curas, inyectables, analíticas y seguimiento continuado.
                </p>
              </div>
              <a
                href="https://wa.me/34641635705?text=Hola,%20he%20le%C3%ADdo%20vuestro%20blog%20y%20quisiera%20solicitar%20informaci%C3%B3n"
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
                <span>💬</span> Consultar por WhatsApp
              </a>
            </div>

            {/* Next / Previous Post Navigation */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginTop: '3.5rem',
              paddingTop: '2.5rem',
              borderTop: '1px solid #E2E8F0',
            }}>
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    ← Artículo Anterior
                  </span>
                  <strong style={{ fontSize: '1.05rem', color: '#0F172A', lineHeight: 1.4, display: 'block' }}>
                    {prevPost.title}
                  </strong>
                </Link>
              ) : <div />}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    textAlign: 'right',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    Siguiente Artículo →
                  </span>
                  <strong style={{ fontSize: '1.05rem', color: '#0F172A', lineHeight: 1.4, display: 'block' }}>
                    {nextPost.title}
                  </strong>
                </Link>
              ) : <div />}
            </div>
          </div>
        </div>

        {/* Bottom Back Button */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.85rem 2rem',
              backgroundColor: '#FFFFFF',
              color: '#0F172A',
              fontWeight: '700',
              borderRadius: '9999px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
              border: '1px solid #E2E8F0',
            }}
          >
            ← Ver todos los artículos del Blog
          </Link>
        </div>
      </section>
    </main>
  );
}
