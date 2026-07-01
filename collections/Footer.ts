import type { GlobalConfig } from 'payload'

const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media' as any,
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media' as any,
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'Get a Quote',
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/contact',
    },
    {
      name: 'copyrightText',
      type: 'text',
      defaultValue: '© 2026 Jones Paint & Glass. All rights reserved.',
    },
    {
      name: 'homeLinks',
      type: 'array',
      label: 'Home Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media' as any,
        },
      ],
    },
  ],
}

export default Footer