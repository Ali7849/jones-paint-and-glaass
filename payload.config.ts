import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import Media from './collections/Media'
import Navigation from './collections/Navigation'
import Pages from './collections/Pages'
import Users from './collections/Users'
import Locations from './collections/Locations'
import Paint from './collections/Paint'
import Glass from './collections/Glass'
import Doors from './collections/Doors'
import Blogs from './collections/Blogs'
import Footer from './collections/Footer'
import Redirects from './collections/Redirects'
import Analytics from './collections/Analytics'
import QuoteSubmissions from './collections/QuoteSubmissions'
import ContactSubmissions from './collections/ContactSubmissions'
import BlogCategories from './collections/BlogCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'mysecret123',
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  editor: lexicalEditor(),

  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),

  cors: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || '',
  ].filter(Boolean),

  csrf: [
    'http://localhost:3000',
    process.env.NEXT_PUBLIC_SERVER_URL || '',
  ].filter(Boolean),

  admin: {
    user: 'users',
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  collections: [
    Users,
    Media,
    Pages,
    Locations,
    Paint,
    Glass,
    Doors,
    Blogs,
    Redirects,
    QuoteSubmissions,
    ContactSubmissions,
    BlogCategories,
  ],

  globals: [
    Navigation,
    Footer,
    Analytics,
  ],

  plugins: [
    s3Storage({
      collections: {
        media: {
          // Same folder the migrated files live in
          prefix: 'paint-media/media',
          // Serve straight from S3 rather than proxying through /api/media/file
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            `${process.env.S3_PUBLIC_URL}${prefix ? `${prefix}/` : ''}${filename}`,
        },
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        region: process.env.S3_REGION!,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
      },
    }),
  ],
})