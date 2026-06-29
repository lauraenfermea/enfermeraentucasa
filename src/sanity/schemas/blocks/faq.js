export default {
  name: 'faq',
  title: 'FAQ Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Preguntas Frecuentes',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'White (Blanco)', value: 'white' },
          { title: 'Light Green (Verde Claro)', value: 'light-green' },
          { title: 'Light Gray (Gris Claro)', value: 'light-gray' },
          { title: 'Brand Primary (Verde Principal)', value: 'brand-primary' }
        ]
      },
      initialValue: 'white'
    },
    {
      name: 'headingColor',
      title: 'Heading Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Default (Oscuro)', value: 'default' },
          { title: 'Brand Primary (Verde)', value: 'brand-primary' },
          { title: 'White (Blanco)', value: 'white' }
        ]
      },
      initialValue: 'default'
    },
    {
      name: 'faqsList',
      title: 'FAQs List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' }
          ]
        }
      ],
      initialValue: [
        {
          question: '¿Cuándo debería solicitar una enfermera a domicilio en Zaragoza?',
          answer: 'Después de una cirugía, ante una herida que necesita seguimiento, para administrar medicación, realizar analíticas o controlar constantes. También si deseas evitar esperas o desplazamientos.'
        },
        {
          question: '¿Las enfermeras están cualificadas?',
          answer: 'Sí. Somos enfermeras tituladas y colegiadas, con experiencia en diferentes áreas sanitarias y un enfoque profesional y humano.'
        },
        {
          question: '¿Puedo solicitar el servicio tras el alta hospitalaria?',
          answer: 'Sí, es uno de los motivos más habituales. Garantiza continuidad en los cuidados y reduce el riesgo de complicaciones.'
        },
        {
          question: '¿Cómo puedo reservar una cita?',
          answer: 'Es muy sencillo. Solo tienes que contactar con nosotras llamando a nuestro teléfono 641 63 57 05 o enviándonos un WhatsApp. Te responderemos rápidamente.'
        },
        {
          question: '¿Cómo se realizan los pagos?',
          answer: 'Aceptamos diversas formas de pago para tu mayor comodidad y la de tu familia: Bizum, transferencia bancaria o en efectivo tras finalizar el servicio prestado en tu propio domicilio.'
        },
        {
          question: '¿En qué zonas de Zaragoza trabajáis?',
          answer: 'Prestamos servicios en Zaragoza centro urbano. Llevamos la atención sanitaria profesional directamente a tu hogar para evitarte desplazamientos innecesarios y mayor comodidad.'
        },
        {
          question: '¿Cuál es vuestro horario de atención?',
          answer: 'Atendemos de lunes a domingo con flexibilidad horaria total. Nuestro objetivo es adaptarnos a tu ritmo y al de tu familia, pactando las visitas en el momento que mejor os convenga para garantizar unos cuidados sin esperas.'
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'FAQ Block',
        subtitle: 'FAQ',
      }
    }
  }
}
