# Google Sheets Integration Setup Guide

This guide will help you set up Google Sheets integration for your contact form submissions.

## Overview

Your contact form will now save submissions to both:
1. **Email notifications** (via Resend) - existing functionality
2. **Google Sheets** - new functionality

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter a project name (e.g., "Platform01 Contact Forms")
4. Click "Create"

## Step 2: Enable Google Sheets API

1. In your Google Cloud project, go to "APIs & Services" → "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

## Step 3: Create a Service Account

1. Go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Enter details:
   - **Name**: `platform01-sheets-service`
   - **Description**: `Service account for contact form submissions`
4. Click "Create and Continue"
5. Skip the "Grant access" step for now
6. Click "Done"

## Step 4: Generate Service Account Key

1. Find your newly created service account in the list
2. Click on it to open details
3. Go to the "Keys" tab
4. Click "Add Key" → "Create new key"
5. Select "JSON" format
6. Click "Create"
7. **Important**: Save the downloaded JSON file securely - you'll need it for the environment variables

## Step 5: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new blank spreadsheet
3. Name it something like "Platform01 Contact Form Submissions"
4. **Copy the Sheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit
   ```
   The `[SHEET_ID]` is what you need.

## Step 6: Share the Sheet with Service Account

1. In your Google Sheet, click "Share" (top right)
2. Add the service account email (found in the JSON file as `client_email`)
3. Give it "Editor" permissions
4. Click "Send"

## Step 7: Configure Environment Variables

1. Copy your `.env.local` file (or create it from `env.template`)
2. Add the following variables:

```env
# Google Sheets Configuration
GOOGLE_SHEET_ID=your_actual_sheet_id_here

# Google Service Account Credentials (paste the entire JSON as a single line)
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS={"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"your-service-account@your-project.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/your-service-account%40your-project.iam.gserviceaccount.com"}
```

### Important Notes for GOOGLE_SERVICE_ACCOUNT_CREDENTIALS:

- Paste the **entire JSON content** from the downloaded file
- Keep it as a **single line** (no line breaks)
- Make sure to escape any quotes properly
- The private key should include the `\n` characters for line breaks

## Step 8: Test the Integration

1. Restart your development server:
   ```bash
   bun dev
   ```

2. Submit a test contact form on your website

3. Check your Google Sheet - you should see:
   - Headers automatically created (Timestamp, Full Name, Email, Phone, Company, Message, Page URL)
   - Your test submission in the next row

4. Check your server logs for any error messages

## Troubleshooting

### Common Issues:

1. **"Google service account credentials not properly configured"**
   - Check that `GOOGLE_SERVICE_ACCOUNT_CREDENTIALS` is properly formatted as a single-line JSON
   - Ensure all required fields are present in the JSON

2. **"GOOGLE_SHEET_ID environment variable not set"**
   - Verify you've set the `GOOGLE_SHEET_ID` variable
   - Make sure you copied the correct Sheet ID from the URL

3. **"Permission denied" errors**
   - Ensure the service account email has been shared with the Google Sheet
   - Check that the service account has "Editor" permissions

4. **"API not enabled" errors**
   - Verify that Google Sheets API is enabled in your Google Cloud project

### Testing the Connection:

You can test if the Google Sheets integration is working by checking the server logs when submitting a form. Look for:
- `"Contact submission saved to Google Sheets successfully"` - success
- `"Failed to save contact submission to Google Sheets"` - failure

## Security Notes

- Keep your service account JSON file secure
- Never commit the actual credentials to version control
- The service account has minimal permissions (only access to the specific sheet)
- Consider rotating the service account key periodically

## Sheet Structure

The Google Sheet will automatically create these columns:
- **Timestamp**: When the form was submitted
- **Full Name**: Contact's full name
- **Email**: Contact's email address
- **Phone**: Contact's phone number
- **Company**: Contact's company name
- **Message**: The message content
- **Page URL**: Which page the form was submitted from

## Support

If you encounter any issues, check:
1. Server logs for error messages
2. Google Cloud Console for API quotas and errors
3. Google Sheet permissions
4. Environment variable formatting

The integration is designed to be resilient - if Google Sheets fails, the form submission will still succeed and send the email notification.
