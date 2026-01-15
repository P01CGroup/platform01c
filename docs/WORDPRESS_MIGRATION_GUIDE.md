# WordPress Migration Guide

This guide will help you migrate your WordPress blog posts to the Platform01 Supabase insights table.

## Overview

The migration process consists of two main steps:
1. **Export** your WordPress posts (using REST API or XML export)
2. **Import** the posts into your Supabase insights table

## Prerequisites

- Node.js installed on your system
- Access to your WordPress site (for API method) or WordPress XML export file
- Supabase project with the insights table created
- Environment variables configured in `.env.local`

## Step 1: Export WordPress Posts

### Method A: Using WordPress REST API (Recommended)

If your WordPress site has the REST API enabled (most modern WordPress sites do):

```bash
# Replace with your WordPress site URL
node scripts/wordpress-export-helper.js --api --url=https://your-wordpress-site.com
```

This will:
- Fetch all published posts from your WordPress site
- Extract titles, content, excerpts, authors, dates, and categories
- Transform the data for Supabase compatibility
- Save to a JSON file (e.g., `wordpress-posts-2024-01-01T12-00-00-000Z.json`)

### Method B: Using WordPress XML Export

If you prefer to use WordPress's built-in export feature:

1. **In WordPress Admin:**
   - Go to Tools → Export
   - Select "All content" or "Posts"
   - Click "Download Export File"
   - Save the XML file to your project root

2. **Run the export helper:**
```bash
node scripts/wordpress-export-helper.js --xml --file=your-export.xml
```

## Step 2: Review and Preview

Before importing, you can preview the data:

```bash
# Preview the first 3 posts without importing
node scripts/wordpress-migration.js --file=wordpress-posts-2024-01-01.json --preview
```

This will show you:
- Post titles
- Authors
- Generated slugs
- Publication dates
- Tags/categories

## Step 3: Import to Supabase

### Dry Run (Recommended First)

Test the migration without actually inserting data:

```bash
node scripts/wordpress-migration.js --file=wordpress-posts-2024-01-01.json --dry-run
```

This will:
- Validate all posts
- Show what would be inserted
- Report any errors
- **No data will be inserted**

### Actual Migration

When you're ready to import:

```bash
node scripts/wordpress-migration.js --file=wordpress-posts-2024-01-01.json
```

The script will:
- Ask for confirmation before proceeding
- Validate each post
- Clean and transform the data
- Insert into your Supabase insights table
- Report success/failure for each post

## Data Transformation

The migration script automatically transforms your WordPress data:

| WordPress Field | Supabase Field | Transformation |
|----------------|----------------|----------------|
| `post_title` | `title` | Direct copy |
| `post_excerpt` | `excerpt` | Direct copy, or generated from content |
| `post_content` | `content` | Direct copy |
| `post_author` | `author` | Direct copy |
| `post_date` | `published_date` | Converted to ISO date format |
| `post_status` | `is_published` | `publish` → `true`, others → `false` |
| `post_name` | `slug` | Generated from title if not available |
| `categories` | `tags` | Array of category names |
| `featured_image` | `image_url` | Extracted from content or meta |

## Troubleshooting

### Common Issues

**1. "Missing Supabase environment variables"**
- Ensure your `.env.local` file has:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
  ```

**2. "WordPress API not accessible"**
- Check if your WordPress site has REST API enabled
- Try accessing: `https://your-site.com/wp-json/wp/v2/posts`
- If blocked, use the XML export method instead

**3. "Invalid slug format"**
- The script automatically generates valid slugs
- If you have custom slugs, ensure they're lowercase with hyphens only

**4. "Database connection failed"**
- Verify your Supabase credentials
- Check if the insights table exists
- Ensure RLS policies allow insertion

### Validation Errors

The migration script validates each post and will skip invalid ones:

- **Missing title**: Post will be skipped
- **Missing excerpt**: Will be generated from content
- **Invalid date**: Will use current date
- **Invalid slug**: Will be auto-generated

## Post-Migration

After successful migration:

1. **Verify the data** in your Supabase dashboard
2. **Check the insights** appear on your website
3. **Review and edit** any posts that need adjustments
4. **Update slugs** if needed for SEO purposes

## File Structure

```
scripts/
├── wordpress-export-helper.js    # Exports posts from WordPress
├── wordpress-migration.js        # Imports posts to Supabase
└── ...

docs/
└── WORDPRESS_MIGRATION_GUIDE.md  # This guide

wordpress-posts-*.json            # Exported posts (generated)
```

## Advanced Configuration

### Custom Transformations

You can modify the transformation logic in `wordpress-export-helper.js`:

```javascript
function transformPostsForSupabase(posts) {
  return posts.map((post, index) => {
    // Add your custom transformations here
    return {
      // ... existing transformations
      custom_field: post.custom_field || 'default_value'
    };
  });
}
```

### Batch Processing

For large sites, you can process posts in batches by modifying the migration script.

### Error Recovery

If the migration fails partway through:
1. Check the error log
2. Fix the issues in the source data
3. Re-run the migration (duplicates will be handled by unique constraints)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the error messages in the console
3. Verify your WordPress site and Supabase configuration
4. Test with a small subset of posts first

## Security Notes

- The migration script uses your Supabase service role key
- Keep your `.env.local` file secure and never commit it to version control
- Consider using a test database first for large migrations
- Review the data before importing to production 