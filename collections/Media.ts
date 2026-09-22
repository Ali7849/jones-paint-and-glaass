import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Settings',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
  },
  labels: {
    singular: 'Media Library',
    plural: 'Media Library',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
    // The S3 plugin fills in `url`, so the thumbnail just uses it
    adminThumbnail: ({ doc }) => ((doc as any)?.url as string) || null,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for accessibility and SEO',
      },
    },
    {
      // Temporary — read by the migration route. Remove once it has run.
      name: 'cloudinaryPublicId',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
  ],
}

export default Media