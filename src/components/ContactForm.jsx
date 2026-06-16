"use client";
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const SERVICES_LIST = [
  'Cuidado Post-Operatorio',
  'Cuidado de Adultos Mayores',
  'Administración de Medicamentos',
  'Cuidado de Heridas',
  'Enfermedades Crónicas',
  'Cuidado Pediátrico',
  'Otro / Consulta General',
];

const FAQ_ITEMS = [
  {
    q: '¿Cuánto tiempo tarda en llegar la enfermera después de mi solicitud?',
    a: 'Para casos urgentes, nuestras enfermeras pueden estar en su hogar en menos de 2 horas en el Gran Área Metropolitana. Para servicios planificados, coordinamos el horario que mejor le convenga, generalmente dentro de las primeras 24 horas.',
  },
  {
    q: '¿Cómo garantizan la calidad y seguridad de sus enfermeras?',
    a: 'Todas nuestras enfermeras son graduadas universitarias en Enfermería con registro activo en el Colegio Oficial de Enfermería de Zaragoza. Realizamos una verificación exhaustiva de antecedentes, referencias laborales y académicas. Además, cuentan con seguro de responsabilidad civil.',
  },
  {
    q: '¿Cuáles son los precios de sus servicios?',
    a: 'Nuestros precios varían según el tipo de servicio, duración y complejidad del caso. Ofrecemos planes por hora, medio día, día completo o mensual. Contáctenos para una evaluación gratuita y sin compromiso donde le daremos una cotización personalizada.',
  },
  {
    q: '¿Están disponibles los fines de semana y feriados?',
    a: 'Sí, operamos 365 días al año, 24 horas al día, 7 días a la semana. Entendemos que las necesidades de salud no tienen horario, por eso nuestro equipo de coordinación siempre está disponible para atender emergencias.',
  },
  {
    q: '¿Pueden trabajar en conjunto con el médico tratante de mi familiar?',
    a: 'Absolutamente. La comunicación con el equipo médico tratante es una parte fundamental de nuestro servicio. Enviamos reportes detallados de cada visita y coordinamos directamente con médicos, hospitales y clínicas para garantizar la continuidad del tratamiento.',
  },
  {
    q: '¿Qué áreas geográficas cubren?',
    a: 'Actualmente atendemos en Zaragoza y alrededores. Contáctenos para confirmar la disponibilidad en su zona.',
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{
        background: 'white',
        border: `1.5px solid ${open ? 'rgba(14,165,233,0.25)' : 'rgba(226,232,240,0.8)'}`,
        borderRadius: '1.25rem',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        boxShadow: open ? '0 8px 32px rgba(14,165,233,0.1)' : '0 2px 8px rgba(15,23,42,0.04)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '1.25rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '1rem', background: 'none', border: 'none', cursor: 'pointer',
          textAlign: 'left', fontFamily: 'inherit',
        }}
      >
        <span style={{
          fontWeight: 700, fontSize: '0.95rem',
          color: open ? '#0284C7' : '#0F172A',
          lineHeight: 1.5, flex: 1,
          transition: 'color 0.3s ease',
        }}>
          {item.q}
        </span>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: open ? 'rgba(14,165,233,0.12)' : 'rgba(241,245,249,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'all 0.3s ease',
          border: `1px solid ${open ? 'rgba(14,165,233,0.2)' : 'transparent'}`,
        }}>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={open ? '#0284C7' : '#64748B'} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
          >
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          >
            <div style={{
              padding: '0 1.5rem 1.25rem',
              fontSize: '0.9rem', color: '#475569',
              lineHeight: 1.75,
              borderTop: '1px solid rgba(14,165,233,0.1)',
              paddingTop: '1rem',
            }}>
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ContactForm({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', phone: '', service: '', urgency: 'normal', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const faqRef = useRef(null);
  const faqInView = useInView(faqRef, { once: true });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1200));
    setSubmitted(true);
  };

  // FAQ section (always rendered inline on the page)
  const FAQSection = (
    <section id="faq" ref={faqRef} style={{
      padding: '6rem 0',
      background: '#F8FAFC',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '800px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)',
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={faqInView ? { opacity: 1, y: 0 } : {}}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <div className="section-eyebrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Preguntas Frecuentes
          </div>
          <h2 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: 900, color: '#0F172A',
            letterSpacing: '-0.03em',
          }}>
            Resolvemos tus Dudas
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem',
          maxWidth: '1000px',
          margin: '0 auto',
        }} className="faq-grid">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <p style={{ color: '#64748B', marginBottom: '1.25rem' }}>
            ¿Tienes más preguntas? Estamos aquí para ayudarte.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=34641635705"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            Chatear por WhatsApp
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );

  // Contact Modal
  const ContactModal = isOpen && (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(15,23,42,0.75)',
          backdropFilter: 'blur(16px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 180, damping: 22 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'white',
            borderRadius: '2rem',
            width: '100%',
            maxWidth: '540px',
            maxHeight: '92vh',
            overflowY: 'auto',
            boxShadow: '0 40px 80px rgba(15,23,42,0.35), 0 0 0 1px rgba(14,165,233,0.1)',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{
            padding: '2rem 2.5rem 1.5rem',
            borderBottom: '1px solid #F1F5F9',
            background: 'linear-gradient(135deg, rgba(14,165,233,0.04) 0%, rgba(20,184,166,0.02) 100%)',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
              background: 'linear-gradient(90deg, #0EA5E9, #14B8A6)',
              borderRadius: '2rem 2rem 0 0',
            }} />

            <button
              onClick={onClose}
              style={{
                position: 'absolute', top: '1.25rem', right: '1.25rem',
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(241,245,249,0.9)', border: '1px solid #E2E8F0',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#475569', transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(241,245,249,0.9)'; e.currentTarget.style.color = '#475569'; }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '14px',
                background: 'linear-gradient(135deg, #0EA5E9, #14B8A6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem', boxShadow: '0 6px 20px rgba(14,165,233,0.3)',
              }}>
                📋
              </div>
              <div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1.4rem', fontWeight: 900,
                  color: '#0F172A', letterSpacing: '-0.02em',
                  marginBottom: '0.2rem',
                }}>
                  Solicitar Atención
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Respuesta garantizada en menos de 15 minutos
                </p>
              </div>
            </div>

            {!submitted && (
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                {[1, 2].map(s => (
                  <div key={s} style={{
                    height: 4, borderRadius: '9999px',
                    flex: s === 1 ? 1.5 : 1,
                    background: step >= s
                      ? 'linear-gradient(90deg, #0EA5E9, #14B8A6)'
                      : '#E2E8F0',
                    transition: 'all 0.4s ease',
                  }} />
                ))}
              </div>
            )}
          </div>

          {/* Form body */}
          <div style={{ padding: '2rem 2.5rem' }}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '2rem 0' }}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981, #059669)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 12px 32px rgba(16,185,129,0.35)',
                  fontSize: '2rem',
                }}>
                  ✅
                </div>
                <h3 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1.75rem', fontWeight: 900,
                  color: '#0F172A', marginBottom: '0.75rem',
                }}>
                  ¡Solicitud Enviada!
                </h3>
                <p style={{ color: '#64748B', marginBottom: '2rem', lineHeight: 1.7 }}>
                  Gracias, <strong>{form.name}</strong>. Nuestro equipo se comunicará con usted en los próximos{' '}
                  {form.urgency === 'urgente' ? '15 minutos' : '30 minutos'}.
                </p>
                <div style={{
                  display: 'flex', gap: '0.75rem', flexDirection: 'column',
                }}>
                  <a
                    href="https://api.whatsapp.com/send?phone=34641635705"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                    style={{ textDecoration: 'none', width: '100%', justifyContent: 'center' }}
                  >
                    Confirmar por WhatsApp
                  </a>
                  <button
                    onClick={() => { setSubmitted(false); setStep(1); setForm({ name: '', phone: '', service: '', urgency: 'normal', notes: '' }); onClose(); }}
                    className="btn btn-secondary"
                  >
                    Cerrar
                  </button>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <AnimatePresence mode="wait">
                <motion.form
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={e => { e.preventDefault(); if (form.name && form.phone) setStep(2); }}
                >
                  <div className="form-group">
                    <label className="form-label">Nombre completo *</label>
                    <input
                      name="name" value={form.name} onChange={handleChange}
                      className="form-control" required
                      placeholder="Ej: Juan Rodríguez"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Teléfono / WhatsApp *</label>
                    <input
                      name="phone" value={form.phone} onChange={handleChange}
                      className="form-control" required type="tel"
                      placeholder="¿Cómo podemos ayudarte?"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tipo de servicio</label>
                    <select name="service" value={form.service} onChange={handleChange} className="form-control">
                      <option value="">Seleccione un servicio</option>
                      <option value="wound_care">Curas y valoración de heridas</option>
                      <option value="injectables">Inyectables y Medicación</option>
                      <option value="constants">Control de Constantes</option>
                      <option value="newborn">Cuidados del recién nacido</option>
                      <option value="catheters">Sondas, drenajes y ostomías</option>
                      <option value="other">Otro / Consulta General</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nivel de urgencia</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }} className="mobile-grid-1">
                      {[
                        { value: 'normal', label: 'Normal', icon: '📅', desc: '< 24 horas' },
                        { value: 'urgente', label: 'Urgente', icon: '🚨', desc: '< 2 horas' },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, urgency: opt.value }))}
                          style={{
                            padding: '0.875rem',
                            border: `2px solid ${form.urgency === opt.value ? (opt.value === 'urgente' ? '#EF4444' : '#0EA5E9') : '#E2E8F0'}`,
                            borderRadius: '0.875rem', cursor: 'pointer', background: 'none',
                            transition: 'all 0.2s ease', fontFamily: 'inherit',
                            background: form.urgency === opt.value
                              ? (opt.value === 'urgente' ? 'rgba(239,68,68,0.06)' : 'rgba(14,165,233,0.06)')
                              : 'white',
                          }}
                        >
                          <div style={{ fontSize: '1.25rem', marginBottom: '0.3rem' }}>{opt.icon}</div>
                          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{opt.label}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '0.5rem', fontSize: '1rem', padding: '1rem' }}
                  >
                    Continuar →
                  </button>
                </motion.form>
              </AnimatePresence>
            ) : (
              <AnimatePresence mode="wait">
                <motion.form
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSubmit}
                >
                  {/* Confirmation summary */}
                  <div style={{
                    background: 'rgba(14,165,233,0.05)',
                    border: '1px solid rgba(14,165,233,0.15)',
                    borderRadius: '1rem', padding: '1.25rem',
                    marginBottom: '1.5rem',
                  }}>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      Envíanos un mensaje
                    </h3>
                    {[
                      { label: 'Nombre', value: form.name },
                      { label: 'Teléfono', value: form.phone },
                      { label: 'Servicio', value: form.service || 'No especificado' },
                      { label: 'Urgencia', value: form.urgency === 'urgente' ? '🚨 Urgente (< 2h)' : '📅 Normal (< 24h)' },
                    ].map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: '0.875rem' }}>
                        <span style={{ color: '#64748B', fontWeight: 500 }}>{label}:</span>
                        <span style={{ color: '#0F172A', fontWeight: 700 }}>{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Notas adicionales</label>
                    <textarea
                      name="notes" value={form.notes} onChange={handleChange}
                      className="form-control" rows={4}
                      placeholder="Cuéntenos sobre el paciente: condición actual, medicamentos, cualquier información relevante..."
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn btn-secondary"
                      style={{ flex: 1 }}
                    >
                      ← Atrás
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2, fontSize: '1rem', padding: '1rem' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                      Enviar Solicitud
                    </button>
                  </div>
                </motion.form>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      {ContactModal}
    </>
  );
}
