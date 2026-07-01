import type { Block } from 'payload'

export const FeaturedBrandBlock: Block = {
  slug: 'featuredBrand',
  imageURL: '/assets/blocks-preview/featuredbrand.png',
  labels: {
    singular: 'Featured Brand',
    plural: 'Featured Brands',
  },
 admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: 'Featured Brand',
      label: 'Label (above heading)',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Meoded Paint & Plaster',
      label: 'Brand Name / Heading',
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue:
        'Handcrafted with the utmost care, using premium ingredients to enhance spaces with sophisticated depth and texture.',
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
      label: 'Brand Image',
    },
  ],
}