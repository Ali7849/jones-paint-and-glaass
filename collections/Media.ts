import type { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    group: 'Settings',
    defaultColumns: ['filename', 'alt', 'url', 'cloudinaryPublicId', 'updatedAt'],
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
    // ✅ Tell Payload where to find the image URL for thumbnails
    adminThumbnail: ({ doc }) => {
      const d = doc as any
      if (d.url) return d.url
      if (d.cloudinaryPublicId) {
        return `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${d.cloudinaryPublicId}`
      }
      return null
    },
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
      name: 'url',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Cloudinary URL (auto-filled on upload)',
      },
    },
    {
      name: 'cloudinaryPublicId',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Cloudinary Public ID (auto-filled on upload)',
      },
    },
  ],
}

export default Media