import Hero from '../components/Hero';
import FeaturesBand from '../components/FeaturesBand';
import About from '../components/About';
import Services from '../components/Services';
import Rates from '../components/Rates';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import BlogSection from '../components/BlogSection';
import CtaBanner from '../components/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesBand />
      <About />
      <Services />
      <Rates />
      <Testimonials />
      <Team />
      <BlogSection />
      <CtaBanner />
    </>
  );
}
