import type { CollectionConfig } from 'payload'
import { DiySliderBlock } from '../blocks/DiySlider.block'
import { HeroBlock } from '../blocks/Hero.block'
import { ProductServicesBlock } from '@/blocks/ProductService.block'
import { ImageSliderBlock } from '@/blocks/ImageSlider.block'
import { Contractor } from '@/blocks/Contractor.block'
import { DiySupportBlogBlock } from '@/blocks/DiySupportBlog.block'
import { JpgMedia } from '@/blocks/JpgMedia.block'
import { DiyHeroBlock } from '@/blocks/Diyhero.block'
import { VideoSliderBlock } from '@/blocks/Videoslider.block'
import { QuoteBlock } from '@/blocks/Quote.block'
import { ContactHeroBlock } from '@/blocks/Contacthero.block'
import { InquireFormBlock } from '@/blocks/InquireForm.block'
import { AboutBlock } from '@/blocks/About.block'
import { FeaturesBlock } from '@/blocks/FeaturesBlock'
import { AboutLocationBlock } from '@/blocks/AboutLocationBlock'
import { QuickLinksBlock } from '@/blocks/QuickLinksBlock'
import { FaqsBlock } from '@/blocks/Faqsblock.block'
import { FaqTipsSlider } from '@/blocks/FaqTipsSlider.block'
import { RecommendBlog } from '@/blocks/RecommendBlog.block'
import { BlogDetail } from '@/blocks/BlogDetail.block'
import { BlogSearch } from '@/blocks/BlogSearch.block'



const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    group: 'Pages',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  labels: {
    singular: 'Page',
    plural: 'All Pages',      
  },
  access: {
    read: () => true,           // ✅ anyone can read
    create: ({ req }) => !!req.user, // ✅ logged in users can create
    update: ({ req }) => !!req.user, // ✅ logged in users can update
    delete: ({ req }) => !!req.user, // ✅ logged in users can delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL path e.g. "about" → /about  |  leave "home" for /',
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
        HeroBlock,
        ProductServicesBlock,
        ImageSliderBlock,
        DiySliderBlock,
        Contractor,
        DiySupportBlogBlock,
        JpgMedia,
        DiyHeroBlock,
        VideoSliderBlock,
        QuoteBlock,
        ContactHeroBlock,
        InquireFormBlock,
        AboutBlock,
        FeaturesBlock,
        AboutLocationBlock,
        QuickLinksBlock,
        FaqsBlock,
        FaqTipsSlider,
        RecommendBlog,
        BlogDetail,
        BlogSearch,
      ],
    },
  ],
}

export default Pages