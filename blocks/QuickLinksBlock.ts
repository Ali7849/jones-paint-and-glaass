import type { Block } from 'payload'

export const QuickLinksBlock: Block = {
  slug: 'quickLinks',
  imageURL: '/assets/blocks-preview/quicklinks.png',

  labels: {
    singular: 'Quick Links',
    plural: 'Quick Links',
  },
  admin: {
    group: 'Content Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Looking for Something Else?',
      required: true,
    },
    {
      name: 'subtext',
      type: 'textarea',
      defaultValue:
        "If you're ready to start talking project details, click the button below to get a quote or stop into your nearest JP&G location.",
    },
    {
      name: 'buttonLabel',
      type: 'text',
      defaultValue: 'Get a Quote',
      label: 'Button Label',
    },
    {
      name: 'buttonHref',
      type: 'text',
      defaultValue: '#',
      label: 'Button Link',
    },
    {
      name: 'links',
      type: 'array',
      label: 'Quick Links',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Link Label',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          defaultValue: '#',
          label: 'Link URL',
        },
      ],
    },
  ],
}