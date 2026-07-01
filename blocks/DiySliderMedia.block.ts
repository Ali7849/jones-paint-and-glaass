import type { Block } from 'payload'

export const DiySliderMediaBlock: Block = {
  slug: 'diySliderMedia',
  imageURL: '/assets/blocks-preview/diysliderlight.png',
  labels: {
    singular: 'DIY Slider Light',
    plural: 'DIY Sliders Light',
  },
  admin: {
    group: 'Sliders',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Get More DIY Tips & Ideas',
      required: true,
      admin: {
        description: 'Main heading for the slider section',
      },
    },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue: 'Follow us on social media for how-to videos and product info from the same pros who will help you in our stores.',
      admin: {
        description: 'Subheading/description text',
      },
    },
    {
      name: 'showInstagram',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Instagram Tab',
      admin: {
        description: 'Display Instagram button in the section',
      },
    },
    {
      name: 'showTiktok',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show TikTok Tab',
      admin: {
        description: 'Display TikTok button in the section',
      },
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Slides',
      minRows: 1,
      admin: {
        description: 'Add slides to display in the slider',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Slide Name',
          admin: {
            description: 'Name or title for this slide',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
          admin: {
            description: 'Image to display in the slide',
          },
        },
      ],
    },
  ],
}