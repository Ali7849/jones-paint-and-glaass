import { v2 as cloudinary } from 'cloudinary'
import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'

interface Args {
  folder?: string
  config: {
    cloud_name: string
    api_key: string
    api_secret: string
  }
}

export const cloudinaryAdapter = ({ folder = 'paint-media', config }: Args): Adapter => {
  cloudinary.config(config)

  return ({ collection, prefix }): GeneratedAdapter => {
    const folderPath = `${folder}/${prefix || collection.slug}`

    return {
      name: 'cloudinary',

      handleUpload: async ({ data, file }) => {
        try {
          const f = file as any
          const filename: string = f.filename || f.name || 'unknown'
          const mimeType: string = f.mimeType || f.mimetype || 'image/jpeg'

          // Get buffer
          let fileBuffer: Buffer
          if (f.buffer instanceof Buffer) {
            fileBuffer = f.buffer
          } else if (f.data instanceof Buffer) {
            fileBuffer = f.data
          } else {
            fileBuffer = Buffer.from(f.buffer)
          }

          // Public ID = folder + filename without extension
          const nameWithoutExt = filename.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_')
          const base64 = fileBuffer.toString('base64')
          const dataURI = `data:${mimeType};base64,${base64}`

          console.log('⬆️ Uploading to Cloudinary:', filename)

          const result = await cloudinary.uploader.upload(dataURI, {
            folder: folderPath,
            resource_type: 'auto',
            public_id: nameWithoutExt,
            overwrite: true,
          })

          console.log('✅ Upload success. URL:', result.secure_url)

          // ✅ Store secure_url in the url field directly
          // ✅ Keep original filename for Payload validation
          return {
            ...data,
            filename,                           // ← original filename e.g. "samples.jpg"
            url: result.secure_url,             // ← full Cloudinary URL stored in DB
            cloudinaryPublicId: result.public_id,
          }
        } catch (error) {
          console.error('❌ Upload error:', error)
          throw error
        }
      },

      handleDelete: async ({ doc }) => {
        try {
          const d = doc as any
          if (d.cloudinaryPublicId) {
            await cloudinary.uploader.destroy(d.cloudinaryPublicId, { resource_type: 'image' })
            console.log('🗑️ Deleted from Cloudinary:', d.cloudinaryPublicId)
          }
        } catch (error) {
          console.error('❌ Delete error:', error)
        }
      },

      // ✅ This is called when Payload renders image URLs
      // It receives the filename stored in DB — reconstruct Cloudinary URL
      generateURL: ({ filename }) => {
        const nameWithoutExt = filename
          .replace(/\.[^/.]+$/, '')
          .replace(/[^a-zA-Z0-9_-]/g, '_')
        const url = `https://res.cloudinary.com/${config.cloud_name}/image/upload/${folderPath}/${nameWithoutExt}`
        return url
      },

      staticHandler: async (req, { params: { filename } }) => {
        const nameWithoutExt = filename
          .replace(/\.[^/.]+$/, '')
          .replace(/[^a-zA-Z0-9_-]/g, '_')
        const url = `https://res.cloudinary.com/${config.cloud_name}/image/upload/${folderPath}/${nameWithoutExt}`
        return Response.redirect(url, 302)
      },
    }
  }
}