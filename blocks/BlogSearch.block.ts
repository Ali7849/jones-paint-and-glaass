import type { Block } from 'payload'

export const BlogSearch: Block = {
  slug: 'blogSearch',
  imageURL: '/assets/blocks-preview/search.png',

  labels: {
    singular: 'Blog Search Block',
    plural: 'Blog Search Blocks',
  },
  admin: {
    group: 'Blog Section',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Looking for Something Specific?',
      required: true,
    },
    {
      name: 'placeholder',
      type: 'text',
      defaultValue: 'Search...',
      admin: { description: 'Input placeholder text' },
    },
  ],
}