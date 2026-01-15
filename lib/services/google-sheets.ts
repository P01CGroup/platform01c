import { google } from 'googleapis'

interface ContactFormData {
  fullName: string
  email: string
  phone: string
  company: string
  message: string
  pageUrl?: string
  timestamp?: string
}

class GoogleSheetsService {
  private sheets: any
  private auth: any

  constructor() {
    this.initializeAuth()
  }

  private initializeAuth() {
    try {
      // Parse the service account credentials from environment variable
      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS || '{}')
      
      if (!credentials.client_email || !credentials.private_key) {
        throw new Error('Google service account credentials not properly configured')
      }

      this.auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      })

      this.sheets = google.sheets({ version: 'v4', auth: this.auth })
    } catch (error) {
      console.error('Failed to initialize Google Sheets auth:', error)
      throw error
    }
  }

  async appendContactSubmission(data: ContactFormData): Promise<void> {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEET_ID
      if (!spreadsheetId) {
        throw new Error('GOOGLE_SHEET_ID environment variable not set')
      }

      const timestamp = data.timestamp || new Date().toISOString()
      
      // Prepare the row data
      const values = [
        [
          timestamp,
          data.fullName,
          data.email,
          data.phone,
          data.company,
          data.message,
          data.pageUrl || 'Unknown'
        ]
      ]

      // Check if headers exist, if not create them
      await this.ensureHeaders(spreadsheetId)

      // Append the data
      const response = await this.sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:G', // Adjust range as needed
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: {
          values
        }
      })

      console.log('Successfully added contact submission to Google Sheets:', response.data)
    } catch (error) {
      console.error('Failed to append contact submission to Google Sheets:', error)
      throw error
    }
  }

  private async ensureHeaders(spreadsheetId: string): Promise<void> {
    try {
      // Check if the sheet has headers
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'Sheet1!A1:G1'
      })

      const existingHeaders = response.data.values?.[0]
      
      // If no headers exist, add them
      if (!existingHeaders || existingHeaders.length === 0) {
        const headers = [
          'Timestamp',
          'Full Name',
          'Email',
          'Phone',
          'Company',
          'Message',
          'Page URL'
        ]

        await this.sheets.spreadsheets.values.update({
          spreadsheetId,
          range: 'Sheet1!A1:G1',
          valueInputOption: 'RAW',
          requestBody: {
            values: [headers]
          }
        })

        console.log('Added headers to Google Sheet')
      }
    } catch (error) {
      console.error('Failed to ensure headers in Google Sheet:', error)
      // Don't throw here as this is not critical for the main functionality
    }
  }

  async testConnection(): Promise<boolean> {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEET_ID
      if (!spreadsheetId) {
        return false
      }

      await this.sheets.spreadsheets.get({
        spreadsheetId
      })

      return true
    } catch (error) {
      console.error('Google Sheets connection test failed:', error)
      return false
    }
  }
}

// Export a singleton instance
export const googleSheetsService = new GoogleSheetsService()
