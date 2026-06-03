import { motion } from 'framer-motion';

export default function Services() {
  const services = [
    {
      title: 'Supportive care',
      desc: 'Comprehensive assistance focused on comfort, dignity, and enhancing overall quality of life.',
      icon: 'icon-personal-care.svg',
      bg: 'rgba(47, 83, 90, 0.08)',
      iconBg: '#2F535A'
    },
    {
      title: 'Recovery services',
      desc: 'Tailored recovery care to help regain strength, confidence, and overall well-being.',
      icon: 'icon-patient-safety.svg',
      bg: 'rgba(112, 150, 152, 0.15)',
      iconBg: '#709698'
    },
    {
      title: 'Emotional support',
      desc: 'Gentle care that nurtures emotional balance, comfort, and overall well-being.',
      icon: 'icon-emotional-support.svg',
      bg: 'rgba(176, 206, 206, 0.25)',
      iconBg: '#B0CECE'
    },
    {
      title: 'Nursing support',
      desc: 'Professional in-home care promoting healing, comfort, and lasting peace of mind.',
      icon: 'icon-qualified-nurses.svg',
      bg: 'rgba(80, 110, 115, 0.12)',
      iconBg: '#506E73'
    }
  ];

  return (
    <section id="services" className="section" style={{ background: 'white' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            background: 'rgba(41, 121, 255, 0.1)',
            color: 'var(--primary)',
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            What We Offer
          </div>
          <h2 className="section-title" style={{ maxWidth: '700px', margin: '0 auto', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Discover our <span style={{ color: 'var(--primary)' }}>services</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem'
        }}>
          {services.map((svc, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{
                position: 'relative',
                background: svc.bg,
                padding: '2.5rem 2rem',
                borderRadius: '24px',
                borderBottomLeftRadius: '0', // Sharp corner for the cutout
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              whileHover={{ y: -5 }}
            >
              {/* Cut-out corner fake */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderTopRightRadius: '24px'
              }} />

              <div style={{
                background: svc.iconBg,
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
              }}>
                <img src={`/assets/${svc.icon}`} alt={svc.title} style={{ width: '28px', filter: svc.iconBg === '#BAE6FD' ? 'none' : 'brightness(0) invert(1)' }} />
              </div>
              
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: 700 }}>
                {svc.title}
              </h3>
              
              <p style={{ color: 'var(--text-light)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
