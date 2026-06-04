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
