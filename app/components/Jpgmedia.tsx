import Image from "next/image"

type MediaItem = {
  id?: string
  image?: {
    url: string
    alt?: string
  }
  helpText?: string
  title?: string
  href?: string
}

type JpgMediaProps = {
  heading?: string
  mediaItems?: MediaItem[]
}

export default function JpgMedia({
  heading = 'JP&G Media',
  mediaItems = [],
}: JpgMediaProps) {
  return (
    <section className="container mx-auto w-full px-4 md:px-10 py-10 sm:py-12 md:py-16 mt-16">

      {/* Heading */}
      <h2
        className="font-bold text-black mb-8 sm:mb-10"
        style={{ fontSize: "clamp(24px, 3vw, 36px)" }}
      >
        {heading}
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {mediaItems.map((item, i) => (
          
          <a  key={item.id || i}
            href={item.href || '#'}
            className="group bg-[#F8F9FC] rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative w-full h-[200px] sm:h-[220px] md:h-[260px] lg:h-[300px] overflow-hidden">
              {item.image?.url ? (
                <Image
                  src={item.image.url}
                  alt={item.image.alt || item.title || ''}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">No image</span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4">
              <p
                className="text-black font-bold mb-1"
                style={{ fontSize: "clamp(14px, 1.2vw, 20px)" }}
              >
                {item.helpText || 'Help Me With'}
              </p>
              <p
                className="font-bold text-[#0052C6]"
                style={{ fontSize: "clamp(18px, 1.8vw, 32px)" }}
              >
                {item.title}
              </p>
            </div>
          </a>
        ))}
      </div>

    </section>
  )
}