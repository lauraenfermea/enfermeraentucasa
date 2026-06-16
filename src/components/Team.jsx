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
    <section id="quienes-somos" style={{ backgroundColor: '#eff5f1', padding: '3rem 0' }}>
      <div className="container" style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Main Title - Left Aligned */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
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

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Left Side: Team Images */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '2rem',
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
                  maxWidth: '260px',
                  flex: '1 1 200px'
                }}
              >
                <div style={{
                position: 'relative',
                width: '100%',
                marginBottom: '1rem',
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '3/4',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                  zIndex: 1
                }}>
                  <img 
                    src={`/assets/${member.image}`} 
                    alt={member.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                
                {/* Floating Experience Circle */}
                <div style={{
                  position: 'absolute',
                  bottom: '-15px',
                  left: '-15px',
                  width: '85px',
                  height: '85px',
                  backgroundColor: '#829B8C',
                  borderRadius: '50%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 4px 12px rgba(130, 155, 140, 0.4)',
                  zIndex: 2,
                  border: '3px solid white'
                }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: '800', lineHeight: '1' }}>
                    {member.experience.split(' ')[0]}
                  </span>
                  <span style={{ fontSize: '0.65rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>
                    años exp.
                  </span>
                </div>
              </div>
              
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#4a5568', margin: '0 0 4px 0', lineHeight: '1.2' }}>
                {member.name}
              </h3>
              <p style={{ fontSize: '14px', fontWeight: '700', color: '#4a5568', margin: '0 0 4px 0', lineHeight: '1.2' }}>
                {member.colegiada}
              </p>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Sobre nosotras subtitle and text */}
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
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                maxWidth: '100%'
              }}
            >
              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                borderLeft: '4px solid #829B8C'
              }}>
                <p style={{ margin: 0, color: '#4a5568', fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: '1.7' }}>
                  <strong>Enfermeras desde 2015</strong> con experiencia en España y otros lugares (Reino Unido, Colombia y EU).
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                borderLeft: '4px solid #829B8C'
              }}>
                <p style={{ margin: 0, color: '#4a5568', fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: '1.7' }}>
                  Ahora en Zaragoza queremos ayudar a esas personas con dificultad de desplazamiento o saturación del sistema, por ello nace <strong>"Enfermera en tu casa"</strong>.
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                borderLeft: '4px solid #829B8C'
              }}>
                <p style={{ margin: 0, color: '#4a5568', fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: '1.7' }}>
                  Ofrecemos una atención cercana, profesional y de calidad con una dedicación de primera mano.
                </p>
              </div>

              <div style={{
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                borderLeft: '4px solid #829B8C'
              }}>
                <p style={{ margin: 0, color: '#4a5568', fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: '1.7' }}>
                  Sabemos que cuidar no solo es aplicar técnicas, <em>es estar presentes cuando más se necesita</em>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
