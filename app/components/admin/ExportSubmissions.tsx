'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const FROM_KEY = 'where[createdAt][greater_than_equal]'
const TO_KEY = 'where[createdAt][less_than_equal]'

export default function ExportSubmissions() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const collection = pathname.split('/collections/')[1]?.split('/')[0]
  if (!collection) return null

  // The URL is the single source of truth, so the table and the export agree
  const from = searchParams.get(FROM_KEY)?.slice(0, 10) ?? ''
  const to = searchParams.get(TO_KEY)?.slice(0, 10) ?? ''

  const applyDates = (nextFrom: string, nextTo: string) => {
    const next = new URLSearchParams(searchParams.toString())

    if (nextFrom) next.set(FROM_KEY, `${nextFrom}T00:00:00.000Z`)
    else next.delete(FROM_KEY)

    if (nextTo) next.set(TO_KEY, `${nextTo}T23:59:59.999Z`)
    else next.delete(TO_KEY)

    next.delete('page') // a narrower result set may not have the current page
    router.push(`${pathname}?${next.toString()}`)
  }

  const exportParams = new URLSearchParams({ collection })
  if (from) exportParams.set('from', from)
  if (to) exportParams.set('to', to)

  const search = searchParams.get('search')
  if (search) exportParams.set('search', search)

  const sort = searchParams.get('sort')
  if (sort) exportParams.set('sort', sort)

  const invalidRange = from && to && from > to

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem 0.625rem',
    height: '2.5rem',
    borderRadius: '4px',
    border: '1px solid var(--theme-elevation-150)',
    background: 'var(--theme-input-bg)',
    color: 'var(--theme-elevation-800)',
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flexWrap: 'wrap',
        marginBottom: '1.25rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.8125rem', opacity: 0.65 }}>From</span>
        <input
          type="date"
          value={from}
          onChange={(e) => applyDates(e.target.value, to)}
          style={inputStyle}
        />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.8125rem', opacity: 0.65 }}>To</span>
        <input
          type="date"
          value={to}
          onChange={(e) => applyDates(from, e.target.value)}
          style={inputStyle}
        />
      </div>

      
      <a  href={
          invalidRange
            ? undefined
            : `/api/export-submissions?${exportParams.toString()}`
        }
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          height: '2.5rem',
          padding: '0 1rem',
          borderRadius: '4px',
          background: '#0052C6',
          color: '#fff',
          fontSize: '0.8125rem',
          fontWeight: 600,
          textDecoration: 'none',
          opacity: invalidRange ? 0.5 : 1,
          pointerEvents: invalidRange ? 'none' : 'auto',
        }}
      >
        Export CSV
      </a>

      {(from || to) && (
        <button
          type="button"
          onClick={() => applyDates('', '')}
          style={{
            height: '2.5rem',
            padding: '0 0.875rem',
            borderRadius: '4px',
            background: 'transparent',
            border: '1px solid var(--theme-elevation-150)',
            color: 'var(--theme-elevation-800)',
            fontSize: '0.8125rem',
            cursor: 'pointer',
          }}
        >
          Clear
        </button>
      )}

      {invalidRange && (
        <span style={{ fontSize: '0.8125rem', color: '#e11d48' }}>
          &ldquo;From&rdquo; must be before &ldquo;To&rdquo;
        </span>
      )}
    </div>
  )
}