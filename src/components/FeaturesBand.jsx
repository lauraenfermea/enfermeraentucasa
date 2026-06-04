import { motion } from 'framer-motion';

const features = [
  {
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 8a9 9 0 0 0-14 4" />
        <path d="M5 12h4m-4 0V8" />
        <path d="M5 16a9 9 0 0 0 14-4" />
        <path d="M19 12h-4m4 0v4" />
        <text x="12" y="14.5" fontSize="6.5" fontWeight="bold" strokeWidth="0" fill="currentColor" textAnchor="middle" style={{ fontFamily: 'sans-serif', letterSpacing: '0' }}>24/7</text>
      </svg>
    ),
    text: "Fast and flexible service"
  },
  {
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22v-1a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v1" />
        <path d="M8 11a4 4 0 1 0 8 0" />
        <path d="M8 11v1a2 2 0 0 1-2 2 2 2 0 0 1-2-2V9a6 6 0 0 1 12 0v3a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-1" />
        <path d="M8 7l-1-3h10l-1 3" />
        <path d="M7 7h10" />
        <path d="M12 3v2M11 4h2" />
        <path d="M9 16l3 2 3-2" />
        <path d="M12 18v4" />
      </svg>
    ),
    text: "Registered Nurses"
  },
  {
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10l9-7 9 7v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10z" />
        <path d="M12 17.5l-2.5-2.5a2 2 0 0 1 2.83-2.83l.17.17.17-.17a2 2 0 0 1 2.83 2.83L12 17.5z" />
      </svg>
    ),
    text: "Home care"
  },
  {
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Heart */}
        <path d="M12 14.5l-4-4a3.5 3.5 0 0 1 4.95-4.95L12 6.06l.05-.06a3.5 3.5 0 0 1 4.95 4.95L12 14.5z" />
        {/* Hands cradling */}
        <path d="M4 15h2c1.5 0 2.5 1 4 2h2" />
        <path d="M20 15h-2c-1.5 0-2.5 1-4 2h-2" />
        <path d="M10 17v2M14 17v2" />
        {/* Inner family */}
        <circle cx="10.5" cy="8.5" r="1.2" />
        <circle cx="13.5" cy="9.5" r="1" />
        <path d="M9 12c0-1.5.8-2 1.5-2h0c.7 0 1.5.5 1.5 2" />
        <path d="M12.2 13c0-1 .5-1.5 1.3-1.5h0c.8 0 1.3.5 1.3 1.5" />
      </svg>
    ),
    text: "Personalized service"
  }
];

export default function FeaturesBand() {
  return (
    <section style={{ backgroundColor: '#8b9a91', padding: '3.5rem 0', color: 'white' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          textAlign: 'center'
        }}>
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
