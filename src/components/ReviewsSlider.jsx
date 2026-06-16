"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reviews = [
  {
    name: "María T.",
    text: "Una atención inmejorable. Vinieron a casa para unas curas de mi madre y el trato fue excepcional. Muy profesionales y cariñosas.",
    rating: 5
  },
  {
    name: "Carlos L.",
    text: "Totalmente recomendable. Me ahorraron muchas visitas al centro de salud. Llegaron puntuales y me resolvieron el problema enseguida.",
    rating: 5
  },
  {
    name: "Ana G.",
    text: "Un servicio fantástico en Zaragoza. Necesitaba que me pusieran unas inyecciones y la comodidad de no moverme de casa no tiene precio. Muchas gracias.",
    rating: 5
  },
  {
    name: "Javier M.",
    text: "Grandes profesionales. Muy atentas, con mucha paciencia y delicadeza. Sin duda volveré a contactar con ellas si lo necesito.",
    rating: 5
  }
];

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000); // 6 seconds per review
    return () => clearInterval(timer);
  }, []);

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section style={{ padding: '4rem 0 6rem 0', backgroundColor: '#ffffff' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '400',
          color: '#4a5568',
          letterSpacing: '-0.025em',
          marginBottom: '3rem'
        }}>
          Lo que dicen nuestros pacientes
        </h2>

        <div style={{ position: 'relative', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              style={{ width: '100%' }}
            >
              <div style={{
                backgroundColor: '#eff5f1',
                padding: '3rem 2rem',
                borderRadius: '24px',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: '#f59e0b' }}>
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <svg key={i} width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: '1.25rem', color: '#4a5568', fontStyle: 'italic', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  "{reviews[currentIndex].text}"
                </p>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2d3748', margin: 0 }}>
                  {reviews[currentIndex].name}
                </h4>
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={prevReview}
            style={{ position: 'absolute', left: '-15px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 10, color: '#4a5568' }}
            aria-label="Previous review"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          
          <button 
            onClick={nextReview}
            style={{ position: 'absolute', right: '-15px', top: '50%', transform: 'translateY(-50%)', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 10, color: '#4a5568' }}
            aria-label="Next review"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem' }}>
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: currentIndex === idx ? '#829B8C' : '#e2e8f0',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background-color 0.3s ease'
              }}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
        
        <div style={{ marginTop: '2.5rem' }}>
          <a href="https://maps.app.goo.gl/mrgfGi4YZuDYp3yv6" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#829B8C', textDecoration: 'none', fontWeight: '500', fontSize: '1.05rem' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            Ver más reseñas en Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
