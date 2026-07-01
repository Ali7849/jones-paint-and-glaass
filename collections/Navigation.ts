import type { GlobalConfig } from 'payload'

const Navigation: GlobalConfig = {
  slug: 'navigation',
  admin: {
    group: 'Settings',

  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user, // ✅ any logged in user can update
  },
  fields: [
    {
      name: 'logo',
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
      name: 'navItems',
      type: 'array',
      label: 'Nav Items',
      fields: [
        {
          name: 'type',
          type: 'select',
          options: ['link', 'dropdown'],
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label / Title',
          required: true,
        },
        {
          // ✅ shown for BOTH link and dropdown
          name: 'href',
          type: 'text',
          label: 'Page Link (Slug)',
          admin: {
            description: 'e.g. /media — this makes the label itself clickable',
          },
        },
        {
          name: 'items',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            description: 'Add sub-links that appear in the dropdown menu',
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
            {
              name: 'href',
              type: 'text',
              label: 'Link (Slug)',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Description (optional)',
            },
          ],
        },
      ],
    },
  ],
}

export default Navigation