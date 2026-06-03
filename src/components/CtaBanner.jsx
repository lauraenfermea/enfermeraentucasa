import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

export default function CtaBanner({ onContactClick }) {
  return (
    <section id="contact" className="section" style={{ background: 'white', padding: '2rem 1.5rem 6rem' }}>
      <div className="container" style={{ padding: 0 }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            background: 'var(--primary)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}
        >
          {/* Left Text Content */}
          <div style={{
            flex: '1 1 500px',
            padding: '5rem 4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white'
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}>
              Join our community of care
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              opacity: 0.9,
              marginBottom: '2.5rem',
              maxWidth: '450px'
            }}>
              We are always here to help you and your loved ones. Get in touch with us today to learn more about our services.
            </p>

            <div>
              <AnimatedButton 
                className="btn-primary" 
                onClick={onContactClick}
                style={{ 
                  padding: '1rem 2rem', 
                  fontSize: '1.05rem', 
                  border: 'none', 
                  background: 'white', 
                  color: 'var(--primary)' 
                }}
              >
                Book an appointment
              </AnimatedButton>
            </div>
          </div>

          {/* Right Image */}
          <div style={{
            flex: '1 1 400px',
            minHeight: '400px',
            position: 'relative'
          }}>
            <img 
              src="/assets/book-appointment.jpg" 
              alt="Nurse and patient" 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
