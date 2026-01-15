#!/usr/bin/env node

/**
 * Supabase Storage Setup Script
 * Helps configure storage bucket and policies for WordPress image migration
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  try {
    console.log('Setting up Supabase storage...');
    
    // Create the images bucket
    const { data: bucketData, error: bucketError } = await supabase.storage.createBucket('images', {
      public: true,
      allowedMimeTypes: ['image/*'],
      fileSizeLimit: 5242880, // 5MB
    });

    if (bucketError) {
      if (bucketError.message.includes('already exists')) {
        console.log('✅ Images bucket already exists');
      } else {
        console.error('Error creating bucket:', bucketError);
        return;
      }
    } else {
      console.log('✅ Images bucket created successfully');
    }

    // Set up RLS policies for the images bucket
    const policies = [
      {
        name: 'Public read access',
        policy: `
          CREATE POLICY "Public read access" ON storage.objects
          FOR SELECT USING (bucket_id = 'images');
        `
      },
      {
        name: 'Authenticated users can upload',
        policy: `
          CREATE POLICY "Authenticated users can upload" ON storage.objects
          FOR INSERT WITH CHECK (bucket_id = 'images');
        `
      },
      {
        name: 'Users can update their own uploads',
        policy: `
          CREATE POLICY "Users can update their own uploads" ON storage.objects
          FOR UPDATE USING (bucket_id = 'images');
        `
      },
      {
        name: 'Users can delete their own uploads',
        policy: `
          CREATE POLICY "Users can delete their own uploads" ON storage.objects
          FOR DELETE USING (bucket_id = 'images');
        `
      }
    ];

    for (const policy of policies) {
      try {
        await supabase.rpc('exec_sql', { sql: policy.policy });
        console.log(`✅ ${policy.name} policy created`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`✅ ${policy.name} policy already exists`);
        } else {
          console.error(`Error creating ${policy.name} policy:`, error);
        }
      }
    }

    console.log('🎉 Storage setup completed successfully!');
    console.log('📁 Images will be stored in the "images" bucket');
    console.log('🔗 Public URLs will be available for uploaded images');

  } catch (error) {
    console.error('Error setting up storage:', error);
  }
}

setupStorage(); 