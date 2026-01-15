import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactForm from '@/components/ui/ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    // @ts-ignore
    global.fetch = vi.fn(async (url, opts) => {
      if (typeof url === 'string' && url.includes('/api/geo')) {
        return { ok: true, json: async () => ({ country_code: 'US' }) } as any
      }
      if (typeof url === 'string' && url.includes('/api/contact')) {
        return { ok: true, json: async () => ({ success: true }) } as any
      }
      return { ok: true, json: async () => ({}) } as any
    })
  })

  it('shows validation error when phone invalid', async () => {
    render(<ContactForm context="test" />)

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'John Doe' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Company'), { target: { value: 'ACME' } })
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: 'Hello world message' } })

    const phoneInput = document.querySelector('input[type="tel"]') as HTMLInputElement
    if (phoneInput) {
      fireEvent.change(phoneInput, { target: { value: '+1' } })
    }

    const button = screen.getByRole('button', { name: /submit an inquiry/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/Please enter a valid phone number/i)).toBeInTheDocument()
    })
  })
})
