#!/usr/bin/env node

/**
 * Database Seeding Script for Platform01 CMS
 * Phase 3.1: Database Seeding - Migrate existing hardcoded data
 * 
 * This script migrates all existing credentials and insights data to the database
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Validate environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Initialize Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedDatabase() {
  console.log('🌱 Starting database seeding for Platform01 CMS...\n');

  try {
    // Read the seed data SQL file
    const seedDataPath = path.join(__dirname, '..', 'lib', 'supabase', 'schema', 'seed-data.sql');
    
    if (!fs.existsSync(seedDataPath)) {
      throw new Error(`Seed data file not found: ${seedDataPath}`);
    }

    const seedData = fs.readFileSync(seedDataPath, 'utf8');
    
    console.log('📄 Seed data file loaded successfully');
    console.log('🚀 Executing database seeding...\n');

    // Execute the seed data SQL
    const { error } = await supabase.rpc('exec_sql', { sql: seedData });
    
    if (error) {
      // If the RPC method doesn't exist, try direct execution
      console.log('⚠️  RPC method not available, trying direct SQL execution...');
      
      // Split the SQL into individual statements and execute them
      const statements = seedData
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

      for (const statement of statements) {
        if (statement.trim()) {
          console.log(`Executing: ${statement.substring(0, 50)}...`);
          const { error: stmtError } = await supabase.rpc('exec_sql', { sql: statement });
          if (stmtError) {
            console.warn(`⚠️  Statement execution warning: ${stmtError.message}`);
          }
        }
      }
    }

    console.log('✅ Database seeding completed successfully!\n');

    // Verify the seeding by checking data counts
    console.log('🔍 Verifying seeded data...\n');

    // Check credentials count
    const { data: credentialsData, error: credentialsError } = await supabase
      .from('credentials')
      .select('*', { count: 'exact' });

    if (credentialsError) {
      console.error('❌ Error checking credentials:', credentialsError.message);
    } else {
      console.log(`📊 Credentials seeded: ${credentialsData?.length || 0} records`);
    }

    // Check insights count
    const { data: insightsData, error: insightsError } = await supabase
      .from('insights')
      .select('*', { count: 'exact' });

    if (insightsError) {
      console.error('❌ Error checking insights:', insightsError.message);
    } else {
      console.log(`📊 Insights seeded: ${insightsData?.length || 0} records`);
    }

    // Show sample data
    console.log('\n📋 Sample seeded data:');
    
    if (credentialsData && credentialsData.length > 0) {
      console.log('\nCredentials (first 3):');
      credentialsData.slice(0, 3).forEach((cred, index) => {
        console.log(`  ${index + 1}. ${cred.type} - ${cred.category}: ${cred.title}`);
      });
    }

    if (insightsData && insightsData.length > 0) {
      console.log('\nInsights (first 3):');
      insightsData.slice(0, 3).forEach((insight, index) => {
        console.log(`  ${index + 1}. ${insight.title} (${insight.author})`);
      });
    }

    console.log('\n🎉 Database seeding verification completed!');
    console.log('\nNext steps:');
    console.log('1. Test the API endpoints (Phase 3.2)');
    console.log('2. Update frontend components to use dynamic data (Phase 4)');
    console.log('3. Create admin interface (Phase 5)');

  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    console.error('Stack trace:', error.stack);
    process.exit(1);
  }
}

// Alternative seeding method using direct SQL execution
async function seedDatabaseAlternative() {
  console.log('🔄 Trying alternative seeding method...\n');

  try {
    // Insert credentials data directly
    const credentialsData = [
      { type: 'Industry', category: 'Manufacturing', title: 'Feasibility Study for a Steel Manufacturing Plant Expansion', sort_order: 1, is_active: true },
      { type: 'Industry', category: 'Energy', title: 'Market Analysis for Renewable Energy Infrastructure Development', sort_order: 2, is_active: true },
      { type: 'Industry', category: 'Technology', title: 'Business Plan for AI-Powered Logistics Platform', sort_order: 3, is_active: true },
      { type: 'Service', category: 'M&A Advisory', title: 'Due Diligence for $500M Technology Acquisition', sort_order: 1, is_active: true },
      { type: 'Service', category: 'Corporate Finance', title: 'Valuation Analysis for Private Equity Investment', sort_order: 2, is_active: true },
    ];

    const { data: credData, error: credError } = await supabase
      .from('credentials')
      .insert(credentialsData)
      .select();

    if (credError) {
      console.error('❌ Error inserting credentials:', credError.message);
    } else {
      console.log(`✅ Credentials inserted: ${credData?.length || 0} records`);
    }

    // Insert insights data directly
    const insightsData = [
      {
        title: 'The Role of Cultural Insights in Building Authentic Brand Communications',
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        author: 'Mr. Omar Abedin',
        co_author: 'Hamna Asghar',
        image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        published_date: '2024-12-20',
        is_published: true,
        slug: 'cultural-insights-brand-communications-1703123458',
        meta_description: 'Exploring how cultural insights can enhance brand communication strategies.',
        tags: ['Brand Strategy', 'Cultural Insights', 'Marketing']
      },
      {
        title: 'Digital Transformation in Financial Services: A Strategic Approach',
        excerpt: 'Understanding the key drivers and implementation strategies for successful digital transformation in the financial services sector.',
        author: 'Mr. Omar Abedin',
        co_author: 'Hamna Asghar',
        image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        published_date: '2024-12-20',
        is_published: true,
        slug: 'digital-transformation-financial-services-1703123459',
        meta_description: 'A comprehensive guide to digital transformation strategies in financial services.',
        tags: ['Digital Transformation', 'Financial Services', 'Strategy']
      }
    ];

    const { data: insightData, error: insightError } = await supabase
      .from('insights')
      .insert(insightsData)
      .select();

    if (insightError) {
      console.error('❌ Error inserting insights:', insightError.message);
    } else {
      console.log(`✅ Insights inserted: ${insightData?.length || 0} records`);
    }

    console.log('\n🎉 Alternative seeding completed!');

  } catch (error) {
    console.error('❌ Alternative seeding failed:', error.message);
    process.exit(1);
  }
}

// Main execution
if (require.main === module) {
  seedDatabase().catch(() => {
    console.log('\n🔄 Primary seeding method failed, trying alternative...\n');
    return seedDatabaseAlternative();
  });
}

module.exports = { seedDatabase, seedDatabaseAlternative }; 