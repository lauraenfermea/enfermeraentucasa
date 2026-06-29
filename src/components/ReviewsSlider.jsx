"use client";
import { useEffect, useRef } from 'react';

export default function ReviewsSlider({ backgroundColor }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clear any previous script or content to prevent duplicates in dev hot-reloads
      containerRef.current.innerHTML = '';
      
      const script = document.createElement('script');
      script.src = 'https://cdn.trustindex.io/loader.js?bf4e2b17525635308e76c3b459d';
      script.defer = true;
      script.async = true;
      containerRef.current.appendChild(script);
    }
  }, []);

  let bgStyle = '#F8FBF8'; // default is light-gray
  if (backgroundColor === 'white') bgStyle = 'white';
  else if (backgroundColor === 'light-green') bgStyle = '#eff5f1';
  else if (backgroundColor === 'light-gray') bgStyle = '#F8FBF8';
  else if (backgroundColor === 'brand-primary') bgStyle = '#8B9A91';

  return (
    <section style={{ padding: '5rem 0 6rem 0', backgroundColor: bgStyle }}>
      <div className="container" style={{ maxWidth: '1050px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div ref={containerRef} />
      </div>
    </section>
  );
}
