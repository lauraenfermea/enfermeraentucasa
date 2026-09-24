export default {
  name: 'services',
  title: 'Services Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Servicios',
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
      name: 'servicesList',
      title: 'Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
          ],
        }
      ],
      initialValue: [
        {
          title: 'Curas y valoración de heridas',
          desc: 'Tratamiento de heridas y úlceras por presión (UPP), seguimiento de la cicatrización, educación para la salud y prevención. Retirada de puntos o grapas.'
        },
        {
          title: 'Inyectables y Medicación',
          desc: 'Administración segura de medicación intravenosa, intramuscular o subcutánea siguiendo estrictamente las pautas médicas.'
        },
        {
          title: 'Extracciones de analíticas a domicilio',
          desc: 'Realizamos extracciones de sangre y recogida de muestras en la comodidad de tu hogar, evitando desplazamientos y esperas.'
        },
        {
          title: 'Servicio de cuidadoras a domicilio',
          desc: 'Acompañamiento y cuidados a domicilio para personas que necesitan apoyo en su día a día. Contamos con cuidadoras para ayudar en las actividades diarias y ofrecer compañía y atención en el hogar, de forma puntual o continuada.'
        },
        {
          title: 'Control de Constantes',
          desc: 'Monitorización integral de presión arterial, frecuencia cardíaca, saturación de oxígeno y niveles de glucosa. Seguimiento de hipertensión en embarazadas.'
        },
        {
          title: 'Cuidados del recién nacido',
          desc: 'Higiene del cordón, cura de heridas. Primeros baños del recién nacido. Seguimiento de heridas (episiotomías, cesáreas...)'
        },
        {
          title: 'Sondas, drenajes y ostomías',
          desc: 'Mantenimiento, limpieza y cambio de sondas urinarias o nasogástricas, asegurando el confort total del paciente. Valoración de ostomías.'
        },
        {
          title: 'Formación en primeros auxilios',
          desc: '¿Sabrías cómo actuar ante una parada cardiorrespiratoria? Ofrecemos formación en primeros auxilios en Zaragoza.'
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
        title: title || 'Services Block',
        subtitle: 'Services',
      }
    },
  },
}
