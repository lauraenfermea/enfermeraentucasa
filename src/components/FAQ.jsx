import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "When should I request a home nurse in Zaragoza?",
      answer: "After surgery, for a wound that needs monitoring, to administer medication, perform tests, or check vital signs. Also if you want to avoid waiting or traveling."
    },
    {
      question: "Are the nurses qualified?",
      answer: "Yes. We are registered and certified nurses, with experience in different healthcare areas and a professional and human approach."
    },
    {
      question: "Can I request the service after hospital discharge?",
      answer: "Yes, it's one of the most common reasons. It ensures continuity of care and reduces the risk of complications."
    },
    {
      question: "How can I book an appointment?",
      answer: "It's very simple. Just contact us by calling our phone number 641 63 57 05 or sending us a WhatsApp message. We'll get back to you quickly."
    },
    {
      question: "How are payments made?",
      answer: "We accept various forms of payment for your convenience and that of your family: Bizum, bank transfer or cash after the service provided at your home is completed."
    },
    {
      question: "In which areas of Zaragoza do you work?",
      answer: "We provide services in Zaragoza city center. We bring professional healthcare directly to your home to save you unnecessary travel and for your convenience."
    },
    {
      question: "What are your opening hours?",
      answer: "We are available Monday through Sunday with complete flexibility in scheduling. Our goal is to adapt to your pace and that of your family, arranging visits at the most convenient time to ensure care without waiting."
    }
  ];

  return (
    <section id="faq" className="section" style={{ background: '#f8fbf8' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Frequently Asked <span style={{ color: 'var(--primary)' }}>Questions</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                  overflow: 'hidden',
                  border: '1px solid rgba(112, 150, 152, 0.1)'
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.5rem 2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 600, 
                    color: isOpen ? 'var(--primary)' : '#2a4347',
                    transition: 'color 0.3s ease'
                  }}>
                    {faq.question}
                  </span>
                  
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--primary)' : '#f2f7f2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.3s ease'
                  }}>
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke={isOpen ? 'white' : 'var(--primary)'} 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div style={{ 
                        padding: '0 2rem 1.5rem', 
                        color: '#4a5f62',
                        fontSize: '1rem',
                        lineHeight: 1.7
                      }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
