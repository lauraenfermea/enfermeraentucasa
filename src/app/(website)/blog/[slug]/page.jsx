import { client } from '../../../../sanity/client';
import { urlFor } from '../../../../sanity/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import PortableTextRenderer from '../../../../components/PortableTextRenderer';
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

// Render markdown style [Text](url) hyperlinks
function renderTextWithLinks(text) {
  if (!text) return null;
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const label = match[1];
    const url = match[2];
    parts.push(
      <a
        key={match.index}
        href={url}
        target={url.startsWith('http') ? '_blank' : '_self'}
        rel="noopener noreferrer"
        style={{ color: '#2563EB', fontWeight: '600', textDecoration: 'underline' }}
      >
        {label}
      </a>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const localBlogs = getLocalBlogs();
  const localPost = localBlogs?.find((p) => p.slug === slug);
  if (localPost) {
    return {
      title: `${localPost.title} | Enfermera en tu casa`,
      description: localPost.description,
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
    return { title: 'Blog | Enfermera en tu casa' };
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
    : null;

  let imgUrl = null;
  if (typeof post.image === 'string') {
    imgUrl = post.image.startsWith('/') || post.image.startsWith('http') ? post.image : `/assets/${post.image}`;
  } else if (post.image && typeof post.image === 'object') {
    try {
      imgUrl = urlFor(post.image).width(900).url();
    } catch {
      imgUrl = null;
    }
  }

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
              {publishDate} {post.author ? `• Por ${post.author}` : ''}
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

      {/* Featured Main Image */}
      {imgUrl && (
        <div style={{ backgroundColor: '#f7f9f9' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
            <img
              src={imgUrl}
              alt={post.title}
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
          maxWidth: '820px',
          margin: '0 auto',
          padding: '0 2rem',
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
        }}>
          <div style={{ padding: '3.5rem 3rem' }}>
            {/* Case A: Rich Content Blocks Array */}
            {Array.isArray(post.blocks) && post.blocks.length > 0 ? (
              post.blocks.map((block, i) => {
                if (block.type === 'heading2') {
                  return (
                    <h2 key={i} style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '2.5rem', marginBottom: '1rem' }}>
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'heading3') {
                  return (
                    <h3 key={i} style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '0.8rem' }}>
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === 'image') {
                  const src = block.src ? (block.src.startsWith('/') || block.src.startsWith('http') ? block.src : `/assets/${block.src}`) : '';
                  return (
                    <div key={i} style={{ margin: '2rem 0', textAlign: 'center' }}>
                      <img
                        src={src}
                        alt={block.caption || post.title}
                        style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}
                      />
                      {block.caption && (
                        <p style={{ fontSize: '0.88rem', color: '#6B7280', marginTop: '0.5rem', fontStyle: 'italic' }}>
                          {block.caption}
                        </p>
                      )}
                    </div>
                  );
                }
                if (block.type === 'quote') {
                  return (
                    <blockquote
                      key={i}
                      style={{
                        margin: '2rem 0',
                        padding: '1.25rem 1.75rem',
                        backgroundColor: '#EFF6FF',
                        borderLeft: '5px solid #2563EB',
                        borderRadius: '0 12px 12px 0',
                        color: '#1E40AF',
                        fontSize: '1.1rem',
                        fontStyle: 'italic',
                        lineHeight: 1.7,
                      }}
                    >
                      {renderTextWithLinks(block.text)}
                    </blockquote>
                  );
                }
                return (
                  <p key={i} style={{ marginBottom: '1.35rem', lineHeight: 1.8, color: '#374151', fontSize: '1.08rem' }}>
                    {renderTextWithLinks(block.text)}
                  </p>
                );
              })
            ) : Array.isArray(post.content) ? (
              typeof post.content[0] === 'string' ? (
                post.content.map((para, i) => (
                  <p key={i} style={{ marginBottom: '1.35rem', lineHeight: 1.8, color: '#374151', fontSize: '1.08rem' }}>
                    {renderTextWithLinks(para)}
                  </p>
                ))
              ) : (
                <PortableTextRenderer content={post.content} />
              )
            ) : (
              post.content && typeof post.content === 'string' ? (
                post.content.split('\n\n').map((para, i) => (
                  <p key={i} style={{ marginBottom: '1.35rem', lineHeight: 1.8, color: '#374151', fontSize: '1.08rem' }}>
                    {renderTextWithLinks(para)}
                  </p>
                ))
              ) : null
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
