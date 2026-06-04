"use client";
import { MapPin, Mail, Phone, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#f9fafa', color: '#4a5f62', paddingTop: '5rem', paddingBottom: '0', borderTop: '1px solid #eaeaea' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          {/* Brand & Description */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <img src="/assets/logo_edited.avif" alt="Nurse at Home Logo" style={{ width: '50px', height: '50px', borderRadius: '50%', border: '2px solid white', boxShadow: '0 4px 15px rgba(112,150,152,0.2)' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#2c3e40' }}>Enfermera en tu Casa</h3>
            </div>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Proporcionando atención de enfermería compasiva y profesional en la comodidad de su hogar en Zaragoza. Su salud y bienestar son nuestra principal prioridad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2c3e40' }}>Enlaces Rápidos</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { name: 'Inicio', link: '/' },
                { name: 'Sobre Nosotros', link: '/about' },
                { name: 'Nuestros Servicios', link: '/#services' },
                { name: 'Conoce al Equipo', link: '/about' },
                { name: 'Preguntas Frecuentes', link: '/#faq' },
                { name: 'Contacto', link: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.link} style={{ color: '#4a5f62', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s', fontSize: '1.05rem' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.color = '#4a5f62'}>
                    <ChevronRight size={16} style={{ color: 'var(--primary)' }} />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2c3e40' }}>Información de Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <a href="https://www.google.com/maps/search/?api=1&query=Zaragoza,+Spain" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textDecoration: 'none', cursor: 'pointer' }}>
                <MapPin size={24} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#2c3e40' }}>Ubicación</div>
                  <div style={{ fontSize: '0.95rem', color: '#4a5f62' }}>Zaragoza y alrededores</div>
                </div>
              </a>
              <a href="mailto:info@enfermeraentucasa.es" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textDecoration: 'none', cursor: 'pointer' }}>
                <Mail size={24} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#2c3e40' }}>Envíanos un Email</div>
                  <div style={{ fontSize: '0.95rem', color: '#4a5f62' }}>info@enfermeraentucasa.es</div>
                </div>
              </a>
              <a href="tel:+34641635705" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', textDecoration: 'none', cursor: 'pointer' }}>
                <Phone size={24} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#2c3e40' }}>Llámanos</div>
                  <div style={{ fontSize: '0.95rem', color: '#4a5f62' }}>+34 641 63 57 05</div>
                </div>
              </a>
            </div>
          </div>
          
          {/* Action Area */}
          <div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2c3e40' }}>Ponte en Contacto</h4>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>¿Tienes alguna pregunta? Estamos listos para ayudarte con tus necesidades de salud.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="https://api.whatsapp.com/send?phone=34641635705" style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#628385'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary)'}
              >
                Mensaje por WhatsApp
              </a>
              <a href="mailto:info@enfermeraentucasa.es" style={{
                backgroundColor: 'transparent',
                border: '1px solid var(--primary)',
                color: 'var(--primary)',
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                textAlign: 'center',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => { e.target.style.backgroundColor = 'var(--primary)'; e.target.style.color = 'white'; }}
              onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--primary)'; }}
              >
                Enviar Email
              </a>
            </div>
          </div>

        </div>
      </div>
      
      {/* Bottom Bar */}
      <div style={{ backgroundColor: '#2c3e40', color: '#a0b1b3', padding: '1.5rem 0' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.95rem' }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} Enfermera en tu Casa. Todos los derechos reservados.</p>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.95rem' }}>
            <a href="#" style={{ color: '#a0b1b3', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#a0b1b3'}>Política de Privacidad</a>
            <a href="#" style={{ color: '#a0b1b3', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = '#a0b1b3'}>Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
