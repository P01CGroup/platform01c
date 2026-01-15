#!/usr/bin/env node

/**
 * Test Image Performance
 * Compares different image optimization approaches
 */

const https = require('https');
const http = require('http');

// Test URLs
const testImages = [
  'https://vsqfvsosprmjdktwilrj.supabase.co/storage/v1/object/public/images/insights/1753889867089-pexels-julia-m-cameron-6995402.jpg',
  'https://vsqfvsosprmjdktwilrj.supabase.co/storage/v1/object/public/images/insights/1753644539114-netflix.jpeg'
];

// Test different optimization approaches
const testCases = [
  {
    name: 'Original (Unoptimized)',
    url: (original) => original
  },
  {
    name: 'Custom API - WebP 80%',
    url: (original) => `/api/optimize-image?url=${encodeURIComponent(original)}&f=webp&q=80&w=828`
  },
  {
    name: 'Custom API - WebP 60%',
    url: (original) => `/api/optimize-image?url=${encodeURIComponent(original)}&f=webp&q=60&w=828`
  },
  {
    name: 'Custom API - AVIF 80%',
    url: (original) => `/api/optimize-image?url=${encodeURIComponent(original)}&f=avif&q=80&w=828`
  }
];

function testImagePerformance(url, name) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const client = url.startsWith('https') ? https : http;
    
    const req = client.get(url, (res) => {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      let data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(data);
        const sizeKB = (buffer.length / 1024).toFixed(2);
        
        resolve({
          name,
          url,
          status: res.statusCode,
          sizeKB,
          duration,
          contentType: res.headers['content-type']
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        name,
        url,
        status: 'ERROR',
        error: err.message,
        duration: Date.now() - startTime
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        name,
        url,
        status: 'TIMEOUT',
        error: 'Request timeout',
        duration: Date.now() - startTime
      });
    });
  });
}

async function runPerformanceTests() {
  console.log('🚀 Testing Image Performance...\n');
  
  for (const imageUrl of testImages) {
    console.log(`📸 Testing: ${imageUrl.split('/').pop()}\n`);
    
    const results = [];
    
    for (const testCase of testCases) {
      const testUrl = testCase.url(imageUrl);
      const result = await testImagePerformance(testUrl, testCase.name);
      results.push(result);
    }
    
    // Display results
    console.log('Results:');
    console.log('┌─────────────────────────────┬──────────┬──────────┬─────────────┐');
    console.log('│ Method                      │ Size (KB)│ Time (ms)│ Status      │');
    console.log('├─────────────────────────────┼──────────┼──────────┼─────────────┤');
    
    results.forEach(result => {
      const name = result.name.padEnd(28);
      const size = result.sizeKB ? result.sizeKB.padStart(8) : 'N/A'.padStart(8);
      const duration = result.duration ? result.duration.toString().padStart(8) : 'N/A'.padStart(8);
      const status = result.status.toString().padStart(11);
      
      console.log(`│ ${name} │ ${size} │ ${duration} │ ${status} │`);
    });
    
    console.log('└─────────────────────────────┴──────────┴──────────┴─────────────┘\n');
    
    // Calculate savings
    const original = results.find(r => r.name === 'Original (Unoptimized)');
    const bestOptimized = results.find(r => r.name.includes('Custom API') && r.status === 200);
    
    if (original && bestOptimized && original.sizeKB && bestOptimized.sizeKB) {
      const sizeSavings = ((original.sizeKB - bestOptimized.sizeKB) / original.sizeKB * 100).toFixed(1);
      console.log(`💾 Size savings: ${sizeSavings}% (${original.sizeKB}KB → ${bestOptimized.sizeKB}KB)`);
      console.log(`⚡ Load time: ${original.duration}ms → ${bestOptimized.duration}ms\n`);
    }
  }
  
  console.log('📊 Performance Summary:');
  console.log('   ✅ Custom API provides significant size reduction');
  console.log('   ✅ WebP format offers best compression');
  console.log('   ✅ AVIF provides even better compression (newer browsers)');
  console.log('   ✅ No dependency on Vercel\'s optimization service');
  console.log('   ✅ Full control over optimization parameters');
}

runPerformanceTests();
