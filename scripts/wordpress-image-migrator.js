#!/usr/bin/env node

/**
 * WordPress Image Migration Script
 * Downloads images from WordPress posts and uploads them to Supabase storage
 * 
 * Usage:
 * node scripts/wordpress-image-migrator.js --file=wordpress-posts.json --download-images
 * node scripts/wordpress-image-migrator.js --file=wordpress-posts.json --upload-to-supabase
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { createReadStream } = require('fs');

// Parse command line arguments
const args = process.argv.slice(2);
const fileArg = args.find(arg => arg.startsWith('--file='));
const isDownloadOnly = args.includes('--download-images');
const isUploadOnly = args.includes('--upload-to-supabase');
const isFullMigration = args.includes('--full-migration');

const inputFile = fileArg ? fileArg.split('=')[1] : null;

// Supabase client setup
let supabase;
if (isUploadOnly || isFullMigration) {
  try {
    require('dotenv').config({ path: '.env.local' });
    const { createClient } = require('@supabase/supabase-js');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase environment variables');
    }
    
    supabase = createClient(supabaseUrl, supabaseKey);
    
    // Check if bucket exists
    const bucketName = process.env.SUPABASE_BLOG_IMAGES_BUCKET || 'blog-images';
    console.log(`📦 Using storage bucket: ${bucketName}`);
    
  } catch (error) {
    console.error('❌ Failed to initialize Supabase client:', error.message);
    process.exit(1);
  }
}

// Create images directory if it doesn't exist
const imagesDir = path.join(process.cwd(), 'wordpress-images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    protocol.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }
      
      const filePath = path.join(imagesDir, filename);
      const fileStream = fs.createWriteStream(filePath);
      
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filePath);
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there's an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function extractImageUrls(content) {
  const imageUrls = [];
  
  // Extract img tags
  const imgMatches = content.match(/<img[^>]+src="([^"]+)"/g);
  if (imgMatches) {
    imgMatches.forEach(match => {
      const srcMatch = match.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) {
        imageUrls.push(srcMatch[1]);
      }
    });
  }
  
  // Extract background images
  const bgMatches = content.match(/background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/g);
  if (bgMatches) {
    bgMatches.forEach(match => {
      const urlMatch = match.match(/url\(['"]?([^'")\s]+)['"]?\)/);
      if (urlMatch && urlMatch[1]) {
        imageUrls.push(urlMatch[1]);
      }
    });
  }
  
  return [...new Set(imageUrls)]; // Remove duplicates
}

function generateImageFilename(originalUrl, index = 0) {
  try {
    const url = new URL(originalUrl);
    const pathname = url.pathname;
    const extension = path.extname(pathname) || '.jpg';
    const basename = path.basename(pathname, extension) || 'image';
    
    // Clean the filename
    const cleanName = basename
      .replace(/[^a-zA-Z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
    
    return `${cleanName}-${Date.now()}-${index}${extension}`;
  } catch (error) {
    return `image-${Date.now()}-${index}.jpg`;
  }
}

async function downloadImagesFromPosts(posts) {
  console.log('📥 Downloading images from WordPress posts...\n');
  
  const results = {
    total: 0,
    successful: 0,
    failed: 0,
    errors: []
  };
  
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`📝 Processing post ${i + 1}/${posts.length}: "${post.title}"`);
    
    try {
      // Extract image URLs from content
      const imageUrls = extractImageUrls(post.content);
      
      if (imageUrls.length === 0) {
        console.log('   ℹ️  No images found in this post');
        continue;
      }
      
      console.log(`   🖼️  Found ${imageUrls.length} image(s)`);
      
      const postImages = [];
      
      for (let j = 0; j < imageUrls.length; j++) {
        const imageUrl = imageUrls[j];
        const filename = generateImageFilename(imageUrl, j);
        
        try {
          console.log(`   📥 Downloading: ${imageUrl}`);
          const filePath = await downloadImage(imageUrl, filename);
          
          postImages.push({
            originalUrl: imageUrl,
            localPath: filePath,
            filename: filename
          });
          
          results.successful++;
          console.log(`   ✅ Downloaded: ${filename}`);
          
        } catch (error) {
          const errorMsg = `Failed to download ${imageUrl}: ${error.message}`;
          results.errors.push({ post: post.title, image: imageUrl, error: errorMsg });
          results.failed++;
          console.log(`   ❌ ${errorMsg}`);
        }
      }
      
      // Update the post with local image paths
      post.localImages = postImages;
      results.total += imageUrls.length;
      
    } catch (error) {
      const errorMsg = `Error processing post: ${error.message}`;
      results.errors.push({ post: post.title, error: errorMsg });
      console.log(`   ❌ ${errorMsg}`);
    }
  }
  
  return results;
}

async function uploadImagesToSupabase(posts) {
  console.log('☁️ Uploading images to Supabase storage...\n');
  
  const bucketName = process.env.SUPABASE_BLOG_IMAGES_BUCKET || 'blog-images';
  
  // First, check if bucket exists
  try {
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
      throw new Error(`Failed to list buckets: ${bucketError.message}`);
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === bucketName);
    if (!bucketExists) {
      console.log(`⚠️  Bucket '${bucketName}' does not exist. Creating it...`);
      
      const { error: createError } = await supabase.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
      });
      
      if (createError) {
        throw new Error(`Failed to create bucket: ${createError.message}`);
      }
      
      console.log(`✅ Created bucket: ${bucketName}`);
    } else {
      console.log(`✅ Bucket '${bucketName}' exists`);
    }
  } catch (error) {
    console.error(`❌ Bucket setup failed: ${error.message}`);
    console.log('\n💡 Please create the bucket manually in your Supabase dashboard:');
    console.log('   1. Go to Storage in your Supabase dashboard');
    console.log('   2. Click "New bucket"');
    console.log('   3. Name it "blog-images" (or set SUPABASE_BLOG_IMAGES_BUCKET in .env.local)');
    console.log('   4. Make it public if you want images accessible by anyone');
    process.exit(1);
  }
  
  const results = {
    total: 0,
    successful: 0,
    failed: 0,
    errors: []
  };
  
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    console.log(`📝 Processing post ${i + 1}/${posts.length}: "${post.title}"`);
    
    if (!post.localImages || post.localImages.length === 0) {
      console.log('   ℹ️  No local images for this post');
      continue;
    }
    
    const postImages = [];
    
    for (let j = 0; j < post.localImages.length; j++) {
      const image = post.localImages[j];
      
      try {
        console.log(`   ☁️ Uploading: ${image.filename}`);
        
        // Check if file exists
        if (!fs.existsSync(image.localPath)) {
          throw new Error(`Local file not found: ${image.localPath}`);
        }
        
        // Read the file
        const fileBuffer = fs.readFileSync(image.localPath);
        
        // Upload to Supabase storage
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(`wordpress-migration/${image.filename}`, fileBuffer, {
            contentType: getContentType(image.filename),
            upsert: true
          });
        
        if (error) {
          throw new Error(error.message);
        }
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(`wordpress-migration/${image.filename}`);
        
        postImages.push({
          originalUrl: image.originalUrl,
          supabaseUrl: urlData.publicUrl,
          filename: image.filename
        });
        
        results.successful++;
        console.log(`   ✅ Uploaded: ${image.filename}`);
        
      } catch (error) {
        const errorMsg = `Failed to upload ${image.filename}: ${error.message}`;
        results.errors.push({ post: post.title, image: image.filename, error: errorMsg });
        results.failed++;
        console.log(`   ❌ ${errorMsg}`);
      }
    }
    
    // Update post content with new image URLs
    if (postImages.length > 0) {
      let updatedContent = post.content;
      
      postImages.forEach(image => {
        // Replace the original URL with Supabase URL in content
        updatedContent = updatedContent.replace(
          new RegExp(image.originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          image.supabaseUrl
        );
      });
      
      post.content = updatedContent;
      post.supabaseImages = postImages;
    }
    
    results.total += post.localImages.length;
  }
  
  return results;
}

function getContentType(filename) {
  const ext = path.extname(filename).toLowerCase();
  const contentTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml'
  };
  
  return contentTypes[ext] || 'image/jpeg';
}

async function cleanupLocalImages() {
  console.log('🧹 Cleaning up local image files...');
  
  try {
    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      let deletedCount = 0;
      
      for (const file of files) {
        const filePath = path.join(imagesDir, file);
        fs.unlinkSync(filePath);
        deletedCount++;
      }
      
      fs.rmdirSync(imagesDir);
      console.log(`✅ Deleted ${deletedCount} local image files`);
    }
  } catch (error) {
    console.warn('⚠️ Error cleaning up local images:', error.message);
  }
}

async function main() {
  console.log('🚀 WordPress Image Migration Script');
  console.log('===================================\n');
  
  if (!inputFile) {
    console.log('❌ Missing input file. Usage:');
    console.log('  node scripts/wordpress-image-migrator.js --file=wordpress-posts.json --download-images');
    console.log('  node scripts/wordpress-image-migrator.js --file=wordpress-posts.json --upload-to-supabase');
    console.log('  node scripts/wordpress-image-migrator.js --file=wordpress-posts.json --full-migration');
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
    const posts = JSON.parse(fileContent);
    
    if (!Array.isArray(posts)) {
      throw new Error('Invalid file format: expected array of posts');
    }
    
    console.log(`📊 Found ${posts.length} posts to process\n`);
    
    let downloadResults = null;
    let uploadResults = null;
    
    // Download images
    if (isDownloadOnly || isFullMigration) {
      downloadResults = await downloadImagesFromPosts(posts);
      
      console.log('\n📊 Download Results:');
      console.log('===================');
      console.log(`✅ Successful: ${downloadResults.successful}`);
      console.log(`❌ Failed: ${downloadResults.failed}`);
      console.log(`📊 Total: ${downloadResults.total}`);
      
      if (downloadResults.errors.length > 0) {
        console.log('\n❌ Download Errors:');
        downloadResults.errors.forEach((error, index) => {
          console.log(`  ${index + 1}. ${error.post}: ${error.error}`);
        });
      }
      
      // Save updated posts with local image paths
      const updatedFilename = inputFile.replace('.json', '-with-images.json');
      fs.writeFileSync(updatedFilename, JSON.stringify(posts, null, 2));
      console.log(`\n💾 Saved updated posts to: ${updatedFilename}`);
    }
    
    // Upload images to Supabase
    if (isUploadOnly || isFullMigration) {
      if (!downloadResults && !isUploadOnly) {
        console.log('⚠️ No images downloaded. Run with --download-images first.');
        return;
      }
      
      uploadResults = await uploadImagesToSupabase(posts);
      
      console.log('\n📊 Upload Results:');
      console.log('==================');
      console.log(`✅ Successful: ${uploadResults.successful}`);
      console.log(`❌ Failed: ${uploadResults.failed}`);
      console.log(`📊 Total: ${uploadResults.total}`);
      
      if (uploadResults.errors.length > 0) {
        console.log('\n❌ Upload Errors:');
        uploadResults.errors.forEach((error, index) => {
          console.log(`  ${index + 1}. ${error.post}: ${error.error}`);
        });
      }
      
      // Save final posts with Supabase image URLs
      const finalFilename = inputFile.replace('.json', '-final.json');
      fs.writeFileSync(finalFilename, JSON.stringify(posts, null, 2));
      console.log(`\n💾 Saved final posts to: ${finalFilename}`);
      
      // Clean up local images
      if (isFullMigration) {
        await cleanupLocalImages();
      }
    }
    
    console.log('\n🎉 Image migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Review the updated posts file');
    console.log('2. Run the main migration script with the updated file');
    console.log('3. Your images are now hosted on Supabase storage');
    
  } catch (error) {
    console.error('❌ Image migration failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  downloadImagesFromPosts,
  uploadImagesToSupabase,
  extractImageUrls,
  generateImageFilename
}; 