export default {
  name: 'reviews',
  title: 'Reviews Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Reseñas en Google',
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
      initialValue: 'light-gray'
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
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      initialValue: 5.0,
    },
    {
      name: 'reviewsCount',
      title: 'Reviews Count Label',
      type: 'string',
      initialValue: '(5 reseñas)',
    },
    {
      name: 'reviewsList',
      title: 'Reviews List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'initial', title: 'Initial Letter', type: 'string' },
            { name: 'avatarBg', title: 'Avatar Background Color', type: 'string', description: 'Hex or color name' },
            { name: 'text', title: 'Review Text', type: 'text' },
            { name: 'rating', title: 'Rating Stars (1-5)', type: 'number', initialValue: 5 },
            { name: 'date', title: 'Relative Date (e.g. Hace 1 semana)', type: 'string' }
          ]
        }
      ],
      initialValue: [
        {
          name: "Maria Dolores",
          initial: "M",
          avatarBg: "#e57373",
          text: "Muy buena experiencia. Contactamos para un familiar y el trato fue muy cercano y profesional. La atención en casa nos dio mucha tranquilidad y todo fue muy cómodo.",
          rating: 5,
          date: "Hace un mes"
        },
        {
          name: "C. de día Mayores Sonrisas",
          initial: "C",
          avatarBg: "#81c784",
          text: "impartieron una charla en nuestro centro de día, muy interesante y útil. Muchas gracias por vuestra labor y atención.",
          rating: 5,
          date: "Hace 3 semanas"
        },
        {
          name: "jason",
          initial: "J",
          avatarBg: "#64b5f6",
          text: "Me han puesto la inyección en casa, la verdad muy cómodo no tener que esperar ir al centro de salud, ha venido la chica en las fechas y horas que les pedí y genial. Lo recomiendo.",
          rating: 5,
          date: "Hace un mes"
        },
        {
          name: "Ela",
          initial: "E",
          avatarBg: "#ffb74d",
          text: "Muy buen servicio, con trato muy cercano.",
          rating: 5,
          date: "Hace 3 semanas"
        },
        {
          name: "Eduardo Bermudo",
          initial: "E",
          avatarBg: "#ba68c8",
          text: "Las dos enfermeras fueron muy amables y atentas con mi madre, puntuales and muy profesionales.",
          rating: 5,
          date: "Hace un mes"
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
        title: title || 'Reviews Block',
        subtitle: 'Reviews',
      }
    }
  }
}
