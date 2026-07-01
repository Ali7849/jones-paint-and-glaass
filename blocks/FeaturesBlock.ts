import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
  imageURL: '/assets/blocks-preview/features.png',
  labels: {
    singular: 'Features',
    plural: 'Features',
  },
  admin: {
    group: 'Content Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Online Ease vs. In-Store Expertise',
      required: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'Ordering online is fast, but it leads to lots of redo\'s when you don\'t know quite what you need. We sell our products in-store. It takes a bit more time, but a chat with our friendly experts will actually save you time in the long run!',
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Feature Cards',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Card Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Card Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
          label: 'Card Image',
        },
      ],
    },
  ],
}