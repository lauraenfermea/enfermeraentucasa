"use client";
import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';
import { urlFor } from '../sanity/image';

export default function CtaBanner({ title, desc, image, backgroundColor, headingColor }) {
  const heading = title || 'Únete a nuestra comunidad de atención';
  const description = desc || 'Solicite una consulta hoy y permítanos crear un plan de atención que se adapte perfectamente a su familia.';
  const imageSrc = image && typeof image === 'object' ? urlFor(image).url() : '/assets/book-appointment.jpg';

  let cardBg = 'var(--primary)'; // Default primary brand color
  if (backgroundColor === 'white') cardBg = 'white';
  else if (backgroundColor === 'light-green') cardBg = '#eff5f1';
  else if (backgroundColor === 'light-gray') cardBg = '#F8FBF8';
  else if (backgroundColor === 'brand-primary') cardBg = 'var(--primary)';

  const isDarkCard = cardBg === 'var(--primary)';

  let titleColor = isDarkCard ? 'white' : 'var(--text-main)';
  if (headingColor === 'brand-primary') titleColor = '#8B9A91';
  else if (headingColor === 'white') titleColor = 'white';

  let descColor = isDarkCard ? 'rgba(255, 255, 255, 0.9)' : 'var(--text-muted)';
  
  const btnStyle = isDarkCard 
    ? { padding: '1rem 2rem', fontSize: '1.05rem', border: 'none', background: 'white', color: 'var(--primary)' }
    : { padding: '1rem 2rem', fontSize: '1.05rem', border: 'none', background: 'var(--primary)', color: 'white' };

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
            background: cardBg,
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            border: isDarkCard ? 'none' : '1px solid rgba(139, 154, 145, 0.2)'
          }}
        >
          {/* Left Text Content */}
          <div style={{
            flex: '1 1 500px',
            padding: '5rem 4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: titleColor
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              lineHeight: 1.1,
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              color: titleColor
            }}>
              {heading}
            </h2>
            
            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              color: descColor,
              marginBottom: '2.5rem',
              maxWidth: '450px'
            }}>
              {description}
            </p>

            <div>
              <AnimatedButton 
                className="btn-primary" 
                href="https://wa.me/34641635705"
                target="_blank"
                rel="noopener noreferrer"
                style={btnStyle}
              >
                Realizar una consulta
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
              src={imageSrc} 
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
