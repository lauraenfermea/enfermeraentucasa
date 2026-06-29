"use client";
import Header from './Header';
import Footer from './Footer';

export default function ClientLayout({ children, settings }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header settings={settings} />
      
      <main style={{ flex: 1 }}>
        {children}
      </main>

      <Footer settings={settings} />
    </div>
  );
}
