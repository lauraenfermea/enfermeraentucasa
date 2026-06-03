import { motion } from 'framer-motion';

export default function Partners() {
  const partners = [
    'partner-1.svg', 'partner-2.svg', 'partner-3.svg', 'partner-4.svg',
    'partner-5.svg', 'partner-6.svg', 'partner-7.svg'
  ];

  return (
    <section style={{
      padding: '4rem 0',
      background: 'white',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p style={{
          fontSize: '0.875rem',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          color: 'var(--text-light)',
          margin: 0
        }}>
          Trusted by leading healthcare providers
        </p>
      </div>

      <div style={{ display: 'flex', overflow: 'hidden', position: 'relative', width: '100%' }}>
        {/* We duplicate the array to create a seamless infinite scroll effect */}
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          style={{ display: 'flex', gap: '4rem', paddingLeft: '4rem', width: 'max-content' }}
        >
          {[...partners, ...partners].map((partner, idx) => (
            <img 
              key={idx}
              src={`/assets/${partner}`} 
              alt="Partner logo" 
              style={{
                height: '40px',
                width: 'auto',
                opacity: 0.5,
                filter: 'grayscale(100%)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.filter = 'grayscale(0%)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0.5';
                e.currentTarget.style.filter = 'grayscale(100%)';
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
