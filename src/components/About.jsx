import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section bg-light" ref={ref}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          
          {/* Images Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ position: 'relative', height: '550px' }}
          >
            {/* Left Image Wrapper */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: '20%',
              width: '50%',
              height: '60%',
              borderRadius: '24px',
              borderTopRightRadius: '0',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              zIndex: 1
            }}>
              <img src="/assets/about-1.jpg" alt="Nurse standing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {/* Cut-out Top-Right */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--bg-color)',
                borderBottomLeftRadius: '24px'
              }} />
            </div>
            
            {/* Right Image Wrapper */}
            <div style={{
              position: 'absolute',
              right: 0,
              top: '5%',
              width: '60%',
              height: '75%',
              borderRadius: '24px',
              borderBottomLeftRadius: '0',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              zIndex: 2
            }}>
              <img src="/assets/about-2.jpg" alt="Nurse and patient" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {/* Cut-out Bottom-Left */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--bg-color)',
                borderTopRightRadius: '24px'
              }} />
            </div>

            {/* Decoration SVG */}
            <img 
              src="/assets/about-decoration.svg" 
              alt="Decoration" 
              style={{
                position: 'absolute',
                bottom: '10%',
                right: '25%',
                zIndex: 3,
                width: '140px'
              }}
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{
              display: 'inline-block',
              padding: '0.4rem 1rem',
              background: 'rgba(112, 150, 152, 0.15)',
              color: 'var(--primary)',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: '600',
              marginBottom: '1.5rem'
            }}>
              Who we are
            </div>
            
            <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              About <span style={{ color: 'var(--primary)' }}>Nursing Care</span>
            </h2>
            
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
              We are dedicated to delivering exceptional healthcare services with compassion and expertise. With a commitment to patient-centered care, our team of healthcare professionals strives to provide comprehensive medical treatments tailored to individual needs.
            </p>
            
            <AnimatedButton className="btn-primary" style={{ padding: '0.875rem 2rem', border: 'none' }}>
              Learn more
            </AnimatedButton>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
