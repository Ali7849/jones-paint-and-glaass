import { BrandsBlock } from '@/blocks/Brandsblock.block'
import { CtaBlock } from '@/blocks/Cta.block'
import { ExteriorServicesBlock } from '@/blocks/ExteriorServices.block'
import { FaqTipsSlider } from '@/blocks/FaqTipsSlider.block'
import { FeatureCardsBlock } from '@/blocks/FeatureCards.block'
import { FeaturedBrandBlock } from '@/blocks/FeaturedBrandBlock'
import { FeatureListBlock } from '@/blocks/FeatureListBlock'
import { HeroBlock } from '@/blocks/Hero.block'
import { ImageSliderBlock } from '@/blocks/ImageSlider.block'
import { SubHero } from '@/blocks/SubHero.block'
import type { CollectionConfig } from 'payload'

const Doors: CollectionConfig = {
  slug: 'doors',
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
      label: 'Page Name',
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
      name: 'blocks',
      type: 'blocks',
      label: 'Page Blocks',
      blocks: [
        SubHero,
        FeatureListBlock,
        FeaturedBrandBlock,
        ExteriorServicesBlock,
        ImageSliderBlock,
        FaqTipsSlider,
        BrandsBlock,
        FeatureCardsBlock,
        CtaBlock,
      ],
    },
  ],
}

export default Doors