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
            { name: 'date', title: 'Relative Date (e.g. Hace 1 semana)', type: 'string' },
            { name: 'ownerReply', title: 'Owner Reply (Optional)', type: 'string' }
          ]
        }
      ],
      initialValue: [
        {
          name: "María Dolores",
          initial: "M",
          avatarBg: "#e57373",
          text: "Una experiencia muy buena. Los contactamos para un familiar y el servicio fue muy amable y profesional. El servicio a domicilio nos dio mucha tranquilidad y todo fue muy cómodo.",
          rating: 5,
          date: "Hace un mes",
          ownerReply: "¡Gracias por tu comentario!"
        },
        {
          name: "Juan Camilo Valencia Escobar",
          initial: "J",
          avatarBg: "#4db6ac",
          text: "Muy amables y súper profesionales en su trabajo.",
          rating: 5,
          date: "Hace 5 días",
          ownerReply: "Gracias por tu comentario!"
        },
        {
          name: "Jason",
          initial: "J",
          avatarBg: "#64b5f6",
          text: "Me pusieron la inyección en casa, lo cual fue muy práctico, ya que no tuve que esperar para ir al centro de salud. La enfermera vino el día y la hora que le indiqué, y todo salió de maravilla. Lo recomiendo.",
          rating: 5,
          date: "Hace un mes"
        },
        {
          name: "Ela",
          initial: "E",
          avatarBg: "#ffb74d",
          text: "Muy buen servicio, con un trato muy amable.",
          rating: 5,
          date: "Hace un mes",
          ownerReply: "Gracias por tu comentario!"
        },
        {
          name: "C. de día Mayores Sonrisas",
          initial: "C",
          avatarBg: "#81c784",
          text: "Dieron una charla en nuestro centro de día, que fue muy interesante y útil. Muchas gracias por su trabajo y atención.",
          rating: 5,
          date: "Hace un mes",
          ownerReply: "Encantadas de ayudar!"
        },
        {
          name: "Eduardo Bermudo",
          initial: "E",
          avatarBg: "#ba68c8",
          text: "Las dos enfermeras fueron muy amables y atentas con mi madre, puntuales y muy profesionales.",
          rating: 5,
          date: "Hace un mes",
          ownerReply: "¡Gracias por el comentario!"
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
