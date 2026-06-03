import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Partners from './components/Partners';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onContactClick={() => setContactOpen(true)} />
      
      <main style={{ flex: 1 }}>
        <Hero onContactClick={() => setContactOpen(true)} />
        <Partners />
        <About />
        <Services />
        <Testimonials />
        <Team />
        <CtaBanner onContactClick={() => setContactOpen(true)} />
      </main>

      <Footer />
    </div>
  );
}
