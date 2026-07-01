import type { Block } from 'payload'

export const FeatureCardsBlock: Block = {
  slug: 'featureCards',
  imageURL: '/assets/blocks-preview/featurecards.png',
  labels: {
    singular: 'Feature Cards Block',
    plural: 'Feature Cards Blocks',
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Residential',
    },
    {
      name: 'subheading',
      type: 'text',
      defaultValue: 'Types of Residential Windows',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Cards',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'type',
          type: 'text',
          required: true,
          admin: { description: 'Card title/type label' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
        {
          name: 'desc',
          type: 'textarea',
          required: true,
          admin: { description: 'Card description text' },
        },
      ],
    },
  ],
}