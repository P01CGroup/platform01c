import { describe, it, expect } from 'vitest'
import { formatPhone, isValidPhone, normalizePhone } from '@/lib/utils/phone'

describe('phone utils', () => {
  it('formats UAE numbers', () => {
    const formatted = formatPhone('501234567', 'ae')
    expect(formatted).toMatch(/\+?\d/)
  })

  it('validates US numbers', () => {
    expect(isValidPhone('+1 415 555 2671', 'us')).toBe(true)
  })

  it('normalizes to E.164', () => {
    const n = normalizePhone('(415) 555-2671', 'us')
    expect(n).toMatch(/^\+1\d{10}$/)
  })
})

