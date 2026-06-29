"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogPosts } from '../data/blogPosts';

import { useState, useEffect } from 'react';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/image';

export default function BlogSection({ title, description }) {
  const sectionTitle = title || "Últimos Artículos";
  const sectionDesc = description || "Descubre consejos, guías y noticias sobre el cuidado de la salud en el hogar.";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let active = true;
    client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...3]{
      _id,
      title,
      "slug": slug.current,
      description,
      image,
      publishedAt
    }`)
    .then(data => {
      if (active) {
        if (data && data.length > 0) {
          setPosts(data);
        } else {
          setPosts(blogPosts.slice(0, 3));
        }
      }
    })
    .catch(err => {
      console.error("Error fetching blog posts from Sanity:", err);
      if (active) {
        setPosts(blogPosts.slice(0, 3));
      }
    });

    return () => { active = false; };
  }, []);

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
          <h2 className="section-title">{sectionTitle}</h2>
          <p className="section-description">
            {sectionDesc}
          </p>
        </motion.div>

        <div className="blog-grid">
          {posts.map((blog, index) => {
            const imgUrl = blog.image && typeof blog.image === 'object' ? urlFor(blog.image).url() : blog.image;
            return (
              <motion.div
                key={blog._id || blog.id}
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
                    <img src={imgUrl} alt={blog.title} className="blog-image" />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
