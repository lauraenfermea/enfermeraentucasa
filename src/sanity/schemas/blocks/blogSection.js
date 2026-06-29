export default {
  name: 'blogSection',
  title: 'Blog Section Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Últimos Artículos',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      initialValue: 'Descubre consejos, guías y noticias sobre el cuidado de la salud en el hogar.',
    }
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Blog Section Block',
        subtitle: 'Blog Section',
      }
    }
  }
}
