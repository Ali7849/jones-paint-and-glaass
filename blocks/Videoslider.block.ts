import type { Block } from 'payload'

export const VideoSliderBlock: Block = {
  slug: 'videoSlider',
  imageURL: '/assets/blocks-preview/videoslider.png',
  labels: {
    singular: 'Video Slider Block',
    plural: 'Video Slider Blocks',
  },
  admin: {
    group: 'Sliders',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Paint',
      required: true,
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'Paint Products & Services',
    },
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'videos',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          defaultValue: 'Video Title',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Description',
        },
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
      ],
      defaultValue: [
        { title: 'Video Title', description: 'Description' },
        { title: 'Video Title', description: 'Description' },
        { title: 'Video Title', description: 'Description' },
        { title: 'Video Title', description: 'Description' },
      ],
    },
  ],
}