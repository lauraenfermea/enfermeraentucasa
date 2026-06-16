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
        
        {/* Main Title - Left Aligned */}
        <div style={{ marginBottom: '4rem', textAlign: 'left' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: '400',
              color: '#4a5568',
              letterSpacing: '-0.025em',
              margin: 0
            }}
          >
            ¿Quienes somos?
          </motion.h2>
        </div>

        {/* Team Images Container */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '3rem',
          maxWidth: '800px',
          margin: '0 auto 5rem auto'
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
                maxWidth: '280px',
                flex: '1 1 250px'
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                marginBottom: '1rem',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                <img 
                  src={`/assets/${member.image}`} 
                  alt={member.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#4a5568', margin: '0 0 4px 0', lineHeight: '1.2' }}>
                {member.name}
              </h3>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#4a5568', margin: '0 0 4px 0', lineHeight: '1.2' }}>
                {member.colegiada}
              </p>
              <div style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280', margin: 0, lineHeight: '1.2' }}>
                <span style={{ display: 'block' }}>{member.experience.split(' de ')[0]} de</span>
                <span style={{ display: 'block' }}>{member.experience.split(' de ')[1]}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sobre nosotras subtitle and text */}
        <div style={{ textAlign: 'left' }}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '400',
              color: '#4a5568',
              letterSpacing: '-0.025em',
              margin: '0 0 1.5rem 0'
            }}
          >
            Sobre nosotras:
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              color: '#4a5568',
              fontSize: 'clamp(1.125rem, 1.8vw, 1.4rem)',
              lineHeight: '1.8',
              maxWidth: '900px'
            }}
          >
            <p style={{ margin: '0 0 1.2rem 0' }}><strong>Enfermeras desde 2015</strong> con experiencia en España y otros lugares (Reino Unido, Colombia y EU).</p>
            <p style={{ margin: '0 0 1.2rem 0' }}>Ahora en Zaragoza queremos ayudar a esas personas con dificultad de desplazamiento o saturación del sistema, por ello nace <strong>"Enfermera en tu casa"</strong>.</p>
            <p style={{ margin: '0 0 1.2rem 0' }}>Ofrecemos una atención cercana, profesional y de calidad con una dedicación de primera mano.</p>
            <p style={{ margin: '0' }}>Sabemos que cuidar no solo es aplicar técnicas, <em>es estar presentes cuando más se necesita</em>.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
