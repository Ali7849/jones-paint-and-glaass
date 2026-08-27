import type { CollectionConfig } from 'payload'

const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'from',
    group: 'Settings',
    defaultColumns: ['from', 'to', 'type', 'updatedAt'],
    description: 'Manage URL redirects across the site.',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      label: 'From URL',
      required: true,
      unique: true,
      admin: {
        description: 'e.g. /old-page or /products/old-name',
      },
    },
    {
      name: 'to',
      type: 'text',
      label: 'To URL',
      required: true,
      admin: {
        description: 'e.g. /new-page or https://external-site.com',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Redirect Type',
      defaultValue: '308',
      required: true,
      options: [
        { label: '301 — Permanent', value: '301' },
        { label: '302 — Temporary', value: '302' },
      ],
      admin: {
        description: 'Use 301 for permanent, 302 for temporary redirects.',
      },
    },
  ],
}

export default Redirects