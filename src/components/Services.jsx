import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: 'Wound care and assessment',
      desc: 'Treatment of wounds and pressure ulcers (PUs), monitoring of healing, health education and prevention. Removal of sutures or staples.',
      image: 'svc-wound.png'
    },
    {
      title: 'Injectables and Medication',
      desc: 'Safe administration of intravenous, intramuscular or subcutaneous medication strictly following the medical guidelines.',
      image: 'svc-inject.png'
    },
    {
      title: 'Constants Control',
      desc: 'Comprehensive monitoring of blood pressure, heart rate, oxygen saturation, and glucose levels. Monitoring of hypertension in pregnant women.',
      image: 'svc-constants.png'
    },
    {
      title: 'Newborn care',
      desc: 'Cord hygiene, wound care. First baths for the newborn. Wound monitoring (episiotomies, cesarean sections...)',
      image: 'svc-newborn.png'
    },
    {
      title: 'Catheters, drains and ostomies',
      desc: 'Maintenance, cleaning, and changing of urinary or nasogastric catheters, ensuring total patient comfort. Ostomy assessment.',
      image: 'svc-catheters.png'
    },
    {
      title: 'First aid training',
      desc: 'Would you or your company know how to respond to a cardiac arrest? We offer first aid training in Zaragoza.',
      image: 'svc-firstaid.png'
    }
  ];

  return (
    <section id="services" className="section" style={{ background: 'white' }}>
      <div className="container">
        
        <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Services
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{
                background: '#f2f7f2',
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
              }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
            >
              {/* Service Image */}
              <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                <motion.img 
                  src={`/assets/${svc.image}`} 
                  alt={svc.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              
              {/* Service Content */}
              <div style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  {svc.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.95rem', margin: 0 }}>
                  {svc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1.1rem 2.5rem',
              backgroundColor: '#8B9A91',
              color: 'white',
              border: 'none',
              borderRadius: '999px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Check out our rates <span style={{ fontSize: '1.2rem', fontWeight: '400' }}>+</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 154, 145, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1.1rem 3rem',
              backgroundColor: 'transparent',
              color: '#4A5B52',
              border: '1px solid rgba(139, 154, 145, 0.4)',
              borderRadius: '999px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Contact us
          </motion.button>
        </div>
        
      </div>
    </section>
  );
}
