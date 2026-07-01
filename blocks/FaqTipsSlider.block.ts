import type { Block } from 'payload'

export const FaqTipsSlider: Block = {
  slug: 'faqTipsSlider',
  imageURL: '/assets/blocks-preview/faqtips.png',
  labels: {
    singular: 'Diy Tips Slider',
    plural: 'Diy Tips Sliders',
  },
  admin: {
    group: 'Sliders',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Helpful Faq Tips',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'Got questions about your paint, glass, or door Faq project? Check out our latest how-to videos with tips from JP&G pros.',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'See More',
    },
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
      ],
    },
  ],
}