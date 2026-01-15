#!/usr/bin/env node

/**
 * WordPress Migration Script
 * Imports WordPress posts into Supabase insights table
 * 
 * Usage:
 * node scripts/wordpress-migration.js --file=wordpress-posts-2024-01-01.json
 * node scripts/wordpress-migration.js --file=wordpress-posts-2024-01-01.json --dry-run
 */

const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const fileArg = args.find(arg => arg.startsWith('--file='));
const isDryRun = args.includes('--dry-run');
const isPreview = args.includes('--preview');

const inputFile = fileArg ? fileArg.split('=')[1] : null;

// Mock Supabase client for dry-run mode
const mockSupabase = {
  from: (table) => ({
    insert: async (data) => {
      console.log(`[DRY RUN] Would insert ${data.length} records into ${table}`);
      return { data, error: null };
    }
  })
};

// Real Supabase client (you'll need to configure this)
let supabase;
if (!isDryRun) {
  try {
    // Load environment variables
    require('dotenv').config({ path: '.env.local' });
    
    const { createClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
    }
    
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error.message);
    console.log('💡 For dry-run mode, use: node scripts/wordpress-migration.js --file=your-file.json --dry-run');
    process.exit(1);
  }
}

async function validateInsightData(insight) {
  const errors = [];
  
  // Required fields
  if (!insight.title || insight.title.trim().length === 0) {
    errors.push('Missing or empty title');
  }
  
  if (!insight.excerpt || insight.excerpt.trim().length === 0) {
    errors.push('Missing or empty excerpt');
  }
  
  if (!insight.author || insight.author.trim().length === 0) {
    errors.push('Missing or empty author');
  }
  
  if (!insight.slug || insight.slug.trim().length === 0) {
    errors.push('Missing or empty slug');
  }
  
  // Validate slug format
  if (insight.slug && !/^[a-z0-9-]+$/.test(insight.slug)) {
    errors.push('Invalid slug format (should be lowercase, alphanumeric, hyphens only)');
  }
  
  // Validate date format
  if (insight.published_date) {
    const date = new Date(insight.published_date);
    if (isNaN(date.getTime())) {
      errors.push('Invalid published_date format');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function cleanInsightData(insight) {
  return {
    title: insight.title?.trim() || 'Untitled',
    excerpt: insight.excerpt?.trim() || 'No excerpt available',
    content: insight.content?.trim() || '',
    image_url:
      (Array.isArray(insight.supabaseImages) && insight.supabaseImages.length > 0
        ? insight.supabaseImages[0].supabaseUrl
        : (insight.image_url?.trim() || null)),
    author: insight.author?.trim() || 'Unknown Author',
    co_author: insight.co_author?.trim() || null,
    published_date: insight.published_date || new Date().toISOString().split('T')[0],
    is_published: insight.is_published !== false, // Default to true
    slug: insight.slug?.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-') || `post-${Date.now()}`,
    meta_description: insight.meta_description?.trim() || null,
    tags: Array.isArray(insight.tags) 
      ? insight.tags
          .filter(tag => tag && typeof tag === 'string' && tag.trim().length > 0)
          .map(tag => tag.trim())
      : []
  };
}

async function migrateInsights(insights) {
  console.log(`🚀 Starting migration of ${insights.length} insights...`);
  
  const results = {
    total: insights.length,
    successful: 0,
    failed: 0,
    errors: []
  };
  
  for (let i = 0; i < insights.length; i++) {
    const insight = insights[i];
    console.log(`\n📝 Processing insight ${i + 1}/${insights.length}: "${insight.title}"`);
    
    try {
      // Validate the insight
      const validation = await validateInsightData(insight);
      if (!validation.isValid) {
        const error = `Validation failed: ${validation.errors.join(', ')}`;
        results.errors.push({ insight: insight.title, error });
        results.failed++;
        console.log(`❌ ${error}`);
        continue;
      }
      
      // Clean the data
      const cleanedInsight = cleanInsightData(insight);
      
      if (isPreview) {
        console.log('📋 Preview:');
        console.log(`   Title: ${cleanedInsight.title}`);
        console.log(`   Author: ${cleanedInsight.author}`);
        console.log(`   Slug: ${cleanedInsight.slug}`);
        console.log(`   Published: ${cleanedInsight.published_date}`);
        console.log(`   Tags: ${cleanedInsight.tags.join(', ') || 'None'}`);
        continue;
      }
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('insights')
        .insert([cleanedInsight])
        .select();
      
      if (error) {
        const errorMsg = `Database error: ${error.message}`;
        results.errors.push({ insight: insight.title, error: errorMsg });
        results.failed++;
        console.log(`❌ ${errorMsg}`);
      } else {
        results.successful++;
        console.log(`✅ Successfully migrated: ${cleanedInsight.title}`);
      }
      
    } catch (error) {
      const errorMsg = `Unexpected error: ${error.message}`;
      results.errors.push({ insight: insight.title, error: errorMsg });
      results.failed++;
      console.log(`❌ ${errorMsg}`);
    }
  }
  
  return results;
}

async function main() {
  console.log('🚀 WordPress Migration Script');
  console.log('=============================\n');
  
  if (!inputFile) {
    console.log('❌ Missing input file. Usage:');
    console.log('  node scripts/wordpress-migration.js --file=wordpress-posts.json');
    console.log('  node scripts/wordpress-migration.js --file=wordpress-posts.json --dry-run');
    console.log('  node scripts/wordpress-migration.js --file=wordpress-posts.json --preview');
    process.exit(1);
  }
  
  const inputPath = path.join(process.cwd(), inputFile);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`❌ Input file not found: ${inputPath}`);
    process.exit(1);
  }
  
  try {
    console.log(`📁 Loading data from: ${inputFile}`);
    const fileContent = fs.readFileSync(inputPath, 'utf8');
    const insights = JSON.parse(fileContent);
    
    if (!Array.isArray(insights)) {
      throw new Error('Invalid file format: expected array of insights');
    }
    
    console.log(`📊 Found ${insights.length} insights to migrate`);
    
    if (isDryRun) {
      console.log('🔍 DRY RUN MODE - No data will be inserted');
      supabase = mockSupabase;
    }
    
    if (isPreview) {
      console.log('👀 PREVIEW MODE - Showing first 3 insights');
      const previewInsights = insights.slice(0, 3);
      await migrateInsights(previewInsights);
      return;
    }
    
    // Confirm before proceeding (unless dry-run)
    if (!isDryRun) {
      console.log('\n⚠️  This will insert data into your Supabase insights table.');
      console.log('Press Ctrl+C to cancel, or any key to continue...');
      
      // Wait for user input
      await new Promise(resolve => {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.once('data', () => {
          process.stdin.setRawMode(false);
          resolve();
        });
      });
    }
    
    // Start migration
    const results = await migrateInsights(insights);
    
    // Print results
    console.log('\n📊 Migration Results:');
    console.log('====================');
    console.log(`✅ Successful: ${results.successful}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`📊 Total: ${results.total}`);
    
    if (results.errors.length > 0) {
      console.log('\n❌ Errors:');
      results.errors.forEach((error, index) => {
        console.log(`  ${index + 1}. "${error.insight}": ${error.error}`);
      });
    }
    
    if (results.successful > 0) {
      console.log('\n🎉 Migration completed successfully!');
      console.log('Your WordPress posts are now available in the insights table.');
    } else {
      console.log('\n⚠️ No insights were successfully migrated.');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  validateInsightData,
  cleanInsightData,
  migrateInsights
}; 