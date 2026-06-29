"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ({ title, faqsList, backgroundColor, headingColor }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sectionTitle = title || 'Preguntas Frecuentes';
  const faqs = faqsList || [
    {
      question: '¿Cuándo debería solicitar una enfermera a domicilio en Zaragoza?',
      answer: 'Después de una cirugía, ante una herida que necesita seguimiento, para administrar medicación, realizar analíticas o controlar constantes. También si deseas evitar esperas o desplazamientos.'
    },
    {
      question: '¿Las enfermeras están cualificadas?',
      answer: 'Sí. Somos enfermeras tituladas y colegiadas, con experiencia en diferentes áreas sanitarias y un enfoque profesional y humano.'
    },
    {
      question: '¿Puedo solicitar el servicio tras el alta hospitalaria?',
      answer: 'Sí, es uno de los motivos más habituales. Garantiza continuidad en los cuidados y reduce el riesgo de complicaciones.'
    },
    {
      question: '¿Cómo puedo reservar una cita?',
      answer: 'Es muy sencillo. Solo tienes que contactar con nosotras llamando a nuestro teléfono 641 63 57 05 o enviándonos un WhatsApp. Te responderemos rápidamente.'
    },
    {
      question: '¿Cómo se realizan los pagos?',
      answer: 'Aceptamos diversas formas de pago para tu mayor comodidad y la de tu familia: Bizum, transferencia bancaria o en efectivo tras finalizar el servicio prestado en tu propio domicilio.'
    },
    {
      question: '¿En qué zonas de Zaragoza trabajáis?',
      answer: 'Prestamos servicios en Zaragoza centro urbano. Llevamos la atención sanitaria profesional directamente a tu hogar para evitarte desplazamientos innecesarios y mayor comodidad.'
    },
    {
      question: '¿Cuál es vuestro horario de atención?',
      answer: 'Atendemos de lunes a domingo con flexibilidad horaria total. Nuestro objetivo es adaptarnos a tu ritmo y al de tu familia, pactando las visitas en el momento que mejor os convenga para garantizar unos cuidados sin esperas.'
    }
  ];

  let bgStyle = '#ffffff';
  if (backgroundColor === 'light-green') bgStyle = '#eff5f1';
  else if (backgroundColor === 'light-gray') bgStyle = '#F8FBF8';
  else if (backgroundColor === 'brand-primary') bgStyle = '#8B9A91';
  else if (backgroundColor === 'white') bgStyle = '#ffffff';

  let titleColor = '#4a5568';
  if (headingColor === 'brand-primary') titleColor = '#8B9A91';
  else if (headingColor === 'white') titleColor = 'white';
  else if (backgroundColor === 'brand-primary') titleColor = 'white';

  return (
    <section id="faq" style={{ padding: '6rem 0', backgroundColor: bgStyle }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
          fontWeight: '400',
          color: titleColor,
          letterSpacing: '-0.025em',
          marginBottom: '3rem',
          textAlign: 'left'
        }}>
          {sectionTitle}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                style={{
                  backgroundColor: '#eff5f1',
                  borderRadius: '0px', // Matches the square look from the screenshots
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#4a5568',
                    fontSize: '1.15rem',
                    fontWeight: '400',
                    fontFamily: 'inherit'
                  }}
                >
                  {faq.question}
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                    transition: 'transform 0.3s ease' 
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div style={{ padding: '0 1.5rem 1.5rem', color: '#4a5568', lineHeight: '1.7', fontSize: '1.05rem' }}>
                        {faq.answer}
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
