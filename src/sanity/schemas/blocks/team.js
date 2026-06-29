export default {
  name: 'team',
  title: 'Team Block',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: '¿Quienes somos?',
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
      initialValue: 'light-green'
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
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      initialValue: 'Sobre nosotras:',
    },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'colegiada', title: 'Colegiada', type: 'string' },
            { name: 'experience', title: 'Experience', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
          ]
        }
      ],
      initialValue: [
        {
          name: 'Laura Pueyo',
          colegiada: 'Colegiada 16521',
          experience: '+8 años de experiencia'
        },
        {
          name: 'Karen Mira',
          colegiada: 'Colegiada 20474',
          experience: '+6 años de experiencia'
        }
      ]
    },
    {
      name: 'bio',
      title: 'Biography Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      initialValue: [
        '<strong>Enfermeras desde 2015</strong> con experiencia en España y otros lugares (Reino Unido, Colombia y EU).',
        'Ahora en Zaragoza queremos ayudar a esas personas con dificultad de desplazamiento o saturación del sistema, por ello nace <strong>"Enfermera en tu casa"</strong>.',
        'Ofrecemos una atención cercana, profesional y de calidad con una dedicación de primera mano.',
        'Sabemos que cuidar no solo es aplicar técnicas, <em>es estar presentes cuando más se necesita</em>.'
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Team Block',
        subtitle: 'Team',
      }
    }
  }
}
