"use client";
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const defaultReviews = [
  {
    name: "Maria Dolores",
    initial: "M",
    avatarBg: "#e57373",
    reviewerReviewsCount: "3 reviews",
    text: "Muy buena experiencia. Contactamos para un familiar y el trato fue muy cercano y profesional. La atención en casa nos dio mucha tranquilidad y todo fue muy cómodo.",
    rating: 5,
    date: "a month ago",
    ownerReply: "¡Gracias por tu comentario!",
    ownerReplyDate: "2 days ago"
  },
  {
    name: "Juan Camilo Valencia Escobar",
    initial: "J",
    avatarBg: "#4db6ac",
    reviewerReviewsCount: "2 reviews",
    text: "Muy amables y super profesionales en su trabajo",
    rating: 5,
    date: "5 days ago",
    ownerReply: "Gracias por tu comentario!",
    ownerReplyDate: "2 days ago"
  },
  {
    name: "jason",
    initial: "J",
    avatarBg: "#64b5f6",
    reviewerReviewsCount: "1 review",
    text: "Me han puesto la inyección en casa, la verdad muy cómodo no tener que esperar ir al centro de salud, ha venido la chica en las fechas y horas que les pedí y genial. Lo recomiendo.",
    rating: 5,
    date: "Edited a month ago",
    ownerReply: "Gracias por tu comentario",
    ownerReplyDate: "a month ago"
  },
  {
    name: "Ela",
    initial: "E",
    avatarBg: "#ffb74d",
    reviewerReviewsCount: "3 reviews",
    text: "Muy buen servicio, con trato muy cercano.",
    rating: 5,
    date: "a month ago",
    ownerReply: "Gracias por tu comentario!",
    ownerReplyDate: "2 days ago"
  },
  {
    name: "C. de día Mayores Sonrisas",
    initial: "C",
    avatarBg: "#81c784",
    reviewerReviewsCount: "3 reviews",
    text: "impartieron una charla en nuestro centro de día, muy interesante y útil. Muchas gracias por vuestra labor y atención.",
    rating: 5,
    date: "a month ago",
    ownerReply: "Encantadas de ayudar!",
    ownerReplyDate: "2 days ago"
  },
  {
    name: "Eduardo Bermudo",
    initial: "E",
    avatarBg: "#ba68c8",
    reviewerReviewsCount: "2 reviews",
    text: "Las dos enfermeras fueron muy amables y atentas con mi madre, puntuales y muy profesionales.",
    rating: 5,
    date: "a month ago",
    ownerReply: "¡Gracias por el comentario!",
    ownerReplyDate: "2 days ago"
  }
];

export default function ReviewsSlider({ 
  title, 
  backgroundColor, 
  headingColor, 
  rating = 5.0, 
  reviewsCount = '(6 reviews)', 
  reviewsList 
}) {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Dynamic reviews state
  const [reviews, setReviews] = useState(
    (reviewsList && reviewsList.length > 0) ? reviewsList : defaultReviews
  );

  // 🔄 Option B: Automated Natural Background Auto-Sync on Page Visit
  useEffect(() => {
    const LAST_SYNC_KEY = 'gmb_reviews_last_sync_v1';
    const lastSync = localStorage.getItem(LAST_SYNC_KEY);
    const now = Date.now();
    const SIX_HOURS = 6 * 60 * 60 * 1000;

    if (!lastSync || (now - parseInt(lastSync, 10)) > SIX_HOURS) {
      fetch('/api/google-reviews')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.reviews && data.reviews.length > 0) {
            setReviews(data.reviews);
            localStorage.setItem(LAST_SYNC_KEY, now.toString());
          }
        })
        .catch(() => {
          // Silent fallback
        });
    }
  }, []);

  const sectionTitle = title || 'Reseñas en Google';
  const displayRating = (typeof rating === 'number' && rating > 0) ? rating : 5.0;
  const displayCount = reviewsCount || `(${reviews.length} reviews)`;

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
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  let bgStyle = '#F8FBF8'; 
  if (backgroundColor === 'white') bgStyle = '#FFFFFF';
  else if (backgroundColor === 'light-green') bgStyle = '#eff5f1';
  else if (backgroundColor === 'light-gray') bgStyle = '#F8FBF8';

  return (
    <section className="reviews-section" style={{ backgroundColor: bgStyle, padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '3rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
            {/* Google Logo SVG */}
            <svg width="24" height="24" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1A202C', letterSpacing: '0.02em' }}>
              Reseñas en Google
            </span>
          </div>

          <h2 style={{ 
            fontSize: 'clamp(2rem, 4vw, 2.75rem)', 
            fontWeight: '800', 
            color: headingColor || '#1A202C',
            letterSpacing: '-0.02em',
            margin: '0 0 1rem 0',
            lineHeight: 1.2
          }}>
            {sectionTitle}
          </h2>

          {/* Rating Stars Summary Pill */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            backgroundColor: '#FFFFFF',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #E2E8F0'
          }}>
            <span style={{ fontWeight: '800', fontSize: '1rem', color: '#1A202C' }}>{displayRating.toFixed(1)}</span>
            <div style={{ display: 'flex', color: '#FBBF24', fontSize: '1.1rem' }}>
              {'★'.repeat(Math.round(displayRating))}
            </div>
            <span style={{ fontSize: '0.88rem', color: '#718096', fontWeight: '500' }}>
              {displayCount}
            </span>
          </div>
        </div>

        {/* Slider Controls Bar */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Anterior reseña"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: canScrollLeft ? '#FFFFFF' : '#EDF2F7',
              color: canScrollLeft ? '#1A202C' : '#A0AEC0',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollLeft ? 'pointer' : 'default',
              boxShadow: canScrollLeft ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Siguiente reseña"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: canScrollRight ? '#FFFFFF' : '#EDF2F7',
              color: canScrollRight ? '#1A202C' : '#A0AEC0',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollRight ? 'pointer' : 'default',
              boxShadow: canScrollRight ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            →
          </button>
        </div>

        {/* Scrollable Cards Container */}
        <div 
          ref={containerRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '1rem',
          }}
        >
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id || index}
              style={{
                flex: '0 0 340px',
                scrollSnapAlign: 'start',
                backgroundColor: '#FFFFFF',
                borderRadius: '20px',
                padding: '1.75rem',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header: Avatar, Name, Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
                  {rev.profilePhoto ? (
                    <img 
                      src={rev.profilePhoto} 
                      alt={rev.name} 
                      style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      backgroundColor: rev.avatarBg || '#2563EB',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '1.2rem',
                    }}>
                      {rev.initial || rev.name?.charAt(0) || 'G'}
                    </div>
                  )}

                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '700', color: '#1A202C' }}>
                      {rev.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                      <div style={{ display: 'flex', color: '#FBBF24', fontSize: '0.9rem' }}>
                        {'★'.repeat(rev.rating || 5)}
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#A0AEC0' }}>
                        {rev.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <p style={{ 
                  margin: '0 0 1.25rem 0', 
                  fontSize: '0.96rem', 
                  color: '#4A5568', 
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 5,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  "{rev.text}"
                </p>
              </div>

              {/* Owner Reply if any */}
              {rev.ownerReply && (
                <div style={{ 
                  backgroundColor: '#F7FAFC', 
                  padding: '0.85rem 1rem', 
                  borderRadius: '12px', 
                  borderLeft: '3px solid #2563EB',
                  marginTop: '0.5rem'
                }}>
                  <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: '700', color: '#2B6CB0' }}>
                    Respuesta del propietario:
                  </p>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#4A5568', fontStyle: 'italic' }}>
                    {rev.ownerReply}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
