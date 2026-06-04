"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimatedButton({ children, className, style, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  // Split text into individual letters for the staggered roll effect
  const text = typeof children === 'string' ? children : '';
  const letters = text.split('');

  return (
    <motion.button
      className={`btn ${className || ''}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: style?.padding || '0.875rem 1.75rem',
        ...style
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Primary Text (Slides up on hover) */}
      <span style={{ display: 'inline-flex', position: 'relative', zIndex: 1 }}>
        {letters.map((letter, i) => (
          <motion.span
            key={`primary-${i}`}
            initial={{ y: 0 }}
            animate={{ y: isHovered ? '-150%' : 0, opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3, delay: i * 0.015, ease: [0.33, 1, 0.68, 1] }}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {letter}
          </motion.span>
        ))}
      </span>

      {/* Secondary Text (Rolls in from bottom on hover) */}
      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
        {letters.map((letter, i) => (
          <motion.span
            key={`secondary-${i}`}
            initial={{ y: '150%', opacity: 0 }}
            animate={{ y: isHovered ? 0 : '150%', opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: i * 0.015, ease: [0.33, 1, 0.68, 1] }}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    </motion.button>
  );
}
