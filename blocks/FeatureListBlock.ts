import type { Block } from 'payload'

export const FeatureListBlock: Block = {
  slug: 'featureList',
  imageURL: '/assets/blocks-preview/featuredlist.png',
  labels: {
    singular: 'Feature List',
    plural: 'Feature Lists',
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'How Exterior Paint Is Different',
      label: 'Heading',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
      label: 'Right Side Image',
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Feature Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Feature Description',
        },
        {
          name: 'boldText',
          type: 'text',
          label: 'Bold Text (optional, shown below description)',
        },
        {
          name: 'highlight',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show Blue Left Border',
        },
      ],
    },
  ],
}