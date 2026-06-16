"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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

  const navLinks = [
    { name: 'Servicios', path: '/#services' },
    { name: 'Tarifas', path: '/#rates' },
    { name: 'Quienes somos', path: '/#quienes-somos' },
    { name: 'Contactar ahora', path: '/contact' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <header 
      className="app-header"
      style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: scrolled ? '1rem 0' : '1.5rem 0',
      background: 'var(--primary)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div className="container header-grid">
        {/* Desktop Nav (Left) */}
        <nav style={{ display: 'flex', gap: '2.5rem' }} className="desktop-nav hide-mobile">
          {navLinks.map((item, idx) => (
            <motion.div
              key={item.name} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
            >
              <Link
                href={item.path}
                style={{
                  position: 'relative',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  padding: '0.5rem 0',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                className="nav-link"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logo (Center) */}
        <motion.div 
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
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img 
              src="/assets/logo_edited.avif" 
              alt="Nursing Care Logo" 
              style={{ 
                height: scrolled ? '54px' : '64px', 
                width: scrolled ? '54px' : '64px', 
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                border: '2px solid white',
                transition: 'all 0.3s ease'
              }} 
            />
            <span className="mobile-header-title">Enfermera en tu casa</span>
          </Link>
        </motion.div>

        {/* CTA Button (Right) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="desktop-nav hide-mobile">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <AnimatedButton 
              className="btn-header-cta" 
              onClick={onContactClick}
              style={{ 
                padding: '0.85rem 2rem', 
                fontSize: '1.05rem', 
                border: 'none',
                background: 'white',
                color: 'var(--primary)',
                fontWeight: '600',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              Realizar una consulta
            </AnimatedButton>
          </motion.div>
        </div>

        {/* Mobile menu toggle */}
        <button 
          className="hide-desktop"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            padding: '0.5rem'
          }}
        >
          {mobileMenuOpen ? (
            <svg viewBox="0 0 24 24" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              overflow: 'hidden',
              backgroundColor: 'var(--primary)',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
            className="mobile-nav-toggle"
          >
            <nav style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem', alignItems: 'center' }}>
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1.25rem',
                    padding: '0.5rem'
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255,255,255,0.15)', margin: '0.5rem 0' }}></div>
              <AnimatedButton 
                className="btn-header-cta" 
                onClick={() => {
                  setMobileMenuOpen(false);
                  if(onContactClick) onContactClick();
                }}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  textAlign: 'center',
                  background: 'white',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  border: 'none'
                }}
              >
                Realizar una consulta
              </AnimatedButton>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: white;
          transform-origin: bottom right;
          transition: transform 0.3s ease-out;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
        .nav-link:hover {
          color: white !important;
          opacity: 0.85;
        }
      `}</style>
    </header>
  );
}
