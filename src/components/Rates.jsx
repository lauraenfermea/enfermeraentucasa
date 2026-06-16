"use client";
import { motion } from 'framer-motion';

export default function Rates() {
  const rates = [
    {
      title: 'Servicio Básico',
      price: 'Desde 35€',
      desc: 'Intervenciones de enfermería específicas en el domicilio.',
      features: [
        'Inyectables',
        'Control de constantes',
        'Curas sencillas',
        'Retirada de puntos/grapas'
      ],
      recommended: false
    },
    {
      title: 'Servicio Especializado',
      price: 'Desde 50€',
      desc: 'Cuidados que requieren mayor complejidad técnica y seguimiento.',
      features: [
        'Cura de heridas complejas (úlceras)',
        'Sondajes (vesical/nasogástrico)',
        'Valoración integral',
        'Educación para la salud familiar'
      ],
      recommended: true
    },
    {
      title: 'Formación en primeros auxilios',
      price: 'Desde 120€',
      desc: 'En Enfermera en Casa ofrecemos charlas y talleres de primeros auxilios adaptados a empresas, impartidos por personal sanitario cualificado.',
      features: [
        'Adaptamos el contenido al sector',
        'Posibilidad de formación periódica'
      ],
      recommended: false
    }
  ];

  return (
    <section id="rates" className="section" style={{ background: 'white' }}>
      <div className="container">
        
        <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>
            Tarifas
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          maxWidth: '1150px',
          margin: '0 auto',
          alignItems: 'start'
        }}>
          {rates.map((rate, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{
                position: 'relative',
                background: '#f2f7f2',
                borderRadius: '24px',
                borderBottomLeftRadius: '0',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
              }}
              whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
            >
              {/* Aesthetic Cut-out square */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '40px',
                height: '40px',
                backgroundColor: 'white',
                borderTopRightRadius: '24px'
              }} />

              {rate.recommended && (
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '2rem',
                  background: '#FFB800',
                  color: '#000',
                  padding: '0.4rem 1.2rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  boxShadow: '0 4px 10px rgba(255, 184, 0, 0.25)'
                }}>
                  Servicio Recomendado
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
                <h3 style={{ fontSize: '1rem', color: '#2a4347', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {rate.title}
                </h3>
                
                <div style={{ fontSize: '3.2rem', color: '#8B9A91', fontWeight: '500', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
                  {rate.price}
                </div>
                
                <p style={{ color: '#2a4347', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                  {rate.desc}
                </p>
                
                <ul style={{ 
                  margin: 0, 
                  padding: '0 0 0 1.2rem', 
                  color: '#4a5f62', 
                  fontSize: '0.92rem', 
                  lineHeight: 1.8,
                  marginBottom: '0',
                  listStyleType: 'disc'
                }}>
                  {rate.features.map((feature, fIdx) => (
                    <li key={fIdx} style={{ paddingLeft: '0.5rem', marginBottom: '0.4rem' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ position: 'relative', zIndex: 2, marginTop: '1.2rem' }}>
                <motion.a 
                  href="https://wa.me/34641635705"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, backgroundColor: '#7a8880' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#8B9A91',
                    color: 'white',
                    textDecoration: 'none',
                    border: 'none',
                    borderRadius: '999px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textAlign: 'center',
                    display: 'inline-block'
                  }}
                >
                  Contáctanos
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Extra Rate Packages */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          gap: '2.5rem',
          maxWidth: '1150px',
          margin: '2.5rem auto 0'
        }}>
          {/* Heparin Bonds Card (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{
              flex: '2 1 600px',
              position: 'relative',
              background: '#f2f7f2',
              borderRadius: '24px',
              borderBottomLeftRadius: '0',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}
            whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
          >
            {/* Aesthetic Cut-out square */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderTopRightRadius: '24px'
            }} />

            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '2rem',
              background: '#FFB800',
              color: '#000',
              padding: '0.4rem 1.2rem',
              borderRadius: '999px',
              fontSize: '0.85rem',
              fontWeight: '700',
              boxShadow: '0 4px 10px rgba(255, 184, 0, 0.25)'
            }}>
              Recommended Service
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontSize: '1rem', color: '#2a4347', fontWeight: 600, marginBottom: '1rem' }}>
                Bonos de Heparina
              </h3>

              <div style={{ width: '100%', paddingBottom: '0.5rem' }}>
                {/* Table Header */}
                <div className="rates-grid" style={{ 
                  color: '#2a4347', 
                  fontWeight: 600, 
                  fontSize: '0.85rem', 
                  marginBottom: '0.75rem' 
                }}>
                  <div>Bono</div>
                  <div style={{ textAlign: 'center' }}>
                    <span className="hide-mobile">Precio por sesión</span>
                    <span className="show-mobile" style={{ display: 'none' }}>Sesión</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>Total</div>
                  <div style={{ textAlign: 'center' }}>Ahorro</div>
                </div>

                {/* Table Rows */}
                {[
                  { name: 'Sesión individual', price: '35€', total: '35€', saving: '—' },
                  { name: '7 sesiones*', price: '31€', total: '217€', saving: '28€' },
                  { name: '10 sesiones*', price: '29€', total: '290€', saving: '60€' },
                  { name: '20 sesiones*', price: '27€', total: '540€', saving: '160€' },
                ].map((row, rIdx) => (
                  <div key={rIdx} className="rates-grid" style={{ 
                    color: '#4a5f62', 
                    fontSize: '0.9rem', 
                    padding: '0.4rem 0',
                    borderBottom: '1px solid rgba(139, 154, 145, 0.12)'
                  }}>
                    <div style={{ fontWeight: 500 }}>{row.name}</div>
                    <div style={{ textAlign: 'center' }}>{row.price}</div>
                    <div style={{ textAlign: 'center' }}>{row.total}</div>
                    <div style={{ textAlign: 'center', color: row.saving !== '—' ? 'var(--primary)' : 'inherit', fontWeight: row.saving !== '—' ? 600 : 'normal' }}>{row.saving}</div>
                  </div>
                ))}
              </div>

              <p style={{ color: '#2a4347', fontSize: '0.95rem', fontWeight: 500, marginTop: '1.2rem', marginBottom: '0' }}>
                *Pago por adelantado, servicio a domicilio, cancelaciones con 24 horas de antelación.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 2, marginTop: '1.2rem', display: 'flex', justifyContent: 'center' }}>
              <motion.a 
                href="https://wa.me/34641635705"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, backgroundColor: '#7a8880' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '60%',
                  minWidth: '200px',
                  padding: '1rem',
                  backgroundColor: '#8B9A91',
                  color: 'white',
                  textDecoration: 'none',
                  border: 'none',
                  borderRadius: '999px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'inline-block'
                }}
              >
                Contáctanos
              </motion.a>
            </div>
          </motion.div>

          {/* Consult Card (Narrow) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              flex: '1 1 320px',
              position: 'relative',
              background: '#f2f7f2',
              borderRadius: '24px',
              borderBottomLeftRadius: '0',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
            }}
            whileHover={{ y: -8, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
          >
            {/* Aesthetic Cut-out square */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '40px',
              height: '40px',
              backgroundColor: 'white',
              borderTopRightRadius: '24px'
            }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2 }}>
              <h3 style={{ fontSize: '1rem', color: '#2a4347', fontWeight: 600, marginBottom: '0.5rem' }}>
                Bonos y Seguimiento
              </h3>
              
              <div style={{ fontSize: '3.2rem', color: '#8B9A91', fontWeight: '500', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
                Consultar
              </div>
              
              <p style={{ color: '#2a4347', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '1.5rem', fontWeight: 500 }}>
                Planes personalizados para cuidados continuados o crónicos.
              </p>
              
              <ul style={{ 
                margin: 0, 
                padding: '0 0 0 1.2rem', 
                color: '#4a5f62', 
                fontSize: '0.92rem', 
                lineHeight: 1.8,
                marginBottom: '0',
                listStyleType: 'disc'
              }}>
                {['Descuentos por volumen', 'Seguimiento programado', 'Atención prioritaria', 'Pack de tratamiento semanal'].map((feature, fIdx) => (
                  <li key={fIdx} style={{ paddingLeft: '0.5rem', marginBottom: '0.4rem' }}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ position: 'relative', zIndex: 2, marginTop: '1.2rem' }}>
              <motion.a 
                href="https://wa.me/34641635705"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, backgroundColor: '#7a8880' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: '#8B9A91',
                  color: 'white',
                  textDecoration: 'none',
                  border: 'none',
                  borderRadius: '999px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'inline-block'
                }}
              >
                Contáctanos
              </motion.a>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
