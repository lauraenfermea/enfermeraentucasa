import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const testimonials = [
    {
      name: 'Ava Thompson',
      role: 'Daughter of Patient',
      avatar: 'avatar-ava.jpg',
      text: 'The care my mother received was beyond exceptional. The nurses were compassionate, professional, and felt like part of our family.',
      stars: 'star-rating-1.svg'
    },
    {
      name: 'Billy Vasquez',
      role: 'Recovering Patient',
      avatar: 'avatar-billy.jpg',
      text: 'After my surgery, I was worried about my recovery at home. The team at Nursing Care made it seamless and comfortable.',
      stars: 'star-rating-2.svg'
    },
    {
      name: 'Frances Guerrero',
      role: 'Senior Care Patient',
      avatar: 'avatar-frances.jpg',
      text: 'Having a highly trained nurse visit me weekly has given me back my independence and peace of mind.',
      stars: 'star-rating-3.svg'
    }
  ];

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section id="testimonials" className="section bg-light">
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            background: 'rgba(112, 150, 152, 0.15)',
            color: 'var(--primary)',
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            Testimonials
          </div>
          <h2 className="section-title">What our patients say</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          
          {/* Video Section */}
          <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', height: '500px', cursor: 'pointer' }} onClick={handlePlay}>
            <video 
              ref={videoRef}
              src="/assets/testimonial-video.mp4" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loop
              playsInline
            />
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2
              }}>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: 'white',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                  }}
                >
                  <img src="/assets/icon-play.svg" alt="Play" style={{ width: '24px', marginLeft: '5px' }} />
                </motion.div>
              </div>
            )}
          </div>

          {/* Testimonial Slider */}
          <div style={{ position: 'relative' }}>
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
              }}
            >
              <img src={`/assets/${testimonials[activeSlide].stars}`} alt="Rating" style={{ height: '24px', marginBottom: '2rem' }} />
              
              <p style={{
                fontSize: '1.5rem',
                lineHeight: 1.6,
                fontFamily: "'Playfair Display', serif",
                color: 'var(--text-main)',
                marginBottom: '2rem',
                fontStyle: 'italic'
              }}>
                "{testimonials[activeSlide].text}"
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={`/assets/${testimonials[activeSlide].avatar}`} 
                  alt={testimonials[activeSlide].name} 
                  style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>{testimonials[activeSlide].name}</h4>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{testimonials[activeSlide].role}</span>
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                style={{
                  width: '50px', height: '50px', borderRadius: '50%', background: 'white',
                  border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}
              >
                <img src="/assets/icon-back.svg" alt="Prev" style={{ width: '20px' }} />
              </button>
              <button 
                onClick={() => setActiveSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                style={{
                  width: '50px', height: '50px', borderRadius: '50%', background: 'white',
                  border: '1px solid rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                }}
              >
                <img src="/assets/icon-next.svg" alt="Next" style={{ width: '20px' }} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
