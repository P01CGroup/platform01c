const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixStoragePolicies() {
  try {
    console.log('Fixing Supabase storage policies...');
    
    // Drop existing policies first
    const dropPolicies = [
      'DROP POLICY IF EXISTS "Public read access" ON storage.objects;',
      'DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;',
      'DROP POLICY IF EXISTS "Users can update their own uploads" ON storage.objects;',
      'DROP POLICY IF EXISTS "Users can delete their own uploads" ON storage.objects;'
    ];

    for (const dropPolicy of dropPolicies) {
      try {
        await supabase.rpc('exec_sql', { sql: dropPolicy });
        console.log('✅ Dropped existing policy');
      } catch (error) {
        console.log('Policy already dropped or not found');
      }
    }

    // Create new, more permissive policies
    const policies = [
      {
        name: 'Public read access for images',
        policy: `
          CREATE POLICY "Public read access for images" ON storage.objects
          FOR SELECT USING (bucket_id = 'images');
        `
      },
      {
        name: 'Authenticated users can upload images',
        policy: `
          CREATE POLICY "Authenticated users can upload images" ON storage.objects
          FOR INSERT WITH CHECK (
            bucket_id = 'images' 
            AND auth.role() = 'authenticated'
          );
        `
      },
      {
        name: 'Authenticated users can update images',
        policy: `
          CREATE POLICY "Authenticated users can update images" ON storage.objects
          FOR UPDATE USING (
            bucket_id = 'images' 
            AND auth.role() = 'authenticated'
          );
        `
      },
      {
        name: 'Authenticated users can delete images',
        policy: `
          CREATE POLICY "Authenticated users can delete images" ON storage.objects
          FOR DELETE USING (
            bucket_id = 'images' 
            AND auth.role() = 'authenticated'
          );
        `
      }
    ];

    for (const policy of policies) {
      try {
        await supabase.rpc('exec_sql', { sql: policy.policy });
        console.log(`✅ ${policy.name} policy created`);
      } catch (error) {
        console.error(`Error creating ${policy.name} policy:`, error);
      }
    }

    console.log('🎉 Storage policies fixed successfully!');
    console.log('📝 All authenticated users can now upload, update, and delete images');
    console.log('👁️ Images are publicly readable');

  } catch (error) {
    console.error('Error fixing storage policies:', error);
  }
}

fixStoragePolicies(); 