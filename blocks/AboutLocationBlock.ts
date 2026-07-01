import type { Block } from 'payload'

export const AboutLocationBlock: Block = {
  slug: 'aboutLocation',
  imageURL: '/assets/blocks-preview/aboutlocations.png',
  labels: {
    singular: 'Locations Grid',
    plural: 'Locations Grids',
  },
  admin: {
    group: 'Content Sections',

  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'JP&G Locations',
      required: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        'We have stores scattered throughout Utah. Check out the products and information for the store nearest you!',
    },
    {
      name: 'locations',
      type: 'array',
      label: 'Locations',
      minRows: 1,
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'City Name',
        },
        {
          name: 'highlight',
          type: 'text',
          label: 'Highlight Word (e.g. Paint, Glass)',
          admin: {
            description: 'Optional — shown in blue after the city name',
          },
        },
        {
          name: 'services',
          type: 'text',
          required: true,
          label: 'Services (e.g. Paint, Glass, Doors)',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'Store Info Link',
          defaultValue: '#',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
          label: 'Store Image',
        },
      ],
    },
  ],
}