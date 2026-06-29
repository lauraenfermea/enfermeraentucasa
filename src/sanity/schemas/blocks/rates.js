export default {
  name: 'rates',
  title: 'Rates Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Tarifas',
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
      name: 'ratesList',
      title: 'Rates List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'price', title: 'Price', type: 'string' },
            { name: 'desc', title: 'Description', type: 'text' },
            { name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] },
            { name: 'recommended', title: 'Recommended?', type: 'boolean', initialValue: false }
          ]
        }
      ],
      initialValue: [
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
      ]
    },
    {
      name: 'bonosTitle',
      title: 'Bonos Title',
      type: 'string',
      initialValue: 'Bonos de Heparina'
    },
    {
      name: 'bonosList',
      title: 'Bonos Table Rows',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Bono Name', type: 'string' },
            { name: 'price', title: 'Precio por sesión', type: 'string' },
            { name: 'total', title: 'Total', type: 'string' },
            { name: 'saving', title: 'Ahorro', type: 'string' }
          ]
        }
      ],
      initialValue: [
        { name: 'Sesión individual', price: '35€', total: '35€', saving: '—' },
        { name: '7 sesiones*', price: '31€', total: '217€', saving: '28€' },
        { name: '10 sesiones*', price: '29€', total: '290€', saving: '60€' },
        { name: '20 sesiones*', price: '27€', total: '540€', saving: '160€' }
      ]
    },
    {
      name: 'bonosFooter',
      title: 'Bonos Footer Text',
      type: 'string',
      initialValue: '*Pago por adelantado, servicio a domicilio, cancelaciones con 24 horas de antelación.'
    },
    {
      name: 'consultTitle',
      title: 'Consult Card Title',
      type: 'string',
      initialValue: 'Bonos y Seguimiento'
    },
    {
      name: 'consultPrice',
      title: 'Consult Card Price',
      type: 'string',
      initialValue: 'Consultar'
    },
    {
      name: 'consultDesc',
      title: 'Consult Card Description',
      type: 'text',
      initialValue: 'Planes personalizados para cuidados continuados o crónicos.'
    },
    {
      name: 'consultFeatures',
      title: 'Consult Card Features',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Descuentos por volumen', 'Seguimiento programado', 'Atención prioritaria', 'Pack de tratamiento semanal']
    }
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Rates Block',
        subtitle: 'Rates',
      }
    }
  }
}
