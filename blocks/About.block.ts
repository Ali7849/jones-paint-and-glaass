import type { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'about',
  imageURL: '/assets/blocks-preview/story.png',
  labels: {
    singular: 'Our Story Block',
    plural: 'Our Story Blocks',
  },
  
   admin: {
    group: 'Content Sections',
  },
  fields: [
    {
      name: 'Heading',
      type: 'text',
      defaultValue: 'Our Story',
      required: true,
    },
    {
      name: 'Paragraph1',
      type: 'textarea',
      defaultValue: 'From a shoestring vision in 1938 to a trusted regional home-improvement authority, Jones Paint & Glass was born when founder Harold Jones’s parents put their own furniture up as collateral for a $300 loan so he could chase an idea—a company built on grit, service, and quality that outlasted the Great Depression and every competitor that underestimated it. ',
      required: false,
    },
    {
      name: 'Paragraph2',
      type: 'textarea',
      defaultValue: 'Across four generations of the Jones family and over 85 years in business, the company hasn’t just grown—it’s become a trusted partner in every project big and small, turning first-time customers into lifelong advocates with quality you can see, service you can count on, and a reputation that resonates every time glass breaks or walls need color.',
      required: false,
    },
    {
      name: 'SideImage',
      type: 'upload',
      relationTo: 'media' as any,
      required: true,
    },
  ],
}