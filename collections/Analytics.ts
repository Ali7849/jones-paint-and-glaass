import type { GlobalConfig } from 'payload'

const Analytics: GlobalConfig = {
  slug: 'analytics',
  label: 'Analytics & Tags',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'gtmEnabled',
      type: 'checkbox',
      label: 'Enable Google Tag Manager',
      defaultValue: false,
    },
    {
      name: 'gtmId',
      type: 'text',
      label: 'GTM Container ID',
      admin: {
        description: 'e.g. GTM-5GW5LRRW',
        condition: (data) => data?.gtmEnabled,
      },
      validate: (value: any, { siblingData }: any) => {
        if (!siblingData?.gtmEnabled) return true
        if (!value) return 'Container ID is required when GTM is enabled'
        if (!/^GTM-[A-Z0-9]+$/.test(value)) {
          return 'Must look like GTM-XXXXXXX'
        }
        return true
      },
    },
    {
      name: 'ga4Id',
      type: 'text',
      label: 'GA4 Measurement ID (optional)',
      admin: {
        description: 'e.g. G-XXXXXXXXXX — only if not already firing through GTM',
      },
    },
  ],
}

export default Analytics