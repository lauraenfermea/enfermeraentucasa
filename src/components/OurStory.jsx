"use client";
import { motion } from 'framer-motion';

export default function OurStory() {
  return (
    <section className="section bg-white" style={{ paddingBottom: '2rem' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 className="section-title" style={{ fontSize: '2.5rem' }}>Our Journey</h2>
          <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--primary)', margin: '1rem auto', borderRadius: '2px' }}></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <p>
            It all started with a simple observation: the healthcare system, while full of dedicated professionals, often struggles to provide the highly personalized, continuous care that patients truly need, especially when they are most vulnerable. We saw families overwhelmed, patients feeling isolated in unfamiliar environments, and a clear need for a more compassionate, hands-on approach.
          </p>
          <p>
            Having worked in major hospitals across Spain, the UK, Colombia, and the US, we realized that the best healing environment is almost always a patient's own home. We envisioned a service where clinical excellence meets the warmth of personal care. A service where nurses aren't just passing medical staff, but trusted companions in the journey to recovery and well-being.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>"Nurse at Home"</strong> was born in Zaragoza out of this vision. We started as a small team of passionate nurses who wanted to make a tangible difference. We focused on building genuine relationships, deeply understanding the unique needs of every patient, and providing care that goes far beyond basic medical treatments. 
          </p>
          <div style={{ 
            padding: '2rem', 
            backgroundColor: 'rgba(112, 150, 152, 0.05)', 
            borderLeft: '4px solid var(--primary)',
            borderRadius: '0 16px 16px 0',
            marginTop: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <p style={{ margin: 0, fontSize: '1.35rem', color: 'var(--primary)', fontStyle: 'italic', fontWeight: '500', lineHeight: '1.6' }}>
              "Our mission is to bring hospital-level expertise directly to your living room, delivered with the exact kind of compassion we would demand for our own families."
            </p>
          </div>
          <p>
            Today, we are immensely proud to be a trusted healthcare partner for families throughout Zaragoza. Whether it's meticulous post-operative care, ongoing chronic disease management, or simply providing a helping hand with daily mobility issues, our team is fiercely dedicated to empowering our patients and bringing lasting peace of mind to their loved ones.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
