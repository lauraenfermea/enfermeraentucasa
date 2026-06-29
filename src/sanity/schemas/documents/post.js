export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
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
      name: 'description',
      title: 'Excerpt / Description',
      type: 'text',
      description: 'Short summary of the article, shown in lists.',
      validation: (rule) => rule.required(),
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'content',
      title: 'Article Content',
      type: 'text',
      description: 'The body of your article. Use double newlines (press Enter twice) to create separate paragraphs.',
      validation: (rule) => rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
