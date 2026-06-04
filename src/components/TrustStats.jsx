"use client";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Award, Calendar, Heart, ShieldAlert } from 'lucide-react';

function CountUp({ to, duration = 1.5, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(to);
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const intervalTime = 30; // 30ms updates
    const totalSteps = totalMiliseconds / intervalTime;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [to, duration, isInView]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function TrustStats() {
  const stats = [
    {
      value: '120',
      suffix: '+',
      label: 'Enfermeros Certificados',
      description: 'Personal médico altamente calificado e investigado.',
      icon: <CheckCircle2 size={24} style={{ color: 'var(--color-primary)' }} />,
    },
    {
      value: '10',
      suffix: '+',
      label: 'Años de Experiencia',
      description: 'Ofreciendo cuidados de salud y soporte familiar.',
      icon: <Award size={24} style={{ color: 'var(--color-teal)' }} />,
    },
    {
      value: '99.4',
      suffix: '%',
      label: 'Satisfacción del Paciente',
      decimals: 1,
      description: 'Familias satisfechas que confían en nuestro trato.',
      icon: <Heart size={24} style={{ color: 'var(--color-primary)' }} fill="var(--color-primary)" />,
    },
    {
      value: '24',
      suffix: '/7',
      label: 'Disponibilidad de Atención',
      description: 'Respuesta inmediata ante emergencias médicas.',
      icon: <ShieldAlert size={24} style={{ color: 'var(--color-green)' }} />,
    },
  ];

  return (
    <section
      id="credibilidad"
      style={{
        padding: '4rem 0',
        backgroundColor: 'var(--color-bg-white)',
        borderBottom: '1px solid var(--color-border)',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="container">
        {/* Statistics Grid */}
        <div className="grid-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-light)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                {stat.icon}
              </div>

              <div
                style={{
                  fontFamily: 'var(--font-title)',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--color-text-dark)',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                <CountUp to={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
              </div>

              <div
                style={{
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  color: 'var(--color-text-dark)',
                  marginBottom: '0.5rem',
                }}
              >
                {stat.label}
              </div>

              <p style={{ fontSize: '0.8125rem', margin: 0, lineHeight: 1.4 }}>
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certifications Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: '3.5rem',
            padding: '1.5rem 2rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--secondary)',
            border: '1px dashed var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
            Nuestros Respaldos y Certificaciones:
          </span>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 800 }}>✓</span> SEP Registro
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 800 }}>✓</span> Cédulas Profesionales
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 800 }}>✓</span> Aprobación COFEPRIS
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
