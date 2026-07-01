import type { Block } from 'payload'

export const FaqsBlock: Block = {
  slug: 'faqs',
  imageURL: '/assets/blocks-preview/faq.png',
  labels: {
    singular: 'FAQs',
    plural: 'FAQs',
  },
  admin: {
    group: 'Content Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Got Questions? We\'ve Got Answers',
      required: true,
      admin: {
        description: 'Main heading for the FAQ section',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: {
        description: 'Optional subheading or description below the main heading',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Ask Us Directly',
      admin: {
        description: 'Text for the call-to-action button',
      },
    },
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '#',
      admin: {
        description: 'Link for the call-to-action button',
      },
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ Items',
      minRows: 1,
      admin: {
        description: 'Add frequently asked questions and their answers',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          admin: {
            description: 'The question to display',
          },
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          admin: {
            description: 'The answer to the question (supports formatting)',
          },
        },
      ],
    },
  ],
}