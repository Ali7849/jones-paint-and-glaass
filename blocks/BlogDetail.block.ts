import type { Block } from 'payload'

export const BlogDetail: Block = {
  slug: 'blogDetail',
  imageURL: '/assets/blocks-preview/blogdetail.png',
  labels: {
    singular: 'Blog Detail Block',
    plural: 'Blog Detail Blocks',
  },
  admin: {
    group: 'Blog Section',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Top Label',
      defaultValue: 'OUR BLOG',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'The Crash Course',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      defaultValue: 'Jones Paint & Glass Blog',
    },
    
  ],
}