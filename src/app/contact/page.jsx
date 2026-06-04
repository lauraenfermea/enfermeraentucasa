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
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', flex: '1 1 250px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <MapPin size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Ubicación</h3>
            <p style={{ color: 'var(--text-light)' }}>Zaragoza y alrededores</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', flex: '1 1 250px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Mail size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Email Us</h3>
            <p style={{ color: 'var(--text-light)' }}>info@enfermeraentucasa.es</p>
          </div>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', flex: '1 1 250px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Phone size={40} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Call Us</h3>
            <p style={{ color: 'var(--text-light)' }}>+34 641 63 57 05</p>
          </div>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}>
            Request Service
          </button>
        </div>
      </div>

      <ContactForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
