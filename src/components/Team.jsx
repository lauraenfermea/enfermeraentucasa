import { motion } from 'framer-motion';

export default function Team() {
  const teamMembers = [
    {
      name: 'Lily Anderson',
      role: 'Head of Nursing Care',
      image: 'team-lily.jpg'
    },
    {
      name: 'Olivia Martinez',
      role: 'Certified Nursing Assistant',
      image: 'team-olivia.jpg'
    },
    {
      name: 'Emily Carter',
      role: 'Registered Nurse',
      image: 'team-emily.jpg'
    }
  ];

  return (
    <section id="team" className="section" style={{ background: 'var(--bg-color)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.4rem 1rem',
            background: 'rgba(112, 150, 152, 0.15)',
            color: 'var(--primary)',
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem'
          }}>
            Our team
          </div>
          <h2 className="section-title" style={{ maxWidth: '700px', margin: '0 auto', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Meet our dedicated <span style={{ color: 'var(--primary)' }}>team</span>
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '1.125rem', maxWidth: '600px', margin: '1rem auto 0' }}>
            Meet the caring individuals who bring comfort, kindness, and expertise to every patient we serve.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                height: '450px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                cursor: 'pointer'
              }}
              whileHover={{ y: -5 }}
            >
              <img 
                src={`/assets/${member.image}`} 
                alt={member.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              
              {/* Floating Info Box */}
              <div style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                right: '1rem',
                background: 'white',
                padding: '1.5rem',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'var(--text-main)', fontWeight: 700 }}>
                  {member.name}
                </h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: 0 }}>
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
