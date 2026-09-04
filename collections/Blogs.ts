import type { CollectionConfig } from 'payload'

const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    group: 'Pages',
    defaultColumns: ['title', 'category', 'published', 'publishedDate', 'updatedAt'],
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'published',
      type: 'checkbox',
      label: 'Published',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Uncheck to save as a draft. Drafts stay hidden from the site.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              admin: { description: 'e.g. "how-to-paint" → /blog/how-to-paint' },
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media' as any,
              label: 'Hero Image',
            },
            {
              name: 'author',
              type: 'text',
              label: 'Author Name',
              defaultValue: 'Jones Paint & Glass',
            },
            { name: 'publishedDate', type: 'date', label: 'Published Date' },
            {
              name: 'readTime',
              type: 'text',
              label: 'Read Time',
              defaultValue: '5 min read',
            },
            {
              name: 'category',
              type: 'select',
              label: 'Category',
              options: [
                { label: 'Paint', value: 'Paint' },
                { label: 'Glass', value: 'Glass' },
                { label: 'Doors', value: 'Doors' },
                { label: 'Garage Doors', value: 'Garage Doors' },
                { label: 'DIY Tips', value: 'DIY Tips' },
              ],
            },
            {
              name: 'keywords',
              type: 'array',
              label: 'Keywords',
              fields: [{ name: 'keyword', type: 'text', required: true }],
            },
            { name: 'content', type: 'richText' },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Meta Title',
              admin: {
                description:
                  'Shown in search results. Aim for under 60 characters. Falls back to the post title if empty.',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Meta Description',
              maxLength: 200,
              admin: {
                description:
                  'The grey text under the link in Google. Aim for 150–160 characters.',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media' as any,
              label: 'Social Share Image',
              admin: {
                description:
                  'Shown when shared on Facebook/LinkedIn/X. Ideal size 1200×630. Falls back to the hero image.',
              },
            },
            {
              name: 'canonicalUrl',
              type: 'text',
              label: 'Canonical URL',
              admin: {
                description:
                  'Only fill this if this post duplicates content that lives at another URL.',
              },
            },
            {
              name: 'noindex',
              type: 'checkbox',
              label: 'Hide from search engines',
              defaultValue: false,
              admin: {
                description:
                  'Post stays live but tells Google not to index it.',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default Blogs