"use client";
import { motion } from 'framer-motion';
import { urlFor } from '../sanity/image';

export default function Services({ title, servicesList, backgroundColor, headingColor }) {
  const sectionTitle = title || 'Servicios';
  const services = servicesList || [
    {
      title: 'Curas y valoración de heridas',
      desc: 'Tratamiento de heridas y úlceras por presión (UPP), seguimiento de la cicatrización, educación para la salud y prevención. Retirada de puntos o grapas.',
      image: 'imgi_8_como-curar-una-herida-infectada.jpg'
    },
    {
      title: 'Inyectables y Medicación',
      desc: 'Administración segura de medicación intravenosa, intramuscular o subcutánea siguiendo estrictamente las pautas médicas.',
      image: 'imgi_9_inyeccion.webp'
    },
    {
      title: 'Control de Constantes',
      desc: 'Monitorización integral de presión arterial, frecuencia cardíaca, saturación de oxígeno y niveles de glucosa. Seguimiento de hipertensión en embarazadas.',
      image: 'imgi_10_779030c5-a200-421f-8dd8-8e85eb97be20.jpg'
    },
    {
      title: 'Cuidados del recién nacido',
      desc: 'Higiene del cordón, cura de heridas. Primeros baños del recién nacido. Seguimiento de heridas (episiotomías, cesáreas...)',
      image: 'imgi_11_Baby Feet Close-Up.jpg'
    },
    {
      title: 'Sondas, drenajes y ostomías',
      desc: 'Mantenimiento, limpieza y cambio de sondas urinarias o nasogástricas, asegurando el confort total del paciente. Valoración de ostomías.',
      image: 'imgi_12_e62b038d-504f-49e5-8e4f-266def66acc1.jpg'
    },
    {
      title: 'Formación en primeros auxilios',
      desc: '¿Sabrían usted o en su empresa cómo actuar ante una parada cardiorrespiratoria? Ofrecemos formación en primeros auxilios en Zaragoza.',
      image: 'imgi_13_group-diverse-people-cpr-training-class.jpg'
    }
  ];

  let bgStyle = 'white';
  if (backgroundColor === 'light-green') bgStyle = '#eff5f1';
  else if (backgroundColor === 'light-gray') bgStyle = '#F8FBF8';
  else if (backgroundColor === 'brand-primary') bgStyle = '#8B9A91';
  else if (backgroundColor === 'white') bgStyle = 'white';

  let titleColor = 'var(--text-main)';
  if (headingColor === 'brand-primary') titleColor = '#8B9A91';
  else if (headingColor === 'white') titleColor = 'white';
  else if (backgroundColor === 'brand-primary') titleColor = 'white';

  function getDefaultServiceImage(title) {
    const lowercaseTitle = (title || '').toLowerCase();
    if (lowercaseTitle.includes('curas') || lowercaseTitle.includes('herida')) {
      return 'imgi_8_como-curar-una-herida-infectada.jpg';
    }
    if (lowercaseTitle.includes('inyectables') || lowercaseTitle.includes('medicaci')) {
      return 'imgi_9_inyeccion.webp';
    }
    if (lowercaseTitle.includes('constantes') || lowercaseTitle.includes('presi')) {
      return 'imgi_10_779030c5-a200-421f-8dd8-8e85eb97be20.jpg';
    }
    if (lowercaseTitle.includes('recién') || lowercaseTitle.includes('bebé') || lowercaseTitle.includes('cordón') || lowercaseTitle.includes('nacido')) {
      return 'imgi_11_Baby Feet Close-Up.jpg';
    }
    if (lowercaseTitle.includes('sonda') || lowercaseTitle.includes('drenaje') || lowercaseTitle.includes('ostom')) {
      return 'imgi_12_e62b038d-504f-49e5-8e4f-266def66acc1.jpg';
    }
    if (lowercaseTitle.includes('auxilios') || lowercaseTitle.includes('cpr') || lowercaseTitle.includes('formaci')) {
      return 'imgi_13_group-diverse-people-cpr-training-class.jpg';
    }
    return 'imgi_8_como-curar-una-herida-infectada.jpg';
  }

  return (
    <section id="services" className="section" style={{ background: bgStyle }}>
      <div className="container">
        
        <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: titleColor }}>
            {sectionTitle}
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {services.map((svc, idx) => {
            const imgUrl = svc.image 
              ? (typeof svc.image === 'object' ? urlFor(svc.image).url() : `/assets/${svc.image}`)
              : `/assets/${getDefaultServiceImage(svc.title)}`;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                style={{
                  background: '#f2f7f2',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
                }}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              >
                {/* Service Image */}
                <div style={{ width: '100%', height: '240px', overflow: 'hidden' }}>
                  <motion.img 
                    src={imgUrl} 
                    alt={svc.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              
              {/* Service Content */}
              <div style={{ padding: '2rem 1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  {svc.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '1.1rem', margin: 0 }}>
                  {svc.desc}
                </p>
              </div>
            </motion.div>
          )
        })}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <motion.a 
            href="#rates"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: '#8B9A91',
              color: 'white',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '999px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              height: '54px',
              boxSizing: 'border-box'
            }}
          >
            Conoce nuestras tarifas <span style={{ fontSize: '1.2rem', fontWeight: '400' }}>+</span>
          </motion.a>
          
          <motion.a 
            href="https://wa.me/34641635705"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 154, 145, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2.5rem',
              backgroundColor: '#f2f7f2',
              color: '#4A5B52',
              textDecoration: 'none',
              border: '1px solid rgba(139, 154, 145, 0.4)',
              borderRadius: '999px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '54px',
              boxSizing: 'border-box'
            }}
          >
            Contáctanos
          </motion.a>
        </div>
        
      </div>
    </section>
  );
}
