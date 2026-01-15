import { describe, it, expect, vi } from 'vitest'

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: vi.fn(async () => ({ id: 'ok' })) }
  }
}))

vi.mock('@/lib/services/google-sheets', () => ({
  googleSheetsService: {
    appendContactSubmission: vi.fn(async () => undefined)
  }
}))

import { POST } from '@/app/api/contact/route'

describe('contact api', () => {
  it('validates required fields', async () => {
    const req: any = { json: async () => ({ fullName: '', email: '', phone: '', company: '', message: '' }), headers: { get: () => 'http://test' } }
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('accepts valid submission', async () => {
    const body = { fullName: 'A', email: 'a@b.com', phone: '+14155552671', company: 'ACME', message: 'Hello world' }
    const req: any = { json: async () => body, headers: { get: () => 'http://test' } }
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })
})

