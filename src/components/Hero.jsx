"use client";
import { motion } from 'framer-motion';
import { useContactModal } from './ClientLayout';

export default function Hero() {
  const { openContact } = useContactModal();
  return (
    <section className="hero-wrapper">
      <div className="hero-card">
        {/* Background Video */}
        <div className="hero-video-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/assets/hero_video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '650px' }}
          >
            <div className="hero-badge">
              Enfermera a domicilio en Zaragoza
            </div>

            <h1 className="hero-title">
              Atención sanitaria profesional en tu hogar.
            </h1>
            
            <ul className="hero-text" style={{ listStyleType: 'none', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-color)' }}>•</span>
                Sin esperas ni desplazamientos.
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <span style={{ color: 'var(--accent-color)' }}>•</span>
                Sin salas de espera y sin estrés; solo cuidados profesionales, personalizados y de calidad en tu hogar.
              </li>
            </ul>

            <p style={{ fontWeight: 600, fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>
              ¿Necesitas ayuda?
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.a 
                href="https://wa.me/34641635705"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn" 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: 'var(--primary)', textDecoration: 'none', border: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                Enviar Whatsapp
              </motion.a>
              <motion.button 
                className="hero-btn" 
                onClick={openContact}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: '#f4fbf4', color: 'var(--text-main)', border: '1px solid #cce8cd' }}
              >
                Enviar email
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Floating Marquee Cutout */}
        <div className="hero-marquee-cutout">

          <div style={{ overflow: 'hidden', width: '100%' }}>
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              style={{ display: 'flex', width: 'max-content' }}
            >
              {[...Array(4)].flatMap(() => [
                { text: 'Asistencia personal', icon: 'icon-personal-care.svg' },
                { text: 'Apoyo emocional', icon: 'icon-emotional-support.svg' },
                { text: 'Enfermeras cualificadas', icon: 'icon-qualified-nurses.svg' },
                { text: 'Seguridad del paciente', icon: 'icon-patient-safety.svg' }
              ]).map((feature, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--primary)',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap',
                    marginRight: '2rem'
                  }}
                >
                  <img src={`/assets/${feature.icon}`} alt={feature.text} style={{ width: '20px', height: '20px' }} />
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
