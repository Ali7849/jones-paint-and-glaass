import type { Block } from 'payload'

export const ImageSliderBlock: Block = {
  slug: 'imageSlider',
  imageURL: '/assets/blocks-preview/imageslider.png',
  labels: {
    singular: 'Image Slider Block',
    plural: 'Image Slider Blocks',
  },
  admin: {
    group: 'Sliders',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'JP&G Locations',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      defaultValue: 'We have stores scattered throughout Utah. Check out the products and information for the store nearest you!',
    },
    
  ],
}