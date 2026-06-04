"use client";
import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import AnimatedButton from './AnimatedButton';

export default function About() {
  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      // Only auto-scroll if the container is scrollable (mobile view)
      if (slider.scrollWidth > slider.clientWidth) {
        const maxScroll = slider.scrollWidth - slider.clientWidth;
        // Scroll by one image width (approx 85% of clientWidth)
        const scrollAmount = slider.clientWidth * 0.85;
        
        if (slider.scrollLeft >= maxScroll - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          slider.scrollTo({ left: slider.scrollLeft + scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="section bg-light" ref={ref}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }} className="mobile-grid-1">
          
          {/* Images Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', height: '550px' }}
            className="about-images-mobile"
            ref={scrollRef}
          >
            {/* Left Image Wrapper */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                position: 'absolute',
                left: 0,
                top: '15%',
                width: '47%',
                height: '75%',
                zIndex: 1
              }}
              className="about-image-wrapper"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src="/assets/Gemini_Generated_Image_4drbzk4drbzk4drb.png" 
                  alt="Nurse standing" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </motion.div>
            </motion.div>
            
            {/* Right Image Wrapper */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                position: 'absolute',
                right: 0,
                top: '5%',
                width: '47%',
                height: '75%',
                zIndex: 2
              }}
              className="about-image-wrapper"
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                style={{ width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
              >
                <motion.img 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  src="/assets/Gemini_Generated_Image_6hjs1s6hjs1s6hjs.png" 
                  alt="Enfermera y paciente" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </motion.div>
            </motion.div>

            {/* Left Image Badge (8+) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.3, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.6, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.1 }}
              style={{
                position: 'absolute',
                top: 'calc(90% - 70px)',
                left: '-70px',
                zIndex: 3,
                width: '140px',
                height: '140px',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 15px 30px rgba(0,0,0,0.08)'
              }}
              className="about-badge-mobile hide-mobile"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ width: '120px', height: '120px', position: 'relative' }}
              >
                <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <path id="circlePath1" d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
                  </defs>
                  <text fill="var(--primary)" fontSize="11" fontWeight="600" letterSpacing="1.5">
                    <textPath href="#circlePath1" startOffset="0%" textLength="264">
                      AÑOS DE EXPERIENCIA • AÑOS DE EXPERIENCIA •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>8+</span>
              </div>
            </motion.div>

            {/* Right Image Badge (6+) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.3, rotate: 20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.8, type: "spring", bounce: 0.4 }}
              whileHover={{ scale: 1.1 }}
              style={{
                position: 'absolute',
                top: 'calc(80% - 70px)',
                right: '-70px',
                zIndex: 3,
                width: '140px',
                height: '140px',
                backgroundColor: 'var(--bg-color)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 15px 30px rgba(0,0,0,0.08)'
              }}
              className="about-badge-mobile hide-mobile"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ width: '120px', height: '120px', position: 'relative' }}
              >
                <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <path id="circlePath2" d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0" />
                  </defs>
                  <text fill="var(--primary)" fontSize="11" fontWeight="600" letterSpacing="1.5">
                    <textPath href="#circlePath2" startOffset="0%" textLength="264">
                      AÑOS DE EXPERIENCIA • AÑOS DE EXPERIENCIA •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>6+</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-text-content"
          >
            <div style={{
              display: 'inline-block',
              padding: '0.4rem 1rem',
              background: 'var(--secondary)',
              color: 'var(--primary)',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              Quiénes somos
            </div>
            
            <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'var(--text-main)', textAlign: 'left', marginBottom: '1.5rem' }}>
              Sobre nosotros
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Llevamos atención profesional, compasiva y experta directamente a tu hogar. 
              Nuestro equipo de enfermeras colegiadas se dedica a mejorar tu calidad de vida y 
              asegurar tu comodidad en todo momento en Zaragoza.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1rem' }}>
              {/* Lead Paragraph */}
              <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-main)', fontWeight: '600' }}>
                Enfermeras desde 2015 con experiencia en España y otros países <span style={{ color: 'var(--primary)' }}>(Reino Unido, Colombia y EE.UU.)</span>.
              </p>
              
              {/* Core Story */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem', 
                borderLeft: '3px solid rgba(112, 150, 152, 0.2)', 
                paddingLeft: '1.25rem' 
              }}>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                  Ahora en Zaragoza, queremos ayudar a personas con problemas de movilidad o ante sistemas sanitarios saturados; por ello nace <strong style={{ color: 'var(--text-main)', fontWeight: '600' }}>"Nurse at Home"</strong>.
                </p>
                
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ color: 'var(--text-main)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Disponibilidad 24/7</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Siempre aquí cuando más nos necesitas</div>
                </div>

                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                  Ofrecemos cuidados personalizados, profesionales y de alta calidad con una dedicación directa y humana.
                </p>
              </div>

              {/* Emphasized Quote */}
              <div style={{ 
                background: 'rgba(112, 150, 152, 0.06)', 
                padding: '1.25rem 1.5rem', 
                borderRadius: '16px', 
                border: '1px solid rgba(112, 150, 152, 0.15)' 
              }}>
                <p style={{ 
                  fontSize: '1.1rem', 
                  lineHeight: 1.6, 
                  color: 'var(--primary)', 
                  fontWeight: '500', 
                  fontStyle: 'italic', 
                  margin: 0 
                }}>
                  "Sabemos que cuidar no es sólo aplicar técnicas; es estar ahí cuando más nos necesitas."
                </p>
              </div>
            </div>
            
            <Link href="/about">
              <AnimatedButton className="btn-primary" style={{ padding: '0.875rem 2rem', border: 'none' }}>
                Saber más
              </AnimatedButton>
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
