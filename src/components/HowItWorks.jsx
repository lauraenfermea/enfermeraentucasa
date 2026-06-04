"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PhoneCall, ClipboardList, UserCheck, PlayCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Contacto Inicial',
      desc: 'Comunícate por teléfono, WhatsApp o a través de nuestro formulario en línea.',
      icon: <PhoneCall size={22} style={{ color: 'var(--color-primary)' }} />,
    },
    {
      number: '2',
      title: 'Asesoría Gratuita',
      desc: 'Conversamos sobre las necesidades de salud de tu familiar para entender el caso.',
      icon: <MessageSquare size={22} style={{ color: 'var(--color-teal)' }} />,
    },
    {
      number: '3',
      title: 'Valoración Clínica',
      desc: 'Un enfermero supervisor realiza una valoración a domicilio sin costo para estructurar el plan.',
      icon: <ClipboardList size={22} style={{ color: 'var(--color-primary)' }} />,
    },
    {
      number: '4',
      title: 'Asignación del Personal',
      desc: 'Seleccionamos al enfermero(a) con la especialidad y el perfil idóneo para el paciente.',
      icon: <UserCheck size={22} style={{ color: 'var(--color-teal)' }} />,
    },
    {
      number: '5',
      title: 'Inicio del Cuidado',
      desc: 'Comienza el servicio en casa con supervisión médica continua y reportes para tu tranquilidad.',
      icon: <PlayCircle size={22} style={{ color: 'var(--color-primary)' }} />,
    }
  ];

  return (
    <section id="proceso" className="section" style={{ backgroundColor: 'var(--color-bg-light)', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span className="section-subtitle">Paso a Paso</span>
          <h2 className="section-title" style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
            ¿Cómo iniciar el servicio de enfermería?
          </h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Nuestro proceso está diseñado para ser rápido, seguro y sin complicaciones, garantizando la atención adecuada desde el primer día.
          </p>
        </div>

        {/* Timeline Container */}
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Vertical Connecting Line (Desktop) */}
          <div
            className="hide-mobile"
            style={{
              position: 'absolute',
              top: '40px',
              bottom: '40px',
              left: '50%',
              width: '4px',
              backgroundColor: 'rgba(14, 165, 233, 0.15)',
              transform: 'translateX(-50%)',
              zIndex: 1,
            }}
          ></div>

          {/* Timeline Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    zIndex: 2,
                    width: '100%',
                  }}
                  className="timeline-item"
                >
                  {/* Content Box */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '43%',
                    }}
                    className="timeline-content-box"
                  >
                    <div
                      className="glass-card"
                      style={{
                        padding: '1.75rem',
                        border: '1px solid var(--color-border)',
                        textAlign: isEven ? 'right' : 'left',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isEven ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: 'var(--color-primary)',
                          marginBottom: '0.25rem',
                        }}
                      >
                        Paso {step.number}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', fontWeight: 700 }}>
                        {step.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', margin: 0, lineHeight: 1.5 }}>
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* Center Timeline Bubble */}
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      border: '4px solid var(--color-primary)',
                      boxShadow: 'var(--shadow-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 3,
                      position: 'absolute',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                    className="timeline-bubble"
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: idx % 2 === 0 ? 'var(--color-primary-light)' : 'var(--color-teal-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {step.icon}
                    </div>
                  </motion.div>

                  {/* Spacer Column (Desktop) */}
                  <div
                    style={{
                      width: '43%',
                    }}
                    className="timeline-spacer"
                  ></div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-item {
            flex-direction: row-reverse !important;
            justify-content: flex-start !important;
            gap: 1.5rem;
          }
          .timeline-content-box {
            width: calc(100% - 70px) !important;
          }
          .timeline-content-box > div {
            text-align: left !important;
            align-items: flex-start !important;
          }
          .timeline-bubble {
            position: relative !important;
            left: 0 !important;
            transform: none !important;
            flex-shrink: 0;
          }
          .timeline-spacer {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
