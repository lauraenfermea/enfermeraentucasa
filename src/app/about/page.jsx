import Team from '../../components/Team';
import OurStory from '../../components/OurStory';

export default function AboutPage() {
  return (
    <>
      <div style={{ padding: '6rem 0 2rem', textAlign: 'center', backgroundColor: 'var(--bg-color)' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--text-main)', fontWeight: 'bold' }}>
          Sobre Nosotros
        </h1>
        <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto' }}>
          Conoce más sobre nuestra misión, nuestros valores y el equipo dedicado que lleva los cuidados a tu hogar.
        </p>
      </div>
      <OurStory />
      <Team />
    </>
  );
}
