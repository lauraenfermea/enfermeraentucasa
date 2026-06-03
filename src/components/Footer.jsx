export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--text-main)', // Deep Teal
      color: '#FFFFFF',
      padding: '4rem 0 2rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          {/* Brand */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <img 
                src="/assets/logo_edited.avif" 
                alt="Nursing Care Logo" 
                style={{ 
                  height: '44px', 
                  width: '44px', 
                  objectFit: 'cover',
                  borderRadius: '50%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '2px solid rgba(255,255,255,0.2)'
                }} 
              />
            </div>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
              Bringing heartfelt care to your doorstep.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Careers</a></li>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Personal Care</a></li>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Companionship</a></li>
              <li><a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Nursing</a></li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2rem',
          textAlign: 'center',
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.875rem'
        }}>
          © 2026 Nursing Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
