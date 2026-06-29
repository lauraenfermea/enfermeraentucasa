export default {
  name: 'ctaBanner',
  title: 'CTA Banner Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Heading',
      type: 'string',
      initialValue: 'Únete a nuestra comunidad de atención',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Brand Primary (Verde - Default)', value: 'brand-primary' },
          { title: 'White (Blanco)', value: 'white' },
          { title: 'Light Green (Verde Claro)', value: 'light-green' },
          { title: 'Light Gray (Gris Claro)', value: 'light-gray' }
        ]
      },
      initialValue: 'brand-primary'
    },
    {
      name: 'headingColor',
      title: 'Heading Color Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Default (Automático)', value: 'default' },
          { title: 'Brand Primary (Verde)', value: 'brand-primary' },
          { title: 'White (Blanco)', value: 'white' }
        ]
      },
      initialValue: 'default'
    },
    {
      name: 'desc',
      title: 'Description',
      type: 'text',
      initialValue: 'Solicite una consulta hoy y permítanos crear un plan de atención que se adapte perfectamente a su familia.',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'CTA Banner Block',
        subtitle: 'CTA Banner',
        media
      }
    }
  }
}
