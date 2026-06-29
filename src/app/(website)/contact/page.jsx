"use client";
import { MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div style={{ padding: '6rem 0 8rem', backgroundColor: 'var(--bg-light)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#2c3e40', fontWeight: '800', marginBottom: '1rem', fontFamily: 'Outfit, sans-serif' }}>
            Contáctanos
          </h1>
          <p style={{ color: '#4a5f62', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Estamos aquí para ayudarte. Ponte en contacto con nosotros para cualquier duda o para solicitar un servicio de enfermería.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {/* Card 1: Address */}
          <a 
            href="https://www.google.com/maps/place/Enfermera+en+tu+casa/@41.6504532,-0.8853217,17z" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none', 
              color: 'inherit', 
              background: 'white', 
              padding: '2.5rem 2rem', 
              borderRadius: '16px', 
              flex: '1 1 300px', 
              maxWidth: '360px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              border: '1px solid rgba(0,0,0,0.03)'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(92, 121, 123, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <MapPin size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.75rem', color: '#2c3e40' }}>Ubicación</h3>
            <p style={{ color: '#4a5f62', margin: 0, textAlign: 'center', fontSize: '1.05rem' }}>Zaragoza, España</p>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', marginTop: '1rem', fontWeight: '600' }}>Ver en Google Maps →</span>
          </a>

          {/* Card 2: Email */}
          <a 
            href="mailto:info@enfermeraentucasa.es" 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none', 
              color: 'inherit', 
              background: 'white', 
              padding: '2.5rem 2rem', 
              borderRadius: '16px', 
              flex: '1 1 300px', 
              maxWidth: '360px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              border: '1px solid rgba(0,0,0,0.03)'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(92, 121, 123, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Mail size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.75rem', color: '#2c3e40' }}>Envíanos un correo</h3>
            <p style={{ color: '#4a5f62', margin: 0, textAlign: 'center', fontSize: '1.05rem' }}>info@enfermeraentucasa.es</p>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', marginTop: '1rem', fontWeight: '600' }}>Enviar correo →</span>
          </a>

          {/* Card 3: Phone */}
          <a 
            href="tel:+34641635705" 
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none', 
              color: 'inherit', 
              background: 'white', 
              padding: '2.5rem 2rem', 
              borderRadius: '16px', 
              flex: '1 1 300px', 
              maxWidth: '360px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)', 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
              border: '1px solid rgba(0,0,0,0.03)'
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
            }}
          >
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(92, 121, 123, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <Phone size={28} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.75rem', color: '#2c3e40' }}>Llámanos</h3>
            <p style={{ color: '#4a5f62', margin: 0, textAlign: 'center', fontSize: '1.05rem' }}>+34 641 63 57 05</p>
            <span style={{ fontSize: '0.9rem', color: 'var(--primary)', marginTop: '1rem', fontWeight: '600' }}>Llamar ahora →</span>
          </a>
        </div>

        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <a 
            href="https://wa.me/34641635705" 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              backgroundColor: '#25D366',
              color: 'white',
              fontSize: '1.2rem', 
              padding: '1rem 2.5rem', 
              textDecoration: 'none', 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              borderRadius: '50px',
              fontWeight: '700',
              boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = '#20ba5a';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = '#25D366';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
