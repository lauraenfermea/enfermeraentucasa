export default {
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      initialValue: 'Enfermera en tu casa',
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      initialValue: '+34 641 63 57 05',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'info@enfermeraentucasa.es',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Zaragoza',
    },
    {
      name: 'googleMapsUrl',
      title: 'Google Maps Link',
      type: 'url',
      initialValue: 'https://maps.app.goo.gl/mrgfGi4YZuDYp3yv6',
    },
    {
      name: 'whatsappLink',
      title: 'WhatsApp Chat Link',
      type: 'url',
      initialValue: 'https://wa.me/34641635705',
    },
    {
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Link Name', type: 'string' },
            { name: 'path', title: 'Link Path (e.g. /#services, /blog)', type: 'string' }
          ]
        }
      ],
      initialValue: [
        { name: 'Servicios', path: '/#services' },
        { name: 'Tarifas', path: '/#rates' },
        { name: 'Quienes somos', path: '/#quienes-somos' },
        { name: 'Contactar ahora', path: '/contact' },
        { name: 'Blog', path: '/blog' }
      ]
    }
  ]
}
