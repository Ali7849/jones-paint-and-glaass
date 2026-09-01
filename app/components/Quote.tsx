"use client";
import { useState } from "react";

type Store = {
  name: string
  emails: string
}

type QuoteProps = {
  title?: string
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

export default function Quote({
  title = 'Get a Quote',
  submitButtonText = 'Get Quote',
  labelFirstName = 'First name',
  labelLastName = 'Last name',
  labelEmail = 'Email',
  labelPhone = 'Phone number (optional)',
  labelLocation = 'Where are you located?',
  labelMessage = 'Message',
  stores = [],
}: QuoteProps) {
  const [agreed, setAgreed] = useState(false)
  const [country, setCountry] = useState('US')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
          formType: 'quote-request',
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

  return (
    <section className="relative min-h-screen mt-24 flex flex-col items-center justify-center px-4 py-16 bg-transparent overflow-hidden">

      {/* Paint splash — top right */}
      <div
        className="absolute md:top-[-100px] left-0 w-full pointer-events-none z-2"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-7.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          height: "60%",
        }}
      />

      {/* Paint splash — bottom left */}
      <div
        className="absolute md:bottom-[-150px] left-0 w-full pointer-events-none z-2"
        style={{
          backgroundImage: "url(/assets/jt/elements/paint-6.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom left",
          height: "80%",
        }}
      />

      {/* Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center relative z-10">
        {title}
      </h2>

      {/* Form Card */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl p-6 md:p-12"
        style={{ background: "linear-gradient(180deg, #0052C6 28.46%, #002559 100%)" }}
      >
        {submitted ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h3 className="text-white text-2xl font-bold mb-2">Thank you!</h3>
            <p className="text-blue-200">We've received your request and will be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* First + Last name */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1">
                <label className="block text-white text-[16px] tracking-wide font-extralight mb-2">
                  {labelFirstName}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  required
                  className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="block text-white text-[16px] tracking-wide font-medium mb-2">
                  {labelLastName}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  required
                  className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-white text-[16px] tracking-wide font-medium mb-2">
                {labelEmail}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-white text-[16px] tracking-wide font-medium mb-2">
                {labelPhone}
              </label>
              <div className="flex gap-2">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-white rounded-[8px] px-2 py-3 text-sm text-gray-800 outline-none w-16 -mr-2"
                >
                  <option value="US">US</option>
                  <option value="UK">UK</option>
                  <option value="PK">PK</option>
                  <option value="CA">CA</option>
                  <option value="AU">AU</option>
                </select>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="flex-1 bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            {/* Store Location — dynamic from dashboard */}
            <div className="mb-4">
              <label className="block text-white text-[16px] tracking-wide font-medium mb-2">
                {labelLocation}
              </label>
              <select
                name="store"
                value={formData.store}
                onChange={handleChange}
                required
                className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 outline-none appearance-none"
              >
                <option value="">Select a store</option>
                {stores.map((store, i) => (
                  <option key={i} value={store.name}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div className="mb-5">
              <label className="block text-white text-[16px] tracking-wide font-medium mb-2">
                {labelMessage}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full bg-white rounded-[8px] px-3 py-3 text-sm text-gray-800 outline-none resize-none"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-center gap-2 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                className="w-4 h-4 rounded-md accent-blue-400 cursor-pointer"
              />
              <span className="text-white text-[16px] tracking-wide">
                You agree to our friendly{' '}
                <a href="/privacy-policy" className="underline hover:text-blue-200 transition-colors">
                  privacy policy.
                </a>
              </span>
            </label>

            {/* Error message */}
            {error && (
              <div className="mb-4 p-3 rounded-[8px] bg-red-400/20 border border-red-300/40">
                <p className="text-white text-[14px]">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!agreed || loading}
              className="group w-full bg-white text-[#0052C6] font-semibold text-sm py-3 rounded-[8px] hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4 text-[#0052C6]" viewBox="0 0 24 24" fill="none">
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
    </section>
  )
}