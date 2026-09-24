"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultReviews = [
  {
    name: "Maria Dolores",
    initial: "M",
    avatarBg: "#e57373",
    reviewerReviewsCount: "3 reviews",
    text: "Muy buena experiencia. Contactamos para un familiar y el trato fue muy cercano y profesional. La atención en casa nos dio mucha tranquilidad y todo fue muy cómodo.",
    rating: 5,
    date: "hace un mes",
    ownerReply: "¡Gracias por tu comentario!",
    ownerReplyDate: "hace 2 días"
  },
  {
    name: "Juan Camilo Valencia Escobar",
    initial: "J",
    avatarBg: "#4db6ac",
    reviewerReviewsCount: "2 reviews",
    text: "Muy amables y super profesionales en su trabajo",
    rating: 5,
    date: "hace 5 días",
    ownerReply: "Gracias por tu comentario!",
    ownerReplyDate: "hace 2 días"
  },
  {
    name: "jason",
    initial: "J",
    avatarBg: "#64b5f6",
    reviewerReviewsCount: "1 review",
    text: "Me han puesto la inyección en casa, la verdad muy cómodo no tener que esperar ir al centro de salud, ha venido la chica en las fechas y horas que les pedí y genial. Lo recomiendo.",
    rating: 5,
    date: "hace un mes",
    ownerReply: "Gracias por tu comentario",
    ownerReplyDate: "hace un mes"
  },
  {
    name: "Ela",
    initial: "E",
    avatarBg: "#ffb74d",
    reviewerReviewsCount: "3 reviews",
    text: "Muy buen servicio, con trato muy cercano.",
    rating: 5,
    date: "hace un mes",
    ownerReply: "Gracias por tu comentario!",
    ownerReplyDate: "hace 2 días"
  },
  {
    name: "C. de día Mayores Sonrisas",
    initial: "C",
    avatarBg: "#81c784",
    reviewerReviewsCount: "3 reviews",
    text: "impartieron una charla en nuestro centro de día, muy interesante y útil. Muchas gracias por vuestra labor y atención.",
    rating: 5,
    date: "hace un mes",
    ownerReply: "Encantadas de ayudar!",
    ownerReplyDate: "hace 2 días"
  },
  {
    name: "Eduardo Bermudo",
    initial: "E",
    avatarBg: "#ba68c8",
    reviewerReviewsCount: "2 reviews",
    text: "Las dos enfermeras fueron muy amables y atentas con mi madre, puntuales y muy profesionales.",
    rating: 5,
    date: "hace un mes",
    ownerReply: "¡Gracias por el comentario!",
    ownerReplyDate: "hace 2 días"
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

  // Dynamic reviews list
  const [reviews, setReviews] = useState(
    (reviewsList && reviewsList.length > 0) ? reviewsList : defaultReviews
  );

  // Modal State for leaving a review directly on site
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const sectionTitle = title || 'Reseñas y Opiniones de Clientes';
  const displayRating = (typeof rating === 'number' && rating > 0) ? rating : 5.0;
  const displayCount = reviewsCount || `(${reviews.length} reseñas)`;

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

  async function handleSubmitReview(e) {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, rating: newRating, text: newText }),
      });
      const data = await res.json();
      if (res.ok && data.review) {
        setReviews([data.review, ...reviews]);
        setSuccessMsg('¡Muchas gracias! Tu opinión se ha añadido con éxito.');
        setNewName('');
        setNewText('');
        setTimeout(() => {
          setSuccessMsg('');
          setIsModalOpen(false);
        }, 2000);
      } else {
        alert(data.error || 'Error al enviar la reseña');
      }
    } catch {
      alert('Error de conexión');
    } finally {
      setSubmitting(false);
    }
  }

  let bgStyle = '#F8FBF8'; 
  if (backgroundColor === 'white') bgStyle = '#FFFFFF';
  else if (backgroundColor === 'light-green') bgStyle = '#eff5f1';

  return (
    <section className="reviews-section" style={{ backgroundColor: bgStyle, padding: '5rem 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '1.4rem' }}>⭐</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#10B981', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              Opiniones Reales
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

          {/* Rating Summary Pill & Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              backgroundColor: '#FFFFFF',
              padding: '0.5rem 1.2rem',
              borderRadius: '9999px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #E2E8F0'
            }}>
              <span style={{ fontWeight: '800', fontSize: '1rem', color: '#1A202C' }}>{displayRating.toFixed(1)}</span>
              <div style={{ display: 'flex', color: '#FBBF24', fontSize: '1.1rem' }}>
                {'★'.repeat(Math.round(displayRating))}
              </div>
              <span style={{ fontSize: '0.88rem', color: '#718096', fontWeight: '600' }}>
                {displayCount}
              </span>
            </div>

            {/* Button: Leave Review Directly on Site */}
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#10B981',
                color: 'white',
                border: 'none',
                padding: '0.55rem 1.4rem',
                borderRadius: '9999px',
                fontWeight: '700',
                fontSize: '0.92rem',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.2s ease',
              }}
            >
              ✍️ Dejar una Opinión
            </button>

            {/* Link: Direct Google Maps Business Profile */}
            <a
              href="https://share.google/jfi2BZwBHaDbi7EFt"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: '#FFFFFF',
                color: '#2563EB',
                border: '1px solid #2563EB',
                padding: '0.55rem 1.2rem',
                borderRadius: '9999px',
                fontWeight: '700',
                fontSize: '0.9rem',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              ⭐ Ver en Google Maps
            </a>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
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
            }}
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
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
            }}
          >
            →
          </button>
        </div>

        {/* Scrollable Review Cards */}
        <div 
          ref={containerRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: rev.avatarBg || '#10B981',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '1.2rem',
                  }}>
                    {rev.initial || rev.name?.charAt(0) || 'G'}
                  </div>

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

                <p style={{ 
                  margin: '0 0 1.25rem 0', 
                  fontSize: '0.96rem', 
                  color: '#4A5568', 
                  lineHeight: 1.6,
                }}>
                  "{rev.text}"
                </p>
              </div>

              {rev.ownerReply && (
                <div style={{ 
                  backgroundColor: '#F7FAFC', 
                  padding: '0.85rem 1rem', 
                  borderRadius: '12px', 
                  borderLeft: '3px solid #10B981',
                  marginTop: '0.5rem'
                }}>
                  <p style={{ margin: 0, fontSize: '0.82rem', fontWeight: '700', color: '#065F46' }}>
                    Respuesta del equipo:
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

      {/* Modal for Direct Review Submission */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1.5rem',
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '2.5rem',
                maxWidth: '480px',
                width: '100%',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                position: 'relative',
              }}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  border: 'none',
                  background: '#F1F5F9',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  fontWeight: '800',
                  cursor: 'pointer',
                  color: '#64748B',
                }}
              >
                ✕
              </button>

              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2.5rem' }}>⭐</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#0F172A', margin: '0.5rem 0 0.2rem' }}>
                  Dejar una Opinión sobre el Servicio
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', margin: 0 }}>
                  Tu experiencia nos ayuda a seguir ofreciendo la mejor atención a domicilio en Zaragoza.
                </p>
              </div>

              {successMsg ? (
                <div style={{ padding: '1.5rem', backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '14px', textAlign: 'center', fontWeight: '700' }}>
                  {successMsg}
                </div>
              ) : (
                <form onSubmit={handleSubmitReview}>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>Tu Nombre</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      placeholder="ej: María Carmen"
                      onChange={(e) => setNewName(e.target.value)}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '1rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>Valoración</label>
                    <div style={{ display: 'flex', gap: '0.5rem', fontSize: '1.8rem', cursor: 'pointer' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => setNewRating(star)} style={{ color: star <= newRating ? '#FBBF24' : '#CBD5E1' }}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '0.4rem' }}>Tu Opinión o Experiencia</label>
                    <textarea
                      rows={4}
                      required
                      value={newText}
                      placeholder="Escribe cómo fue la atención recibida en casa..."
                      onChange={(e) => setNewText(e.target.value)}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '12px', border: '1px solid #CBD5E1', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      borderRadius: '9999px',
                      border: 'none',
                      backgroundColor: '#10B981',
                      color: 'white',
                      fontWeight: '800',
                      fontSize: '1.05rem',
                      cursor: submitting ? 'wait' : 'pointer',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)',
                    }}
                  >
                    {submitting ? 'Publicando...' : 'Publicar Mi Reseña'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
