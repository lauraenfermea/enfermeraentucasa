"use client";
import { motion } from 'framer-motion';

export default function MapSection() {
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
          Nuestra Ubicación de Servicio
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#4a5f62', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Ofrecemos atención de enfermería a domicilio en toda la ciudad de Zaragoza.
        </p>
      </div>

      {/* Embedded Google Map */}
      <div style={{ width: '100%', height: '450px', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.03)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.4216839075727!2d-0.8853217242858882!3d41.65045318858712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5915505d64dd9b%3A0x491a605cb7cb4bb7!2sEnfermera%20en%20tu%20casa!5e0!3m2!1sen!2sus!4v1719659000000!5m2!1sen!2sus"
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
