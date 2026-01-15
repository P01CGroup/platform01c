import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' })
    if (!res.ok) {
      return NextResponse.json({ country_code: 'AE' }, { status: 200 })
    }
    const data = await res.json()
    const code = typeof data?.country_code === 'string' ? data.country_code : 'AE'
    return NextResponse.json({ country_code: code })
  } catch {
    return NextResponse.json({ country_code: 'AE' }, { status: 200 })
  }
}

