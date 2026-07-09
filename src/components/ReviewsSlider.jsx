"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const defaultReviews = [
  {
    name: "María Dolores",
    initial: "M",
    avatarBg: "#e57373",
    text: "Una experiencia muy buena. Los contactamos para un familiar y el servicio fue muy amable y profesional. El servicio a domicilio nos dio mucha tranquilidad y todo fue muy cómodo.",
    rating: 5,
    date: "Hace un mes",
    ownerReply: "¡Gracias por tu comentario!"
  },
  {
    name: "Juan Camilo Valencia Escobar",
    initial: "J",
    avatarBg: "#4db6ac",
    text: "Muy amables y súper profesionales en su trabajo.",
    rating: 5,
    date: "Hace 5 días",
    ownerReply: "Gracias por tu comentario!"
  },
  {
    name: "Jason",
    initial: "J",
    avatarBg: "#64b5f6",
    text: "Me pusieron la inyección en casa, lo cual fue muy práctico, ya que no tuve que esperar para ir al centro de salud. La enfermera vino el día y la hora que le indiqué, y todo salió de maravilla. Lo recomiendo.",
    rating: 5,
    date: "Hace un mes"
  },
  {
    name: "Ela",
    initial: "E",
    avatarBg: "#ffb74d",
    text: "Muy buen servicio, con un trato muy amable.",
    rating: 5,
    date: "Hace un mes",
    ownerReply: "Gracias por tu comentario!"
  },
  {
    name: "C. de día Mayores Sonrisas",
    initial: "C",
    avatarBg: "#81c784",
    text: "Dieron una charla en nuestro centro de día, que fue muy interesante y útil. Muchas gracias por su trabajo y atención.",
    rating: 5,
    date: "Hace un mes",
    ownerReply: "Encantadas de ayudar!"
  },
  {
    name: "Eduardo Bermudo",
    initial: "E",
    avatarBg: "#ba68c8",
    text: "Las dos enfermeras fueron muy amables y atentas con mi madre, puntuales y muy profesionales.",
    rating: 5,
    date: "Hace un mes",
    ownerReply: "¡Gracias por el comentario!"
  }
];

export default function ReviewsSlider({ 
  title, 
  backgroundColor, 
  headingColor, 
  rating = 5.0, 
  reviewsCount = '(6 reseñas)', 
  reviewsList 
}) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const reviews = reviewsList && Array.isArray(reviewsList) && reviewsList.length > 0
    ? reviewsList 
    : defaultReviews;

  const sectionTitle = title || 'Reseñas en Google';

  const checkScrollLimits = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollLimits);
      checkScrollLimits();
      window.addEventListener('resize', checkScrollLimits);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', checkScrollLimits);
      }
      window.removeEventListener('resize', checkScrollLimits);
    };
  }, [reviews]);

  const scroll = (direction) => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      // Scroll by 80% of the visible container width
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  let bgStyle = '#F8FBF8'; 
  if (backgroundColor === 'white') bgStyle = '#FFFFFF';
  else if (backgroundColor === 'light-green') bgStyle = '#eff5f1';
  else if (backgroundColor === 'light-gray') bgStyle = '#F8FBF8';
  else if (backgroundColor === 'brand-primary') bgStyle = 'var(--primary)';

  const isDarkSection = backgroundColor === 'brand-primary';

  let titleTextColor = isDarkSection ? '#FFFFFF' : 'var(--text-main)';
  if (headingColor === 'brand-primary') titleTextColor = 'var(--primary)';
  else if (headingColor === 'white') titleTextColor = '#FFFFFF';

  return (
    <section className="section" style={{ padding: '5.5rem 0 6.5rem 0', backgroundColor: bgStyle, position: 'relative', overflow: 'hidden' }}>
      
      {/* Dynamic Style Injection for Responsive Classes */}
      <style dangerouslySetInnerHTML={{ __html: `
        .reviews-wrapper {
          position: relative;
          width: 100%;
          margin-top: 3rem;
        }
        .reviews-scroll-container {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 1.5rem 0.5rem;
          gap: 1.5rem;
          margin: 0 -0.5rem;
        }
        .reviews-scroll-container::-webkit-scrollbar {
          display: none;
        }
        .review-card {
          flex: 0 0 100%;
          scroll-snap-align: start;
          background: #ffffff;
          border-radius: 20px;
          padding: 2.25rem;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.025);
          border: 1px solid rgba(130, 155, 140, 0.08);
          display: flex;
          flex-direction: column;
          position: relative;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .review-card:hover {
          border-color: rgba(130, 155, 140, 0.25);
          box-shadow: 0 12px 35px rgba(130, 155, 140, 0.1);
        }
        @media (min-width: 640px) {
          .review-card {
            flex: 0 0 calc(50% - 0.75rem);
          }
        }
        @media (min-width: 1024px) {
          .review-card {
            flex: 0 0 calc(33.333% - 1rem);
          }
        }
        .google-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #ffffff;
          padding: 1rem 1.5rem;
          border-radius: 9999px;
          border: 1px solid rgba(130, 155, 140, 0.12);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
          width: fit-content;
          margin: 0 auto 1.5rem auto;
        }
        .google-g-logo {
          width: 24px;
          height: 24px;
        }
        .stars-container {
          display: flex;
          gap: 2px;
        }
        .owner-reply-box {
          margin-top: 1.25rem;
          padding: 1rem 1.15rem;
          background-color: #f7faf8;
          border-left: 3px solid var(--primary);
          border-radius: 0 12px 12px 0;
          font-size: 0.9rem;
        }
        .owner-reply-title {
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.25rem;
          font-size: 0.85rem;
        }
        .owner-reply-text {
          color: var(--text-muted);
          line-height: 1.5;
        }
        .arrow-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: #ffffff;
          border: 1px solid rgba(130, 155, 140, 0.15);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        .arrow-btn:hover:not(:disabled) {
          background: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          box-shadow: 0 6px 16px rgba(130, 155, 140, 0.25);
        }
        .arrow-btn:disabled {
          opacity: 0;
          pointer-events: none;
        }
        .arrow-btn.left {
          left: -24px;
        }
        .arrow-btn.right {
          right: -24px;
        }
        @media (max-width: 1024px) {
          .arrow-btn.left { left: 0px; }
          .arrow-btn.right { right: 0px; }
        }
        @media (max-width: 640px) {
          .arrow-btn { display: none; }
        }
      `}} />

      <div className="container" style={{ maxWidth: '1150px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ 
            fontFamily: "var(--font-serif)", 
            fontSize: 'clamp(2.25rem, 4vw, 3rem)', 
            fontWeight: 700, 
            color: titleTextColor,
            marginBottom: '1rem'
          }}>
            {sectionTitle}
          </h2>

          {/* Google Summary Badge */}
          <div className="google-badge">
            <svg className="google-g-logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>{rating.toFixed(1)}</span>
                <div className="stars-container">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" width="16" height="16" fill="#FBBC05">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {reviewsCount} en Google
              </span>
            </div>
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div className="reviews-wrapper">
          
          {/* Scroll Buttons */}
          <button 
            onClick={() => scroll('left')} 
            className="arrow-btn left" 
            disabled={!canScrollLeft}
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <button 
            onClick={() => scroll('right')} 
            className="arrow-btn right" 
            disabled={!canScrollRight}
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Review Cards Track */}
          <div ref={containerRef} className="reviews-scroll-container">
            {reviews.map((rev, index) => (
              <motion.div 
                key={index} 
                className="review-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                
                {/* Google logo watermark on top right */}
                <svg style={{ position: 'absolute', top: '1.75rem', right: '1.75rem', opacity: 0.15, width: '22px', height: '22px' }} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>

                {/* Card Header (Avatar + Name) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ 
                    width: '44px', 
                    height: '44px', 
                    borderRadius: '50%', 
                    backgroundColor: rev.avatarBg || '#829B8C', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '1.15rem'
                  }}>
                    {rev.initial || (rev.name ? rev.name.charAt(0) : 'U')}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.975rem', color: 'var(--text-main)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {rev.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                      Opinión en Google
                    </span>
                  </div>
                </div>

                {/* Stars and Date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div className="stars-container">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <svg key={i} viewBox="0 0 24 24" width="15" height="15" fill="#FBBC05">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                      </svg>
                    ))}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {rev.date || 'Hace un mes'}
                  </span>
                </div>

                {/* Review Text */}
                <p style={{ 
                  fontSize: '0.925rem', 
                  lineHeight: 1.6, 
                  color: 'var(--text-muted)', 
                  margin: 0, 
                  flexGrow: 1,
                  fontStyle: 'normal'
                }}>
                  "{rev.text}"
                </p>

                {/* Owner Response (if exists) */}
                {rev.ownerReply && (
                  <div className="owner-reply-box">
                    <div className="owner-reply-title">
                      Respuesta del propietario
                    </div>
                    <div className="owner-reply-text">
                      "{rev.ownerReply}"
                    </div>
                  </div>
                )}

              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
