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
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{
                position: 'absolute',
                left: 0,
                top: '15%',
                width: '47%',
                height: '75%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                zIndex: 1
              }}
            >
              <img src="/assets/about-nurse-left.avif" alt="Nurse standing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>
            
            {/* Right Image Wrapper */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              style={{
                position: 'absolute',
                right: 0,
                top: '5%',
                width: '47%',
                height: '75%',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                zIndex: 2
              }}
            >
              <img src="/assets/about-nurse-right.webp" alt="Nurse and patient" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </motion.div>

            {/* Left Image Badge (6+) */}
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
                      YEARS OF EXPERIENCE • YEARS OF EXPERIENCE •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>6+</span>
              </div>
            </motion.div>

            {/* Right Image Badge (8+) */}
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
                      YEARS OF EXPERIENCE • YEARS OF EXPERIENCE •
                    </textPath>
                  </text>
                </svg>
              </motion.div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-main)' }}>8+</span>
              </div>
            </motion.div>
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
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {/* Lead Paragraph */}
              <p style={{ fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--text-main)', fontWeight: '600' }}>
                Nurses since 2015 with experience in Spain and other countries <span style={{ color: 'var(--primary)' }}>(UK, Colombia, and the US)</span>.
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
                  Now in Zaragoza, we want to help those with mobility issues or overwhelmed healthcare systems; that's why <strong style={{ color: 'var(--text-main)', fontWeight: '600' }}>"Nurse at Home"</strong> was created.
                </p>
                <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                  We offer personalized, professional, and high-quality care with firsthand dedication.
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
                  "We know that caring is not just about applying techniques; it's about being there when you need us most."
                </p>
              </div>
            </div>
            
            <AnimatedButton className="btn-primary" style={{ padding: '0.875rem 2rem', border: 'none' }}>
              Learn more
            </AnimatedButton>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
