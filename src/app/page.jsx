import Hero from '../components/Hero';
import FeaturesBand from '../components/FeaturesBand';
import Services from '../components/Services';
import Rates from '../components/Rates';

import Team from '../components/Team';
import FAQ from '../components/FAQ';
import ReviewsSlider from '../components/ReviewsSlider';
import CtaBanner from '../components/CtaBanner';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesBand />
      <Services />
      <Rates />

      <Team />
      <FAQ />
      <ReviewsSlider />
      <CtaBanner />
    </>
  );
}
