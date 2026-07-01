import type { Block } from 'payload'

export const RecommendBlog: Block = {
  slug: 'recommendBlog',
  imageURL: '/assets/blocks-preview/recommended.png',
  labels: {
    singular: 'Recommend Blog Block',
    plural: 'Recommend Blog Blocks',
  },
  admin: {
    group: 'Blog Section',
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Top Label',
      defaultValue: 'Read More',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Recommended for You',
      required: true,
    },
    // ✅ Relationship field - select blogs from Blogs collection
    {
      name: 'posts',
      type: 'relationship',
      relationTo: 'blogs' as any,
      hasMany: true,
      label: 'Select Blog Posts',
      admin: {
        description: 'Select blogs to show as recommended posts',
      },
    },
  ],
}