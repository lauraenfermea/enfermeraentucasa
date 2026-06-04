"use client";
import { useState, createContext, useContext } from 'react';
import Header from './Header';
import Footer from './Footer';
import ContactForm from './ContactForm';

export const ContactContext = createContext({
  openContact: () => {},
  closeContact: () => {},
});

export function useContactModal() {
  return useContext(ContactContext);
}

export default function ClientLayout({ children }) {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <ContactContext.Provider value={{
      openContact: () => setContactOpen(true),
      closeContact: () => setContactOpen(false),
    }}>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header onContactClick={() => setContactOpen(true)} />
        
        <main style={{ flex: 1 }}>
          {children}
        </main>

        <Footer />
        <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </ContactContext.Provider>
  );
}
