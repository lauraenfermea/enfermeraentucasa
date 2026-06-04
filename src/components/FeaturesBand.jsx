"use client";
import { motion } from 'framer-motion';

const features = [
  {
    icon: <img src="/assets/icon_fast_service.png" alt="Servicio rápido y flexible" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />,
    text: "Servicio rápido y flexible"
  },
  {
    icon: <img src="/assets/icon_registered_nurses.png" alt="Enfermeras colegiadas" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />,
    text: "Enfermeras colegiadas"
  },
  {
    icon: <img src="/assets/icon_home_care.png" alt="Atención a domicilio" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />,
    text: "Atención a domicilio"
  },
  {
    icon: <img src="/assets/icon_personalized_service.png" alt="Servicio personalizado" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />,
    text: "Servicio personalizado"
  }
];

export default function FeaturesBand() {
  return (
    <section style={{ backgroundColor: '#8b9a91', padding: '3.5rem 0', color: 'white' }}>
      <div className="container">
        <div 
          className="features-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2.5rem',
            textAlign: 'center'
          }}
        >
          {features.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64px' }}>
                {item.icon}
              </div>
              <span style={{ fontSize: '1.05rem', fontWeight: '500', letterSpacing: '0.02em', opacity: 0.95 }}>
                {item.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
