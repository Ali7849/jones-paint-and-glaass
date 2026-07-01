import type { CollectionConfig } from 'payload'

const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    group: 'Pages',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'e.g. "how-to-paint" → /blog/how-to-paint',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
      label: 'Hero Image',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author Name',
      defaultValue: 'Jones Paint & Glass',
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
    },
    {
      name: 'readTime',
      type: 'text',
      label: 'Read Time',
      defaultValue: '5 min read',
    },
    {
      name: 'category',
      type: 'text',
      label: 'Category',
    },
    {
      name: 'keywords',
      type: 'array',
      label: 'Keywords',
      fields: [
        {
          name: 'keyword',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'content',
      type: 'richText',
    },
  ],
}

export default Blogs