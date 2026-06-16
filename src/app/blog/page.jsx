import Link from 'next/link';
import { blogPosts } from '../../data/blogPosts';

export const metadata = {
  title: 'Blog y Artículos | Enfermera en tu Casa',
  description: 'Descubre consejos, guías y noticias sobre el cuidado de la salud en el hogar.',
};

export default function BlogListPage() {
  return (
    <div style={{ padding: '8rem 1rem 6rem', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Breadcrumb / Back Link */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: '600', marginBottom: '2.5rem', textDecoration: 'none' }}>
          &larr; Volver al inicio
        </Link>

        {/* Section Header */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '600',
            color: 'var(--text-main)',
            fontFamily: 'var(--font-serif)',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            Blog y Artículos de Salud
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Descubre consejos profesionales, guías prácticas y noticias de salud para ti y tus seres queridos.
          </p>
        </div>

        {/* Blog Post Grid */}
        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {blogPosts.map((blog) => (
            <Link 
              key={blog.id}
              href={`/blog/${blog.slug}`}
              className="blog-card"
              style={{ 
                height: '100%',
                backgroundColor: 'white',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
            >
              <div className="blog-image-wrapper" style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="blog-image" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                />
              </div>
              <div className="blog-content" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 className="blog-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '1rem', lineHeight: '1.3' }}>
                  {blog.title}
                </h3>
                <p className="blog-excerpt" style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                  {blog.description.length > 140 ? blog.description.substring(0, 140) + '...' : blog.description}
                </p>
                <span className="blog-read-more" style={{ fontWeight: '600', color: 'var(--primary)', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Leer más &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
