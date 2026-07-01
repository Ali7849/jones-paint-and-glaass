import type { Block } from 'payload'

export const StoreLocationBlock: Block = {
  slug: 'storeLocation',
  imageURL: '/assets/blocks-preview/storelocation.png',

  labels: {
    singular: 'Store Location',
    plural: 'Store Locations',
  },
  admin: {
    group: 'Content',
  },
  fields: [
    // ── Header ──
    {
      name: 'locationLabel',
      type: 'text',
      defaultValue: 'Store Location',
      label: 'Label (above heading)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Store Name (e.g. American Fork)',
      defaultValue: 'American Fork',
    },
    {
      name: 'address',
      type: 'text',
      required: true,
      label: 'Full Address',
      defaultValue: '65 South 500 East American Fork, UT 84003',
    },
    {
      name: 'mapEmbedUrl',
      type: 'text',
      required: true,
      label: 'Google Maps Embed URL',
    },

    // ── Specialist ──
    {
      name: 'specialistName',
      type: 'text',
      label: 'Specialist Name',
      defaultValue: 'Dave Koch',
    },
    {
      name: 'specialistTitle',
      type: 'text',
      label: 'Specialist Title',
      defaultValue: 'Store Manager',
    },
    {
      name: 'specialistImage',
      type: 'upload',
      relationTo: 'media' as any,
      label: 'Specialist Photo',
    },

    // ── Hero card ──
    {
      name: 'heroCardLabel',
      type: 'text',
      defaultValue: 'Products & Services',
      label: 'Blue Card Label',
    },
    {
      name: 'heroCardHeading',
      type: 'text',
      defaultValue: 'From Inspiration to Installation',
      label: 'Blue Card Heading',
    },
    {
      name: 'heroCardText',
      type: 'textarea',
      defaultValue:
        'Our team will make sure you not only have the products you need, but a solid plan to go with them.',
      label: 'Blue Card Description',
    },

    // ── Service cards ──
    {
      name: 'services',
      type: 'array',
      label: 'Service Cards',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Service Title',
        },
        {
          name: 'href',
          type: 'text',
          defaultValue: '#',
          label: 'Learn More Link',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
          label: 'Service Image',
        },
      ],
    },
  ],
}