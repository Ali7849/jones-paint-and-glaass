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
      validate: (value: string | string[] | null | undefined) => {
        if (Array.isArray(value)) {
          return value.every((item) => !!item && item.startsWith('/')) || 'From URL must start with /'
        }
        if (!value || !value.startsWith('/')) return 'From URL must start with /'
        return true
      },
      admin: {
        description: 'e.g. /old-page or /products/old-name',
      },
    },
    {
      name: 'to',
      type: 'text',
      label: 'To URL',
      required: true,
      validate: (value: string | string[] | null | undefined, { siblingData }: any) => {
        const toValue = Array.isArray(value) ? value[0] : value
        if (toValue && siblingData?.from && toValue === siblingData.from) {
          return 'To URL cannot be the same as From URL (redirect loop)'
        }
        return true
      },
      admin: {
        description: 'e.g. /new-page or https://external-site.com',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Redirect Type',
      required: true,
      defaultValue: '301',
      options: [
        { label: '301 (Permanent)', value: '301' },
        { label: '302 (Temporary)', value: '302' },
        { label: '307 (Temporary, method preserved)', value: '307' },
        { label: '308 (Permanent, method preserved)', value: '308' },
      ],
      admin: {
        description: 'Determines whether the redirect is permanent or temporary.',
      },
    },
  ],
}

export default Redirects