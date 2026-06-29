"use client";
import { motion } from 'framer-motion';
import { urlFor } from '../sanity/image';

export default function Hero({ heading, body, backgroundImage }) {

  const titleText = heading || "Enfermera a domicilio en Zaragoza";
  const bodyParagraphs = body 
    ? body.split('\n').filter(p => p.trim() !== '')
    : [
        "Atención sanitaria profesional en tu hogar.",
        "- Sin esperas ni desplazamientos.",
        "- Sin salas de espera y sin estrés; solo cuidados profesionales, personalizados y de calidad en tu hogar."
      ];
  
  const bgImg = backgroundImage ? urlFor(backgroundImage).url() : "/assets/hero_bg.webp";

  return (
    <section className="hero-wrapper">
      <div className="hero-card">
        {/* Background Image */}
        <div className="hero-video-container">
          <img
            src={bgImg}
            alt="Enfermera a domicilio"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '900px' }}
          >
            {/* Heading */}
            <h1 className="hero-heading">{titleText}</h1>

            {/* Body text */}
            <div className="hero-body">
              {bodyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Contact */}
            <div className="hero-contact">
              <p className="hero-help">¿Necesitas ayuda?</p>
              <p><span className="hero-contact-label">Teléfono:</span> <a href="tel:+34641635705">+34 641 635 705</a></p>
              <p><span className="hero-contact-label">email:</span> <a href="mailto:info@enfermeraentucasa.es">info@enfermeraentucasa.es</a></p>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
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
              <motion.a
                className="hero-btn hero-btn-secondary"
                href="mailto:info@enfermeraentucasa.es"
                style={{ textDecoration: 'none' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Enviar email
              </motion.a>
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
