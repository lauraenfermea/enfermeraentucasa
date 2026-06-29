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
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO',
        }
      ]
    },
    {
      name: 'content',
      title: 'Article Content',
      type: 'array',
      of: [
        // Rich text block
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
            { title: 'Code', value: 'code' },
          ],
          lists: [
            { title: 'Bullet List', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strikethrough', value: 'strike-through' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              // Hyperlink
              {
                name: 'link',
                type: 'object',
                title: 'Hyperlink',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
              // Text color
              {
                name: 'textColor',
                title: 'Text Color',
                type: 'color',
              },
              // Highlight / background color
              {
                name: 'highlightColor',
                title: 'Highlight Color',
                type: 'color',
              },
            ],
          },
        },
        // Inline image with caption
        {
          type: 'image',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image',
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
              description: 'Optional caption shown below the image',
            },
          ],
        },
      ],
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

