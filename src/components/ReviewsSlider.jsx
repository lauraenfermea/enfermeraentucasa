"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultReviews = [
  {
    name: "Maria Dolores",
    initial: "M",
    avatarBg: "#e57373",
    text: "Muy buena experiencia. Contactamos para un familiar y el trato fue muy cercano y profesional. La atención en casa nos dio mucha tranquilidad y todo fue muy cómodo.",
    rating: 5,
    date: "Hace un mes"
  },
  {
    name: "C. de día Mayores Sonrisas",
    initial: "C",
    avatarBg: "#81c784",
    text: "impartieron una charla en nuestro centro de día, muy interesante y útil. Muchas gracias por vuestra labor y atención.",
    rating: 5,
    date: "Hace 3 semanas"
  },
  {
    name: "jason",
    initial: "J",
    avatarBg: "#64b5f6",
    text: "Me han puesto la inyección en casa, la verdad muy cómodo no tener que esperar ir al centro de salud, ha venido la chica en las fechas y horas que les pedí y genial. Lo recomiendo.",
    rating: 5,
    date: "Hace un mes"
  },
  {
    name: "Ela",
    initial: "E",
    avatarBg: "#ffb74d",
    text: "Muy buen servicio, con trato muy cercano.",
    rating: 5,
    date: "Hace 3 semanas"
  },
  {
    name: "Eduardo Bermudo",
    initial: "E",
    avatarBg: "#ba68c8",
    text: "Las dos enfermeras fueron muy amables y atentas con mi madre, puntuales y muy profesionales.",
    rating: 5,
    date: "Hace un mes"
  }
];

const GoogleLogo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.08H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.92l2.85-2.22.81-.6z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.08l3.66 2.84c.87-2.6 3.3-4.54 6.16-4.54z" />
  </svg>
);

export default function ReviewsSlider({ title, rating, reviewsCount, reviewsList, backgroundColor, headingColor }) {
  const sectionTitle = title || 'Reseñas en Google';
  const avgRating = rating || 5.0;
  const totalReviews = reviewsCount || '(5 reseñas)';
  const reviews = reviewsList || defaultReviews;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (reviews.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }
    }, 6000); // 6 seconds per review
    return () => clearInterval(timer);
  }, [reviews]);

  const nextReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }
  };
  const prevReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  let bgStyle = '#F8FBF8'; // default is light-gray
  if (backgroundColor === 'white') bgStyle = 'white';
  else if (backgroundColor === 'light-green') bgStyle = '#eff5f1';
  else if (backgroundColor === 'light-gray') bgStyle = '#F8FBF8';
  else if (backgroundColor === 'brand-primary') bgStyle = '#8B9A91';

  let titleColor = '#3c4043'; // default for reviews section
  if (headingColor === 'brand-primary') titleColor = '#8B9A91';
  else if (headingColor === 'white') titleColor = 'white';
  else if (backgroundColor === 'brand-primary') titleColor = 'white';

  return (
    <section style={{ padding: '5rem 0 6rem 0', backgroundColor: bgStyle }}>
      <div className="container" style={{ maxWidth: '850px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
        
        {/* Google Reviews Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <GoogleLogo />
            <h2 style={{
              fontSize: '1.6rem',
              fontWeight: '600',
              color: titleColor,
              margin: 0,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              {sectionTitle}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3c4043' }}>{avgRating}</span>
            <div style={{ display: 'flex', color: '#ffb300' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span style={{ fontSize: '0.95rem', color: '#70757a' }}>{totalReviews}</span>
          </div>
        </div>

        {/* Carousel Card Container */}
        <div style={{ position: 'relative', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              style={{ width: '100%' }}
            >
              <div style={{
                backgroundColor: '#ffffff',
                padding: '2.5rem',
                borderRadius: '16px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 4px 18px rgba(0, 0, 0, 0.06)',
                textAlign: 'left',
                position: 'relative'
              }}>
                {/* Google G Logo in Corner */}
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                  <GoogleLogo />
                </div>

                {/* Reviewer Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  {/* User Initial Avatar */}
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    backgroundColor: reviews[currentIndex].avatarBg,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    fontFamily: 'system-ui, sans-serif'
                  }}>
                    {reviews[currentIndex].initial}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#202124', margin: 0, fontFamily: 'system-ui, sans-serif' }}>
                      {reviews[currentIndex].name}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                      <div style={{ display: 'flex', color: '#ffb300' }}>
                        {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                          <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span style={{ fontSize: '0.85rem', color: '#70757a' }}>{reviews[currentIndex].date}</span>
                    </div>
                  </div>
                </div>

                {/* Review Text */}
                <p style={{ 
                  fontSize: '1.1rem', 
                  color: '#3c4043', 
                  lineHeight: '1.6', 
                  margin: 0, 
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  fontWeight: '400'
                }}>
                  "{reviews[currentIndex].text}"
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button 
            onClick={prevReview}
            style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #dadce0', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', zIndex: 10, color: '#5f6368' }}
            aria-label="Previous review"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button 
            onClick={nextReview}
            style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #dadce0', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', zIndex: 10, color: '#5f6368' }}
            aria-label="Next review"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2.25rem' }}>
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: currentIndex === idx ? '#4285F4' : '#dadce0',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background-color 0.3s ease'
              }}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
        
        {/* Link Button */}
        <div style={{ marginTop: '2.5rem' }}>
          <a href="https://maps.app.goo.gl/mrgfGi4YZuDYp3yv6" target="_blank" rel="noopener noreferrer" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.6rem', 
            color: '#1a73e8', 
            textDecoration: 'none', 
            fontWeight: '600', 
            fontSize: '1.05rem',
            padding: '0.75rem 1.5rem',
            border: '1px solid #dadce0',
            borderRadius: '999px',
            backgroundColor: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            transition: 'all 0.2s ease',
            fontFamily: 'system-ui, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f8fafd';
            e.currentTarget.style.borderColor = '#ccd0d5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#ffffff';
            e.currentTarget.style.borderColor = '#dadce0';
          }}
          >
            <GoogleLogo />
            <span>Ver todas las opiniones en Google</span>
          </a>
        </div>
      </div>
    </section>
  );
}
