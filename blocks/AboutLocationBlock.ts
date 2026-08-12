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

    // Locations are now fetched automatically from Locations collection
  ],
}