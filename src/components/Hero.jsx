"use client";
import { motion } from 'framer-motion';
import { useContactModal } from './ClientLayout';

export default function Hero() {
  const { openContact } = useContactModal();
  return (
    <section className="hero-wrapper">
      <div className="hero-card">
        {/* Background Image */}
        <div className="hero-video-container">
          <img
            src="/assets/hero_bg.webp"
            alt="Enfermera a domicilio"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '620px' }}
          >
            <div className="hero-badge">Enfermera a domicilio en Zaragoza</div>

            <h1 className="hero-title">
              Atención sanitaria profesional en tu hogar.
            </h1>

            <ul className="hero-text">
              <li>- Sin esperas ni desplazamientos.</li>
              <li>- Sin salas de espera y sin estrés; solo cuidados profesionales, personalizados y de calidad en tu hogar.</li>
            </ul>

            <div className="hero-contact">
              <p className="hero-help">¿Necesitas ayuda?</p>
              <p><span className="hero-contact-label">Teléfono:</span> +34 641 635 705</p>
              <p><span className="hero-contact-label">email:</span> <a href="mailto:info@enfermeraentucasa.es">info@enfermeraentucasa.es</a></p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <motion.a
                href="https://wa.me/34641635705"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btn hero-btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Enviar Whatsapp
              </motion.a>
              <motion.button
                className="hero-btn hero-btn-secondary"
                onClick={openContact}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
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
