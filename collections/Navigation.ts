import type { GlobalConfig } from 'payload'

const Navigation: GlobalConfig = {
  slug: 'navigation',
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
          name: 'href',
          type: 'text',
          label: 'Page Link (Slug)',
          admin: {
            description: 'e.g. /media — this makes the label itself clickable',
          },
        },
        {
          name: 'autoSource',
          type: 'select',
          label: 'Auto-fill From',
          admin: {
            description:
              'If you leave Dropdown Items empty below, every entry from this collection is listed automatically.',
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
          options: [
            { label: 'None — add items manually', value: 'none' },
            { label: 'All Doors', value: 'doors' },
            { label: 'All Paint', value: 'paint' },
            { label: 'All Glass', value: 'glass' },
            { label: 'All Locations', value: 'locations' },
          ],
          defaultValue: 'none',
        },
        {
          name: 'items',
          type: 'array',
          label: 'Dropdown Items',
          admin: {
            description:
              'Pick a page, or type a link manually. Leave this list empty to use Auto-fill above.',
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
          },
          fields: [
            {
              name: 'reference',
              type: 'relationship',
              label: 'Pick a Page',
              relationTo: ['doors', 'paint', 'glass', 'locations', 'pages'] as any,
              admin: {
                description:
                  'Search and select. Label and link are taken from the page unless you override them below.',
              },
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              admin: {
                description: 'Leave empty to use the selected page name.',
              },
            },
            {
              name: 'href',
              type: 'text',
              label: 'Link (Slug)',
              admin: {
                description:
                  'Leave empty to use the selected page slug. Fill this in for external or custom links.',
              },
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