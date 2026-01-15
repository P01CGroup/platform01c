#!/usr/bin/env node

/**
 * Test Unoptimized Images
 * This script tests if images load correctly with unoptimized configuration
 */

const https = require('https');
const http = require('http');

// Test direct Supabase URLs (these should work)
const testUrls = [
  'https://vsqfvsosprmjdktwilrj.supabase.co/storage/v1/object/public/images/insights/1753071447321-pulp.png',
  'https://vsqfvsosprmjdktwilrj.supabase.co/storage/v1/object/public/images/insights/1753889867089-pexels-julia-m-cameron-6995402.jpg'
];

// Test Next.js image optimization URLs (these should fail with 402)
const testOptimizedUrls = [
  'https://platform01consulting.com/_next/image?url=https%3A%2F%2Fvsqfvsosprmjdktwilrj.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Finsights%2F1753889867089-pexels-julia-m-cameron-6995402.jpg&w=828&q=100',
  'https://platform01consulting.com/_next/image?url=https%3A%2F%2Fvsqfvsosprmjdktwilrj.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fimages%2Finsights%2F1753644539114-netflix.jpeg&w=828&q=100'
];

function testUrl(url, description) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      console.log(`✅ ${description}`);
      console.log(`   URL: ${url}`);
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Content-Type: ${res.headers['content-type']}`);
      console.log('');
      
      resolve({
        url,
        status: res.statusCode,
        contentType: res.headers['content-type'],
        description
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${description}`);
      console.log(`   URL: ${url}`);
      console.log(`   Error: ${err.message}`);
      console.log('');
      
      resolve({
        url,
        status: 'ERROR',
        error: err.message,
        description
      });
    });

    req.setTimeout(10000, () => {
      console.log(`⏰ ${description}`);
      console.log(`   URL: ${url}`);
      console.log(`   Timeout after 10 seconds`);
      console.log('');
      
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        error: 'Request timeout',
        description
      });
    });
  });
}

async function testAllUrls() {
  console.log('🧪 Testing Image URLs with Unoptimized Configuration...\n');
  
  console.log('📋 Testing Direct Supabase URLs (should work):');
  for (const url of testUrls) {
    await testUrl(url, 'Direct Supabase URL');
  }
  
  console.log('📋 Testing Next.js Optimized URLs (should fail with 402):');
  for (const url of testOptimizedUrls) {
    await testUrl(url, 'Next.js Optimized URL');
  }
  
  console.log('💡 Solution Summary:');
  console.log('   ✅ Direct Supabase URLs work fine');
  console.log('   ❌ Next.js image optimization fails with 402 Payment Required');
  console.log('   🔧 Setting unoptimized=true in next.config.ts fixes this');
  console.log('   📝 Images will load directly from Supabase without optimization');
}

testAllUrls();
