"use client";
import { motion } from 'framer-motion';

import { urlFor } from '../sanity/image';

export default function Team({ title, subtitle, teamMembers, bio, backgroundColor, headingColor }) {
  const titleText = title || '¿Quienes somos?';
  const subtitleText = subtitle || 'Sobre nosotras:';
  const members = teamMembers || [
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
  const paragraphs = bio || [
    '<strong>Enfermeras desde 2015</strong> con experiencia en España y otros lugares (Reino Unido, Colombia y EU).',
    'Ahora en Zaragoza queremos ayudar a esas personas con dificultad de desplazamiento o saturación del sistema, por ello nace <strong>"Enfermera en tu casa"</strong>.',
    'Ofrecemos una atención cercana, profesional y de calidad con una dedicación de primera mano.',
    'Sabemos que cuidar no solo es aplicar técnicas, <em>es estar presentes cuando más se necesita</em>.'
  ];

  let bgStyle = '#eff5f1'; // default is light-green
  if (backgroundColor === 'white') bgStyle = 'white';
  else if (backgroundColor === 'light-green') bgStyle = '#eff5f1';
  else if (backgroundColor === 'light-gray') bgStyle = '#F8FBF8';
  else if (backgroundColor === 'brand-primary') bgStyle = '#8B9A91';

  let titleColor = '#4a5568'; // default dark text color for team section
  if (headingColor === 'brand-primary') titleColor = '#8B9A91';
  else if (headingColor === 'white') titleColor = 'white';
  else if (backgroundColor === 'brand-primary') titleColor = 'white';

  function getDefaultTeamImage(name) {
    const lowercaseName = (name || '').toLowerCase();
    if (lowercaseName.includes('laura')) {
      return 'wix_img_12_laura.jpg';
    }
    if (lowercaseName.includes('karen')) {
      return 'wix_img_13_karen.jpg';
    }
    return 'wix_img_12_laura.jpg';
  }

  return (
    <section id="quienes-somos" style={{ backgroundColor: bgStyle, padding: '3rem 0' }}>
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
              color: titleColor,
              letterSpacing: '-0.025em',
              margin: 0
            }}
          >
            {titleText}
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
            {members.map((member, idx) => {
              const imgUrl = member.image && member.image.asset
                ? (typeof member.image === 'object' ? urlFor(member.image).url() : `/assets/${member.image}`)
                : `/assets/${getDefaultTeamImage(member.name)}`;

              return (
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
                      src={imgUrl} 
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
            )})}
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
                color: titleColor,
                letterSpacing: '-0.025em',
                margin: '0 0 1.5rem 0'
              }}
            >
              {subtitleText}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              style={{
                backgroundColor: 'white',
                padding: '2.5rem 2rem',
                borderRadius: '24px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                borderLeft: '6px solid #829B8C',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                maxWidth: '100%'
              }}
            >
              {paragraphs.map((p, i) => (
                <p key={i} style={{ margin: 0, color: '#4a5568', fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)', lineHeight: '1.7' }} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
