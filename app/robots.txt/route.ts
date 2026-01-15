import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  let robots = '';
  try {
    const { data } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'robots_txt')
      .single();
    if (data && data.value) {
      robots = data.value;
    }
  } catch (e) {}
  if (!robots) {
    robots = `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml`;
  }
  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
} 