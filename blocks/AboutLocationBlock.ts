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
      name: 'linkMode',
      type: 'select',
      label: 'Card Link Behaviour',
      defaultValue: 'storeInfo',
      required: true,
      options: [
        { label: 'Store Info — links to the location page', value: 'storeInfo' },
        { label: 'Leave Review — links to Google Business Profile', value: 'review' },
      ],
      admin: {
        description:
          'Review mode uses each location\'s Google Review URL. Locations without one are hidden.',
      },
    },
    {
      name: 'linkLabel',
      type: 'text',
      label: 'Link Label',
      admin: {
        description: 'Defaults to "Store Info" or "Leave Review" based on the mode above.',
      },
    },
  ],
}