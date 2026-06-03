import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedButton from './AnimatedButton';

export default function Header({ onContactClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: scrolled ? '1rem 0' : '1.5rem 0',
      background: scrolled ? 'rgba(244, 249, 249, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '1rem'
      }}>
        {/* Desktop Nav (Left) */}
        <nav style={{ display: 'flex', gap: '2.5rem' }} className="desktop-nav">
          {['Home', 'About', 'Contact', 'Services'].map((item, idx) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              style={{
                position: 'relative',
                color: item === 'Home' ? 'var(--primary)' : 'var(--text-main)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '0.5rem 0',
                transition: 'color 0.3s ease'
              }}
              className="nav-link"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Logo (Center) */}
        <motion.a 
          href="#" 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img 
            src="/assets/logo_edited.avif" 
            alt="Nursing Care Logo" 
            style={{ 
              height: scrolled ? '54px' : '64px', 
              width: scrolled ? '54px' : '64px', 
              objectFit: 'cover',
              borderRadius: '50%',
              boxShadow: '0 4px 15px rgba(112, 150, 152, 0.2)',
              border: '2px solid white',
              transition: 'all 0.3s ease'
            }} 
          />
        </motion.a>

        {/* CTA Button (Right) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="desktop-nav">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <AnimatedButton 
              className="btn-primary" 
              onClick={onContactClick}
              style={{ 
                padding: '0.85rem 2rem', 
                fontSize: '1.05rem', 
                border: 'none',
                boxShadow: '0 8px 20px rgba(112, 150, 152, 0.3)',
              }}
            >
              Make an enquiry
            </AnimatedButton>
          </motion.div>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none', border: 'none', color: 'var(--secondary)', fontSize: '1.5rem', cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </div>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: var(--primary);
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .nav-link:hover {
          color: var(--primary) !important;
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
