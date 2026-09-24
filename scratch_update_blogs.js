const fs = require('fs');
const path = require('path');

const filePath = path.join(process.cwd(), 'data', 'site-content.json');
const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

content.blogs = [
  {
    id: "1",
    title: "Beneficios de la enfermería a domicilio en Zaragoza",
    slug: "beneficios-de-la-enfermer-a-a-domicilio-en-zaragoza",
    description: "La atención médica en el hogar proporciona un enfoque más humano, personalizado y seguro para los pacientes en Zaragoza. Descubre cómo la enfermería a domicilio mejora la salud y calidad de vida de personas mayores y convalecientes.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-02-10",
    author: "Laura Pueyo",
    blocks: [
      {
        type: "paragraph",
        text: "La atención médica ha evolucionado significativamente en las últimas décadas, y uno de los avances más destacados es la consolidación de la enfermería a domicilio. Este servicio no solo proporciona cuidados de salud profesionales, sino que aporta una calidez humana indispensable para la recuperación del paciente en Zaragoza."
      },
      {
        type: "heading2",
        text: "¿Qué es la enfermería a domicilio?"
      },
      {
        type: "paragraph",
        text: "La enfermería a domicilio consiste en la prestación de servicios sanitarios directamente en el hogar del paciente. Abarca desde cuidados esenciales como la administración de inyectables o realización de analíticas de sangre, hasta tratamientos complejos de curas de heridas y acompañamiento de enfermos crónicos."
      },
      {
        type: "quote",
        text: "Recibir atención médica en el propio hogar reduce la ansiedad hospitalaria y acelera la recuperación de los pacientes.",
        bgColor: "#EFF6FF",
        borderColor: "#2563EB",
        textColor: "#1E40AF"
      },
      {
        type: "heading2",
        text: "Principales ventajas de los cuidados en el hogar"
      },
      {
        type: "paragraph",
        text: ":-Atención 100% personalizada-Entorno cómodo y familiar-Menor riesgo de infecciones hospitalarias-Flexibilidad horaria sin esperas-Apoyo constante a los familiares cuidadores"
      },
      {
        type: "heading2",
        text: "Atención individualizada y cercana"
      },
      {
        type: "paragraph",
        text: "A diferencia de un entorno hospitalario donde el personal atiende a múltiples pacientes simultáneamente, la enfermera en casa se dedica en exclusiva a una persona. Esto permite detectar precozmente cualquier alteración en la salud y adaptar el tratamiento día a día."
      },
      {
        type: "heading2",
        text: "Servicios habituales de enfermería en casa en Zaragoza"
      },
      {
        type: "paragraph",
        text: "1. Curas de heridas complejas y úlceras por presión.\n2. Inyectables intramusculares, subcutáneos e intravenosos.\n3. Extracción de sangre para analíticas de laboratorio.\n4. Control diario de constantes vitales (tensión arterial, glucosa, saturación).\n5. Retirada de puntos de sutura o grapas quirúrgicas."
      },
      {
        type: "cta",
        text: "Solicitar Consulta Sanitaria a Domicilio por WhatsApp",
        url: "https://wa.me/34641635705",
        bgColor: "#10B981",
        textColor: "#FFFFFF"
      }
    ]
  },
  {
    id: "2",
    title: "Cuidado de salud en casa: Enfermera en Zaragoza",
    slug: "cuidado-de-salud-en-casa-enfermera-en-zaragoza",
    description: "Guía esencial para elegir la mejor atención de enfermería a domicilio en Zaragoza. Cuidados posoperatorios, seguimiento de patologías crónicas y apoyo familiar integral.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-02-10",
    author: "Laura Pueyo",
    blocks: [
      {
        type: "paragraph",
        text: "La atención de salud en el hogar se ha convertido en la solución idónea para familias en Zaragoza que buscan profesionalidad, comodidad y atención médica sin desplazamientos."
      },
      {
        type: "heading2",
        text: "La importancia de la atención sanitaria personalizada"
      },
      {
        type: "paragraph",
        text: "El hogar ofrece un refugio de tranquilidad donde los tratamientos médicos se viven con menor angustia. La presencia de una enfermera titulada garantiza que los tratamientos se apliquen con máxima rigurosidad técnica."
      },
      {
        type: "heading2",
        text: "Servicios sanitarios destacados"
      },
      {
        type: "paragraph",
        text: ":-Curas de quirúrgicas y quemaduras-Administración de fármacos prescritos-Monitoreo de azúcar en sangre e hipertensión-Educación sanitaria para el autocuidado"
      },
      {
        type: "quote",
        text: "Un buen plan de cuidados en casa no solo sana el cuerpo, sino que brinda paz mental a toda la familia.",
        bgColor: "#F0FDF4",
        borderColor: "#10B981",
        textColor: "#065F46"
      },
      {
        type: "cta",
        text: "Contactar con Enfermera Colegiada en Zaragoza",
        url: "https://wa.me/34641635705",
        bgColor: "#10B981",
        textColor: "#FFFFFF"
      }
    ]
  },
  {
    id: "3",
    title: "Curas y tratamiento de heridas a domicilio en Zaragoza",
    slug: "curas-y-tratamiento-de-heridas-a-domicilio",
    description: "Tratamiento profesional de úlceras por presión, heridas quirúrgicas y quemaduras en el hogar. Evita infecciones y acelera la cicatrización con atención especializada.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-02-10",
    author: "Laura Pueyo",
    blocks: [
      {
        type: "paragraph",
        text: "La correcta cicatrización de una herida requiere técnica estéril, apósitos de última generación y un seguimiento riguroso por parte de una enfermera especializada."
      },
      {
        type: "heading2",
        text: "Tipos de heridas tratadas en casa"
      },
      {
        type: "paragraph",
        text: ":-Úlceras por presión (UPP) en encamados-Heridas posquirúrgicas con puntos o grapas-Quemaduras domésticas de grado I y II-Úlceras vasculares o diabéticas"
      },
      {
        type: "quote",
        text: "⚠️ La prevención de infecciones es la clave para una rápida regeneración tisular.",
        bgColor: "#FEF2F2",
        borderColor: "#EF4444",
        textColor: "#991B1B"
      },
      {
        type: "heading2",
        text: "Pasos de una cura estéril a domicilio"
      },
      {
        type: "paragraph",
        text: "1. Higiene rigurosa y desinfección de la zona con antisépticos adecuados.\n2. Desbridamiento de tejido desvitalizado si es necesario.\n3. Elección de apósitos hidrocoloides, de plata o alginato según la humedad.\n4. Fijación y vendaje de protección."
      },
      {
        type: "cta",
        text: "Pedir Cita para Curas de Heridas en Zaragoza",
        url: "https://wa.me/34641635705",
        bgColor: "#10B981",
        textColor: "#FFFFFF"
      }
    ]
  },
  {
    id: "4",
    title: "Primeros auxilios en casa: qué hacer ante emergencias",
    slug: "primeros-auxilios-en-casa-qu-hacer-ante-emergencias",
    description: "Guía práctica de primeros auxilios domésticos: cómo actuar ante caídas, quemaduras, cortes, atragantamientos y pérdidas de conocimiento en el hogar.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-02-10",
    author: "Laura Pueyo",
    blocks: [
      {
        type: "paragraph",
        text: "En cualquier hogar pueden ocurrir accidentes inesperados: una caída, una quemadura o un atragantamiento. Saber cómo actuar en esos primeros minutos es fundamental para evitar complicaciones. En esta guía te explicamos de forma clara y práctica cómo actuar ante las emergencias más comunes en casa, especialmente en personas mayores."
      },
      {
        type: "heading2",
        text: "Accidentes domésticos más frecuentes"
      },
      {
        type: "paragraph",
        text: "Los accidentes en casa son muy habituales, sobre todo en personas mayores. :-Caídas y contusiones-Heridas y cortes-Quemaduras por líquidos calientes o fuego-Atragantamientos-Pérdida de conocimiento o lipotimias"
      },
      {
        type: "quote",
        text: "Actuar con calma y seguir los pasos adecuados en los primeros 5 minutos puede salvar vidas.",
        bgColor: "#EFF6FF",
        borderColor: "#2563EB",
        textColor: "#1E40AF"
      },
      {
        type: "heading2",
        text: "🩹 Qué hacer ante una herida doméstica"
      },
      {
        type: "paragraph",
        text: "1. Lávate bien las manos con agua y jabón.\n2. Limpia la herida suavemente con suero fisiológico o agua limpia.\n3. Aplica antiséptico transparente (clorhexidina).\n4. Cubre con un apósito o gasa estéril."
      },
      {
        type: "quote",
        text: "⚠️ Evita usar alcohol directamente en heridas abiertas ya que quema los tejidos y retrasa la curación.",
        bgColor: "#FEF2F2",
        borderColor: "#EF4444",
        textColor: "#991B1B"
      },
      {
        type: "heading2",
        text: "🔥 Qué hacer ante una quemadura"
      },
      {
        type: "paragraph",
        text: "1. Enfría la zona afectada con agua corriente durante 10 a 15 minutos.\n2. No apliques remedios caseros como pasta de dientes, aceite o mantequilla.\n3. Cubre con una gasa estéril sin comprimir.\n4. Consulta con personal sanitario si salen ampollas o el dolor es intenso."
      },
      {
        type: "heading2",
        text: "🚶 Qué hacer ante una caída de una persona mayor"
      },
      {
        type: "paragraph",
        text: "1. No levantes a la persona de inmediato.\n2. Pregúntale dónde le duele y evalúa su respuesta.\n3. Observa si puede mover brazos y piernas.\n4. Si no hay dolor agudo ni deformidad, ayúdala a reincorporarse despacio."
      },
      {
        type: "paragraph",
        text: "⚠️ Acude a Urgencias o llama al 112 si hay golpe en la cabeza, mareo o imposibilidad de mover un miembro."
      },
      {
        type: "heading2",
        text: "🍽️ Qué hacer ante un atragantamiento"
      },
      {
        type: "paragraph",
        text: "- Si la persona tose: anímala a seguir tosiendo con fuerza.\n- Si no puede respirar ni emitir voz: da 5 golpes secos en la espalda entre los escápulas.\n- Si persiste la obstrucción: realiza la maniobra de Heimlich en el abdomen."
      },
      {
        type: "heading2",
        text: "❤️ Cómo prevenir accidentes en el hogar"
      },
      {
        type: "paragraph",
        text: ":-Mantener pasillos y baños muy bien iluminados-Fijar o retirar alfombras resbaladizas-Usar calzado cerrado con suela antideslizante-Contar con un botiquín de primeros auxilios actualizado"
      },
      {
        type: "cta",
        text: "Solicitar Asistencia o Valoración a Domicilio",
        url: "https://wa.me/34641635705",
        bgColor: "#10B981",
        textColor: "#FFFFFF"
      }
    ]
  }
];

fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
console.log('Successfully updated blogs with aesthetic structured content!');
