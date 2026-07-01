import type { Block } from 'payload'

export const JpgMedia: Block = {
  slug: 'jpgMedia',
  imageURL: '/assets/blocks-preview/media.png',
  labels: {
    singular: 'JP&G Media Block',
    plural: 'JP&G Media Blocks',
  },
  admin: {
    group: 'Content Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'JP&G Media',
      required: true,
    },
    {
      name: 'mediaItems',
      type: 'array',
      label: 'Media Items',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
        {
          name: 'helpText',
          type: 'text',
          defaultValue: 'Help Me With',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '#',
        },
      ],
    },
  ],
}