import type { CollectionConfig } from 'payload'

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'General Inquiry',
    plural: 'General Inquiries',
  },
  admin: {
    useAsTitle: 'fullName',
    group: 'Form Submissions',
    defaultColumns: ['fullName', 'email', 'store', 'emailStatus', 'createdAt'],
    description: 'General inquiries submitted through the contact form.',
  },
  access: {
    // Only the API route creates these — no public reads or writes
    read: ({ req }) => !!req.user,
    create: () => false,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'fullName', type: 'text', label: 'Name' },
    { name: 'firstName', type: 'text', admin: { hidden: true } },
    { name: 'lastName', type: 'text', admin: { hidden: true } },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'phone', type: 'text', label: 'Phone' },
    { name: 'store', type: 'text', label: 'Store Location' },
    { name: 'message', type: 'textarea', label: 'Message' },
    {
      name: 'sentTo',
      type: 'text',
      label: 'Notified',
      admin: { description: 'Store emails this was forwarded to.' },
    },
    {
      name: 'emailStatus',
      type: 'select',
      label: 'Email Status',
      defaultValue: 'sent',
      options: [
        { label: 'Sent', value: 'sent' },
        { label: 'Failed', value: 'failed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'handled',
      type: 'checkbox',
      label: 'Followed up',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Tick once someone has responded to this enquiry.',
      },
    },
  ],
}

export default ContactSubmissions