import type { Block } from 'payload'

export const DiyHeroBlock: Block = {
  slug: 'diyHero',
  imageURL: '/assets/blocks-preview/diyhero.png',
  labels: {
    singular: 'DIY Hero Block',
    plural: 'DIY Hero Blocks',
  },
  admin: {
    group: 'Hero Section',
  },
  fields: [
    // ── Card 1 (Blue) ────────────────────────────────────────────
    {
      name: 'card1Heading',
      type: 'text',
      label: 'Card 1 — Heading',
      defaultValue: 'The Drive to DIY',
      required: true,
    },
    {
      name: 'card1Description',
      type: 'textarea',
      label: 'Card 1 — Description',
      defaultValue:
        'There are lots of fantastic reasons to Do-It-Yourself. There are also lots of ways to mess it up...',
    },

    // ── Card 2 (Black) ───────────────────────────────────────────
    {
      name: 'card2Heading',
      type: 'text',
      label: 'Card 2 — Heading',
      defaultValue: 'The Team to Help You Do It',
      required: true,
    },
    {
      name: 'card2Description',
      type: 'textarea',
      label: 'Card 2 — Description',
      defaultValue:
        'You can do it—we help you get it right the first time. Before you DIY, make sure to JP&G!',
    },

    // ── Bottom Banner ────────────────────────────────────────────
    {
      name: 'bannerImage',
      type: 'upload',
      label: 'Banner Background Image',
      relationTo: 'media' as any,
      required: true,
    },
    {
      name: 'bannerTagline',
      type: 'text',
      label: 'Banner — Top Line (e.g. "BEFORE YOU")',
      defaultValue: 'BEFORE YOU',
    },
    {
      name: 'bannerHighlight',
      type: 'text',
      label: 'Banner — Large Word (e.g. "DIY")',
      defaultValue: 'DIY',
    },
    {
      name: 'bannerVectorImage',
      type: 'upload',
      label: 'Banner — Vector / Decorative Image',
      relationTo: 'media' as any,
    },

    // ── CTA Buttons ──────────────────────────────────────────────
    {
      name: 'buttons',
      type: 'array',
      label: 'CTA Buttons',
      maxRows: 4,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          defaultValue: 'Get a Quote',
        },
        {
          name: 'link',
          type: 'text',
          defaultValue: '#',
        },
      ],
      defaultValue: [
        { label: 'Get a Quote', link: '#' },
        { label: 'Get a Quote', link: '#' },
        { label: 'Get a Quote', link: '#' },
      ],
    },
  ],
}