// Usage: node scripts/upload-credentials-from-csv.js
// Make sure to set API_BASE_URL (e.g. http://localhost:3000) if not running on default

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const csvParse = require('csv-parse/lib/sync');

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';
const CSV_PATH = path.join(__dirname, '../Copy of Platform01 Consulting Credentials - Sheet1.csv');

async function uploadCredential(credential) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/credentials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credential),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error('Failed:', credential.title, data.error || data);
    } else {
      console.log('Uploaded:', credential.title);
    }
  } catch (err) {
    console.error('Error uploading', credential.title, err);
  }
}

function parseTags(str) {
  if (!str) return [];
  return str.split(',').map(s => s.trim()).filter(Boolean);
}

function main() {
  const csvContent = fs.readFileSync(CSV_PATH, 'utf8');
  const records = csvParse(csvContent, {
    columns: true,
    skip_empty_lines: true,
  });

  const credentials = records.map(row => {
    const service_tags = parseTags(row['Project Type (Tags)']);
    const industry_tags = parseTags(row['Industry (Tags)']);
    const title = row['Description for Website Credentials']?.trim();
    return {
      service_tags,
      industry_tags,
      title,
      is_active: true,
      sort_order: 0,
    };
  }).filter(c => c.title && c.service_tags.length && c.industry_tags.length);

  console.log(`Uploading ${credentials.length} credentials...`);
  (async () => {
    for (const cred of credentials) {
      await uploadCredential(cred);
    }
    console.log('Done.');
  })();
}

main(); 