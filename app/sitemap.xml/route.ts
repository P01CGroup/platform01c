import { NextResponse } from 'next/server';
import { navigationData, NavItemData, MegaMenuData, MegaMenuColumn } from '@/lib/navigation-config';
import { supabaseAdmin } from '@/lib/supabase/admin';

function isMegaMenu(item: NavItemData | MegaMenuData): item is MegaMenuData {
  return (item as MegaMenuData).isMegaMenu === true && Array.isArray((item as MegaMenuData).children);
}
function isNavItem(item: any): item is NavItemData {
  return typeof item.label === 'string' && typeof item.href === 'string';
}
function isMegaMenuColumn(item: any): item is MegaMenuColumn {
  return typeof item.title === 'string' && Array.isArray(item.links);
}

function flattenNav(nav: (NavItemData | MegaMenuData)[]): string[] {
  const result: string[] = [];
  nav.forEach(item => {
    if (isMegaMenu(item)) {
      item.children.forEach((col) => {
        if (isMegaMenuColumn(col)) {
          col.links.forEach(link => {
            result.push(link.href);
          });
        }
      });
    } else if (isNavItem(item) && item.children && item.children.length) {
      item.children.forEach(child => {
        if (isNavItem(child)) {
          result.push(child.href);
        }
      });
    } else if (isNavItem(item)) {
      result.push(item.href);
    }
  });
  return result;
}

export async function GET() {
  const staticPages = flattenNav(navigationData);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  // Fetch all published insights
  let insightUrls: string[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('insights')
      .select('slug, is_published')
      .eq('is_published', true);
    if (data) {
      insightUrls = data.map((i: any) => `/insights/${i.slug}`);
    }
  } catch (e) {}

  // Fetch excluded slugs from site_settings
  let exclude: string[] = [];
  try {
    const { data } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'sitemap_exclude')
      .single();
    if (data && data.value) {
      exclude = JSON.parse(data.value);
    }
  } catch (e) {}

  // Combine all URLs and filter out excluded
  const allUrls = ['/', ...staticPages, ...insightUrls].filter(url => !exclude.includes(url));

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
    .map(
      (url) => `  <url><loc>${baseUrl}${url}</loc></url>`
    )
    .join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
} 