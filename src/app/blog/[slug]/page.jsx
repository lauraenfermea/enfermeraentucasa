import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogPosts } from '../../../data/blogPosts';
import BlogPostClient from './BlogPostClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return {};
  
  return {
    title: `${post.title} | Enfermera a domicilio`,
    description: post.excerpt,
    openGraph: {
      images: [post.image]
    }
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="blog-post-page" style={{ padding: '8rem 1rem 4rem', backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-color)', fontWeight: '600', marginBottom: '2rem', textDecoration: 'none' }}>
          &larr; Volver al inicio
        </Link>
        <BlogPostClient post={post} />
      </div>
    </div>
  );
}
