#!/usr/bin/env node

/**
 * WordPress Export Helper
 * Helps export blog posts from WordPress for migration to Supabase
 * 
 * Usage:
 * 1. REST API method: node scripts/wordpress-export-helper.js --api --url=https://your-site.com
 * 2. Manual XML method: node scripts/wordpress-export-helper.js --xml --file=export.xml
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Parse command line arguments
const args = process.argv.slice(2);
const isApiMode = args.includes('--api');
const isXmlMode = args.includes('--xml');
const urlArg = args.find(arg => arg.startsWith('--url='));
const fileArg = args.find(arg => arg.startsWith('--file='));

const wpUrl = urlArg ? urlArg.split('=')[1] : null;
const xmlFile = fileArg ? fileArg.split('=')[1] : null;

async function fetchFromWordPressAPI(baseUrl) {
  console.log(`🔍 Fetching posts from WordPress API: ${baseUrl}`);
  
  const posts = [];
  let page = 1;
  const perPage = 100;
  
  while (true) {
    try {
      const url = `${baseUrl}/wp-json/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`;
      console.log(`📄 Fetching page ${page}...`);
      
      const response = await makeRequest(url);
      const data = JSON.parse(response);
      
      if (!Array.isArray(data) || data.length === 0) {
        break;
      }
      
      posts.push(...data);
      console.log(`✅ Found ${data.length} posts on page ${page}`);
      
      if (data.length < perPage) {
        break;
      }
      
      page++;
    } catch (error) {
      console.error(`❌ Error fetching page ${page}:`, error.message);
      break;
    }
  }
  
  return posts;
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function parseWordPressXML(xmlContent) {
  console.log('🔍 Parsing WordPress XML export...');
  
  // Simple XML parsing for WordPress export
  const posts = [];
  
  // Extract posts from XML
  const postMatches = xmlContent.match(/<item>([\s\S]*?)<\/item>/g);
  
  if (postMatches) {
    postMatches.forEach((item, index) => {
      try {
        const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
        const contentMatch = item.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/);
        const excerptMatch = item.match(/<excerpt:encoded><!\[CDATA\[(.*?)\]\]><\/excerpt:encoded>/);
        const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
        const authorMatch = item.match(/<dc:creator><!\[CDATA\[(.*?)\]\]><\/dc:creator>/);
        const categoriesMatch = item.match(/<category domain="category">(.*?)<\/category>/g);
        
        if (titleMatch) {
          const post = {
            id: index + 1,
            title: titleMatch[1].trim(),
            content: contentMatch ? contentMatch[1].trim() : '',
            excerpt: excerptMatch ? excerptMatch[1].trim() : '',
            date: dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString(),
            author: authorMatch ? authorMatch[1].trim() : 'Unknown Author',
            categories: categoriesMatch ? categoriesMatch.map(cat => 
              cat.replace(/<category domain="category">(.*?)<\/category>/, '$1').trim()
            ) : []
          };
          
          posts.push(post);
        }
      } catch (error) {
        console.warn(`⚠️ Error parsing post ${index + 1}:`, error.message);
      }
    });
  }
  
  return posts;
}

function transformPostsForSupabase(posts) {
  console.log('🔄 Transforming posts for Supabase...');
  
  return posts.map((post, index) => {
    try {
      // Ensure title is a string and handle different WordPress API formats
      let title = '';
      if (typeof post.title === 'string') {
        title = post.title;
      } else if (post.title && typeof post.title.rendered === 'string') {
        title = post.title.rendered;
      } else if (post.title && typeof post.title === 'object') {
        title = JSON.stringify(post.title);
      } else {
        title = `Untitled Post ${index + 1}`;
      }
      
      // Ensure content is a string
      let content = '';
      if (typeof post.content === 'string') {
        content = post.content;
      } else if (post.content && typeof post.content.rendered === 'string') {
        content = post.content.rendered;
      } else if (post.content && typeof post.content === 'object') {
        content = JSON.stringify(post.content);
      }
      
      // Ensure excerpt is a string
      let excerpt = '';
      if (typeof post.excerpt === 'string') {
        excerpt = post.excerpt;
      } else if (post.excerpt && typeof post.excerpt.rendered === 'string') {
        excerpt = post.excerpt.rendered;
      } else if (post.excerpt && typeof post.excerpt === 'object') {
        excerpt = JSON.stringify(post.excerpt);
      }
      
      // Generate slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      
      // Extract first paragraph as excerpt if not provided
      if (!excerpt && content) {
        const firstParagraph = content.match(/<p>(.*?)<\/p>/);
        if (firstParagraph) {
          excerpt = firstParagraph[1].replace(/<[^>]*>/g, '').substring(0, 200) + '...';
        } else {
          excerpt = content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';
        }
      }
      
      // Extract featured image if present
      let imageUrl = null;
      if (content) {
        const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) {
          imageUrl = imgMatch[1];
        }
      }
      
      // Handle author field
      let author = 'Unknown Author';
      if (typeof post.author === 'string') {
        author = post.author;
      } else if (post.author && typeof post.author === 'object') {
        author = post.author.name || post.author.display_name || 'Unknown Author';
      }
      
      // Handle date field
      let date = new Date().toISOString();
      if (post.date) {
        const parsedDate = new Date(post.date);
        if (!isNaN(parsedDate.getTime())) {
          date = parsedDate.toISOString();
        }
      }
      
      // Handle categories/tags
      let categories = [];
      if (Array.isArray(post.categories)) {
        categories = post.categories;
      } else if (post._embedded && post._embedded['wp:term']) {
        // WordPress API v2 format
        categories = post._embedded['wp:term']
          .flat()
          .filter(term => term.taxonomy === 'category')
          .map(term => term.name);
      }
      
      return {
        title: title,
        excerpt: excerpt || 'No excerpt available',
        content: content || '',
        image_url: imageUrl,
        author: author,
        published_date: date,
        is_published: true,
        slug: `${slug}-${Date.now()}-${index}`,
        meta_description: excerpt ? excerpt.substring(0, 160) : '',
        tags: categories || []
      };
    } catch (error) {
      console.warn(`⚠️ Error transforming post ${index + 1}:`, error.message);
      // Return a fallback post
      return {
        title: `Post ${index + 1}`,
        excerpt: 'Error processing this post',
        content: '',
        image_url: null,
        author: 'Unknown Author',
        published_date: new Date().toISOString(),
        is_published: true,
        slug: `post-${index + 1}-${Date.now()}`,
        meta_description: 'Error processing this post',
        tags: []
      };
    }
  });
}

function saveToFile(data, filename) {
  const outputPath = path.join(process.cwd(), filename);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`💾 Saved ${data.length} posts to ${outputPath}`);
}

async function main() {
  console.log('🚀 WordPress Export Helper');
  console.log('==========================\n');
  
  try {
    let posts = [];
    
    if (isApiMode && wpUrl) {
      // Fetch from WordPress REST API
      posts = await fetchFromWordPressAPI(wpUrl);
    } else if (isXmlMode && xmlFile) {
      // Parse WordPress XML export
      const xmlPath = path.join(process.cwd(), xmlFile);
      if (!fs.existsSync(xmlPath)) {
        throw new Error(`XML file not found: ${xmlPath}`);
      }
      
      const xmlContent = fs.readFileSync(xmlPath, 'utf8');
      posts = parseWordPressXML(xmlContent);
    } else {
      console.log('❌ Invalid arguments. Usage:');
      console.log('  API mode: node scripts/wordpress-export-helper.js --api --url=https://your-site.com');
      console.log('  XML mode: node scripts/wordpress-export-helper.js --xml --file=export.xml');
      process.exit(1);
    }
    
    if (posts.length === 0) {
      console.log('⚠️ No posts found');
      return;
    }
    
    console.log(`\n📊 Found ${posts.length} posts`);
    
    // Transform for Supabase
    const transformedPosts = transformPostsForSupabase(posts);
    
    // Save to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `wordpress-posts-${timestamp}.json`;
    saveToFile(transformedPosts, filename);
    
    console.log('\n✅ Export completed successfully!');
    console.log(`📁 Output file: ${filename}`);
    console.log('\nNext steps:');
    console.log('1. Review the exported data');
    console.log('2. Run the migration script: node scripts/wordpress-migration.js');
    
  } catch (error) {
    console.error('❌ Export failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  fetchFromWordPressAPI,
  parseWordPressXML,
  transformPostsForSupabase
}; 