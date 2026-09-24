"use client";
import { motion } from 'framer-motion';

export default function MapSection({ title, subtitle, address, embedUrl, mapsUrl }) {
  const sectionTitle = title || "Nuestra Ubicación de Servicio";
  const sectionSubtitle = subtitle || "Ofrecemos atención de enfermería a domicilio en toda la ciudad de Zaragoza.";
  const mapUrl = embedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.4216839075727!2d-0.8853217242858882!3d41.65045318858712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5915505d64dd9b%3A0x491a605cb7cb4bb7!2sEnfermera%20en%20tu%20casa!5e0!3m2!1sen!2sus!4v1719659000000!5m2!1sen!2sus";
  const directMapsUrl = mapsUrl || "https://share.google/jfi2BZwBHaDbi7EFt";

  return (
    <section style={{ backgroundColor: '#ffffff', padding: '4rem 0 0 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          fontWeight: '400',
          color: '#2c3e40',
          letterSpacing: '-0.025em',
          marginBottom: '1rem'
        }}>
          {sectionTitle}
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#4a5f62', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          {sectionSubtitle}
        </p>
        {address && (
          <p style={{ fontSize: '0.95rem', color: '#8B9A91', fontWeight: '600', marginTop: '0.5rem' }}>
            📍 {address}
          </p>
        )}
        <div style={{ marginTop: '1.25rem' }}>
          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#FFFFFF',
              color: '#2563EB',
              border: '1px solid #2563EB',
              padding: '0.55rem 1.4rem',
              borderRadius: '9999px',
              fontWeight: '700',
              fontSize: '0.95rem',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease',
            }}
          >
            ⭐ Ver en Google Maps
          </a>
        </div>
      </div>

      {/* Embedded Google Map */}
      <div style={{ width: '100%', height: '450px', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.03)' }}>
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Enfermera en tu casa"
        ></iframe>
      </div>
    </section>
  );
}
