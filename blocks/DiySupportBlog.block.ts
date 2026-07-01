import type { Block } from 'payload'

export const DiySupportBlogBlock: Block = {
  slug: 'diySupportBlog',
  imageURL: '/assets/blocks-preview/blogsupport.png',
  labels: {
    singular: 'DIY Support Blog Block',
    plural: 'DIY Support Blog Blocks',
  },
  admin: {
    group: 'Content Sections',
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      defaultValue: 'DIY SUPPORT BLOG',
    },
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'The Crash Course',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: "For the real DIY-er, our blog is full of the most usable tips, tricks and don't-forgets related to paint, glass and door projects. Find the article you need or subscribe to stay up to date on all of the JP&G support.",
    },
    {
      name: 'buttonText',
      type: 'text',
      defaultValue: 'Find an Article',
    },
    {
      name: 'buttonLink',
      type: 'text',
      defaultValue: '#',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
    },
  ],
}