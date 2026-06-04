"use client";
import { motion } from 'framer-motion';

export default function Team() {
  const teamMembers = [
    {
      name: 'Laura Pueyo',
      role: <>Colegiada 16521 <br /> +8 años de experiencia</>,
      image: 'about-nurse-right.webp'
    },
    {
      name: 'Karen Mira',
      role: <>Colegiada 20474 <br /> +6 años de experiencia</>,
      image: 'sddcv.jp.webp'
    }
  ];

  return (
    <section id="team" className="section" style={{ background: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            background: 'var(--secondary)',
            color: 'var(--primary)',
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            Nuestro equipo
          </div>
          <h2 className="section-title" style={{ maxWidth: '700px', margin: '0 auto', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Conoce a nuestro <span style={{ color: 'var(--primary)' }}>equipo</span>
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.125rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            Conoce a las personas dedicadas que aportan comodidad, amabilidad y experiencia a cada paciente que atendemos.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                height: '550px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                cursor: 'pointer'
              }}
              whileHover={{ y: -5 }}
            >
              <img 
                src={`/assets/${member.image}`} 
                alt={member.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              
              {/* Floating Info Box */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                background: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-main)', fontWeight: 700 }}>
                  {member.name}
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0 }}>
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
