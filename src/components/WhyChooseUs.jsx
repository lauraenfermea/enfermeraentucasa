"use client";
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    icon: '📞',
    title: 'Contáctanos',
    desc: 'Llámenos, envíe un WhatsApp o complete nuestro formulario. Nuestro equipo responde en menos de 15 minutos, 24/7.',
    detail: 'Disponible todos los días del año, incluyendo fines de semana y feriados.',
    color: 'var(--primary)',
    gradient: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
    bg: 'rgba(130,155,140,0.08)',
  },
  {
    num: '02',
    icon: '📋',
    title: 'Evaluación Personalizada',
    desc: 'Una enfermera coordinadora evaluará las necesidades del paciente para diseñar el plan de atención ideal.',
    detail: 'Evaluación gratuita y sin compromiso. Incluye análisis del historial médico y objetivos de tratamiento.',
    color: 'var(--primary)',
    gradient: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
    bg: 'rgba(130,155,140,0.08)',
  },
  {
    num: '03',
    icon: '👩‍⚕️',
    title: 'Asignación de Enfermera',
    desc: 'Seleccionamos a la enfermera certificada que mejor se adapta a las necesidades específicas del paciente.',
    detail: 'Todas nuestras enfermeras están licenciadas, aseguradas y con antecedentes verificados.',
    color: 'var(--primary)',
    gradient: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
    bg: 'rgba(130,155,140,0.08)',
  },
  {
    num: '04',
    icon: '❤️',
    title: 'Atención de Calidad',
    desc: 'La enfermera llega a su hogar para brindar atención profesional, compasiva y de la más alta calidad.',
    detail: 'Con reportes detallados, seguimiento continuo y comunicación directa con su médico tratante.',
    color: 'var(--primary)',
    gradient: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
    bg: 'rgba(130,155,140,0.08)',
  },
];

const WHYS = [
  {
    icon: '🏆',
    title: 'Enfermeras Certificadas',
    desc: 'Todas con licencia activa del CENDEISSS, con mínimo 3 años de experiencia clínica verificada.',
    color: 'var(--primary)',
  },
  {
    icon: '⏰',
    title: 'Respuesta Inmediata',
    desc: 'Llegamos en menos de 2 horas para urgencias. Disponibles 24/7, 365 días del año.',
    color: 'var(--primary)',
  },
  {
    icon: '🔒',
    title: '100% Aseguradas',
    desc: 'Todas nuestras enfermeras cuentan con seguro de responsabilidad civil y accidente para su tranquilidad.',
    color: 'var(--primary)',
  },
  {
    icon: '📊',
    title: 'Reportes Detallados',
    desc: 'Recibirá informes diarios del estado del paciente y coordinación directa con su médico tratante.',
    color: 'var(--primary)',
  },
  {
    icon: '💰',
    title: 'Precios Transparentes',
    desc: 'Sin costos ocultos ni sorpresas. Planes por hora, diarios o mensuales. Evaluación gratuita.',
    color: 'var(--primary)',
  },
  {
    icon: '🤝',
    title: 'Atención Personalizada',
    desc: 'Plan de cuidados único para cada paciente. Un coordinador dedicado para toda la familia.',
    color: 'var(--primary)',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(null);

  return (
    <>
      {/* Why Choose Us Section */}
      <section id="nosotros" ref={ref} style={{
        padding: '6rem 0',
        background: '#FFFFFF',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(130,155,140,0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(130,155,140,0.04) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }} />

        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '5rem',
            alignItems: 'center',
          }} className="why-grid">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div className="section-eyebrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                ¿Por qué Elegirnos?
              </div>

              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
                lineHeight: 1.1,
              }}>
                El Estándar de Oro en{' '}
                <span style={{
                  color: 'var(--primary)',
                }}>
                  Enfermería Domiciliar
                </span>
              </h2>

              <p style={{
                fontSize: '1.05rem', color: '#475569',
                lineHeight: 1.8, marginBottom: '2.5rem',
              }}>
                Nos comprometemos a ofrecer el más alto nivel de atención médica domiciliar en Costa Rica. Cada enfermera de nuestro equipo pasa por un riguroso proceso de selección y capacitación continua.
              </p>

              {/* Trust indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {[
                  { icon: '✅', text: 'Registro activo en el Colegio de Enfermeras de Costa Rica' },
                  { icon: '🩺', text: 'Mínimo 3 años de experiencia clínica en hospitales' },
                  { icon: '🔍', text: 'Verificación de antecedentes penales y referencias' },
                  { icon: '📚', text: 'Capacitación continua en las mejores prácticas clínicas' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
                      padding: '0.875rem 1rem',
                      background: 'rgba(130,155,140,0.04)',
                      border: '1px solid rgba(130,155,140,0.1)',
                      borderRadius: '1rem',
                    }}
                  >
                    <span style={{ fontSize: '1.1rem', lineHeight: 1, flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 500, lineHeight: 1.5 }}>{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <a
                href="https://api.whatsapp.com/send?phone=34641635705"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ textDecoration: 'none', display: 'inline-flex' }}
              >
                Conoce Nuestro Equipo →
              </a>
            </motion.div>

            {/* Right: WHY cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              {WHYS.map((why, i) => (
                <motion.div
                  key={why.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  style={{
                    background: 'white',
                    border: '1.5px solid #F1F5F9',
                    borderRadius: '1.25rem',
                    padding: '1.5rem 1.25rem',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 16px 32px rgba(15,23,42,0.1)',
                    borderColor: `${why.color}30`,
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '14px',
                    background: `${why.color}15`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem', marginBottom: '1rem',
                  }}>
                    {why.icon}
                  </div>
                  <h4 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.95rem', fontWeight: 800,
                    color: '#0F172A', marginBottom: '0.5rem',
                    letterSpacing: '-0.01em', lineHeight: 1.3,
                  }}>
                    {why.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.6 }}>
                    {why.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .why-grid {
              grid-template-columns: 1fr !important;
              gap: 3rem !important;
            }
          }
        `}</style>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" style={{
        padding: '6rem 0',
        background: 'var(--text-main)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(130,155,140,0.12) 0%, transparent 40%),
            radial-gradient(circle at 80% 80%, rgba(130,155,140,0.08) 0%, transparent 40%)
          `,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.3,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }} />

        <HowItWorksContent steps={STEPS} activeStep={activeStep} setActiveStep={setActiveStep} />
      </section>
    </>
  );
}

function HowItWorksContent({ steps, activeStep, setActiveStep }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)',
          textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '1rem',
        }}>
          <span style={{ width: 24, height: 3, background: 'var(--primary)', borderRadius: '9999px' }} />
          Proceso Simple
          <span style={{ width: 24, height: 3, background: 'var(--primary)', borderRadius: '9999px' }} />
        </div>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 2.75rem)',
          fontWeight: 900, color: 'white',
          letterSpacing: '-0.03em', marginBottom: '1rem',
        }}>
          Atención en 4 Pasos Sencillos
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.75 }}>
          Desde el primer contacto hasta la atención en su hogar, hacemos todo lo posible para que el proceso sea fácil y sin estrés.
        </p>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        position: 'relative',
      }} className="steps-grid">
        {/* Connector line */}
        <div style={{
          position: 'absolute',
          top: '52px', left: 'calc(12.5% + 24px)', right: 'calc(12.5% + 24px)',
          height: '2px',
          background: 'var(--primary)',
          opacity: 0.3, zIndex: 0,
          borderRadius: '9999px',
        }} className="connector-line" />

        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            onClick={() => setActiveStep(activeStep === i ? null : i)}
            style={{
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative', zIndex: 1,
            }}
          >
            {/* Step icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              style={{
                width: 80, height: 80, borderRadius: '24px',
                background: activeStep === i ? step.gradient : 'rgba(255,255,255,0.08)',
                border: `2px solid ${activeStep === i ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', margin: '0 auto 1.25rem',
                boxShadow: activeStep === i ? `0 12px 32px ${step.color}40` : '0 4px 16px rgba(0,0,0,0.2)',
                transition: 'all 0.35s ease',
                backdropFilter: 'blur(12px)',
              }}
            >
              {step.icon}
            </motion.div>

            <div style={{
              fontSize: '0.7rem', fontWeight: 800, color: step.color,
              textTransform: 'uppercase', letterSpacing: '0.1em',
              marginBottom: '0.5rem',
            }}>
              PASO {step.num}
            </div>

            <h3 style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '1.1rem', fontWeight: 800,
              color: 'white', marginBottom: '0.625rem',
              letterSpacing: '-0.02em', lineHeight: 1.2,
            }}>
              {step.title}
            </h3>

            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.65 }}>
              {step.desc}
            </p>

            {/* Expanded detail */}
            {activeStep === i && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: step.bg,
                  border: `1px solid ${step.color}30`,
                  borderRadius: '1rem',
                  fontSize: '0.8rem',
                  color: step.color,
                  lineHeight: 1.6,
                  textAlign: 'left',
                }}
              >
                ℹ️ {step.detail}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{ textAlign: 'center', marginTop: '4rem' }}
      >
        <a
          href="https://api.whatsapp.com/send?phone=34641635705"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
            padding: '1rem 2.5rem',
            borderRadius: '1rem',
            fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
            boxShadow: '0 8px 32px rgba(130,155,140,0.35)',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(130,155,140,0.45)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(130,155,140,0.35)'; }}
        >
          Comenzar Ahora — Es Gratis
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          Sin compromiso · Evaluación gratuita · Respuesta en &lt; 15 minutos
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 1024px) {
          .steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .connector-line { display: none !important; }
        }
        @media (max-width: 640px) {
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
