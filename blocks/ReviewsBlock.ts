import type { Block } from 'payload'

export const ReviewsBlock: Block = {
  slug: 'reviews',
  imageURL: '/assets/blocks-preview/reviews.png',

  labels: {
    singular: 'Reviews',
    plural: 'Reviews',
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Hear What Others Have to Say',
      required: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'We are proud to serve our neighbors and help bring their DIY and contractor projects to life!',
    },
    {
      name: 'reviews',
      type: 'array',
      label: 'Reviews',
      minRows: 1,
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          label: 'Review Quote',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Reviewer Name',
        },
      ],
    },
  ],
}