import { describe, it, expect, vi } from 'vitest'
import { GET } from '@/app/api/geo/route'

describe('geo api', () => {
  it('returns default AE on failure', async () => {
    const originalFetch = global.fetch
    // @ts-ignore
    global.fetch = vi.fn(async () => ({ ok: false }))
    const res = await GET()
    const json = await res.json()
    expect(json.country_code).toBe('AE')
    global.fetch = originalFetch
  })
})

