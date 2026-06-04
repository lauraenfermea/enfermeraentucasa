import { motion } from 'framer-motion';

export default function Hero({ onContactClick }) {
  return (
    <section style={{
      position: 'relative',
      padding: '7rem 0 8rem', // Increased bottom padding to shift content up
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/assets/hero_video.mp4" type="video/mp4" />
      </video>

      {/* Video is now fully clear without gradient overlay */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ maxWidth: '900px', position: 'relative', left: '-1rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Pill Badge */}
            <div style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              Home nurse in Zaragoza
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1.1,
              fontWeight: 700,
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              color: 'white'
            }}>
              Professional healthcare <br /> in your home.
            </h1>
            
            <ul style={{
              fontSize: '1.125rem',
              lineHeight: 1.6,
              opacity: 0.9,
              marginBottom: '2rem',
              maxWidth: '550px',
              color: 'white',
              listStyleType: 'none',
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                <span>No waiting or traveling.</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>•</span>
                <span>No waiting rooms and no stress; just professional, personalized, and quality care in your home.</span>
              </li>
            </ul>

            <p style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              marginBottom: '1rem',
              color: 'white'
            }}>
              Do you need help?
            </p>

            <motion.button 
              className="btn btn-primary" 
              onClick={onContactClick}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ padding: '1rem 2rem', fontSize: '1.05rem', border: 'none', background: '#25D366', color: 'white', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.031 0C5.405 0 0 5.394 0 12.02c0 2.115.548 4.183 1.59 6.002L.15 23.364l5.485-1.436c1.761.954 3.743 1.458 5.766 1.458 6.627 0 12.03-5.395 12.03-12.02C23.43 5.395 18.026 0 12.031 0zm0 21.365c-1.786 0-3.535-.478-5.074-1.385l-.364-.216-3.771.988.998-3.676-.236-.376c-1-1.593-1.528-3.437-1.528-5.334 0-5.513 4.492-10.003 10.007-10.003 5.514 0 10.004 4.49 10.004 10.003 0 5.513-4.49 10.003-10.004 10.003z"/>
                <path d="M17.485 14.896c-.302-.152-1.784-.881-2.062-.981-.277-.1-.479-.151-.68.151-.202.302-.781.981-.958 1.182-.176.202-.353.227-.655.076-.302-.152-1.272-.469-2.423-1.494-.895-.798-1.5-1.783-1.676-2.085-.177-.302-.019-.465.132-.616.136-.136.302-.352.453-.529.151-.176.202-.302.302-.503.1-.202.05-.378-.025-.529-.076-.151-.68-1.637-.932-2.242-.246-.591-.497-.512-.68-.52-.176-.008-.378-.008-.58-.008-.202 0-.529.076-.806.378-.277.302-1.058 1.032-1.058 2.518s1.083 2.919 1.234 3.12c.151.202 2.128 3.245 5.153 4.549.719.309 1.28.494 1.718.633.721.229 1.378.196 1.895.118.577-.087 1.784-.73 2.036-1.436.252-.705.252-1.309.176-1.436-.075-.126-.277-.202-.579-.353z"/>
              </svg>
              Click below on WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Floating Features Bottom-Left Cut-out */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        background: 'var(--bg-color)',
        padding: '1.25rem 2rem 1rem 2rem',
        borderTopRightRadius: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        zIndex: 2,
        overflow: 'hidden', // to prevent wide content pushing it, though flexWrap could work
        maxWidth: 'min(90%, 750px)' // Restrict width so it looks like a nice cutout pill
      }}>
        {/* Inverse curve above */}
        <svg width="24" height="24" viewBox="0 0 24 24" style={{ position: 'absolute', bottom: '100%', left: 0, fill: 'var(--bg-color)' }}>
          <path d="M0 24V0c13.255 0 24 10.745 24 24H0z" />
        </svg>

        {/* Inverse curve right */}
        <svg width="24" height="24" viewBox="0 0 24 24" style={{ position: 'absolute', left: '100%', bottom: 0, fill: 'var(--bg-color)' }}>
          <path d="M0 24V0c13.255 0 24 10.745 24 24H0z" />
        </svg>

        <div style={{ overflow: 'hidden', width: '100%', paddingBottom: '0.5rem' }}>
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40, // Increased duration for longer array
                ease: "linear",
              },
            }}
            style={{ display: 'flex', width: 'max-content' }}
          >
            {[...Array(4)].flatMap(() => [
              { text: 'Personal care assistance', icon: 'icon-personal-care.svg' },
              { text: 'Emotional support', icon: 'icon-emotional-support.svg' },
              { text: 'Highly trained staff', icon: 'icon-qualified-nurses.svg' },
              { text: 'Enhanced patient safety', icon: 'icon-patient-safety.svg' }
            ]).map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-main)',
                  fontWeight: '600',
                  fontSize: '1rem',
                  whiteSpace: 'nowrap',
                  marginRight: '3rem' // uniform gap to ensure perfect math for 50% shift
                }}
              >
                <img src={`/assets/${feature.icon}`} alt={feature.text} style={{ width: '24px', height: '24px' }} />
                <span style={{ color: 'var(--text-main)' }}>{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
