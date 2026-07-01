import type { Block } from 'payload'

export const Contractor: Block = {
  slug: 'contractor',
  imageURL: '/assets/blocks-preview/contractor.png',
  labels: {
    singular: 'Contractor Block',
    plural: 'Contractor Blocks',
  },
  admin: {
    group: 'Content Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Contractor Services',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: "We're DIY pros, but we also provide products and services to contractors throughout Utah.",
      required: true,
    },
    {
      name: 'primaryButtonText',
      type: 'text',
      defaultValue: 'Get a Quote',
    },
    {
      name: 'primaryButtonLink',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'secondaryButtonText',
      type: 'text',
      defaultValue: 'Get a Quote',
    },
    {
      name: 'secondaryButtonLink',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
        {
          name: 'highlight',
          type: 'text',
          label: 'Highlight Text (optional)',
        },
      ],
    },
    {
      name: 'galleryTitle',
      type: 'text',
      defaultValue: 'See What Our Contractors Have Done',
    },
    {
      name: 'largeImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
      label: 'Large Image (Left Side)',
    },
    {
      name: 'largeImageTitle',
      type: 'text',
      defaultValue: 'Jones Vinyl Windows',
    },
    {
      name: 'largeImageSubtitle',
      type: 'text',
      defaultValue: "Journey's End: 2024 Parade of Homes",
    },
    {
      name: 'topRowImages',
      type: 'array',
      label: 'Top Row Images (3 images)',
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'bottomLeftImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
      label: 'Bottom Left Image',
    },
    {
      name: 'bottomLeftImageDescription',
      type: 'text',
      defaultValue: 'Open Floor Plan with Mountain View',
    },
    {
      name: 'bottomRightImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
      label: 'Bottom Right Image (Large)',
    },
    {
      name: 'bottomRightImageDescription',
      type: 'text',
      defaultValue: 'Open Floor Plan with Mountain View',
    },
  ],
}