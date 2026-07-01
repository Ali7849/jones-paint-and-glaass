import type { Block } from 'payload'

export const ExteriorServicesBlock: Block = {
  slug: 'exteriorServices',
  imageURL: '/assets/blocks-preview/exteriorservices.png',
  labels: {
    singular: 'Exterior Services Block',
    plural: 'Exterior Services Blocks',
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      defaultValue: 'Exterior Paint',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Products & Services',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: "Whether you know exactly what you're looking for or need a little guidance, Jones Paint & Glass has what you need.",
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Get a Quote',
    },
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'products',
      type: 'array',
      label: 'Product Rows',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          admin: { description: 'Small uppercase label e.g. PREP, PAINT, Finish' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
        {
          name: 'imageLeft',
          type: 'checkbox',
          defaultValue: true,
          admin: { description: 'Toggle image position — left or right' },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Bullet Points',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}