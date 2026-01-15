#!/usr/bin/env node

/**
 * Test Image URLs
 * This script tests if Supabase storage image URLs are accessible
 */

const https = require('https');
const http = require('http');

// Test URLs from your Supabase storage
const testUrls = [
  'https://vsqfvsosprmjdktwilrj.supabase.co/storage/v1/object/public/images/insights/1753071447321-pulp.png',
  'https://vsqfvsosprmjdktwilrj.supabase.co/storage/v1/object/public/images/insights/1753889867089-pexels-julia-m-cameron-6995402.jpg'
];

function testUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      console.log(`✅ ${url}`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Content-Type: ${res.headers['content-type']}`);
      console.log(`   Content-Length: ${res.headers['content-length']} bytes`);
      console.log(`   Access-Control-Allow-Origin: ${res.headers['access-control-allow-origin'] || 'Not set'}`);
      console.log('');
      
      resolve({
        url,
        status: res.statusCode,
        contentType: res.headers['content-type'],
        contentLength: res.headers['content-length'],
        cors: res.headers['access-control-allow-origin']
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${url}`);
      console.log(`   Error: ${err.message}`);
      console.log('');
      
      resolve({
        url,
        status: 'ERROR',
        error: err.message
      });
    });

    req.setTimeout(10000, () => {
      console.log(`⏰ ${url}`);
      console.log(`   Timeout after 10 seconds`);
      console.log('');
      
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        error: 'Request timeout'
      });
    });
  });
}

async function testAllUrls() {
  console.log('🧪 Testing Supabase Storage Image URLs...\n');
  
  const results = [];
  
  for (const url of testUrls) {
    const result = await testUrl(url);
    results.push(result);
  }
  
  console.log('📊 Test Summary:');
  console.log(`   Total URLs tested: ${results.length}`);
  console.log(`   Successful: ${results.filter(r => r.status === 200).length}`);
  console.log(`   Failed: ${results.filter(r => r.status !== 200).length}`);
  
  const failed = results.filter(r => r.status !== 200);
  if (failed.length > 0) {
    console.log('\n❌ Failed URLs:');
    failed.forEach(f => {
      console.log(`   ${f.url} - ${f.error || f.status}`);
    });
  }
  
  console.log('\n💡 If images are not loading in production:');
  console.log('   1. Check browser console for CORS errors');
  console.log('   2. Verify the image URLs are correct');
  console.log('   3. Ensure Supabase storage bucket is public');
  console.log('   4. Check if the images actually exist in the bucket');
}

testAllUrls();
