import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturesBand from './components/FeaturesBand';
import About from './components/About';
import Services from './components/Services';
import Rates from './components/Rates';
import Testimonials from './components/Testimonials';
import Team from './components/Team';
import FAQ from './components/FAQ';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onContactClick={() => setContactOpen(true)} />
      
      <main style={{ flex: 1 }}>
        <Hero onContactClick={() => setContactOpen(true)} />
        <FeaturesBand />
        <About />
        <Services />
        <Rates />
        <Testimonials />
        <Team />
        <FAQ />
        <CtaBanner onContactClick={() => setContactOpen(true)} />
      </main>

      <Footer />
    </div>
  );
}
