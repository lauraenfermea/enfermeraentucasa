import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: '¿Cómo seleccionan al personal de enfermería?',
      a: 'Todo nuestro personal pasa por un riguroso proceso de reclutamiento que incluye: verificación exhaustiva de cédula profesional y título académico, exámenes psicométricos, investigación de antecedentes y referencias laborales, así como una entrevista y valoración de servicio humana.'
    },
    {
      q: '¿Qué pasa si el enfermero asignado no asiste o no somos compatibles?',
      a: 'Nuestra prioridad es la continuidad del cuidado. Contamos con personal de guardia y respaldo 24/7. En caso de inasistencia, cubrimos el turno de inmediato. Si por alguna razón la familia o el paciente no se sienten cómodos con el enfermero asignado, realizamos el cambio de personal de inmediato sin costo adicional.'
    },
    {
      q: '¿Cuáles son los horarios y modalidades de los turnos?',
      a: 'Ofrecemos flexibilidad total adaptándonos a su familia. Contamos con visitas programadas por horas (para inyecciones, curaciones o baños), así como turnos de 8, 12 y 24 horas continuas, tanto diurnos como nocturnos.'
    },
    {
      q: '¿Los servicios incluyen insumos médicos?',
      a: 'Los insumos médicos necesarios para los procedimientos (gazas, jeringas, apósitos avanzados, soluciones) generalmente son cubiertos por la familia o se facturan por separado según el plan contratado. Al realizar la valoración gratuita inicial, les entregamos una lista sugerida de materiales requeridos.'
    },
    {
      q: '¿Tienen cobertura de atención en caso de emergencias?',
      a: 'Sí, contamos con un canal de atención telefónica de emergencia exclusivo para nuestros pacientes activos. Además, nuestro personal está capacitado en soporte básico de vida (RCP) y primeros auxilios para actuar de inmediato y coordinar el traslado médico si es necesario.'
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section" style={{ backgroundColor: 'var(--color-bg-white)', position: 'relative' }}>
      
      {/* Background shape */}
      <div
        className="pulse-bg"
        style={{
          width: '320px',
          height: '320px',
          background: 'rgba(20, 184, 166, 0.04)',
          top: '15%',
          left: '5%',
          animation: 'pulse-slow 8s infinite',
        }}
      ></div>

      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-subtitle">Preguntas Frecuentes</span>
          <h2 className="section-title">
            Resolvemos tus dudas
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Queremos que te sientas completamente seguro y respaldado al elegir nuestros servicios. Aquí detallamos los aspectos más comunes.
          </p>
        </div>

        {/* Accordion Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  backgroundColor: isOpen ? 'var(--color-bg-light)' : 'white',
                  transition: 'background-color 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => handleToggle(idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HelpCircle size={20} style={{ color: isOpen ? 'var(--color-primary)' : 'var(--color-text-muted)', flexShrink: 0 }} />
                    <span style={{ fontSize: '1.0625rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                      {faq.q}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: 'var(--color-text-muted)', display: 'flex' }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div
                        style={{
                          padding: '0 1.5rem 1.5rem 3.25rem',
                          fontSize: '0.9375rem',
                          lineHeight: 1.6,
                          color: 'var(--color-text-muted)',
                        }}
                      >
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
