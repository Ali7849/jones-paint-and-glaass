'use client'

import { useState } from 'react'

type Store = {
  name: string
  emails: string
}

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
  labelFirstName?: string
  labelLastName?: string
  labelEmail?: string
  labelPhone?: string
  labelLocation?: string
  labelMessage?: string
  stores?: Store[]
}

export default function Inquireform({
  heading = 'General Inquiries',
  description = "We'd love to hear from you. If you have any questions about our products or services, fill out this form and we'll get back to you ASAP.",
  quoteFormText = 'If you have questions regarding a specific project quote, please fill out our',
  quoteFormLinkText = 'Request a Quote',
  quoteFormLink = '#',
  corporateHeading = 'Contact Corporate Office',
  phone = '801-374-6711',
  submitButtonText = 'Send Message',
  privacyPolicyLink = '/privacy-policy',
  labelFirstName = 'First name',
  labelLastName = 'Last name',
  labelEmail = 'Email',
  labelPhone = 'Phone number (optional)',
  labelLocation = 'Where are you located?',
  labelMessage = 'Message',
  stores = [],
}: InquireFormProps) {
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [country, setCountry] = useState('US')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    store: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) return

    // Find selected store's emails
    const selectedStore = stores.find(s => s.name === formData.store)
    if (!selectedStore) {
      setError('Please select a valid store location.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType: 'general-inquiry',
          // ✅ Pass store emails to API
          storeEmails: selectedStore.emails,
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError('Something went wrong. Please try again or call us directly.')
        return
      }

      setSubmitted(true)
    } catch (err) {
      console.error('Form submit error:', err)
      setError('Something went wrong. Please try again or call us directly.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-200 border border-[#0000001A]"
  const labelClass = "block text-gray-700 text-[14px] font-medium mb-1.5"

  return (
    <section className="py-16 md:py-28 relative overflow-hidden" id="general-inquiries">

      <div
        className="absolute -bottom-[100px] md:-bottom-[150px] left-0 w-full pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/jt/elements/paint-9.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom left',
          height: '70%',
        }}
      />

      <div className="mx-auto container px-4 lg:px-6 pb-20">
        <div className="flex flex-col xl:flex-row gap-8 md:gap-10 xl:gap-16">

          {/* Left: Info */}
          <div className="relative z-10 flex-1 xl:max-w-md xl:text-start text-center">
            <h2 className="text-[28px] md:text-[34px] lg:text-[48px] font-bold text-black mb-4 leading-tight font-['Avenir']">
              {heading}
            </h2>
            <p className="text-[16px] leading-relaxed mb-6 xl:w-[85%]">
              {description}
            </p>
            <p className="text-[16px] leading-relaxed mb-10 xl:w-[85%]">
              {quoteFormText}{' '}
              <a href={quoteFormLink} className="text-[#0052C6] underline hover:text-blue-800 transition-colors">
                {quoteFormLinkText}
              </a>
              {' '}form, or visit your local Jones Paint & Glass store.
            </p>
            <h3 className="text-[24px] md:text-[28px] lg:text-[32px] font-bold text-black mb-4 leading-tight font-['Avenir']">
              {corporateHeading}
            </h3>
            <a href={`tel:${phone?.replace(/-/g, '')}`} className="block text-[18px] font-medium text-[#0052C6] hover:underline mb-1">
              {phone}
            </a>
          </div>

          {/* Right: Form */}
          <div className="relative z-10 flex flex-1 w-full justify-center xl:justify-start" id="inquire-form">
            <div
              className="w-full max-w-2xl rounded-2xl p-6 md:px-10 md:py-10"
              style={{ background: '#F6F7FB', border: '1px solid #0000001A' }}
            >
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-gray-900 text-2xl font-bold mb-2">Thank you!</h3>
                  <p className="text-gray-500">We've received your message and will be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>

                  {/* First + Last name */}
                  <div className="flex gap-4 mb-5">
                    <div className="flex-1">
                      <label className={labelClass}>{labelFirstName}</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        required
                        className={inputClass}
                      />
                    </div>
                    <div className="flex-1">
                      <label className={labelClass}>{labelLastName}</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-5">
                    <label className={labelClass}>{labelEmail}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-5">
                    <label className={labelClass}>{labelPhone}</label>
                    <div className="flex gap-2">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="bg-white rounded-[8px] px-2 py-3 text-sm text-gray-800 outline-none border border-[#0000001A] focus:ring-2 focus:ring-blue-200 w-20 flex-shrink-0"
                      >
                        <option value="US">🇺🇸 US</option>
                        <option value="UK">🇬🇧 UK</option>
                        <option value="PK">🇵🇰 PK</option>
                        <option value="CA">🇨🇦 CA</option>
                        <option value="AU">🇦🇺 AU</option>
                      </select>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Store Location — dynamic from dashboard */}
                  <div className="mb-5">
                    <label className={labelClass}>{labelLocation}</label>
                    <div className="relative">
                      <select
                        name="store"
                        value={formData.store}
                        onChange={handleChange}
                        required
                        className={`${inputClass} appearance-none pr-8`}
                      >
                        <option value="">Select a store</option>
                        {stores.map((store, i) => (
                          <option key={i} value={store.name}>
                            {store.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className={labelClass}>{labelMessage}</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {/* Privacy checkbox */}
                  <label className="flex items-center gap-2.5 mb-6 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={() => setAgreed(!agreed)}
                      className="w-4 h-4 rounded accent-[#0052C6] cursor-pointer flex-shrink-0"
                    />
                    <span className="text-gray-600 text-[14px]">
                      You agree to our friendly{' '}
                      <a href={privacyPolicyLink} className="text-gray-800 underline hover:text-[#0052C6] transition-colors">
                        privacy policy
                      </a>.
                    </span>
                  </label>

                  {/* Error message */}
                  {error && (
                    <div className="mb-4 p-3 rounded-[8px] bg-red-50 border border-red-200">
                      <p className="text-red-600 text-[14px]">{error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!agreed || loading}
                    className="group w-full bg-[#0052C6] hover:bg-[#003fa0] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white font-semibold text-[15px] py-3.5 rounded-[8px] cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        {submitButtonText}
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none">
                          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </>
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