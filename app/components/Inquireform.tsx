'use client'

import { useState } from 'react'

type InquireFormProps = {
  heading?: string
  description?: string
  quoteFormText?: string
  quoteFormLinkText?: string
  quoteFormLink?: string
  corporateHeading?: string
  phone?: string
  email?: string
  submitButtonText?: string
  privacyPolicyLink?: string
}

export default function Inquireform({
  heading = 'General Inquiries',
  description = "We'd love to hear from you. If you have any questions about our products or services, fill out this form and we'll get back to you ASAP.",
  quoteFormText = 'If you have questions regarding a specific project quote, please fill out our',
  quoteFormLinkText = 'Request a Quote',
  quoteFormLink = '#',
  corporateHeading = 'Contact Corporate Office',
  phone = '801-374-6711',
  email = 'info@jonespaint.com',
  submitButtonText = 'Send Message',
  privacyPolicyLink = '#',
}: InquireFormProps) {
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    store: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return
    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="py-16 md:py-28 relative overflow-hidden">
      <div
        className="absolute -bottom-[100px] md:-bottom-[150px] left-0 w-full pointer-events-none z-2"
        style={{
          backgroundImage: 'url(/assets/jt/elements/paint-9.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom left',
          height: '70%',
        }}
      />

      <div className="mx-auto container px-0 lg:px-6 pb-20">
        <div className="flex flex-col xl:flex-row gap-8 md:gap-10 xl:gap-12">

          {/* Left: Info */}
          <div className="relative z-2 flex-1 lg:w-full xl:w-80 shrink-0 xl:text-start text-center">
            <h2 className="text-[28px] md:text-[34px] lg:text-[48px] font-bold text-black mb-4 leading-tight font-['Avenir']">
              {heading}
            </h2>
            <p className="w-[100%] xl:w-[80%] text-[16px] leading-relaxed mb-8 xl:px-0 md:px-10 px-2">
              {description}
            </p>
            <p className="w-[100%] xl:w-[80%] text-[16px] leading-relaxed mb-8 xl:px-0 md:px-10 px-2">
              {quoteFormText}{' '}
              <a href={quoteFormLink} style={{ color: '#0052C6', textDecoration: 'underline' }}>
                {quoteFormLinkText}
              </a>
              {' '}form, or visit your local Jones Paint & Glass store.
            </p>

            <div className="relative z-2 flex flex-col flex-wrap justify-center xl:justify-start">
              <h2 className="text-[28px] md:text-[30px] lg:text-[32px] font-bold text-black mb-4 leading-tight font-['Avenir']">
                {corporateHeading}
              </h2>
              
              <a  href={`tel:${phone?.replace(/-/g, '')}`}
                className="block text-xl font-medium"
                style={{ color: '#0052C6' }}
              >
                {phone}
              </a>
              
              <a  href={`mailto:${email}`}
                className="block text-xl font-medium"
                style={{ color: '#0052C6' }}
              >
                {email}
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative z-2 flex flex-1 w-full px-2 justify-center xl:justify-start" id='inquire-form'>
            <div className="relative z-10 w-full max-w-2xl rounded-2xl p-6 md:px-15 md:py-10 "
            style={{ background: "linear-gradient(180deg, #0052C6 28.46%, #002559 100%)" }} >

              {submitted ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-white text-2xl font-bold mb-2">Thank you!</h3>
                  <p className="text-gray-300">We've received your message and will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>

                  {/* First + Last name */}
                  <div className="flex gap-6 mb-5">
                    <div className="flex-1">
                      <label className="block text-white font-extralight mb-2">First name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-white font-extralight mb-2">Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label className="block text-white font-extralight mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <label className="block text-white font-extralight mb-2">Phone number (optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>

                  {/* Store Location */}
                  <div className="mb-5">
                    <label className="block text-white font-extralight mb-2">Where are you located?</label>
                    <select
                      name="store"
                      value={formData.store}
                      onChange={handleChange}
                      required
                      className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300 appearance-none"
                    >
                      <option value="">Select a store</option>
                      <option value="american-fork">American Fork</option>
                      <option value="cedar-city">Cedar City</option>
                      <option value="payson">Payson</option>
                      <option value="provo-glass">Provo — Glass</option>
                      <option value="provo-paint">Provo — Paint</option>
                      <option value="roosevelt">Roosevelt</option>
                      <option value="st-george">St. George</option>
                      <option value="vernal">Vernal</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="mb-5">
                    <label className="block text-white font-extralight mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                    />
                  </div>

                  {/* Checkbox */}
                  <label className="flex items-center gap-2 mb-10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                      className="w-4 h-4 rounded accent-blue-400 cursor-pointer"
                    />
                    <span className="text-white">
                      You agree to our friendly{' '}
                      <a href={privacyPolicyLink} className="underline hover:text-blue-200 transition-colors">
                        privacy policy
                      </a>.
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!agreed || loading}
                    className="group w-full bg-white text-black font-semibold text-sm py-3 rounded-[8px] hover:bg-blue-50 transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending...' : submitButtonText}
                    {!loading && (
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}