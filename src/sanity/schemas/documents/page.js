export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (rule) => rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    },
    {
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'services' },
        { type: 'faq' },
        { type: 'rates' },
        { type: 'team' },
        { type: 'reviews' },
        { type: 'blogSection' },
        { type: 'ctaBanner' }
      ],
    },
  ],
}
