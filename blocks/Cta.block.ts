import type { Block } from 'payload'

export const CtaBlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'CTA Block',
    plural: 'CTA Blocks',
  },
  admin: {
    group: 'Content Sections',
  },
  fields: [
    {
      name: 'text',
      type: 'text',
      label: 'CTA Text',
      defaultValue: 'Looking for garage doors?',
      required: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'See Garage Doors',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
      defaultValue: '#',
    },
  ],
}