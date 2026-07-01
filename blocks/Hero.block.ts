import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  imageURL: '/assets/blocks-preview/hero.png',
  labels: {
    singular: 'Hero Block',
    plural: 'Hero Blocks',
  },
  
   admin: {
    group: 'Hero Section',
  },
  fields: [
    {
      name: 'topLineText',
      type: 'text',
      defaultValue: 'BEFORE YOU',
      required: true,
    },
    {
      name: 'bigLeftText',
      type: 'text',
      defaultValue: 'DIY',
      required: true,
    },
    {
      name: 'topRightText',
      type: 'text',
      defaultValue: 'MAKE SURE YOU',
      required: true,
    },
    {
      name: 'bigRightText',
      type: 'text',
      defaultValue: 'JP&G',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'DIY Tips & Tricks',
    },
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '/diy-tips',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
    },
  ],
}