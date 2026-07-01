import type { Block } from 'payload'

export const QuoteBlock: Block = {
  slug: 'quote',
  imageURL: '/assets/blocks-preview/quote.png',
  labels: {
    singular: 'Quote Block',
    plural: 'Quote Blocks',
  },
  admin: {
    group: 'Forms',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Heading',
      defaultValue: 'Get a Quote',
      required: true,
    },
    {
      name: 'submitButtonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Get Quote',
    },
    
    // ✅ Field Labels — rename only
    {
      type: 'collapsible',
      label: 'Field Labels',
      fields: [
        {
          name: 'labelFirstName',
          type: 'text',
          label: 'First Name Label',
          defaultValue: 'First name',
        },
        {
          name: 'labelLastName',
          type: 'text',
          label: 'Last Name Label',
          defaultValue: 'Last name',
        },
        {
          name: 'labelEmail',
          type: 'text',
          label: 'Email Label',
          defaultValue: 'Email',
        },
        {
          name: 'labelPhone',
          type: 'text',
          label: 'Phone Label',
          defaultValue: 'Phone number (optional)',
        },
        {
          name: 'labelLocation',
          type: 'text',
          label: 'Location Label',
          defaultValue: 'Where are you located?',
        },
        {
          name: 'labelMessage',
          type: 'text',
          label: 'Message Label',
          defaultValue: 'Message',
        },
      ],
    },
  ],
}