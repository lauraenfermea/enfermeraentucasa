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
      initialValue: '(6 reviews)',
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
            { name: 'reviewerReviewsCount', title: 'Reviewer Reviews Count (e.g. 3 reviews)', type: 'string' },
            { name: 'text', title: 'Review Text', type: 'text' },
            { name: 'rating', title: 'Rating Stars (1-5)', type: 'number', initialValue: 5 },
            { name: 'date', title: 'Relative Date (e.g. a month ago)', type: 'string' },
            { name: 'ownerReply', title: 'Owner Reply (Optional)', type: 'string' },
            { name: 'ownerReplyDate', title: 'Owner Reply Date (e.g. 2 days ago)', type: 'string' }
          ]
        }
      ],
      initialValue: [
        {
          name: "Maria Dolores",
          initial: "M",
          avatarBg: "#e57373",
          reviewerReviewsCount: "3 reviews",
          text: "Muy buena experiencia. Contactamos para un familiar y el trato fue muy cercano y profesional. La atención en casa nos dio mucha tranquilidad y todo fue muy cómodo.",
          rating: 5,
          date: "a month ago",
          ownerReply: "¡Gracias por tu comentario!",
          ownerReplyDate: "a month ago"
        },
        {
          name: "Juan Camilo Valencia Escobar",
          initial: "J",
          avatarBg: "#4db6ac",
          reviewerReviewsCount: "2 reviews",
          text: "Muy amables y super profesionales en su trabajo",
          rating: 5,
          date: "5 days ago",
          ownerReply: "Gracias por tu comentario!",
          ownerReplyDate: "2 days ago"
        },
        {
          name: "jason",
          initial: "J",
          avatarBg: "#64b5f6",
          reviewerReviewsCount: "1 review",
          text: "Me han puesto la inyección en casa, la verdad muy cómodo no tener que esperar ir al centro de salud, ha venido la chica en las fechas y horas que les pedí y genial. Lo recomiendo.",
          rating: 5,
          date: "Edited a month ago",
          ownerReply: "Gracias por tu comentario",
          ownerReplyDate: "a month ago"
        },
        {
          name: "Ela",
          initial: "E",
          avatarBg: "#ffb74d",
          reviewerReviewsCount: "3 reviews",
          text: "Muy buen servicio, con trato muy cercano.",
          rating: 5,
          date: "a month ago",
          ownerReply: "Gracias por tu comentario!",
          ownerReplyDate: "2 days ago"
        },
        {
          name: "C. de día Mayores Sonrisas",
          initial: "C",
          avatarBg: "#81c784",
          reviewerReviewsCount: "3 reviews",
          text: "impartieron una charla en nuestro centro de día, muy interesante y útil. Muchas gracias por vuestra labor y atención.",
          rating: 5,
          date: "a month ago",
          ownerReply: "Encantadas de ayudar!",
          ownerReplyDate: "2 days ago"
        },
        {
          name: "Eduardo Bermudo",
          initial: "E",
          avatarBg: "#ba68c8",
          reviewerReviewsCount: "2 reviews",
          text: "Las dos enfermeras fueron muy amables y atentas con mi madre, puntuales y muy profesionales.",
          rating: 5,
          date: "a month ago",
          ownerReply: "¡Gracias por el comentario!",
          ownerReplyDate: "2 days ago"
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
