import { MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'white', color: '#000', paddingBottom: '2rem' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '4rem' }}>
        <h2 style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', fontWeight: 500, marginBottom: '2rem', color: '#4a5f62', letterSpacing: '-2px' }}>
          Contact us
        </h2>
      </div>
      
      <div style={{ borderTop: '1px solid #eaeaea', width: '100%', marginBottom: '3.5rem' }}></div>

      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '3.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <MapPin size={36} color="#000" strokeWidth={2} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.2rem', color: '#000' }}>Where do we work?</div>
              <div style={{ fontSize: '1.15rem', color: '#000' }}>Zaragoza and surrounding areas.</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Mail size={36} color="#000" strokeWidth={2} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.2rem', color: '#000' }}>Contact email</div>
              <div style={{ fontSize: '1.15rem', color: '#000' }}>info@enfermeraentucasa.es</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Phone size={36} color="#000" strokeWidth={2} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.2rem', color: '#000' }}>Contact phone number</div>
              <div style={{ fontSize: '1.15rem', color: '#000' }}>+ 641 63 57 05</div>
            </div>
          </div>

        </div>

        <p style={{ fontSize: '1.2rem', color: '#4a5f62', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          If you have any questions about whether we deliver to your area, feel free to contact us.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
          <a href="https://wa.me/34641635705" style={{
            flex: '1 1 300px',
            backgroundColor: '#8B9A91',
            color: 'white',
            padding: '1.2rem 2rem',
            borderRadius: '999px',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1.15rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1.3,
            transition: 'opacity 0.2s',
          }}
          onMouseOver={(e) => e.target.style.opacity = 0.9}
          onMouseOut={(e) => e.target.style.opacity = 1}
          >
            Send a WhatsApp<br/>message
          </a>
          <a href="mailto:info@enfermeraentucasa.es" style={{
            flex: '1 1 300px',
            backgroundColor: '#f2f7f2',
            border: '1px solid rgba(139, 154, 145, 0.4)',
            color: '#4a5f62',
            padding: '1.2rem 2rem',
            borderRadius: '999px',
            textAlign: 'center',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '1.15rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#e8efe8'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#f2f7f2'}
          >
            Send email
          </a>
        </div>
        
        <div style={{ textAlign: 'center', color: '#8B9A91', fontSize: '0.9rem', paddingTop: '2rem', borderTop: '1px solid #eaeaea' }}>
          © {new Date().getFullYear()} Nurse at Home. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
