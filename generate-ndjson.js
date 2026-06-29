const fs = require('fs');
const path = require('path');
const blogPosts = require('./src/data/blogPosts.json');

const documents = [];

const resolveLocalAsset = (relPath) => {
  const absPath = path.resolve(__dirname, relPath);
  return `image@file://${absPath.replace(/\\/g, '/')}`;
};

// 1. Settings Document
documents.push({
  "_id": "settings",
  "_type": "settings",
  "title": "Enfermera en tu casa",
  "phoneNumber": "+34 641 63 57 05",
  "email": "info@enfermeraentucasa.es",
  "location": "Zaragoza",
  "googleMapsUrl": "https://maps.app.goo.gl/mrgfGi4YZuDYp3yv6",
  "whatsappLink": "https://wa.me/34641635705",
  "logo": {
    "_type": "image",
    "_sanityAsset": resolveLocalAsset('public/assets/logo_edited.avif')
  },
  "navLinks": [
    { "_key": "link1", "name": "Servicios", "path": "/#services" },
    { "_key": "link2", "name": "Tarifas", "path": "/#rates" },
    { "_key": "link3", "name": "Quienes somos", "path": "/#quienes-somos" },
    { "_key": "link4", "name": "Contactar ahora", "path": "/contact" },
    { "_key": "link5", "name": "Blog", "path": "/blog" }
  ]
});

// 2. Home Page Document
documents.push({
  "_id": "home-page",
  "_type": "page",
  "title": "Home",
  "slug": { "_type": "slug", "current": "home" },
  "pageBuilder": [
    {
      "_key": "block-hero",
      "_type": "hero",
      "heading": "Enfermera a domicilio en Zaragoza",
      "body": "Atención sanitaria profesional en tu hogar.\n- Sin esperas ni desplazamientos.\n- Sin salas de espera y sin estrés; solo cuidados profesionales, personalizados y de calidad en tu hogar.",
      "backgroundImage": {
        "_type": "image",
        "_sanityAsset": resolveLocalAsset('public/assets/hero_bg.webp')
      }
    },
    {
      "_key": "block-services",
      "_type": "services",
      "title": "Servicios",
      "servicesList": [
        {
          "_key": "svc1",
          "title": "Curas y valoración de heridas",
          "desc": "Tratamiento de heridas y úlceras por presión (UPP), seguimiento de la cicatrización, educación para la salud y prevención. Retirada de puntos o grapas.",
          "image": {
            "_type": "image",
            "_sanityAsset": resolveLocalAsset('public/assets/imgi_8_como-curar-una-herida-infectada.jpg')
          }
        },
        {
          "_key": "svc2",
          "title": "Inyectables y Medicación",
          "desc": "Administración segura de medicación intravenosa, intramuscular o subcutánea siguiendo estrictamente las pautas médicas.",
          "image": {
            "_type": "image",
            "_sanityAsset": resolveLocalAsset('public/assets/imgi_9_inyeccion.webp')
          }
        },
        {
          "_key": "svc3",
          "title": "Control de Constantes",
          "desc": "Monitorización integral de presión arterial, frecuencia cardíaca, saturación de oxígeno y niveles de glucosa. Seguimiento de hipertensión en embarazadas.",
          "image": {
            "_type": "image",
            "_sanityAsset": resolveLocalAsset('public/assets/imgi_10_779030c5-a200-421f-8dd8-8e85eb97be20.jpg')
          }
        },
        {
          "_key": "svc4",
          "title": "Cuidados del recién nacido",
          "desc": "Higiene del cordón, cura de heridas. Primeros baños del recién nacido. Seguimiento de heridas (episiotomías, cesáreas...)",
          "image": {
            "_type": "image",
            "_sanityAsset": resolveLocalAsset('public/assets/imgi_11_Baby Feet Close-Up.jpg')
          }
        },
        {
          "_key": "svc5",
          "title": "Sondas, drenajes y ostomías",
          "desc": "Mantenimiento, limpieza y cambio de sondas urinarias o nasogástricas, asegurando el confort total del paciente. Valoración de ostomías.",
          "image": {
            "_type": "image",
            "_sanityAsset": resolveLocalAsset('public/assets/imgi_12_e62b038d-504f-49e5-8e4f-266def66acc1.jpg')
          }
        },
        {
          "_key": "svc6",
          "title": "Formación en primeros auxilios",
          "desc": "¿Sabrían usted o en su empresa cómo actuar ante una parada cardiorrespiratoria? Ofrecemos formación en primeros auxilios en Zaragoza.",
          "image": {
            "_type": "image",
            "_sanityAsset": resolveLocalAsset('public/assets/imgi_13_group-diverse-people-cpr-training-class.jpg')
          }
        }
      ]
    },
    {
      "_key": "block-rates",
      "_type": "rates",
      "title": "Tarifas",
      "ratesList": [
        {
          "_key": "rate1",
          "title": "Servicio Básico",
          "price": "Desde 35€",
          "desc": "Intervenciones de enfermería específicas en el domicilio.",
          "features": [
            "Inyectables",
            "Control de constantes",
            "Curas sencillas",
            "Retirada de puntos/grapas"
          ],
          "recommended": false
        },
        {
          "_key": "rate2",
          "title": "Servicio Especializado",
          "price": "Desde 50€",
          "desc": "Cuidados que requieren mayor complejidad técnica y seguimiento.",
          "features": [
            "Cura de heridas complejas (úlceras)",
            "Sondajes (vesical/nasogástrico)",
            "Valoración integral",
            "Educación para la salud familiar"
          ],
          "recommended": true
        },
        {
          "_key": "rate3",
          "title": "Formación en primeros auxilios",
          "price": "Desde 120€",
          "desc": "En Enfermera en Casa ofrecemos charlas y talleres de primeros auxilios adaptados a empresas, impartidos por personal sanitario cualificado.",
          "features": [
            "Adaptamos el contenido al sector",
            "Posibilidad de formación periódica"
          ],
          "recommended": false
        }
      ],
      "bonosTitle": "Bonos de Heparina",
      "bonosList": [
        { "_key": "bono1", "name": "Sesión individual", "price": "35€", "total": "35€", "saving": "—" },
        { "_key": "bono2", "name": "7 sesiones*", "price": "31€", "total": "217€", "saving": "28€" },
        { "_key": "bono3", "name": "10 sesiones*", "price": "29€", "total": "290€", "saving": "60€" },
        { "_key": "bono4", "name": "20 sesiones*", "price": "27€", "total": "540€", "saving": "160€" }
      ],
      "bonosFooter": "*Pago por adelantado, servicio a domicilio, cancelaciones con 24 horas de antelación.",
      "consultTitle": "Bonos y Seguimiento",
      "consultPrice": "Consultar",
      "consultDesc": "Planes personalizados para cuidados continuados o crónicos.",
      "consultFeatures": ["Descuentos por volumen", "Seguimiento programado", "Atención prioritaria", "Pack de tratamiento semanal"]
    },
    {
      "_key": "block-team",
      "_type": "team",
      "title": "¿Quienes somos?",
      "subtitle": "Sobre nosotras:",
      "teamMembers": [
        {
          "_key": "member1",
          "name": "Laura Pueyo",
          "colegiada": "Colegiada 16521",
          "experience": "+8 años de experiencia",
          "image": {
            "_type": "image",
            "_sanityAsset": resolveLocalAsset('public/assets/wix_img_12_laura.jpg')
          }
        },
        {
          "_key": "member2",
          "name": "Karen Mira",
          "colegiada": "Colegiada 20474",
          "experience": "+6 años de experiencia",
          "image": {
            "_type": "image",
            "_sanityAsset": resolveLocalAsset('public/assets/wix_img_13_karen.jpg')
          }
        }
      ],
      "bio": [
        "<strong>Enfermeras desde 2015</strong> con experiencia en España y otros lugares (Reino Unido, Colombia y EU).",
        "Ahora en Zaragoza queremos ayudar a esas personas con dificultad de desplazamiento o saturación del sistema, por ello nace <strong>\"Enfermera en tu casa\"</strong>.",
        "Ofrecemos una atención cercana, profesional and de calidad con una dedicación de primera mano.",
        "Sabemos que cuidar no solo es aplicar técnicas, <em>es estar presentes cuando más se necesita</em>."
      ]
    },
    {
      "_key": "block-faq",
      "_type": "faq",
      "title": "Preguntas Frecuentes",
      "faqsList": [
        {
          "_key": "faq1",
          "question": "¿Cuándo debería solicitar una enfermera a domicilio en Zaragoza?",
          "answer": "Después de una cirugía, ante una herida que necesita seguimiento, para administrar medicación, realizar analíticas o controlar constantes. También si deseas evitar esperas o desplazamientos."
        },
        {
          "_key": "faq2",
          "question": "¿Las enfermeras están cualificadas?",
          "answer": "Sí. Somos enfermeras tituladas y colegiadas, con experiencia en diferentes áreas sanitarias y un enfoque profesional y humano."
        },
        {
          "_key": "faq3",
          "question": "¿Puedo solicitar el servicio tras el alta hospitalaria?",
          "answer": "Sí, es uno de los motivos más habituales. Garantiza continuidad en los cuidados y reduce el riesgo de complicaciones."
        },
        {
          "_key": "faq4",
          "question": "¿Cómo puedo reservar una cita?",
          "answer": "Es muy sencillo. Solo tienes que contactar con nosotras llamando a nuestro teléfono 641 63 57 05 o enviándonos un WhatsApp. Te responderemos rápidamente."
        },
        {
          "_key": "faq5",
          "question": "¿Cómo se realizan los pagos?",
          "answer": "Aceptamos diversas formas de pago para tu mayor comodidad y la de tu familia: Bizum, transferencia bancaria o en efectivo tras finalizar el servicio prestado en tu propio domicilio."
        },
        {
          "_key": "faq6",
          "question": "¿En qué zonas de Zaragoza trabajáis?",
          "answer": "Prestamos servicios en Zaragoza centro urbano. Llevamos la atención sanitaria profesional directamente a tu hogar para evitarte desplazamientos innecesarios y mayor comodidad."
        },
        {
          "_key": "faq7",
          "question": "¿Cuál es vuestro horario de atención?",
          "answer": "Atendemos de lunes a domingo con flexibilidad horaria total. Nuestro objetivo es adaptarnos a tu ritmo y al de tu familia, pactando las visitas en el momento que mejor os convenga para garantizar unos cuidados sin esperas."
        }
      ]
    },
    {
      "_key": "block-reviews",
      "_type": "reviews",
      "title": "Reseñas en Google",
      "rating": 4.9,
      "reviewsCount": "(43 reseñas)",
      "reviewsList": [
        {
          "_key": "rev1",
          "name": "María T.",
          "initial": "M",
          "avatarBg": "#e57373",
          "text": "Una atención inmejorable. Vinieron a casa para unas curas de mi madre y el trato fue excepcional. Muy profesionales y cariñosas.",
          "rating": 5,
          "date": "Hace 1 semana"
        },
        {
          "_key": "rev2",
          "name": "Carlos L.",
          "initial": "C",
          "avatarBg": "#81c784",
          "text": "Totalmente recomendable. Me ahorraron muchas visitas al centro de salud. Llegaron puntuales y me resolvieron el problema enseguida.",
          "rating": 5,
          "date": "Hace 2 semanas"
        },
        {
          "_key": "rev3",
          "name": "Ana G.",
          "initial": "A",
          "avatarBg": "#64b5f6",
          "text": "Un servicio fantástico en Zaragoza. Necesitaba que me pusieran unas inyecciones y la comodidad de no moverme de casa no tiene precio. Muchas gracias.",
          "rating": 5,
          "date": "Hace 1 mes"
        },
        {
          "_key": "rev4",
          "name": "Javier M.",
          "initial": "J",
          "avatarBg": "#ffb74d",
          "text": "Grandes profesionales. Muy atentas, con mucha paciencia y delicadeza. Sin duda volveré a contactar con ellas si lo necesito.",
          "rating": 5,
          "date": "Hace 3 semanas"
        }
      ]
    },
    {
      "_key": "block-blog",
      "_type": "blogSection",
      "title": "Últimos Artículos",
      "description": "Descubre consejos, guías y noticias sobre el cuidado de la salud en el hogar."
    },
    {
      "_key": "block-cta",
      "_type": "ctaBanner",
      "title": "Únete a nuestra comunidad de atención",
      "desc": "Solicite una consulta hoy y permítanos crear un plan de atención que se adapte perfectamente a su familia."
    }
  ]
});

// 3. Contact Page Document
documents.push({
  "_id": "contact-page",
  "_type": "page",
  "title": "Contacto",
  "slug": { "_type": "slug", "current": "contact" },
  "pageBuilder": [
    {
      "_key": "block-cta-contact",
      "_type": "ctaBanner",
      "title": "Únete a nuestra comunidad de atención",
      "desc": "Solicite una consulta hoy y permítanos crear un plan de atención que se adapte perfectamente a su familia."
    }
  ]
});

// 4. Blog Posts Documents
blogPosts.forEach((post, i) => {
  const doc = {
    "_id": `post-${post.id || i}`,
    "_type": "post",
    "title": post.title,
    "slug": { "_type": "slug", "current": post.slug },
    "description": post.description,
    "content": Array.isArray(post.content) ? post.content.join('\n\n') : post.content,
    "publishedAt": new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString()
  };

  if (post.image && post.image.startsWith('http')) {
    doc.image = {
      "_type": "image",
      "_sanityAsset": `image@${post.image}`
    };
  }
  
  documents.push(doc);
});

const ndjson = documents.map(doc => JSON.stringify(doc)).join('\n');
fs.writeFileSync(path.join(__dirname, 'data.ndjson'), ndjson);
console.log('Successfully generated data.ndjson containing ' + documents.length + ' documents.');
