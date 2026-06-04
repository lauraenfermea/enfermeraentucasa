"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '../data/blogPosts';

export default function BlogSection() {
  return (
    <section className="blog-section" id="blog">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Últimos Artículos</h2>
          <p className="section-description">
            Descubre consejos, guías y noticias sobre el cuidado de la salud en el hogar.
          </p>
        </motion.div>

        <div className="blog-grid">
          {blogPosts.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                href={`/blog/${blog.slug}`}
                className="blog-card"
                style={{ height: '100%' }}
              >
                <div className="blog-image-wrapper">
                  <img src={blog.image} alt={blog.title} className="blog-image" />
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">
                    {blog.description.length > 150 ? blog.description.substring(0, 150) + '...' : blog.description}
                  </p>
                  <span className="blog-read-more">Leer más &rarr;</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
