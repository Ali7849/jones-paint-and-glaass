import type { CollectionConfig } from 'payload'

const BlogCategories: CollectionConfig = {
  slug: 'blog-categories',
  labels: {
    singular: 'Blog Category',
    plural: 'Blog Categories',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Pages',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    description: 'Categories you can assign to blog posts.',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Category Name',
      admin: { description: 'e.g. Paint, Glass, DIY Tips' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: { description: 'URL-friendly version, e.g. "diy-tips"' },
    },
  ],
}

export default BlogCategories