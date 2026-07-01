import type { Block } from 'payload'

export const ProductServicesBlock: Block = {
  slug: 'productServices',
  imageURL: '/assets/blocks-preview/services.png',
  labels: {
    singular: 'Product Services Block',
    plural: 'Product Services Blocks',
  },
  admin: {
    group: 'Content Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Products & Services',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Paint and glass are in our name, but our offerings expand beyond just that. We also do both commercial and residential doors and garage doors.',
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Get a Quote',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '#',
        },
      ],
      defaultValue: [
        {
          title: 'Paint',
          link: '#',
        },
        {
          title: 'Windows & Glass',
          link: '#',
        },
        {
          title: 'Doors',
          link: '#',
        },
        {
          title: 'Garage Doors',
          link: '#',
        },
      ],
    },
  ],
}