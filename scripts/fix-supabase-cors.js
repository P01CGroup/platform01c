#!/usr/bin/env node

/**
 * Fix Supabase Storage CORS Configuration
 * This script configures CORS settings to allow images to load from production domains
 */

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  console.log(
    "Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env.local file"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixSupabaseCORS() {
  try {
    console.log("🔧 Fixing Supabase Storage CORS configuration...");

    // Configure CORS for the images bucket using SQL
    const corsConfig = {
      allowedOrigins: [
        "https://platform01consulting.com",
        "https://platform01c.vercel.app/",
        "https://www.platform01consulting.com",
        "http://localhost:3000",
        "http://localhost:3001",
      ],
      allowedMethods: ["GET", "POST", "PUT", "DELETE", "HEAD"],
      allowedHeaders: ["*"],
      exposedHeaders: ["Content-Length", "Content-Range"],
      maxAgeSeconds: 3600,
    };

    console.log("📋 CORS Configuration:");
    console.log("   Allowed Origins:", corsConfig.allowedOrigins);
    console.log("   Allowed Methods:", corsConfig.allowedMethods);
    console.log("   Max Age:", corsConfig.maxAgeSeconds, "seconds");

    // Set CORS using SQL
    const corsSQL = `
      INSERT INTO storage.cors (bucket_id, allowed_origins, allowed_methods, allowed_headers, exposed_headers, max_age_seconds)
      VALUES (
        'images',
        ARRAY[${corsConfig.allowedOrigins.map((origin) => `'${origin}'`).join(", ")}],
        ARRAY[${corsConfig.allowedMethods.map((method) => `'${method}'`).join(", ")}],
        ARRAY['*'],
        ARRAY['Content-Length', 'Content-Range'],
        ${corsConfig.maxAgeSeconds}
      )
      ON CONFLICT (bucket_id) 
      DO UPDATE SET
        allowed_origins = EXCLUDED.allowed_origins,
        allowed_methods = EXCLUDED.allowed_methods,
        allowed_headers = EXCLUDED.allowed_headers,
        exposed_headers = EXCLUDED.exposed_headers,
        max_age_seconds = EXCLUDED.max_age_seconds;
    `;

    try {
      await supabase.rpc("exec_sql", { sql: corsSQL });
      console.log("✅ CORS configuration updated via SQL");
    } catch (sqlError) {
      console.error("❌ SQL CORS configuration failed:", sqlError);
      console.log("\n💡 Manual CORS Configuration Required:");
      console.log("   1. Go to your Supabase Dashboard");
      console.log("   2. Navigate to Storage > Settings");
      console.log("   3. Add the following CORS configuration:");
      console.log(
        "      Allowed Origins: https://platform01consulting.com, https://www.platform01consulting.com"
      );
      console.log("      Allowed Methods: GET, POST, PUT, DELETE, HEAD");
      console.log("      Allowed Headers: *");
      console.log("      Exposed Headers: Content-Length, Content-Range");
      console.log("      Max Age: 3600");
    }

    // Verify bucket exists and is public
    const { data: buckets, error: bucketError } =
      await supabase.storage.listBuckets();

    if (bucketError) {
      console.error("❌ Error listing buckets:", bucketError);
      return;
    }

    const imagesBucket = buckets.find((bucket) => bucket.name === "images");

    if (!imagesBucket) {
      console.log("⚠️  Images bucket not found. Creating it...");

      const { error: createError } = await supabase.storage.createBucket(
        "images",
        {
          public: true,
          allowedMimeTypes: ["image/*"],
          fileSizeLimit: 5242880, // 5MB
        }
      );

      if (createError) {
        console.error("❌ Error creating images bucket:", createError);
      } else {
        console.log("✅ Images bucket created successfully");
      }
    } else {
      console.log("✅ Images bucket exists");
      console.log("   Public:", imagesBucket.public);
      console.log("   File size limit:", imagesBucket.fileSizeLimit);
    }

    // Test image access
    console.log("\n🧪 Testing image access...");

    // List some files in the bucket to test access
    const { data: files, error: listError } = await supabase.storage
      .from("images")
      .list("insights", { limit: 1 });

    if (listError) {
      console.error("❌ Error listing files:", listError);
    } else if (files && files.length > 0) {
      const testFile = files[0];
      console.log("✅ Found test file:", testFile.name);

      // Test public URL generation
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("images")
        .getPublicUrl(`insights/${testFile.name}`);

      console.log("🔗 Test public URL:", publicUrl);
      console.log("   (You can test this URL in your browser)");
    } else {
      console.log("ℹ️  No files found in insights folder");
    }

    console.log("\n🎉 CORS configuration process completed!");
    console.log("\n📝 Next steps:");
    console.log("   1. Deploy your updated Next.js configuration");
    console.log("   2. Test image loading on your production site");
    console.log(
      "   3. If images still don't load, check browser console for CORS errors"
    );
  } catch (error) {
    console.error("❌ Error fixing CORS configuration:", error);
  }
}

fixSupabaseCORS();
