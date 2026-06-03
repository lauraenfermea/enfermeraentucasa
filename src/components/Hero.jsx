import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

export default function Hero({ onContactClick }) {
  return (
    <section style={{
      position: 'relative',
      padding: '7rem 0 4rem',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/assets/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay for Text Readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(11, 30, 54, 0.7) 0%, rgba(11, 30, 54, 0.1) 100%)',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '600px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Pill Badge */}
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              Compassionate home nursing care
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              color: 'white'
            }}>
              Bringing heartfelt care to your doorstep
            </h1>
            
            <p style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              opacity: 0.9,
              marginBottom: '2.5rem',
              maxWidth: '500px',
              color: 'white'
            }}>
              At Nursing Care, we understand the importance of compassionate care that goes beyond just medical assistance.
            </p>

            <AnimatedButton 
              className="btn-primary" 
              onClick={onContactClick}
              style={{ padding: '1rem 2rem', fontSize: '1.05rem', border: 'none', background: 'var(--primary)', color: 'white' }}
            >
              Discover more
            </AnimatedButton>
          </motion.div>
        </div>
      </div>

      {/* Floating Features Bottom-Left Cut-out */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        background: 'var(--bg-color)',
        padding: '1.25rem 2rem 1rem 2rem',
        borderTopRightRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        zIndex: 2,
        overflow: 'hidden', // to prevent wide content pushing it, though flexWrap could work
        maxWidth: 'min(90%, 750px)' // Restrict width so it looks like a nice cutout pill
      }}>
        {/* Inverse curve above */}
        <svg width="24" height="24" viewBox="0 0 24 24" style={{ position: 'absolute', bottom: '100%', left: 0, fill: 'var(--bg-color)' }}>
          <path d="M0 24V0c13.255 0 24 10.745 24 24H0z" />
        </svg>

        {/* Inverse curve right */}
        <svg width="24" height="24" viewBox="0 0 24 24" style={{ position: 'absolute', left: '100%', bottom: 0, fill: 'var(--bg-color)' }}>
          <path d="M0 24V0c13.255 0 24 10.745 24 24H0z" />
        </svg>

        <div style={{ overflow: 'hidden', width: '100%', paddingBottom: '0.5rem' }}>
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40, // Increased duration for longer array
                ease: "linear",
              },
            }}
            style={{ display: 'flex', width: 'max-content' }}
          >
            {[...Array(4)].flatMap(() => [
              { text: 'Personal care assistance', icon: 'icon-personal-care.svg' },
              { text: 'Emotional support', icon: 'icon-emotional-support.svg' },
              { text: 'Highly trained staff', icon: 'icon-qualified-nurses.svg' },
              { text: 'Enhanced patient safety', icon: 'icon-patient-safety.svg' }
            ]).map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-main)',
                  fontWeight: '600',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                  marginRight: '3rem' // uniform gap to ensure perfect math for 50% shift
                }}
              >
                <img src={`/assets/${feature.icon}`} alt={feature.text} style={{ width: '24px', height: '24px' }} />
                <span style={{ color: 'var(--text-main)' }}>{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
