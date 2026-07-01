import type { Block } from 'payload'

export const LocationInfoBlock: Block = {
  slug: 'locationInfo',
  imageURL: '/assets/blocks-preview/locationinfo.png',
  labels: {
    singular: 'Location Info Block',
    plural: 'Location Info Blocks',
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'contactLabel',
      type: 'text',
      label: 'Contact Label',
      defaultValue: 'Contact Store',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
      label: 'Street Address',
      required: true,
    },
    {
      name: 'cityStateZip',
      type: 'text',
      label: 'City, State Zip',
      required: true,
    },
    {
      name: 'hoursLabel',
      type: 'text',
      label: 'Hours Label',
      defaultValue: 'Store Hours',
    },
    {
      name: 'hoursMonFri',
      type: 'text',
      label: 'Monday - Friday Hours',
      defaultValue: '7:30 AM - 5:30 PM',
    },
    {
      name: 'hoursSaturday',
      type: 'text',
      label: 'Saturday Hours',
      defaultValue: '8:00 AM - 12:00 PM',
    },
    {
      name: 'hoursSunday',
      type: 'text',
      label: 'Sunday Hours',
      defaultValue: 'Closed',
    },
    {
      name: 'contactButtonText',
      type: 'text',
      label: 'Contact Button Text',
      defaultValue: 'Contact Us',
    },
    {
      name: 'contactButtonLink',
      type: 'text',
      label: 'Contact Button Link',
      defaultValue: '#',
    },
    {
      name: 'directionsButtonText',
      type: 'text',
      label: 'Directions Button Text',
      defaultValue: 'Get Directions',
    },
    {
      name: 'directionsLink',
      type: 'text',
      label: 'Google Maps / Directions Link',
      defaultValue: '#',
    },
  ],
}