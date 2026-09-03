import Link from 'next/link'
import { FaArrowRight, FaSearch } from 'react-icons/fa'

export default function Footer({ footerData }: { footerData: any }) {
  const logoUrl = footerData?.logo?.url || '/assets/images/logo.png'
  const bgUrl = footerData?.backgroundImage?.url || '/assets/images/footer.png'

  const homeLinks = footerData?.homeLinks ?? [
    { label: 'Locations', href: '/locations', opensInNewTab: false },
    { label: 'About', href: '/about', opensInNewTab: false },
    { label: 'FAQs', href: '/faqs', opensInNewTab: false },
    { label: 'Contact', href: '/contact', opensInNewTab: false },
    { label: 'Careers', href: '/careers', opensInNewTab: false },
  ]

  const paintItems = footerData?.paintItems ?? []
  const glassItems = footerData?.glassItems ?? []
  const doorsItems = footerData?.doorsItems ?? []

  return (
    <section
      className="footer bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="md:hidden container mx-auto px-4 flex flex-col items-center pt-5">
        <img src={logoUrl} alt="Jones Paint & Glass" />
      </div>

      <div className="f-contant container mx-auto flex flex-wrap flex-col md:flex-row justify-between py-12 px-4">
        <div className="f-menu flex flex-wrap justify-between text-white text-center md:text-start space-x-16 space-y-10">
          
          <FooterColumn title="HOME" items={homeLinks} />

          <FooterColumn
            title="GLASS"
            items={glassItems.map((item: any) => ({
              label: item.name,
              href: `/${item.slug}`,
              opensInNewTab: false,
            }))}
          />

          <FooterColumn
            title="PAINT"
            items={paintItems.map((item: any) => ({
              label: item.name,
              href: `/${item.slug}`,
              opensInNewTab: false,
            }))}
          />

          <FooterColumn
            title="DOORS"
            items={doorsItems.map((item: any) => ({
              label: item.name,
              href: `/${item.slug}`,
              opensInNewTab: false,
            }))}
          />
        </div>

        <div className="search flex flex-col justify-end items-end">
          <div className="searchbar flex relative">
            <FaSearch className="w-4 h-4 mr-2 text-white absolute bottom-3" />
            <input
              type="text"
              className="bg-transparent border pl-8 border-white border-b-2 border-t-0 border-l-0 border-r-0 focus:shadow-none text-white"
            />
          </div>

          <Link
            href={footerData?.ctaLink || '/contact'}
            target={footerData?.ctaOpensInNewTab ? '_blank' : undefined}
            rel={footerData?.ctaOpensInNewTab ? 'noopener noreferrer' : undefined}
            className="bg-[#A5EBCD] flex items-center mt-4 py-2 px-4 rounded font-medium"
          >
            {footerData?.ctaText || 'Get a Quote'}
            <FaArrowRight className="w-3 h-3 ml-2" />
          </Link>
        </div>
      </div>

      <div className="copyright container mx-auto px-4 flex flex-col gap-5 md:gap-0 md:flex-row justify-between items-center pb-8 text-white">
        <img src={logoUrl} className="md:flex hidden" alt="Jones Paint & Glass" />

        <p className="text-[12px]">
          {footerData?.copyrightText || '© 2026 Jones Paint & Glass. All rights reserved.'}
        </p>

        <div className="social flex space-x-4">
          {footerData?.socialLinks?.map((social: any, i: number) => (
            <Link
              key={i}
              href={social.href || '#'}
              target={social.opensInNewTab ? '_blank' : undefined}
              rel={social.opensInNewTab ? 'noopener noreferrer' : undefined}
            >
              <img
                src={social?.icon?.url}
                alt={social.label}
                className="w-6 h-6 cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FooterColumn({
  title,
  items,
}: {
  title: string
  items: { label: string; href: string; opensInNewTab?: boolean }[]
}) {
  return (
    <div>
      <h3 className="font-bold tracking-widest mb-8">{title}</h3>
      <ul className="space-y-2 text-[12px]">
        {items?.map((item, i) => (
          <li key={i}>
            <Link
              href={item.href}
              target={item.opensInNewTab ? '_blank' : undefined}
              rel={item.opensInNewTab ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}