import type { Block } from 'payload'

export const ContactHeroBlock: Block = {
  slug: 'contactHero',
  imageURL: '/assets/blocks-preview/contacthero.png',

  labels: {
    singular: 'Contact Hero Block',
    plural: 'Contact Hero Blocks',
  },
  admin: {
    group: 'Hero Section',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Top Tagline',
      defaultValue: 'Jones Paint & Glass',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Contact Us',
      required: true,
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      label: 'Primary Button Text',
      defaultValue: 'Request Quote',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
      label: 'Primary Button Link',
      defaultValue: '#',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      label: 'Secondary Button Text',
      defaultValue: 'General Inquiries',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      label: 'Secondary Button Link',
      defaultValue: '#',
    },
    {
      name: 'locationsHeading',
      type: 'text',
      label: 'Locations Section Heading',
      defaultValue: 'JP&G Locations',
    },
    {
      name: 'locationsDescription',
      type: 'textarea',
      label: 'Locations Description',
      defaultValue: 'We have stores scattered throughout Utah. Check out the products and information for the store nearest you!',
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Locations',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Location Name',
          required: true,
        },
        {
          name: 'storeInfoLink',
          type: 'text',
          label: 'Store Info Link',
          defaultValue: '#',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
      ],
    },
  ],
}