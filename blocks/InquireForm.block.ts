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
    {
      name: 'privacyPolicyLink',
      type: 'text',
      label: 'Privacy Policy Link',
      defaultValue: '#',
    },
  ],
}