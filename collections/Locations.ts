import { HeroBlock } from '@/blocks/Hero.block'
import { LocationInfoBlock } from '@/blocks/LocationInfo.block'
import { ReviewsBlock } from '@/blocks/ReviewsBlock'
import { StoreLocationBlock } from '@/blocks/StoreLocationBlock'
import type { CollectionConfig } from 'payload'

const Locations: CollectionConfig = {
  slug: 'locations',
  admin: {
    useAsTitle: 'name',
    group: 'Products & Services',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
   {
      name: 'name',
      type: 'text',
      label: 'Location Name',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Location Slug',
      required: true,
      unique: true,
      admin: {
        description: 'e.g. "vernal" → /locations/vernal',
      },
    },

    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'Meta Description',
    },
   
    {
      name: 'services',
      type: 'text',
      label: 'Products and Services',
      required: true,
    },
    {
      name: 'locationImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Page Blocks',
      blocks: [
        StoreLocationBlock,
        LocationInfoBlock,
        ReviewsBlock,
      ],
    },
  ],
}

export default Locations