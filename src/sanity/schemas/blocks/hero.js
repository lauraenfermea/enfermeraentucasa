export default {
  name: 'hero',
  title: 'Hero Block',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Enfermera a domicilio en Zaragoza',
    },
    {
      name: 'body',
      title: 'Body Text',
      type: 'text',
      description: 'Main descriptive text below the heading.',
      initialValue: 'Atención sanitaria profesional en tu hogar.\n- Sin esperas ni desplazamientos.\n- Sin salas de espera y sin estrés; solo cuidados profesionales, personalizados y de calidad en tu hogar.',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Hero Block',
        subtitle: 'Hero',
        media,
      }
    },
  },
}
