"use client";
import { useState } from 'react';
import ContactForm from '../../components/ContactForm';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div style={{ padding: '6rem 0 4rem', textAlign: 'center', backgroundColor: 'var(--bg-color)' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', fontWeight: 'bold', marginBottom: '1rem' }}>
          Contáctanos
        </h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier duda o para solicitar un servicio.
        </p>

        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://maps.app.goo.gl/mrgfGi4YZuDYp3yv6" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              display: 'block', 
              textDecoration: 'none', 
              color: 'inherit', 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '16px', 
              flex: '1 1 250px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <MapPin size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#2c3e40' }}>Ubicación</h3>
            <p style={{ color: 'var(--text-light)', margin: 0 }}>Zaragoza y alrededores</p>
          </a>

          <a 
            href="mailto:info@enfermeraentucasa.es" 
            style={{ 
              display: 'block', 
              textDecoration: 'none', 
              color: 'inherit', 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '16px', 
              flex: '1 1 250px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Mail size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#2c3e40' }}>Envíanos un correo</h3>
            <p style={{ color: 'var(--text-light)', margin: 0 }}>info@enfermeraentucasa.es</p>
          </a>

          <a 
            href="tel:+34641635705" 
            style={{ 
              display: 'block', 
              textDecoration: 'none', 
              color: 'inherit', 
              background: 'white', 
              padding: '2rem', 
              borderRadius: '16px', 
              flex: '1 1 250px', 
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Phone size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#2c3e40' }}>Llámanos</h3>
            <p style={{ color: 'var(--text-light)', margin: 0 }}>+34 641 63 57 05</p>
          </a>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <a href="https://api.whatsapp.com/send?phone=34641635705" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem', textDecoration: 'none', display: 'inline-block' }}>
            Solicitar servicio
          </a>
        </div>
      </div>

      <ContactForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
