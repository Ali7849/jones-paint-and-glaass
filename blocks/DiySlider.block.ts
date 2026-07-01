import type { Block } from 'payload'

export const DiySliderBlock: Block = {
  slug: 'diySlider',
  imageURL: '/assets/blocks-preview/diyslider.png',
  labels: {
    singular: 'DIY Slider',
    plural: 'DIY Sliders',
  },
  admin: {
    group: 'Sliders',
  },
  fields: [
    {
      name: 'darkBackground',
      type: 'checkbox',
      defaultValue: true,
      label: 'Dark Background',
      admin: {
        description: 'Toggle between dark (blue) and light (white) background',
      },
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Get More DIY Tips & Ideas',
      required: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'Follow us on social media for how-to videos and product info from the same pros who will help you in our stores.',
    },
    {
      name: 'showInstagram',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Instagram Tab',
    },
    {
      name: 'showTiktok',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show TikTok Tab',
    },
    {
      name: 'Background Vector Image',
      type: 'upload',
      relationTo: 'media' as any,
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Slide Name',
        },
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