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
      name: 'from',
      type: 'text',
      label: 'From URL',
      required: true,
      unique: true,
      validate: (value: string | string[] | null | undefined) => {
        if (Array.isArray(value)) {
          return value.every((item) => !!item && item.startsWith('/')) || 'From URL must start with /'
        }
        if (!value || !value.startsWith('/')) return 'From URL must start with /'
        return true
      },
      admin: {
        description: 'Must start with / e.g. /old-page',
      },
    },
  ],
}

export default Redirects