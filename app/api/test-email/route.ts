import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function GET(request: NextRequest) {
  try {
    console.log('Testing email configuration...')
    console.log('API Key present:', !!process.env.RESEND_API_KEY)
    
    const emailResult = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['faizan@jztech.co'],
      subject: 'Test Email from Platform01 Consulting',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Test Email</h2>
          <p>This is a test email to verify Resend configuration.</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <p><strong>API Key:</strong> ${process.env.RESEND_API_KEY ? 'Present' : 'Missing'}</p>
        </div>
      `,
    })

    console.log('Test email result:', emailResult)

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      result: emailResult
    })

  } catch (error: any) {
    console.error('Test email failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: {
        name: error.name,
        message: error.message,
        stack: error.stack
      }
    }, { status: 500 })
  }
} 