"use client";
import { motion } from 'framer-motion';

export default function Team() {
  const teamMembers = [
    {
      name: 'Laura Pueyo',
      colegiada: 'Colegiada 16521',
      experience: '+8 años de experiencia',
      image: 'wix_img_12_laura.jpg'
    },
    {
      name: 'Karen Mira',
      colegiada: 'Colegiada 20474',
      experience: '+6 años de experiencia',
      image: 'wix_img_13_karen.jpg'
    }
  ];

  return (
    <section id="quienes-somos" style={{ backgroundColor: '#eff5f1', padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: '500',
              color: '#4a5568',
              letterSpacing: '-0.025em',
              margin: 0
            }}
          >
            ¿Quienes somos?
          </motion.h2>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '4rem',
          maxWidth: '768px',
          margin: '0 auto'
        }}>
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.7 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '100%',
                maxWidth: '320px',
                flex: '1 1 300px'
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                marginBottom: '1.5rem',
                borderRadius: '32px',
                overflow: 'hidden'
              }}>
                <img 
                  src={`/assets/${member.image}`} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#4a5568', margin: '0 0 4px 0', lineHeight: '1.2' }}>
                {member.name}
              </h3>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#4a5568', margin: '0 0 4px 0', lineHeight: '1.2' }}>
                {member.colegiada}
              </p>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: 0, lineHeight: '1.2' }}>
                <span style={{ display: 'block' }}>{member.experience.split(' de ')[0]} de</span>
                <span style={{ display: 'block' }}>{member.experience.split(' de ')[1]}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
