"use client";
import { motion } from 'framer-motion';

export default function BlogPostClient({ post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
        {post.title}
      </h1>
      
      <img 
        src={post.image} 
        alt={post.title} 
        style={{ width: '100%', height: 'auto', borderRadius: '24px', marginBottom: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', objectFit: 'cover', maxHeight: '500px' }} 
      />

      <div className="blog-post-content" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#374151' }}>
        {post.content.map((paragraph, index) => {
          if (paragraph.includes('|') && paragraph.includes('info@')) {
            return (
              <div 
                key={index} 
                style={{ 
                  marginTop: '3.5rem', 
                  padding: '2rem 0.5rem 1rem 0.5rem', 
                  borderTop: '2px solid #eaeaea', 
                  fontSize: '1.35rem', 
                  fontWeight: '700', 
                  color: 'var(--primary-color)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  alignItems: 'center',
                }}
              >
                <span>Zaragoza</span>
                <span>|</span>
                <a href="tel:+34641635705" style={{ color: 'var(--primary-color)', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={e => e.target.style.opacity = 0.7} onMouseOut={e => e.target.style.opacity = 1}>+34 641 635 705</a>
                <span>|</span>
                <a href="mailto:info@enfermeraentucasa.es" style={{ color: 'var(--primary-color)', textDecoration: 'none', transition: 'opacity 0.2s' }} onMouseOver={e => e.target.style.opacity = 0.7} onMouseOut={e => e.target.style.opacity = 1}>info@enfermeraentucasa.es</a>
              </div>
            );
          }
          if (paragraph.startsWith('©')) {
            return (
              <p key={index} style={{ fontSize: '1.15rem', color: '#6b7280', marginTop: '0.5rem', fontWeight: '600' }}>
                {paragraph}
              </p>
            );
          }

          const isHeading = paragraph.length < 100 && !paragraph.endsWith('.') && !paragraph.endsWith(',') && !paragraph.endsWith(';');
          
          if (isHeading) {
            return <h2 key={index} style={{ fontSize: '1.5rem', color: 'var(--primary-color)', marginTop: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{paragraph}</h2>;
          }
          return <p key={index} style={{ marginBottom: '1.5rem' }}>{paragraph}</p>;
        })}
      </div>
    </motion.article>
  );
}
