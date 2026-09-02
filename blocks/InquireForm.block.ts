import type { Block } from 'payload'

export const InquireFormBlock: Block = {
  slug: 'inquireForm',
  imageURL: '/assets/blocks-preview/inquire.png',
  labels: {
    singular: 'Inquire Form Block',
    plural: 'Inquire Form Blocks',
  },
  admin: {
    group: 'Forms',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Main Heading',
      defaultValue: 'General Inquiries',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: "We'd love to hear from you. If you have any questions about our products or services, fill out this form and we'll get back to you ASAP.",
    },
    {
      name: 'quoteFormText',
      type: 'text',
      label: 'Quote Form Text',
      defaultValue: 'If you have questions regarding a specific project quote, please fill out our',
    },
    {
      name: 'quoteFormLinkText',
      type: 'text',
      label: 'Quote Form Link Text',
      defaultValue: 'Request a Quote',
    },
    {
      name: 'quoteFormLink',
      type: 'text',
      label: 'Quote Form Link',
      defaultValue: '#',
    },
    {
      name: 'corporateHeading',
      type: 'text',
      label: 'Corporate Office Heading',
      defaultValue: 'Contact Corporate Office',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
      defaultValue: '801-374-6711',
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email Address',
      defaultValue: 'info@jonespaint.com',
    },
    {
      name: 'submitButtonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Send Message',
    },

    // ✅ Store locations with emails — managed from dashboard
    {
      name: 'stores',
      type: 'array',
      label: 'Store Locations',
      minRows: 1,
      admin: {
        description: 'Add store names and their email recipients. These appear in the form dropdown.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Store Name',
          required: true,
          admin: {
            description: 'e.g. American Fork',
          },
        },
        {
          name: 'emails',
          type: 'text',
          label: 'Email Recipients',
          required: true,
          admin: {
            description: 'Comma-separated emails e.g. dkoch@jonespg.com, mikelle@six21studio.com',
          },
        },
      ],
    },
    {
      name: 'privacyPolicyLink',
      type: 'text',
      label: 'Privacy Policy Link',
      defaultValue: '#',
    },
  ],
}