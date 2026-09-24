"use client";
import { motion } from 'framer-motion';

const defaultFeatures = [
  {
    icon: "/assets/icon_fast_service.png",
    text: "Servicio rápido y flexible"
  },
  {
    icon: "/assets/icon_registered_nurses.png",
    text: "Enfermeras colegiadas"
  },
  {
    icon: "/assets/icon_home_care.png",
    text: "Atención a domicilio"
  },
  {
    icon: "/assets/icon_personalized_service.png",
    text: "Servicio personalizado"
  }
];

export default function FeaturesBand({ items }) {
  const featureList = items || defaultFeatures;

  return (
    <section style={{ backgroundColor: '#8b9a91', padding: '3.5rem 0', color: 'white' }}>
      <div className="container">
        <div 
          className="features-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2.5rem',
            textAlign: 'center'
          }}
        >
          {featureList.map((item, index) => {
            const iconSrc = item.icon ? (item.icon.startsWith('/') || item.icon.startsWith('http') ? item.icon : `/assets/${item.icon}`) : '/assets/icon_fast_service.png';
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
              >
                <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '64px' }}>
                  <img src={iconSrc} alt={item.text} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: '1.05rem', fontWeight: '500', letterSpacing: '0.02em', opacity: 0.95 }}>
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
