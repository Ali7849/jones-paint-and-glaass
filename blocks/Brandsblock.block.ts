import type { Block } from 'payload'

export const BrandsBlock: Block = {
  slug: 'brands',
  labels: {
    singular: 'Brands',
    plural: 'Brands',
  },
  admin: {
    group: 'Content',
  },
  imageURL: '/assets/blocks-preview/brands.png',
  fields: [
    {
      name: 'label',
      type: 'text',
      defaultValue: 'Exterior Paint',
      admin: {
        description: 'Category label above heading (e.g., "Exterior Paint")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Brands We Sell',
      required: true,
      admin: {
        description: 'Main heading for the section',
      },
    },
    {
      name: 'footnote',
      type: 'textarea',
      admin: {
        description: 'Optional footnote text below the grid',
      },
    },
    {
      name: 'brands',
      type: 'array',
      label: 'Brands',
      minRows: 1,
      required: true,
      admin: {
        description: 'Add brands/products to display',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          admin: {
            description: 'Brand or product name',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
          admin: {
            description: 'Brand/product image',
          },
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'Optional link when clicking the card',
          },
        },
      ],
    },
  ],
}